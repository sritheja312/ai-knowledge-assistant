const extractWeeks = (text) => {
  const match = text.match(/\b\d+\s+weeks?\b/i);

  return match ? match[0] : "";
};


const getSentences = (context) => {
  return context
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
};


const extractAnswer = (question, context) => {
  if (!question || !context) {
    return "";
  }

  const normalizedQuestion = question.toLowerCase();

  const sentences = getSentences(context);


  // ==========================================
  // 1. Adoption
  // ==========================================

  if (
    normalizedQuestion.includes("adopt") ||
    normalizedQuestion.includes("adopting")
  ) {
    const sentence = sentences.find((sentence) =>
      sentence.toLowerCase().includes("adopting")
    );

    if (sentence) {
      return extractWeeks(sentence);
    }
  }


  // ==========================================
  // 2. Pre-natal / Before delivery
  // ==========================================

  if (
    normalizedQuestion.includes("pre-natal") ||
    normalizedQuestion.includes("prenatal") ||
    normalizedQuestion.includes("before delivery") ||
    normalizedQuestion.includes("before birth") ||
    normalizedQuestion.includes("before childbirth")
  ) {
    const sentence = sentences.find((sentence) => {
      const text = sentence.toLowerCase();

      return (
        text.includes("pre-natal") ||
        text.includes("prenatal")
      );
    });

    if (sentence) {
      const matches = sentence.match(/\b\d+\s+weeks?\b/gi);

      if (matches && matches.length >= 2) {
        return matches[1];
      }

      if (matches && matches.length === 1) {
        return matches[0];
      }
    }
  }


  // ==========================================
  // 3. General maternity leave
  // ==========================================

  if (
    normalizedQuestion.includes("maternity leave") &&
    normalizedQuestion.includes("how many weeks")
  ) {
    const sentence = sentences.find((sentence) => {
      const text = sentence.toLowerCase();

      return (
        text.includes("maternity leave") &&
        text.includes("continuous period")
      );
    });

    if (sentence) {
      return extractWeeks(sentence);
    }
  }


  // ==========================================
  // 4. Eligibility questions
  // ==========================================

// ==========================================
// 4. Eligibility questions
// ==========================================

if (
  normalizedQuestion.includes("who is eligible") ||
  normalizedQuestion.includes("who are eligible") ||
  normalizedQuestion.includes("eligibility")
) {
  const eligibilityIndex = normalizedQuestion.includes("maternity")
    ? context.toLowerCase().indexOf("female employees")
    : context.toLowerCase().indexOf("eligible");

  if (eligibilityIndex !== -1) {
    const relevantText = context.substring(
      eligibilityIndex,
      eligibilityIndex + 600
    );

    const endMarker = "as amended in mar 2017";

    const markerIndex = relevantText
    .toLowerCase()
    .indexOf(endMarker);

    let answer = relevantText;

    if (markerIndex !== -1) {
    answer = relevantText.substring(
        0,
        markerIndex + endMarker.length
    );
    }

    return answer
      .replace(/\s+/g, " ")
      .trim();
  }
}


  return "";
};


module.exports = {
  extractAnswer,
};