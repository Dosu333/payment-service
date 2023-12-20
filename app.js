const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URL
const dbName = process.env.dbName

// Database Configuration
mongoose.connect(connectionString, {
    dbName: dbName
})
.then(() => {
    console.log('DB connected');
})
.catch((err) => {
    console.log(err);
})

// Run server
app.listen(3000, () => {
    console.log('Server is running');
})