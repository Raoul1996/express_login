/**
 * Created by raoul on 17-7-16.
 */
let express = require('express')
let router = express.Router()
router.get('/', function (req, res, next) {
  res.render('register')
})
module.exports = router