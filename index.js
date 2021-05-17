const express = require('express');
const mysql = require('mysql');
const util = require('util');
const restaurantApi = require('./api/restaurant');

var app = express();
const port = 3000;

//Mapeo de peticion a object js
app.use(express.json());

//Conexión a la DB
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'testUser',
    password: '1234',
    database: 'restaurant_reviews',
});
conn.connect((error) => {
    if (error) throw error;
    console.log('Se estableción la conexión con la DB');
});

// Permite el uso de async await para un código más ordenado al generar queries
// Transforma una query que trabaja con callbacks a una promise
// async await solo trabaja con promises no con callbacks
const qy = util.promisify(conn.query).bind(conn);

// Desarrollo lógica de negocio

restaurantApi(app, qy);

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ', port);
});