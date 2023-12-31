const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config(); //  .env file
const Dean = require("../models/dean.model");
const uuid = require('uuid');

// Dean Register
router.post('/register/dean', async (req, res) => {
    const { name, universityId, password } = req.body;
    if (!name || !universityId || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingDean = await Dean.findOne({ universityId });
    if (existingDean) {
        return res.status(400).json({ error: 'Dean already exists' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await Dean.create({
            name,
            password: hashedPassword,
            universityId
        });
        await user.save();
        res.status(201).json({ message: "Dean registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Dean Login
router.post('/login/dean', async (req, res) => {

    try {

        const { universityId, password } = req.body;
        if (!universityId || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await Dean.findOne({ universityId });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Id or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Id or password' });
        }

        //generate uuid token
        const token = uuid.v4();
        user.token = token;
        await user.save();

        res.status(200).json({ message: "Dean logged in successfully", token: token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;