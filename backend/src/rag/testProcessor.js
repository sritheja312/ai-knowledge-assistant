require("dotenv").config();

const { connectDatabase } = require("../database");
const { processDocument } = require("./documentProcessor");

const filePath =
  "./uploads/1787747738007-leave-policy.pdf";

const fileName =
  "1787747738007-leave-policy.pdf";

const testProcessor = async () => {
  try {
    await connectDatabase();

    const result = await processDocument(
      filePath,
      fileName
    );

    console.log("\nFINAL RESULT:");
    console.log(result);

  } catch (error) {
    console.error("Document processing failed:", error);
  }
};

testProcessor();