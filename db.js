const mongoose = require('mongoose');
const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    
        console.log(`Mongo is here`.blue.bold); 
    } catch (err) {
        console.error(`${err}`.red.bold);
    }

    doSomething();
}

const doSomething = () => {
    let gfs;
    const connect = mongoose.createConnection(process.env.MONGO_URI);
    connect.once('open', () => {
        gfs = Grid(connect.db, mongoose.mongo);
    })
}


module.exports = connectDB;