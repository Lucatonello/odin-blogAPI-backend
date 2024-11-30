const path = require("path");
const express = require("express");
const app = express();
const { Pool } = require('pg');
const PORT = process.env.PORT || 3000;
const publications = require('./routes/publications');
const users = require('./routes/users');
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', publications);
app.use('/users', users.router);

app.listen(PORT, () => console.log('server running on port ', PORT));