const User = require("../models/User")
const Recipe = require("../models/Recipe")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET_KEY = process.env.JWT_SECRET; 

//saveRecipe --> aggiungere id ricetta all'array dei preferiti quando si clicca salva
const saveRecipe = async (req, res) => {
    const recipeId = req.body._id;
    const userId = req.user._id;
    try{
        const user = await User.findByIdAndUpdate(userId, {$addToSet: {favorites:  recipeId}})
        res.status(200).json({msg: "ok", user: user})
    }
    catch (err){
        res.status(500).json({msg: "errore", errore: err.msg})
    }
};

//getSavedRecipes --> tasto ricette salvate 
const getSavedRecipes = async (req, res) => {
    const userId = req.user._id;
    try {
    const user = await User.findById({ _id : userId }).select("favorites");
    const savedRecipes = await Recipe.find({ _id: { $in: user.favorites } });
    res.status(200).json({msg: "ok", recipes: savedRecipes})
    } catch (err) {
        res.status(500).json({msg: "errore", errore: err.msg})
    }
}

const removeSavedRecipe = async (req, res) => {
    const userId = req.user._id;
    const recipeId = req.params.recipeId;
    try{
        const userUpdated = await User.findByIdAndUpdate(userId, {$pull: {favorites: recipeId}}, { new: true /*per restituire l'utente aggiornato*/})
        res.status(200).json({msg: "ok", user: userUpdated})
    }
    catch (err){
        res.status(500).json({msg: "errore", errore: err.msg})
    }
}

//registrazione(createUser)
const  signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        
        const exsistingUser = await User.findOne({ email });
        if (exsistingUser) {
            return res.status(400).json({msg: "Utente già registrato con questo indirizzo mail!"})
        }
        const exsistingUsername = await User.findOne({ username });
        if (exsistingUsername) {
            return res.status(400).json({msg: "Username già esistente! Scegline un altro"})
        }

        const user = await User.create({ username, email, password })
        const token = jwt.sign({id: user._id}, JWT_SECRET_KEY, {expiresIn: '1d'})

        res.cookie("jwtToken", token, {
            httpOnly: true, 
            secure: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000*60*60*24)
        });

        res.status(201).json({
            msg: 'Utente registrato correttamente!',
            user: {
                _id : user._id,
                username : user.username,
                email : user.email
            },
        })
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        } else {
            console.log(err);
            res.json({msg: err.message})}
    }

    
};

//login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({msg: 'Account non esistente con questo username!'})
        } else if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({id: user._id}, JWT_SECRET_KEY, {expiresIn: '1d'})
            res.cookie("jwtToken", token, {
                httpOnly: true, 
                //secure: true,
                sameSite: 'strict',
                expires: new Date(Date.now() + 1000*60*60*24)
            }).json({msg: "Accesso effettuato", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }});
        } else {
            return res.status(400).json({msg: 'Username o password errati'})
        }
    }
    catch (err) {
        console.log(err);
        res.json({msg: "Errore"})
    }
    
};

const verifyAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (token) {
            jwt.verify(token, JWT_SECRET_KEY, async (err, data) => {
                if (err) {
                    return (res.json({msg: "errore", errore: "Token non valido"}))
                } else {
;                    const user = await User.findById({_id: data.id })
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.json({msg: "errore", errore: "Utente non trovato"})
                }}
            })
        }
            
               /* const decoded = jwt.verify(token, JWT_SECRET_KEY);
                if (decoded) {
                const user = await User.findById({_id: decoded.id});
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.json({msg: "errore", errore: "Utente non trovato"})
                }
            } else {
                res.json({msg: "errore", errore: "Token non valido"})
            }*/
        else {
            return res.status(401).json({msg: "Accesso non consentito"})
        }
        }
    catch (err) {
        console.log(err);
        res.json({msg: "errore", errore: err.message})
    }
}

const logout = async (req, res) => {
    try {
    const token = req.cookies.jwtToken;
    res.clearCookie("jwtToken", token, { path: "/" });
    res.status(200).json({msg: "Utente disconnesso correttamente"})}
    catch (err){
        res.status(500).json({msg: "Errore durante la disconnessione"})
    }
}

module.exports = {
    saveRecipe,
    getSavedRecipes,
    signUp,
    login, 
    verifyAuth,
    removeSavedRecipe,
    logout
};


