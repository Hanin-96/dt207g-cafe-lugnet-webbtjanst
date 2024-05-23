//Routes for auth

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();


//Importerar menu model
const menu = require("../models/menu");

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

//Hämta alla maträtter från menyn
router.get("/menu", async (req, res) => {
    try {
        let result = await menu.find({});

        return res.json(result);

    } catch (error) {
        return res.status(500).json(error);
    }
});

/*
//Hämta specifik maträtt från menyn
router.get("/menu/:dishId", authToken, async (req, res) => {

    let dishId = req.params.dishId;

    try {
        let result = await menu.findOne({ _id: dishId });

        if (result) {
            return res.json(result);
        } else {
            return res.status(404).json({ message: "Maträtten finns inte i databasen" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
});
*/

//Lägger till ny maträtt menyn
router.post("/menu/dish", authToken, async (req, res) => {

    //Skapa ny maträtt och lägga in i databasen
    try {
        //Ett objekt med input skickas in
        const { title, category, description, allergy, price } = req.body;

        //Validera input
        if (!title || !category || !description || !allergy || !price) {
            return res.status(400).json({ error: "Fyll i alla fält!" });

        } else {
            const newDish = new menu({ title, category, description, allergy, price });

            await newDish.save();
            res.status(201).json({ message: "Ny maträtt har lagts till i menyn" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
});


//Uppdatera specifik maträtt från menyn
router.put("/menu/:dishId", authToken, async (req, res) => {
    try {

        let dishId = req.params.dishId;

        //Deklarerar nya variabler
        const dishTitle = req.body.title;
        const dishCategory = req.body.category;
        const dishDescription = req.body.description;
        const dishAllergy = req.body.allergy;
        const dishPrice = req.body.price;

        //Om alla input fält är uppdaterade
        if (dishTitle && dishCategory && dishDescription && dishAllergy && dishPrice) {

            //Skickar in nytt objekt med nya värden som ersätter gamla
            const updateFields = {
                title: dishTitle,
                category: dishCategory,
                description: dishDescription,
                allergy: dishAllergy,
                price: dishPrice
            };

            //Uppdaterar specifik maträtt utifrån id och lägger in det nya objekt
            let updatedDishResult = await menu.updateOne({ _id: dishId }, { $set: updateFields });

            console.log(updatedDishResult, updateFields);
            return res.json(updatedDishResult);

        } else {
            return res.status(404).json({ message: "Maträtten kan ej uppdateras i databasen" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
});

//Ta bort specifik maträtt från databasen

router.delete("/menu/:dishId", authToken, async (req, res) => {
    try {
        let dishId = req.params.dishId;

        const deletedDishResult = await menu.deleteOne({ _id: dishId });

        //Om maträtten har tagits bort, returnera meddelande
        if (deletedDishResult.deletedCount > 0) {
            return res.json({ message: "Maträtten är borttagen" });

        } else {
            return res.status(404).json({ message: "Maträtten finns inte i databasen" })
        }

    } catch (error) {
        return res.status(500).json({ error: "Något gick fel" + error });
    }
});


//Exportera modulen
module.exports = router;
