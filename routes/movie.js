const mongoose = require('mongoose')
const { MovieRef, validate } = require('../model/movie')
const express = require('express')
const router = require('express').Router();
const { Genre } = require('../model/genre')


router.get('/', async(req, res) => {

    // const movies = await Movie.find().sort({
    //     name: 1
    // });

    const movies = await MovieRef.find().populate('genreId', 'name').sort("name").select('name genreId');

    return res.send(movies);

})

router.post('/', async function(req, res) {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) {
        return res.status(400).send("The genre with the given ID was not found.")
    }
    const movie = new MovieRef({
        name: req.body.name,
        genreId: req.body.genreId,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate

    })

    await movie.save();
    return res.send(movie);

});

router.put('/:id', async(req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    // const genre = Genre.findById(req.body.genreId)
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) {


        return res.status(404).send("The genre with the given ID was not found.")
    }
    let movie = await MovieRef.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        genreId: req.body.genreId,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true })

    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found')
    }
    res.send(movie);

})



router.delete('/:id', async(req, res) => {

    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message)
    // }
    // const genre = await Genre.findById(req.body.genreId)
    // if (!genre) {
    //     return res.status(400).send("The genre with the given ID was not found.")
    // }
    const movie = await MovieRef.findByIdAndRemove(req.params.id)
    if (!movie) {
        return res.status(404).send('The movie with the given ID was not found')
    }
    res.send(movie);

})


router.get("/:id", async(req, res) => {

    const movie = await MovieRef.findById(req.params.id).populate('genreId', 'name').select('name genreId');
    if (!movie) {
        return res.status(400).send('The movide with the given Id was not found')
    }

    res.send(movie)

});



module.exports = router;