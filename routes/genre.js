const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const { Genre, validate } = require('../model/genre')

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }
    const genre = new Genre({
            name: req.body.name
        })
        // const result = await genre.save();
        // id 不是存在数据库里面生成的 是在 mongodb drive  生成的
        // 使用 const 就可以了
    await genre.save();
    res.send(genre);

});

router.get('/', async(req, res) => {
    // const genres = Genre.find().sort({
    const genres = await Genre.find().sort({
        name: 1
    })
    res.send(genres);
})

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });

    if (!genre) {
        res.status(404).send("The genre with the given ID was not found.")
    }
    res.send(genre);
})

router.get('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        res.status(404).send("The genre with the give id was not found.")
    }
    res.send(genre)
})

router.delete('/:id', async(req, res) => {

    //  id  new 
    // const { error } = validate(req.body);
    // if (error) {
    //     res.status(400).send(error.details[0].message)
    // }

    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) {
        res.status(404).send("The genre with the give id was not found.")
    }
    res.send(genre)

})

module.exports = router;