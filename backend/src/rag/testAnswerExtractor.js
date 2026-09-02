const { extractAnswer } = require("./answerExtractor");

const context = `
Female employees who have worked continuously for a period of _____
<mention number of days, but 80 days is minimum as per law> with the
company in the past twelve months immediately preceding the date of
expected delivery is eligible for maternity leave as per Maternity
Benefits Act, as amended in Mar 2017.

Eligible employees can avail of paid Maternity leave for a continuous
period of 26 weeks, of which 8 weeks can be availed for the pre-natal
period.

Maternity leave of 12 weeks for adopting a child below 3 months and
for commissioning mothers are allowed.
`;

const questions = [
  "How many weeks of maternity leave are available?",

  "How many weeks of maternity leave can be availed before delivery?",

  "How many weeks of maternity leave are available for adopting a child below 3 months?",

  "Who is eligible for maternity leave?"
];

for (const question of questions) {

  const answer = extractAnswer(question, context);

  console.log("\nQuestion:");
  console.log(question);

  console.log("Answer:");
  console.log(answer);
}