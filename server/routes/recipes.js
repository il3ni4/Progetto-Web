const express = require("express");
const router = express.Router();
const {getUserRecipes, getAllRecipes, getRecipe, createRecipe, deleteRecipe, searchRecipe, getTypeRecipes, getCategoryRecipes } =
require("../controllers/recipeController"); 
const { verifyAuth, getSavedRecipes } = require("../controllers/userController");


router.get("/explore", verifyAuth, getAllRecipes);

router.get("/saved", verifyAuth, getSavedRecipes); 

router.get("/search?:query", verifyAuth, searchRecipe);

router.get("/myRecipes", verifyAuth, getUserRecipes); 

router.get("/recipe/:_id", verifyAuth, getRecipe); //da implementare nel frontend

router.post("/add", verifyAuth, createRecipe);

router.delete("/recipe/:_id", verifyAuth, deleteRecipe);

router.get("/type/:type", verifyAuth, getTypeRecipes);

router.get("/category/:category", verifyAuth, getCategoryRecipes); 

module.exports = router; 