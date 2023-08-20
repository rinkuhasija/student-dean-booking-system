const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config(); //  .env file
const Student = require("../models/student.model");
const uuid = require('uuid');

// Student Register
router.post('/register/student', async (req, res) => {
    const { name, universityId, password } = req.body;
    if (!name || !universityId || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingStudent = await Student.findOne({ universityId });
    if (existingStudent) {
        return res.status(400).json({ error: 'Student already exists' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await Student.create({
            name,
            password: hashedPassword,
            universityId
        });
        await user.save();
        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Student Login
router.post('/login/student', async (req, res) => {

    try {

        const { universityId, password } = req.body;
        if (!universityId || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await Student.findOne({ universityId });
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

        res.status(200).json({ message: "Student logged in successfully", token: token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

module.exports = router;