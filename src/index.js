require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/PersonRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router)

//ROTA INICIAL
app.get('/', (req, res) => {
  res.json({ message: `Olá Node, Mongo e Express` })
});

const DB_USER = "usuario";
const DB_PASSWORD = encodeURIComponent("senha")

//MONGO ATLAS
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apimongo.urjsa.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  app.listen(3000)
  console.log('Everything alright!')
})
.catch((err) => console.log(err))