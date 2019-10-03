require('dotenv').config()
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3001,
    mysql = require('mysql'),
    path = require('path'),
    favicon = require('serve-favicon'),
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'world'
    });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.get('/getCity/:id', (req, res) => {
    let singleElement = connection.escape(req.params.id);
    connection.query(`SELECT * from city where id = ${singleElement}`, (error, rows) => {
        if (error) throw error;
        res.send(rows);
    })
})

app.get('/getWorld', (req, res) => {
    // const userInput = connection.escape(req.body.id);
    connection.query(`SELECT * FROM city;`, (error, rows) => {
        if (error) throw error;
        res.send(rows);
    });
});

app.post('/', (req, res) => {
    pool.query(`INSERT into ${req.body.table} (${req.body.column}) VALUES ("${req.body.updates}");`, (error, results) => {
        if (error) throw error;
        res.send(`database updated with ${results}`);
    });
});

app.put('/', (req, res) => {
    console.log(req.body);
    pool.query(`UPDATE ${req.body.table} SET ${req.body.column} = "${req.body.value}" WHERE id = ${req.body.id};`, (error, results, fields) => {
        if (error) throw error;
        res.send(fields);
    });
});

app.delete('/', (req, res) => {
    pool.query(`DELETE FROM ${req.body.table} WHERE id = ${req.body.id};`, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
