const path = require("path");
const express = require("express");
const app = express();
const { Pool } = require('pg');
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/route');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, () => console.log('server running on port ', PORT));