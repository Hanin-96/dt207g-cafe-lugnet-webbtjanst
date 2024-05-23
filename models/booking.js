//Skapa tabell för bordsbokning i databasen

const mongoose = require("mongoose");

//Admin schema registrering som lagras i databasen
const bookingSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    guests: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        unique: false,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Skapar upp booking tabell i databasen
const booking = mongoose.model("booking", bookingSchema);


module.exports = booking;
