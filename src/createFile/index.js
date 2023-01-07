const fs = require("fs");
const shaper = require("../dataProcessed/script");
const path = "../data/tracks"
function createFile(fileName, dir, text, path) {
  fs.writeFile(
    `${path}/${dir}/${fileName}.js`,
    JSON.stringify(shaper(text)),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
}

module.exports = createFile;
