//Routes for auth

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();


//Importerar booking model
const booking = require("../models/booking");

//Importerar authToken
const authToken = require("./authToken");

//Connect till MongoDb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.Database).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Connection to MongoDB failed")
});


//Menu routing

//Hämtar alla bokningar, ska hämtas i admin
router.get("/bokning/list", authToken, async (req, res) => {
    try {
        let bookingResult = await booking.find({});

        return res.json(bookingResult);

    } catch (error) {
        return res.status(500).json(error);
    }
});

//Lägger till ny bookning
router.post("/bokning", async (req, res) => {

    //Skapa ny maträtt och lägga in i databasen
    try {
        //Ett objekt med input skickas in
        const { firstname, lastname, phonenumber, email, guests, date } = req.body;

        //Validera input
        if (!firstname || !lastname || !phonenumber || !email || !guests || !date) {
            return res.status(400).json({ error: "Fyll i alla fält!" });

        } else {
            const newBooking = new booking({ firstname, lastname, phonenumber, email, guests, date });

            await newBooking.save();
            res.status(201).json({ message: "Bokning har lagts till" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
});


module.exports = router;
