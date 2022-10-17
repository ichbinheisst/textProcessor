const prepare = require("../../prepareData");
const wordtobeFiltered = [
  "will",
  "won't",
  "it'll",
  "she'll",
  "he'll",
  "'ll",
  "I'll",
  "we'll",
  "they'll",
];

function findByParams(data, params) {
  const format = prepare(data);
  if (!format || !format.length) {
    return [];
  }
  const sentencesWithParams = [];
  format.forEach((sentence) => {
    sentence.text.forEach((word, index) => {
      const checkWords = params.some((w) => {
        return w == word;
      });
      if (checkWords) {
        sentencesWithParams.push({ sentence: sentence.text?.reduce((prev, current)=>`${prev} ${current}`)
            , index, word });
      }
    });
  });

  return sentencesWithParams;
}

function futureSimple(data) {
return findByParams(data, wordtobeFiltered);
}

module.exports = futureSimple;
