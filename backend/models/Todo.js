const mongoose = require('mongoose');
const { Schema } = mongoose;

let Todo = new Schema({
    description: {type: String},
    done: {type: Boolean},
});

module.exports = mongoose.model('Todo', Todo);