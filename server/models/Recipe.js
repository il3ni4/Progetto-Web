const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true},
    ingredients: [{
        type: String, 
        required: true}],
    people: {
        type: Number,
        required: true,
        min: [1, 'Inserire ingredienti per almeno 1 persona']}, //valutare se aggiungere errore personalizzato o no 
    steps: [{
        type: String, 
        required: true}],
    image: {
        type: String},
    category: {
        type: String, 
        required: true,
        enum: {
            values: ['Vegetariano', 'Vegano', 'Carne', 'Pesce']}},
    type: {
        type: String, 
        required: true,
        enum: {
        values: ['Antipasti', 'Primi', 'Secondi', 'Lievitati', 'Dolci']}},
    cookingTime: {
        type: Number},
    difficulty: {
        type: String,
        enum: {
            values: ['Facile', 'Medio', 'Difficile']}},
    user: {
        type: mongoose.Schema.Types.ObjectId, //associazione one-to-many mediante reference
        ref: 'User',
        required: true}
    
},
{
    timestamps: true
})

module.exports = mongoose.model("recipes", RecipeSchema);