function treatData(text) {
  const Text = text
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
  return Text;
}
function formatData(data) {
  const arrayofText = data
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

  const ready = arrayofText.map((sentence) => {
    const clear = sentence.text.filter((word) => {
      return word !== "";
    });
    return {
      text: clear,
    };
  });

  return ready;
}

function Prepare(text) {
  const type = typeof text;

  if (type != "string") {
    throw new Error(
      "prepare:param expected to be string but has receive an " +
        type +
        " instead!"
    );
  }

  const cleanedData = treatData(text);
  const splited = formatData(cleanedData);
  return splited;
}

module.exports = Prepare;
