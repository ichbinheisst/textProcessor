const prepare = require("../prepareData");

function filterbyParams(data, params) {
  if (!data || !params) {
    throw new Error("filterbyParams: missing arguments");
  }
  const dataFilter = prepare(data);

  let value = 0;
  let targetWords = [];
  let sentences = [];

  const filtered = dataFilter.map((sentence) => {
    let key = [];
    let targetWords = [];
    let words = sentence.text.map((word, index) => {
      const checkParams = params.some((w) => w == word);
      if (checkParams) {
        key.push(index);
        targetWords.push(word);
      }
      return word;
    });
    return {
      text: sentence.text,
      key,
      targetWords,
    };
  });

  filtered.forEach((element) => {
    if (element.key.length) {
      sentences.push(
        element.text.reduce((prev, current) => prev + " " + current)
      );
      value += element.key.length;
      element.key.forEach((index) => {
        targetWords.push(element.text[index]);
      });
    }
  });

  return {
    numberOfTargetWords: value,
    targetWords,
    sentences,
  };
}

module.exports = filterbyParams;
