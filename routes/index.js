const express = require('express');

function createRouter() {
  const router = express.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router;
}

module.exports = createRouter;
