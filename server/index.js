const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('questo è il backend');
});

app.listen(PORT, () => {
    console.log("server avviato su porta ${PORT}");
});

