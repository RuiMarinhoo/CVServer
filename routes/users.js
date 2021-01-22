const express = require('express');

function createRouter() {
  const router = express.Router();

  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    res.status(200).send('funfaaa');
  });

  return router;
}

module.exports = createRouter;
