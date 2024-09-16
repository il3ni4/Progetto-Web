const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const cookieParser = require('cookie-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use("/auth", userRoutes)
app.use("/home", recipeRoutes)

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.once("open", () => {console.log("Database connesso con successo")});


app.listen(process.env.PORT, () => {console.log("Server avviato su porta " + process.env.PORT);});

