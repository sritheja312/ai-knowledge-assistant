const path = require("path");
const { loadPDF } = require("./documentLoader");

const pdfPath = path.join(
  __dirname,
  "../../uploads/1787747738007-leave-policy.pdf"
);

const testPDF = async () => {
  try {
    const document = await loadPDF(pdfPath);

    console.log("\n========== PDF INFORMATION ==========");
    console.log("Pages:", document.numberOfPages);

    console.log("\n========== EXTRACTED TEXT ==========");
    console.log(document.text);
  } catch (error) {
    console.error(error);
  }
};

testPDF();