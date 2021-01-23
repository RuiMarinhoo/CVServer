const express = require('express');

function createRouter() {
  const router = express.Router();

  router.get('/', function (req, res, next) {

    res.send('Node Express');

  });

  return router;
}

module.exports = createRouter;

