const express = require('express');
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/users');
const generatePDF = require('./routes/generatePDF');

const port = process.env.PORT || 3003;

const app = express()
    .use(cors())
    .use(express.urlencoded({extended: true}))
    .use(express.json({limit: '50mb'}))
    .use(express.static(path.join(__dirname, 'public')))
    .use("/users", usersRouter())
    .use("/generatePDF", generatePDF());


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

module.exports = app;
