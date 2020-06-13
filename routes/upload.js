const express = require('express');
const { fileUpload } = require('../controllers/upload');
const router = express.Router();

router.get('/', fileUpload);

module.exports = router;