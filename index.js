const express = require('express');

const restaurantRouter = require('./api/restaurant');
const reviewRouter = require('./api/review');

var app = express();
const port = 3000;

//middleware
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded());

//Mapeo de peticion a object js
app.use(express.json());

// Desarrollo APIS lógica de negocio
app.use('/restaurant', restaurantRouter);
app.use('/review', reviewRouter);

//Pages
app.get('/', (req, res) => {
    res.status(404).sendFile('public/index.html', { root: __dirname });
});

//Error page
app.get('*', (req, res) => {
    res.status(404).sendFile('public/404.html', { root: __dirname });
});

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ', port);
});