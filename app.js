const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const generateCV = require('./routes/generatePDF');

const port = process.env.PORT || 3000;

const app = express()
    .use(cors())
    .use(express.urlencoded({extended: true}))
    .use(express.json({limit: '50mb'}))
    .use(express.static(path.join(__dirname, 'public')))
    .use("/", indexRouter())
    .use("/users", usersRouter())
    .use("/generateCV", generateCV());

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});


module.exports = app;
