const express = require('express');
const router = express.Router();
const { addProject, getAllProjects } = require('../controllers/project');
const { getAllFiles, fileUpload, getImage, deleteFile } = require('../controllers/upload');

router
.post('/', addProject)
.get('/', getAllProjects)
.get('/:id/upload', getAllFiles)
.get('/:id/file/:filename', getImage)
.post('/:id/file/:fileId', deleteFile);

module.exports = router;