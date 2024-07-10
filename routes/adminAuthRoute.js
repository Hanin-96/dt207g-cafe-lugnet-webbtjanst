//Routes for auth

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//Validering av epost
const validator = require("validator")

//Importerar user model
const admin = require("../models/admin");

const jwt = require("jsonwebtoken");


//Importerar authToken
const authToken = require("./authToken");

//Connect till MongoDb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Connection to MongoDB failed")
});


//Route för registrering av Admin med post
router.post("/register", async (req, res) => {

    try {
        //Skickar in följande objekt format
        const { username, firstname, lastname, email, password } = req.body;

        //Validering av input
        if (!username && !firstname && !lastname && !email && !password) {
            return res.status(400).json({ error: "Skicka användarnamn, förnamn, efternamn, epost & Lösenord" });
        }

        // Validera e-postadressens format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Ogiltig e-post, skicka giltlig e-postadress" });
        }

        // Validera antal tecken lösenord
        if (password.length <= 4) {
            return res.status(400).json({ error: "Lösenordet måste vara minst 5 tecken" });
        }

        else {
            //Korrekt input
            const adminUser = new admin({ username, firstname, lastname, email, password });
            await adminUser.save();
            res.status(201).json({ message: "Admin användare har skapats" });
        }

    } catch (error) {
        res.status(500).json({ error: "Det gick inte att registrera användare" })
    }
})

//Route för att logga in som Admin
router.post("/login", async (req, res) => {

    //console.log("login called...");

    try {
        const { username, password } = req.body;

        //Validering av inloggnings input
        if (!username || !password) {
            return res.status(400).json({ error: "Skicka användarnamn och lösenord" });

        }

        //Validera om användarnamn finns i databasen
        const adminUser = await admin.findOne({ username });
        if (!adminUser) {
            return res.status(400).json({ error: "Fel Användarnamn/Lösenord" })
        }
        //console.log("login called 2...");

        //Kontroll av lösenord
        const passwordMatch = await adminUser.comparePassword(password);
        //console.log("login called 3...");

        //Om lösenord ej stämmer
        if (!passwordMatch) {
            return res.status(400).json({ error: "Fel Användarnamn/Lösenord" });

        } else {
            //console.log("login called 4...");

            //Skapa token för inloggning ifall lösenord stämmer
            const payload = { username: username };

            //Token är aktiv i 1h
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            const response = {
                message: "Användare är inloggad",
                token: token
            }

            res.status(200).json(response);
            console.log("Du är inloggad");
        }
    }
    catch (error) {
        res.status(500).json({ error: "Server fel" + error});
    }

});

//Vid lyckad inloggning ska användare skickas till skyddad route
router.get("/admin", authToken, async (req, res) => {
    console.log("Admin: Du har tillgång till skyddad data");

    try {
        const adminUsers = await admin.find().select("-_id firstname lastname username");
        res.status(200).json({ adminUsers });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


//Exportera modulen
module.exports = router;
