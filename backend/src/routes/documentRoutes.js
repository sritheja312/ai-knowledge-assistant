const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  uploadDocument,
} = require("../controllers/documentController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);

module.exports = router;