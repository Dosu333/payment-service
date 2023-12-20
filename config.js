require('dotenv/config')
const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URL
const dbName = process.env.dbName

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName
})
.then(() => {
    console.log('DB connected');
})
.catch((err) => {
    console.log(err);
})