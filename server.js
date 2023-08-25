const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/db")

//import routes
const studentAuth = require("./routes/studentAuth");
const deanAuth = require("./routes/deanAuth");
const sessions = require("./routes/availableSessions");
const bookSession = require("./routes/bookSession");
const viewPendingSession = require("./routes/viewPendingSession");

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - Enable CORS
app.use(cors());

// Middleware - Parse JSON request body
app.use(bodyParser.json());

// Middleware - Parse URL-encoded request body
app.use(bodyParser.urlencoded({ extended: true }));


// student routes
app.use('/api/v1/auth', studentAuth);

//dean routes
app.use('/api/v1/auth', deanAuth);

//available sessions
app.use('/api/v1/sessions', sessions);

//book session
app.use('/api/v1', bookSession);

//view pending session
app.use('/api/v1', viewPendingSession);

app.get("/", async (req, res) => {
    // const token = uuid.v4();
    res.status(200).json(`Server is up and running on port ${PORT}`);
})



// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

