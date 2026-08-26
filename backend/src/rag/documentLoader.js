const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const loadPDF = async (filePath) => {
  try {
    const pdfBuffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
      data: pdfBuffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    return {
      text: result.text,
      numberOfPages: result.total,
    };
  } catch (error) {
    console.error("PDF loading error:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

module.exports = {
  loadPDF,
};