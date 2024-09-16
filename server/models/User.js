const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { //gestire l'errore in caso di username già esistente 
        type: String, 
        required: [true, 'Inserire uno username'],
        unique: true},
    email: {
        type: String,
        required: [true, 'Inserire un indirizzo email'],
        unique: true},
    password: {
        type: String, 
        required: [true, 'Inserire una password']},
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
      }]
})

userSchema.pre("save", function(next) {
    const user = this; 
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    if (pwdRegex.test(user.password)) {
        next();
    } else {
        const err = new Error("La password deve essere lunga almeno 6 caratteri, contenere almeno un numero e un carattere tra i seguenti: @$!%*?&");
        return next(err);
    }

})

userSchema.pre("save", function(next) {
    const user = this; 
    bcrypt.hash(user.password, 10).then(hashedPwd => {
        user.password = hashedPwd;
        next();
    })
})

module.exports = mongoose.model('users', userSchema);