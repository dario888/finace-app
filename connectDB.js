const mongoose = require('mongoose');
require('dotenv').config()


const DB = process.env.DATABASE


const connectDB = () => {
    mongoose.connect(DB, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify: false, 
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB CONNECTED'))
    .catch(err => {
        console.error('ERROR CONNECTING', err.message);
        process.exit(1);//exitingthe app  with failor
    });
};


module.exports = connectDB;