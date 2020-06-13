const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const upload = require('./routes/upload');
const methodOverride = require('method-override');
const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream');
require('colors');

const app = express();
app.use(express.json());

app.use(methodOverride('_method'));

dotenv.config({ path: './config.env' });
connectDB();

app.use('/api/upload', upload);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.green.bold);
})