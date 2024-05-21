const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());


// Aktivera CORS middleware för alla rutter
app.use(cors());
app.use(express.json());


//Starta igång server
app.listen(port, () => {
    console.log("servern är startad på port: " + port);
});