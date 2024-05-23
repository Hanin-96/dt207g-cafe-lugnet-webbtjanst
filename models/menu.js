//Registrera inloggning för admin

const mongoose = require("mongoose");

//Admin schema registrering som lagras i databasen
const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    description: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    allergy: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Skapar upp admin tabell i databasen
const menu = mongoose.model("menu", menuSchema);


module.exports = menu;
