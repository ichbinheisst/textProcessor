const irregularVerbs = require("./irregularVerbs");
const filterbyParams = require("../../filterbyparams");
const prepare = require("../../prepareData");

function simplePastRegularVerbs(data) {
  let format = prepare(data);

  if (!format || !format.length) {
    return [];
  }
  let listofRegularVerbs = [];
  let sentences = [];

  format.forEach((sentence) => {
    sentence.text.forEach((word) => {
      const letters = word.split("");
      if (
        letters[letters.length - 1] == "d" &&
        letters[letters.length - 2] == "e"
      ) {
        sentences.push(sentence.text.reduce((prev, curr) => prev + " " + curr));
        listofRegularVerbs.push(letters.reduce((prev, curr) => prev + curr));
      }
    });
  });

  let listofRegularVerbsFiltered = listofRegularVerbs.filter((element) => {
    return element != "need";
  });

  return {
    targetWords: listofRegularVerbsFiltered,
    numberOfTargetWords: listofRegularVerbs.length,
    sentences,
  };
}

function simplePastIregular(data) {
  const verbs = irregularVerbs.map((verb) => {
    return verb["Past-simple"];
  });
  const res = filterbyParams(data, verbs);
  return res;
}

function simplePast(data) {
  const irregulars = simplePastIregular(data);
  const regulars = simplePastRegularVerbs(data);

  return {
    regularVerbs: regulars.targetWords,
    totalregular: regulars.numberOfTargetWords,
    regularVerbsSentences: regulars.sentences,
    irregularVebs: irregulars.targetWords,
    totalIregular: irregulars.numberOfTargetWords,
    irregularVerbsSentences: irregulars.sentences,
    fulllist: [...regulars.targetWords, ...irregulars.targetWords],
    total: regulars.numberOfTargetWords + irregulars.numberOfTargetWords,
    sentences: [...regulars.sentences, irregulars.sentences],
  };
}
module.exports = simplePast;
