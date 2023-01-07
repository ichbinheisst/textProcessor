const prepare = require("./src/prepareData");
const simplePast = require("./src/tense/past");
const data = require("./src/data/adele/easyonme");
const text = require("./src/audios/a1-british/bandaudition");
const presentPerfect = require("./src/tense/presentPerfect");
const future = require("./src/tense/future");
const present = require("./src/tense/present");
const pronoun = require("./src/params/possessive");
const teste = ["banana", "apple", "orange", "grape"];
const shaper = require("./src/dataProcessed/script");
const path = "./src/data/tracks/";
const createFile = require("./src/createFile");
const simplePresent = require("./src/tense/present");






 const txt  =  `Russia launched a wave of missile strikes across Ukraine on Tuesday, leaving many cities without power, as G20 leaders met in Bali.Ukrainian authorities said it was another planned attack aimed at the country’s energy infrastructure facilities. The deputy head of presidential administration, Kyrylo Tymoshenko, wrote on Telegram that the energy situation across Ukraine was “critical” as a result.Ukraine’s public broadcaster reported that the strikes targeted Kyiv, Kyiv region, Kharkiv city as well as Poltava, Mykolaiv, Dnipro, Zhytomyr, Khmelnytskiy, Lviv, Volyn, Rivne, Cherkassy, Odesa, Kirovohrad, and Chernihiv regions.Ukraine’s state energy company, Ukrenergo, said the extent of the damage was still to be determined but that emergency shutdowns “for all categories of consumers have been introduced” in the northern and central regions which have been most affected.“There is ‘incoming’ to our infrastructure in all regions of the country,” Ukrenergo wrote on Telegram.The head of Ukraine’s presidential administration, Andriy Yermak, said the attack was a response to President Volodymyr Zelenskiy’s address to the G20 on Tuesday. The strikes were reportedly launched in waves. Yuriy Ignat, a spokesperson for Ukraine’s air defence forces, said at 5.20pm Kyiv time that more than 80 rockets had been launched and 20 were still in transit. He said the number exceeded attacks on 10 October which had been the biggest so far heard.`


//console.log(pronoun(text))

//createFile("bandAudio", "a1", text, path);

 console.log(presentPerfect(txt))