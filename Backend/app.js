const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')

mongoose.connect('mongodb+srv://test-grimoire:Rga0zWu2B8nynJaK@mon-vieux-grimoire.rrozapz.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/book', bookRoutes);
app.use('/api/user', userRoutes);
module.exports = app;