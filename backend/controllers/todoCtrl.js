const TodoSvc = require('../services/todos')

// const genericCtrl = require("../helpers/ctrlHelpers")

// controleur de la route get /todos
exports.list = (req, res) => {
    // on interroge la base de données
    TodoSvc.list()
        .then((todos)=> {
        // si il a des données on les renvoie en json
        res.status(200).json(todos)
        //en cas d'erreur on captre le message d'erreyr pour l'afficher dans la console
    })
        .catch((err)=>{
            res.status(500).send(err.error);
        })
}
//exports.list = (req, res) => {
//    return genericCtrl(req, res, async () => {
//        const todos = await todoServices.list();
//    });
// }

exports.getOneItem = async (req, res) => {
    TodoSvc.getOneItem(req.params.id)
        .then((todo) => res.status(200).json(todo))
        .catch(error => res.status(400).json({ error }))}

exports.postItem = (req,res) =>{
        TodoSvc.postItem(req.body)
            .then((todos)=> {
                console.log("test")

                res.status(200).json(todos)
            })
            .catch(error => res.status(400).json({error}))

exports.edit = async (req, res) => {
    TodoSvc.edit(req.params.id,req.body)
        .then((todo) => res.status(200).json(todo))
        .catch(error => res.status(400).json({ error }))}

    exports.delete = async (req, res) => {
        TodoSvc.delete(req.params.id)
            .then((todo) => res.status(200).json(todo))
            .catch(error => res.status(400).json({ error }))}
}