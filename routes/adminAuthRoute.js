//Routes for auth

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
//Token
const jwt = require("jsonwebtoken");

//Importerar user model
const admin = require("../models/admin");

//Connect till MongoDb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.Database).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Connection to MongoDB failed")
});


//Route för registrering av Admin med post
router.post("/registrera", async (req, res) => {

    try {
        //Skickar in följande objekt format
        const { username, firstname, lastname, email, password } = req.body;

        //Validering av input
        if (!username && firstname && lastname && email && password) {
            return res.status(400).json({ error: "Skicka användarnamn, förnamn, efternamn, epost" });

        } else {
            //Korrekt input
            const adminUser = new admin({ username, firstname, lastname, email, password });
            await adminUser.save();
            res.status(201).json({ message: "Admin användare har skapats" });
        }

    } catch (error) {
        res.status(500).json({ error: "Det gick inte att registrera användare"})
    }
})



//Exportera modulen
module.exports = router;