const Todo = require('../models/Todo')

exports.list =  () => {
    return Todo.find()
}
exports.getOneItem = (id) => {
    return Todo.findOne({_id: id})
}
exports.postItem = (todo) => {
    console.log(todo)
    return Todo.create(todo)
}


