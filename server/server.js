require('dotenv').config()
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    mysql = require('mysql'),
    pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'world'
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    pool.query(`SELECT * FROM ${req.body.table} WHERE id = ${req.body.id};`, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.post('/', (req, res) => {
    pool.query(`INSERT into ${req.body.table} (${req.body.column}) VALUES ("${req.body.updates}");`, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
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

app.listen(PORT, () => console.log(`App is listening on port PORT!`));