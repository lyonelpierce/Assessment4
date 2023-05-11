require("dotenv").config();

const { ROLLBAR_ACCESS_TOKEN } = process.env;
// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: `${ROLLBAR_ACCESS_TOKEN}`,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const fs = require("fs");
const fortune = require("../fortune.json");

let length = fortune.length;

module.exports = {
  // getCompliment: (req, res) => {
  //   const compliments = [
  //     "Gee, you're a smart cookie!",
  //     "Cool shirt!",
  //     "Your Javascript skills are stellar.",
  //   ];

  //   // choose random compliment
  //   let randomIndex = Math.floor(Math.random() * compliments.length);
  //   let randomCompliment = compliments[randomIndex];

  //   res.status(200).send(randomCompliment);
  // },

  // Display the Fortune Array
  displayFortuneTable: (req, res) => {
    res.status(200).send(fortune);
  },

  // Get Random Fortune
  getFortune: (req, res) => {
    let randomIndex = Math.floor(Math.random() * fortune.length);
    let randomFortune = fortune[randomIndex].text;

    rollbar.log("Someone accessed the page");
    res.status(200).send(randomFortune);
  },

  // Add Fortune to JSON file
  addFortune: (req, res) => {
    let newFortune = { text: req.body.fortune };
    fortune.push(newFortune);
    fs.writeFile("./server/fortune.json", JSON.stringify(fortune), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      // console.log("New fortune added");
      rollbar.log("Someone added a fortune");
      return res.status(200).send({ message: "Fortune updated successfully" });
    });
  },

  // Remove Fortune from JSON file
  deleteFortune: (req, res) => {
    let { fortune_id } = req.params;
    for (let i = 0; i < fortune.length; i++) {
      if (+fortune_id === i) {
        fortune.splice(i, 1);
        fs.writeFile(
          "./server/fortune.json",
          JSON.stringify(fortune),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
            // console.log("Fortune Deleted");
            rollbar.critical("Someone deleted a fortune");
            return res
              .status(200)
              .send({ message: "Fortune removed successfully" });
          }
        );
      }
    }
  },

  // Edit Fortune from JSON file
  editFortune: (req, res) => {
    // console.log(req.body, req.params);

    let { fortune_id } = req.params;
    let { fortune_text } = req.body;
    // console.log(fortune_id, fortune_text);
    for (let i = 0; i < fortune.length; i++) {
      if (+fortune_id === i) {
        fortune[i].text = fortune_text;
        fs.writeFile(
          "./server/fortune.json",
          JSON.stringify(fortune),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
            // console.log("File saved successfully");
            rollbar.warning("Someone updated a fortune");
            return res
              .status(200)
              .send({ message: "Fortune updated successfully" });
          }
        );
      }
    }
  },
};
