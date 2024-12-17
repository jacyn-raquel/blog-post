const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

// Dotenv config
dotenv.config();

// Created server
const app = express();

// Mongoose Connection
mongoose.connect(`${process.env.MONGODB_STRING}`);
let db = mongoose.connection;

// Check of connection
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", ()=> console.log('Successfully Connected to MongoDB Atlas!'));

// JSONify - for the API to read json (middlewares)
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Cors allowance
const corsOptions = {
	origin: ['http://localhost:4003', 'http://localhost:3000'],
	credentials: true,
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);


if(require.main === module){
	app.listen(process.env.PORT || 4005, () => console.log(`API is now online on port ${process.env.PORT || 4005}!`));
}

module.exports = {app, mongoose};

