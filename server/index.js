const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.once("open", () => {console.log("Database connesso con successo")});

app.get('/', (req, res) => {
    res.send('questo è il backend');
});

app.listen(process.env.PORT, () => {console.log("Server avviato su porta " + process.env.PORT);});

