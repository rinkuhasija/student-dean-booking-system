const Student = require("../models/student.model");


const requireAuthStudent = async (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let dbToken = await Student.findOne({ token: token });
        if (!dbToken) {
            // console.log("not student");
            return res.status(401).json({ error: 'Unauthorized - token error' });
        }

        if (token !== dbToken.token) {
            return res.status(401).json({ error: 'Unauthorized or Not a Student' });
        }

        req.token = token;
        req.user = dbToken;
        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({ error: 'some error occurred . Try Again' });
    }
}

module.exports = requireAuthStudent;