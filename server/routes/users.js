const express = require("express");
const router = express.Router();
const {saveRecipe, signUp, login, removeSavedRecipe} = require("../controllers/userController");
const { verifyAuth } = require("../controllers/userController")

//salvare una ricetta 
router.post("/saveRecipe", verifyAuth, saveRecipe);
//rimuovere ricetta salvata
router.delete('/delete/:recipeId', verifyAuth, removeSavedRecipe)
// /login
router.post("/login", login);
// /signUp
router.post("/signUp", signUp);

module.exports = router; 