const mongoose = require('mongoose');
const joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = {
        // name: joi.string().min(5).max(50).required
        name: joi.string().min(5).max(50).required()
    }

    //  const result = joi.validate(genre, schem)
    //    if(result.error) {
    //      return error.error
    //    }

    return joi.validate(genre, schema)
}


exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
