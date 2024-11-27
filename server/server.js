// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/drugdatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schemas and models
const customerSchema = new mongoose.Schema({
  uid: String,
  pass: String,
  fname: String,
  lname: String,
  email: String,
  address: String,
  phno: Number
});

const sellerSchema = new mongoose.Schema({
  sid: String,
  sname: String,
  pass: String,
  address: String,
  phno: Number
});

const productSchema = new mongoose.Schema({
  pid: String,
  pname: String,
  manufacturer: String,
  mfg: Date,
  exp: Date,
  price: Number
});

const Customer = mongoose.model('Customer', customerSchema);
const Seller = mongoose.model('Seller', sellerSchema);
const Product = mongoose.model('Product', productSchema);

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Drug Database API');
});

// Customer routes
app.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.send(customer);
});

app.get('/customers', async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

// Add more routes for update and delete

// Seller routes
app.post('/sellers', async (req, res) => {
  const seller = new Seller(req.body);
  await seller.save();
  res.send(seller);
});

app.get('/sellers', async (req, res) => {
  const sellers = await Seller.find();
  res.send(sellers);
});

// Add more routes for update and delete

// Product routes
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send(product);
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Add more routes for update and delete

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function run() {
    const uri = "mongodb://localhost:27017/drugdatabase";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('drugdatabase');
        const ordersCollection = db.collection('orders');
        const inventoryCollection = db.collection('inventory');

        // Change stream to monitor the orders collection
        const changeStream = ordersCollection.watch();

        changeStream.on('change', async (change) => {
            if (change.operationType === 'insert') {
                const order = change.fullDocument;

                // Update orderdatetime
                await ordersCollection.updateOne(
                    { _id: order._id },
                    { $set: { orderdatetime: new Date() } }
                );

                // Update inventory
                await inventoryCollection.updateOne(
                    { pid: order.pid },
                    { $inc: { quantity: -order.quantity } }
                );
            }
        });

        // Stored Procedures
        async function getSellerOrders(sid) {
            const orders = await db.collection('orders').find({ sid }).toArray();
            return orders;
        }

        async function getOrders(uid) {
            const orders = await db.collection('orders').find({ uid }).toArray();
            return orders;
        }

        // Example usage
        const sellerOrders = await getSellerOrders('seller_id');
        console.log('Seller Orders:', sellerOrders);

        const customerOrders = await getOrders('customer_id');
        console.log('Customer Orders:', customerOrders);

    } finally {
        // Do not close the client to keep the change stream open
    }
}

run().catch(console.dir);
