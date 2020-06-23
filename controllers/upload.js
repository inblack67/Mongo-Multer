const mongoose = require('mongoose');
const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')


exports.fileUpload = (req, res) => {
    res.status(200).json({ success: true, file: req.file })
}