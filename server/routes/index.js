var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/hello', function(req, res, next) {
//  res.render('index', { title: 'Express' });
  res.json({message : 'Welcome to the API!'});
});

module.exports = router;
