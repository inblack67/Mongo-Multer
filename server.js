const express = require('express');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const multer = require('multer');
const mongoose = require('mongoose');
const GridFSStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');
require('colors');

const app = express();
app.use(express.json());

app.use(methodOverride('_method'));

dotenv.config({ path: './config.env' });

// ==========SHIT STARTS HERE

let upload;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Mongo is here`.blue.bold); 

    } catch (err) {
        console.error(`${err}`.red.bold);
    }
}

connectDB();

let conn = mongoose.connection;
let gfs;
let mygfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log(gfs.files);
})

console.log(mygfs);

const storage = new GridFSStorage({
    url: process.env.MONGO_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err){
                    return reject(err);
                }
                const fileName = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    fileName,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            }) 
        })
    }
})

upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(201).json({ success: true, data: req.file })
})


// =======SHIT ENDS HERE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.green.bold);
})