const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

app.use(express.json());

const connectToMongo = require('./ConnectToMongo');
connectToMongo();

//Available routes
app.use('/CustomerRegister', require('./routes/RegCustomer'));
app.use('/CustomerLogin', require('./routes/LogCustomer'));
app.use('/SellerRegister', require('./routes/RegSeller'));
app.use('/SellerLogin', require('./routes/LogSeller'));
app.use('/CustomerData', require('./routes/LCD'));
app.use('/SellerData', require('./routes/LSD'));
app.use('/EnterProduct', require('./routes/ProductEntry'));
app.use('/PlaceOrder', require('./routes/PlaceOrder'));
app.use('/Fetchorder', require('./routes/FetchOrders'));
app.use('/UpdateProduct', require('./routes/UpdateProduct'))

//Default route
app.get('/', (req, res) => {
    res.send('Home Page');
});

//Listening to the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
