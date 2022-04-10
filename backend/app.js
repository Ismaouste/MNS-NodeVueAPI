require('dotenv').config()
const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

// db.createUser({user: "foo",pwd: "bar",roles: [{role:"dbOwner",db: "todos"}]})
const user = process.env.MONGO_USER
const pass = process.env.MONGO_PASS
const url =  process.env.MONGO_URL
const port = process.env.MONGO_PORT
const db = process.env.MONGO_DB

mongoose.connect(
    `mongodb://${url}:${port}/${db}`,
    {
        user: user,
        pass: pass,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then( () => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => console.log(e, 'Connexion à MongoDB échouée !'))

// const path = require('path')

const todosRoutes = require('./routes/routes')
const app = express()

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:8080','http://localhost:8081']
}))

// Création des routes de l'app
app.use('/ping', (req, res) => {
    res.status(200).send("PING OK")
})
app.use('/api/v1/todos', todosRoutes)

module.exports = app