var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'oi ashchal knowbook deploy bhayo' });
});

router.get('/test', function(req, res, next) {
  res.json({message:"this is done"})
});




module.exports = router;
