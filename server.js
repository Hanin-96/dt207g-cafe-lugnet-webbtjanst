const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const adminAuthRoute = require("./routes/adminAuthRoute");

//Token
const jwt = require("jsonwebtoken");


// Aktivera CORS middleware för alla rutter
app.use(cors());
app.use(express.json());


//Starta igång server
app.listen(port, () => {
    console.log("servern är startad på port: " + port);
});

//Routes
app.use("", adminAuthRoute);
