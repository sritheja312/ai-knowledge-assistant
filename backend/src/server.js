require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectDatabase } = require("./database");
const documentRoutes = require("./routes/documentRoutes");
const ragRoutes = require("./routes/ragRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/documents", documentRoutes);
app.use("/api/rag", ragRoutes);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Knowledge Assistant backend is running",
  });
});

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();