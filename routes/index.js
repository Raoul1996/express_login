let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  res.render('index',{user:user});
});

module.exports = router;
