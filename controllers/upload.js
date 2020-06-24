const mongoose = require('mongoose');
const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')


// @desc GET All Files
// @route GET /project/:id/upload
exports.getAllFiles = async (req, res) => {

    try {
      const project = await Project.findById(req.params.id);

      if(!project){
        return res.status(404).json({ success: false, msg: 'No such project found' })
      }
    } catch (err) {
      console.error(`${err}.red.bold`)
    }

    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.status(200).json({ success: true, count: files.length, files });
    });
  };


// @desc Upload Image
// @route POST /project/:id/upload
// @middleware upload.single('file')
exports.fileUpload = async (req, res) => {

  try {
    const project = await Project.findById(req.params.id);

    if(!project){
      return res.status(404).json({ success: false, msg: 'No such project found' })
    }
  } catch (err) {
    console.error(`${err}.red.bold`)
  }
  
    project.image = req.file;
  
    await project.save();
  
    return res.status(201).json({ success: true, data: project })
}

// @desc Get Image
// @route GET /project/:id/file/:filename
exports.getImage = async (req, res) => {

  try {
    const project = await Project.findById(req.params.id);

    if(!project){
      return res.status(404).json({ success: false, msg: 'No such project found' })
    }
  } catch (err) {
    console.error(`${err}.red.bold`)
  }
  
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  }

// @desc DELETE File
// @route DELETE /project/:id/file/:fileId
exports.deleteFile = async (req, res) => {

  try {
    const project = await Project.findById(req.params.id);

    if(!project){
      return res.status(404).json({ success: false, msg: 'No such project found' })
    }
  } catch (err) {
    console.error(`${err}.red.bold`)
  }

    gfs.remove({ _id: req.params.fileId, root: 'uploads' }, (err) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    });

    try {
      project.image = {};
      await project.save();

      return res.status(200).json({ success: true, msg: 'File deleted', data: project });

    } catch (err) {
      console.error(`${err}.red.bold`)
    }

  }