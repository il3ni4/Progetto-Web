const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors({
    origin: 'https://recipapp-frontend.onrender.com',
    credentials: true
  }));

app.use("/auth", userRoutes)
app.use("/home", recipeRoutes)

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.once("open", () => {console.log("Database connesso con successo")});


app.listen(process.env.PORT, () => {console.log("Server avviato su porta " + process.env.PORT);});

