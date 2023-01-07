const prepare = require("../prepareData");
const fs = require("fs");

function shapeAudio(text) {
  const data = prepare(text);
  const audioScript = data?.map((txt) => {
    return {
      text: txt.text.reduce((prev, current) => prev + " " + current),
      time: {
        from: 0,
        to: 0,
      },
      selected: false,
      trasnlation: "",
    };
  });

  return audioScript;
}
module.exports = shapeAudio;
