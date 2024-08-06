
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    yop: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true }
});

const MovieModel = mongoose.model('Movie', movieSchema);
module.exports = MovieModel;
