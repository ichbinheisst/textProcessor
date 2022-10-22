const possessive = ["my", "your", "his", "her", "their", "its", "our"];
function separateSelectedWords(data, params) {
  let key = [];
  let targetWords = [];
  let targetSentence = [];

  data.forEach((sentence) => {
    sentence.text.forEach((word, index) => {
      const checkParams = params.some((w) => w == word);
      if (checkParams) {
        key.push(index);
        targetWords.push(word);
        targetSentence.push(
          sentence.text?.reduce((prev, current) => `${prev} ${current}`)
        );
      }
    });
  });
  return {
    sentences: targetSentence,
    index: key,
    list: targetWords,
  };
}
const prepare = require("../../prepareData");
function findByParams(data) {
  if (!data) {
    throw new Error("findByParams:missing params");
  }
  const filtered = prepare(data);
  return separateSelectedWords(filtered, possessive);
}
module.exports = findByParams;
