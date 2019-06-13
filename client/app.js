window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    fetch('http://localhost:3000/getWorld')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let data = JSON.stringify(myJson);
            console.log(data);
            document.getElementById('data').innerHTML = data;
        });
});