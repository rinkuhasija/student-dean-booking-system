const uuid = require('uuid');
const bcrypt = require('bcrypt');
const Student = require("../models/student.model");

const requireAuth = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const dbToken = await Student.find({ token: token });
        if (!dbToken) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if(token !== dbToken.token){
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // req.token = token;
        // req.user = dbToken;
        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = requireAuth;