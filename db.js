const mongoose = require('mongoose');
const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        let gfs
        let conn = mongoose.connection;

        conn.once('open', () => {
            gfs = Grid(conn.db, mongoose.mongo);
            gfs.collection('uploads');
        })


        const storage = new GridFSStorage({
            url: process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            file: (req, res) => {
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
    
        console.log(`Mongo is here`.blue.bold); 

    } catch (err) {
        console.error(`${err}`.red.bold);
    }
}