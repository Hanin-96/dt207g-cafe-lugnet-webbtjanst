const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Importerar från routes
const adminAuthRoute = require("./routes/adminAuthRoute");
const menuAuthRoute = require("./routes/menuAuthRoute");
const bookingAuthRoute = require("./routes/bookingAuthRoute");


// Aktivera CORS middleware för alla rutter
app.use(cors());
app.use(express.json());


//Starta igång server
app.listen(port, () => {
    console.log("servern är startad på port: " + port);
});

//Routes
app.use("", adminAuthRoute);
app.use("", menuAuthRoute);
app.use("", bookingAuthRoute);
