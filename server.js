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


// Aktivera CORS middleware för rutter
//https://adorable-pony-2cfe6c.netlify.app
const corsRoute = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(cors(corsRoute));


//Express JSON middleware
app.use(express.json());

//Routes
app.use("", adminAuthRoute);
app.use("", menuAuthRoute);
app.use("", bookingAuthRoute);

//Starta igång server
app.listen(port, () => {
    console.log("servern är startad på port: " + port);
});
