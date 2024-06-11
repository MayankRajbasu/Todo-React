const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = "mongodb+srv://mayank09raj:trail@trial.tozb2de.mongodb.net/?retryWrites=true&w=majority&appName=Trial";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions).catch(function(error){
    console.log(`Unable to connect to the Mongo db  ${error} `);
});;

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Define Routes
const itemsRouter = require('./routes/item');
app.use('/items', itemsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
