const prepare = require("../../prepareData/index");
const verbs = require("../../regularverbs");
const irregularVebs = require("../past/irregularVerbs");
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
function ThirdPerson(data) {
  let sentences = [];

  data.forEach((sentence, i) => {
    sentence?.text?.forEach((word, index) => {
      letters = word.split("");
      if (
        letters.length > 2 &&
        letters[letters.length - 1] == "s" &&
        letters[letters.length - 2] != "s"
      ) {
        let verbwithnoS = [...letters];
        verbwithnoS.pop();
        let verbwithnoSTogther = verbwithnoS.reduce((prev, cur) => prev + cur);
        sentences.push({
          base: letters.reduce((prev, cur) => prev + cur),
          word: verbwithnoSTogther,
          sentence: sentence.text.reduce((prev, cur) => `${prev} ${cur}`),
          index,
          sentenceIndex: i,
        });
        if (
          letters.length > 2 &&
          letters[letters.length - 1] == "s" &&
          letters[letters.length - 2] == "e"
        ) {
          let base = letters.reduce((prev, cur) => prev + cur);

          let sce = sentence.text.reduce((prev, cur) => `${prev} ${cur}`);
          let sentenceFIlter = sentences.filter((stnc) => {
            return stnc.sentence != sce && stnc.base != base;
          });

          sentences = sentenceFIlter;

          let verbwithnoES = [...letters];
          verbwithnoES.pop();
          verbwithnoES.pop();
          let verbwithnoESTogther = verbwithnoES.reduce(
            (prev, cur) => prev + cur
          );
          sentences.push({
            base,
            word: verbwithnoESTogther,
            sentence: sentence.text.reduce((prev, cur) => `${prev} ${cur}`),
            index,
            sentenceIndex: i,
          });
        }
      }

      if (
        letters.length > 3 &&
        letters[letters.length - 2] == "e" &&
        letters[letters.length - 3] == "i" &&
        letters[letters.length - 1] == "s"
      ) {
        let base = letters.reduce((prev, cur) => prev + cur);

        let sce = sentence.text.reduce((prev, cur) => `${prev} ${cur}`);
        let sentenceFIlter = sentences.filter((stnc) => {
          return stnc.sentence != sce && stnc.base != base;
        });

        sentences = sentenceFIlter;

        let verbwithnoIES = [...letters];
        verbwithnoIES.pop();
        verbwithnoIES.pop();
        verbwithnoIES.pop();
        verbwithnoIES.push("y");
        let verbwithnoIEStogether = verbwithnoIES.reduce(
          (cur, prev) => cur + prev
        );
        sentences.push({
          base: base,
          word: verbwithnoIEStogether,
          sentence: sce,
          index,
          sentenceIndex: i,
        });
      }
    });
  });

  const noReapeted = [];
  const res = [];

  sentences.forEach((sentence) => {
    if (!noReapeted.includes(sentence.base)) {
      noReapeted.push(sentence.base);
      let check = verbs.some((verb) => verb.present == sentence.word);
      if (check) {
        res.push(sentence);
      }
      const checkIrregulars = irregularVebs.some(
        (verb) => verb.Base == sentence.word
      );
      if (checkIrregulars) {
        res.push(sentence);
      }
      //res.push(sentence);
    }
  });

  return res;
}

function baseForm(data) {
  let res = [];

  data.forEach((sentence, i) => {
    sentence.text.forEach((word, index) => {
      const isThereVerb = verbs.some((verb) => {
        return verb.present == word;
      });
      if (isThereVerb) {
        res.push({
          sentence: sentence.text.reduce((prev, cur) => `${prev} ${cur}`),
          index: index,
          base: word,
          sentenceIndex: i,
        });
      }
      const isThereVerbIrregular = irregularVebs.some((verb) => {
        return verb.Base == word;
      });

      if (isThereVerbIrregular) {
        res.push({
          sentence: sentence.text.reduce((prev, cur) => `${prev} ${cur}`),
          index: index,
          base: word,
          sentenceIndex: i,
        });
      }
    });
  });

  return res;
}

function filterFuture(sentences) {
  if (!sentences.length) {
    return null;
  }
  const sentencesWithoutFuture = [];
  const sentencesWithFuture = [];

  sentences.forEach((element, index) => {
    const sentence = element?.sentence?.split(" ");
    sentence?.forEach((word) => {
      const checkFuture = wordtobeFiltered.some((stc) => stc == word);
      if (!checkFuture) {
        sentencesWithoutFuture.push(element);
        return;
      }
      sentencesWithFuture.push(element);
    });
  });
  return {
    sentencesWithFuture,
    sentencesWithoutFuture,
  };
}

function simplePresent(data) {
  if (!data) {
    return;
  }
  const script = prepare(data);

  // const sentencesThird = ThirdPerson(script);
  const base = baseForm(script);

  const filterDate = [];
  if (!base.length) {
    return ThirdPerson(script);
  }

  script.forEach((element, i) => {
    element.text;
    base?.forEach((x, index) => {
      let sentence = element.text;
      if (x.sentenceIndex == i) {
        sentence.splice([x.index], 1);
        filterDate.push({
          text: sentence,
        });
      } else {
        filterDate.push({
          text: sentence,
        });
      }
    });
  });

  const sentencesThird = ThirdPerson(filterDate);
  return [...base, ...sentencesThird];
}
module.exports = simplePresent;

/*

    base.forEach((x, index) => {
      if (x.sentenceIndex == i) {
        let sentence = element.text;
        sentence.splice([x.index], 1);
        filterDate.push(sentence);
        console.log(sentence);
      } else {
        filterDate.push(element.text);
      }
    });

*/
