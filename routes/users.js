const express = require('express');

function createRouter() {
  const router = express.Router();

  router.get('/', function (req, res, next) {

    res.send('respond with a resource');

  });

  return router;
}

module.exports = createRouter;

