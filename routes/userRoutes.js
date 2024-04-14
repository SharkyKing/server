const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get("/",async (req, res) => {
    try{
        const users = await User.findAll();
        res.send(users);
    } catch(error) {
        res.send({data:"Users"});
    }
});

router.get("/:id",async (req, res) => {
    res.send({data:"User"});
});

router.post("/", async(req, res) => {
    const { email, firstname, lastname, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ error: "Email already exists" });
        }
        const newUser = await User.create({ Email:email, FirstName:firstname, LastName:lastname, Password:password });

        res.status(200).send({ data: "User created", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.put("/:id",async (req, res) => {
    res.send({data:"User updated"});
});

router.delete("/:id",async (req, res) => {
    res.send({data:"User deleted"});
});

module.exports = router;