//Registrera inloggning för admin

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Admin schema registrering som lagras i databasen
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
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
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Hasha lösenord innan den registreras och sparas
adminSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            //bcrypt används för hashning
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch (error) {
        next(error);
    }
});

//Compare hashed password
adminSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

//Inloggning Admin
//Endast username och password skickas in
adminSchema.statics.login = async function (username, password) {
    try {
        const admin = await this.findOne({ username });
        if (!admin) {
            throw new Error("Fel Användarnamn/Lösenord")
        }

        const passwordMatch = await admin.comparePassword(password);

        if (!passwordMatch) {
            throw new Error("Fel Användarnamn/Lösenord");
        } else {
            return admin;
        }
    } catch (error) {
        throw error;
    }
};

//Skapar upp admin tabell i databasen
const admin = mongoose.model("admin", adminSchema);

module.exports = admin;





