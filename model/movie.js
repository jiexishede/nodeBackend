const mongooes = require('mongoose')
const { genreSchema } = require('./genre')
const joi = require('joi')

// const Movie = mongooes.model('Movies', new mongooes.Schema({
//     name: {
//         type: String,
//         trim: true,
//         required: true,
//         minlength: 5,
//         maxlength: 255
//     },
//     genre: {
//         type: genreSchema,
//         required: true,
//     },
//     numberInStock: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 255
//     },
//     dailyRentalRate: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 255
//     }
// }));


const MovieRef = mongooes.model('Movies', new mongooes.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    genreId: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

function validateMovie(movie) {
    const schema = {
        name: joi.string().min(5).max(55).required(),
        genreId: joi.string().required(),
        numberInStock: joi.number().min(0).max(255).required(),
        dailyRentalRate: joi.number().min(0).max(255).required()
    }

    return joi.validate(movie, schema);
}

module.exports.validate = validateMovie;
module.exports.MovieRef = MovieRef;
// module.exports.Movie = Movie;
