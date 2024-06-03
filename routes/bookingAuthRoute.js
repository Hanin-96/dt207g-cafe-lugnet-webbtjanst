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
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Connection to MongoDB failed")
});


//Menu routing

//Hämtar alla bokningar, ska hämtas i admin
router.get("/booking/list", authToken, async (req, res) => {
    try {
        let bookingResult = await booking.find({});

        return res.json(bookingResult);

    } catch (error) {
        return res.status(500).json(error);
    }
});

//Lägger till ny bokning
router.post("/booking", async (req, res) => {

    //Skapa ny bokning och lägga in i databasen
    try {
        //Ett objekt med input skickas in
        const { firstname, lastname, phonenumber, email, guests, date, time, bookingMessage } = req.body;

        //Validera input
        if (!firstname || !lastname || !phonenumber || !email || !guests || !date || !time) {
            return res.status(400).json({ error: "Fyll i alla fält!" });

        } else {
            if(!bookingMessage) {
                bookingMessage = "";
            }
            const newBooking = new booking({ firstname, lastname, phonenumber, email, guests, date, time, bookingMessage });

            await newBooking.save();
            res.status(201).json({ message: "Bokning har lagts till" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
});

//Uppdatera bokningar från Admin
router.put("/booking/:bookingId", authToken, async (req, res) => {
    try {
        let bookingId = req.params.bookingId;

        //Deklarerar nya variabler
        const bookingFirstname = req.body.firstname;
        const bookingLastname = req.body.lastname;
        const bookingPhonenumber = req.body.phonenumber;
        const bookingEmail = req.body.email;
        const bookingGuests = req.body.guests;
        const bookingDate = req.body.date
        const bookingTime = req.body.time
        let bookingNewMessage = req.body.bookingMessage;

        //Om alla input fält är uppdaterade
        if (bookingFirstname && bookingLastname && bookingPhonenumber && bookingEmail && bookingGuests && bookingDate && bookingTime) {

            console.log(bookingNewMessage);

            if(!bookingNewMessage) {
                console.log("meddelande finns ej")
                bookingNewMessage = "";
            }

            //Skickar in nytt objekt med nya värden som ersätter gamla
            const updateFields = {
                firstname : bookingFirstname,
                lastname: bookingLastname,
                phonenumber: bookingPhonenumber,
                email: bookingEmail,
                guests: bookingGuests,
                date: bookingDate,
                time: bookingTime,
                bookingMessage: bookingNewMessage
            };

            //Uppdaterar specifik maträtt utifrån id och lägger in det nya objekt
            let updatedBookingResult = await booking.updateOne({ _id: bookingId }, { $set: updateFields });

            return res.json(updatedBookingResult);

        } else {
            return res.status(404).json({ message: "Det gick inte att uppdatera bokningen i databasen" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
});


//Ta bort specifik bokning från databasen

router.delete("/booking/:bookingId", async (req, res) => {
    try {
        let bookingId = req.params.bookingId;

        const deletedBookingResult = await booking.deleteOne({ _id: bookingId });

        //Om databasen har tagits bort, returnera meddelande
        if (deletedBookingResult.deletedCount > 0) {
            return res.json({ message: "Bokningen är borttagen" });

        } else {
            return res.status(404).json({ message: "Bokningen finns inte i databasen" })
        }

    } catch (error) {
        return res.status(500).json({ error: "Något gick fel" + error });
    }
});
module.exports = router;
