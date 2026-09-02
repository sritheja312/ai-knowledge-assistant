const express = require("express");

const { askRagQuestion } = require("../controllers/ragController");

const router = express.Router();

router.post("/ask", askRagQuestion);

module.exports = router;