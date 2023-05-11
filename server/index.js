// Import dependencies
const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// Initialize Express
const app = express();

// Middleware
// app.use(cors()); // Use Cors
app.use(express.json()); // To JSON

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.static(`client`));

// Controller
const {
  getCompliment,
  getFortune,
  addFortune,
  displayFortuneTable,
  deleteFortune,
  editFortune,
} = require("./controller/fortuneController");

// Endpoints
// app.get("/api/compliment", getCompliment);
app.get("/api/display", displayFortuneTable);
app.get("/api/fortune", getFortune);
app.post("/api/fortune", addFortune);
app.delete("/api/fortune/:fortune_id", deleteFortune);
app.put("/api/fortune/:fortune_id", editFortune);

app.listen(4000, () => console.log("Server running on 4000"));
