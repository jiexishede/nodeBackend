const express = require('express');
const mongoose = require('mongoose');
const genre = require('./routes/genre')
const customer = require('./routes/customer')
const movies = require('./routes/movie')

const app = express();

mongoose.connect('mongodb://localhost/videlydemo')
    .then(console.log('mongodb is connected'))
    .catch(err => console.log(`Can't connect the mongodb `))

// express.use(express.json()) //!!!
app.use(express.json())
app.use('/api/customer', customer);
app.use('/api/genre', genre);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`express listen on port ${port}`);
})
