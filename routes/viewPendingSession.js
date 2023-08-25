const express = require('express');
const router = express.Router();
const Session = require("../models/sessions.model");
const requireAuthDean = require('../middlewares/requireAuthDean');
const Dean = require("../models/dean.model");

// Dean view pending sessions
router.get('/sessions/pending/', requireAuthDean, async (req, res) => {
    const token = req.headers.authorization;
    const currentDate = new Date();

    try {
        const dean = await Dean.findOne({ token: token });
        const deanId = dean._id;
        const pendingSessions = await Session.find({ dean: deanId, booked: true, date: { $gt: currentDate } }, { __v: 0 });
        res.json(pendingSessions);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
