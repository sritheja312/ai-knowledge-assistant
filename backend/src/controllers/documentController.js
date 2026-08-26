const uploadDocument = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No document uploaded",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      file: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload document",
    });
  }
};

module.exports = {
  uploadDocument,
};