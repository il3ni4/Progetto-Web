const Recipe = require("../models/Recipe")

//getUserRecipe -->  sulla home page 
const getUserRecipes = async (req, res) => {
    const userId = req.user._id.toHexString();
    try {
        const userRecipe = await Recipe.find({ user: userId });
        res.status(200).json({msg: "ok", recipes: userRecipe})
    } catch (err) {
        res.status(500).json({msg: "errore nel caricamento delle ricette dell'utente", errore: err.msg})
        console.log(err)
    }
}

//getAllRecipes --> tramite tasto esplora
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({}).sort({createdAt: -1});
        res.status(200).json({msg: "ok", recipes: recipes})
    } catch (err) {
        res.status(500).json({msg: "errore nel caricamento di tutte le ricette", errore: err.msg})
    }
}

//getRecipe --> visualizzare singola ricetta 
const getRecipe = async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipe = await Recipe.findById({ _id: recipeId });
        res.status(200).json({msg: "ok", recipe: recipe})
    } catch (err) {
        res.status(500).json({msg: "errore nel caricamento della ricetta", errore: err.msg})
    }
}

//createRecipe 
const createRecipe = async (req, res) => {
    const userId = req.user._id;
    try{
        const recipe = await Recipe.create({...req.body, user:userId});
        res.status(200).json({msg: "ok", recipe: recipe})
    }
    catch (err) {
        res.status(500).json({msg: err.msg, errore: err.msg})
    }

        /*try {
            // Crea un oggetto ricetta dai campi del form
            const recipeData = {
                title: req.body.title,
                ingredients: JSON.parse(req.body.ingredients), // Se li invii come JSON
                people: req.body.people,
                steps: JSON.parse(req.body.steps),
                category: req.body.category,
                type: req.body.type,
                cookingtime: req.body.cookingtime,
                difficulty: req.body.difficulty,
                user: req.user._id,
            };
    
            // Verifica se un file immagine è stato caricato
            if (req.files && req.files.image) {
                const image = req.files.image;
                recipeData.image = image.data;  // `image.data` è il buffer contenente l'immagine
            }
    
            // Crea la ricetta nel database
            const recipe = await Recipe.create(recipeData);
    
            // Rispondi con successo
            res.status(200).json({ msg: "Ricetta creata con successo", recipe: recipe });
        } catch (err) {
            // Gestione errore
            res.status(500).json({ msg: err.message, errore: err.message });
        }*/
}

//deleteRecipe?
const deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipe = await Recipe.findByIdAndDelete({ _id: recipeId });
        res.status(200).json({msg: "ok", recipe: recipe})
    } catch (err) {
        res.status(500).json({msg: "errore nell'eliminazione della ricetta", errore: err.msg})
    }
}

//searchRecipe
const searchRecipe = async (req, res) => {
    const query = req.query.title;
    try{    
        const recipes = await Recipe.find({title: {$regex: query, $options: 'i'}});
        res.status(200).json({msg: "ok", recipes: recipes})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({msg: "errore nel caricamento delle ricette cercate", errore: err.msg})
    }
}

//visualizzare ricetta secondo il tipo di portata
const getTypeRecipes = async (req, res) => {
    const recipeType = req.params.type;
    console.log("tipo: ", recipeType);
    try {
        const recipes = await Recipe.find({ type: recipeType });
        console.log("ricette del tipo: ", recipes);  // Mostra i risultati nella console per verificare il funzionamento. Puoi commentare questa riga se non vuoi visual
        res.status(200).json({msg: "ok", recipes: recipes})
    } catch (err) {
        res.status(500).json({msg: "errore nel caricamento delle ricette di questo tipo", errore: err.msg})
    }
}

//visualizzare ricette secondo categoria 
const getCategoryRecipes = async (req, res) => {
    const recipeCategory = req.params.category;
    console.log(recipeCategory);  // Mostra il risultato nella console per verificare il funzionamento. Puoi commentare questa riga se non vuoi visualizzare i risultati.  // Visualizza la categoria nella console per verificare il funzionamento. Puoi commentare questa riga se non vuoi visualizzare i risultati.  // Visualizza la categoria nella console per verific
    try {
        const recipes = await Recipe.find({ category: recipeCategory });
        res.status(200).json({msg: "ok", recipes: recipes})
    } catch (err) {
        res.status(500).json({msg: "errore nel caricamento delle ricette di questa categoria", errore: err.msg})
    }
}

module.exports = {
    getUserRecipes,
    getAllRecipes,
    getRecipe,
    createRecipe,
    deleteRecipe,
    searchRecipe,
    getTypeRecipes,
    getCategoryRecipes
}