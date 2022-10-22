

const prepare = require("../../prepareData");
const irregularVebs = require("./irregularVerbs");
function findAux(data) {
  const format = prepare(data);

  if (!format || !format.length) {
    return [];
  }

  const sentencesWithHave = [];
  const wordtobeFiltered = [
    "have",
    "has",
    "I've",
    "you've",
    "she's",
    "he's",
    "it's",
    "they've",
  ];

  format.forEach((sentence) => {
    sentence.text.forEach((word, index) => {
      const checkWords = wordtobeFiltered.some((w) => {
        return w == word;
      });
      if (checkWords) {
        sentencesWithHave.push({ sentence, index });
      }
    });
  });

  return sentencesWithHave;
}

function findRegular(sentences) {
  const res = [];
  sentences.forEach((stc) => {
    const { sentence, index } = stc;
    const text = sentence?.text;
    text?.forEach((word) => {
      const letters = word.split("");
      if (
        letters[letters.length - 1] == "d" &&
        letters[letters.length - 2] == "e"
      ) {
        res.push({
          sentence: text,
          index,
          word,
        });
      }
    });
  });
  return res;
}

function findIrregularverbs(sentences) {
  const res = [];
  sentences.forEach((stc) => {
    const { sentence, index } = stc;
    const text = sentence?.text;
    text?.forEach((word) => {
      const check = irregularVebs.some((verb) => {
        return verb["Past-simple"] == word;
      });
      if (check) {
        res.push({
          sentence: text,
          index,
          word,
        });
      }
    });
  });
  return res;
}

function presentPrefect(data) {
  const sentences = findAux(data);
  const irregulars = findIrregularverbs(sentences);
  const regulars = findRegular(sentences);

  function findBykey(data, key) {
    const res = data.map((element) => {
      if (key == "sentence") {
        return element[key].reduce((prev, current) => `${prev}  ${current}`);
      }
      return element[key];
    });

    return res;
  }
  let regularVerbs = findBykey(regulars, "word");
  let irregularVebs = findBykey(irregulars, "word");
  return {
    regularVerbs: regularVerbs,
    regularVerbsSentences: findBykey(regulars, "sentence"),
    totalregular: regularVerbs?.length,
    irregularVebs: irregularVebs,
    irregularVerbsSentence: findBykey(irregulars, "sentence"),
    totalIregular: irregularVebs?.length,
    fulllist: [...regularVerbs, ...irregularVebs],
    total: regularVerbs?.length + irregularVebs?.length,
  };
}

module.exports = presentPrefect;
