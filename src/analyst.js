const params = require("./params/possessivePronoun");
const iregularVerbs = require("./tense/past/irregularVerbs");

const data = require("./data/lyric");
const easy = require("./data/adele/easyonme");
const cold = require("./data/neffex/cold");
const destiny = require("./data/neffex/destiny");
const careless = require("./data/neffex/careless");
const hello = require("./data/adele/hello");

function treatData(data) {
  const ArrayOfData = data
    ?.split("")
    .map((letters) => {
      if (letters == "\n") {
        return ".";
      }
      return letters;
    })
    .reduce((prev, current) => {
      return prev + current;
    });
  return ArrayOfData;
}

function formatedData(data) {
  const arrayofscript = data
    .split(".")
    .map((txt) => {
      if (txt && txt != " ") {
        return {
          text: txt.split(" "),
        };
      }
    })
    .filter((script) => {
      return script != undefined && script != " ";
    });

  return arrayofscript;
}

function separateSelectedWords(data, params) {
  const shaped = data.map((sentence) => {
    let key = [];
    let targetWords = [];
    let words = sentence.text.map((word, index) => {
      const checkParams = params.some((w) => w == word);
      let x = [];
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
  return shaped;
}

function scoreData(data, params) {
  if (!data || !params || !params.length || !data.length) {
    return [];
  }
  let value = 0;
  let targetWords = [];
  let sentences = [];

  let filteredData = treatData(data);
  if (!filteredData || !filteredData.length) {
    return [];
  }
  let dataFormated = formatedData(filteredData);
  if (!dataFormated.length) {
    return [];
  }
  let x = separateSelectedWords(dataFormated, params);
  x.forEach((element) => {
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

function simplePastRegularVerbs(data) {
  let filteredData = treatData(data);
  let format = formatedData(filteredData);

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

function simplePastIregular(iregularVerbsList, data) {
  const verbs = iregularVerbsList.map((verb) => {
    return verb["Past-simple"];
  });
  const res = scoreData(data, verbs);
  return res;
}

function simplePast(data, iregularVerbs) {
  const irregulars = simplePastIregular(iregularVerbs, data);
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

function presentPrefect(data) {
  let filteredData = treatData(data);
  let format = formatedData(filteredData).map((sentence) => {
    const clear = sentence.text.filter((word) => {
      return word !== "";
    });
    return clear;
  });

  if (!format || !format.length) {
    return [];
  }

  const targetsentence = [];
  const sentencesWithHave = [];
  const regularverb = [];
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
    sentence.forEach((word, index) => {
      const checkWords = wordtobeFiltered.some((w) => {
        return w == word;
      });
      if (checkWords) {
        sentencesWithHave.push({ sentence, index });

        if (sentence.length > index) {
          sentence.forEach((word) => {
            const letters = word.split("");
            if (
              letters[letters.length - 1] == "d" &&
              letters[letters.length - 2] == "e"
            ) {
              console.log(sentence);
            }
          });

          const checkParticiple = iregularVerbs.some((verb) => {
            return verb["Past-Participle"] == sentence[index + 1];
          });

          if (checkParticiple) {
           // console.log(sentence);
          }
        }
      }
    });
  });

  //console.log(sentencesWithHave);
}

presentPrefect(easy.script);
//console.log(simplePast(cold.script, iregularVerbs));

module.exports = scoreData;
