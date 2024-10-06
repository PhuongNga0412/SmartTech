const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/UploadController");

router.post("/upload-image", uploadController.uploadImage);

module.exports = router;
