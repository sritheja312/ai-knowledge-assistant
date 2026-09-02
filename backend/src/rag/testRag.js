require("dotenv").config();

const { connectDatabase } = require("../database");
const { askQuestion } = require("./ragService");

const testRag = async () => {

  try {

    await connectDatabase();

    const question =
      "How many days of maternity leave are available?";

    const result = await askQuestion(question);

    console.log("\n\n========== FINAL ANSWER ==========");

    console.log("\nQuestion:");
    console.log(result.question);

    console.log("\nAnswer:");
    console.log(result.answer);

    console.log("\nSources:");

    console.log(
      JSON.stringify(
        result.sources,
        null,
        2
      )
    );

  } catch (error) {

    console.error(
      "\nRAG test failed:",
      error
    );

  }
};

testRag();