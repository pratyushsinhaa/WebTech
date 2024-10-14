const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Hey, this application works and is running on port ${port}`);
});
