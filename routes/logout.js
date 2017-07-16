/**
 * Created by raoul on 17-7-16.
 */
let express = require('express')
let router = express.Router()
router.get('/', function (req, res, next) {
  if (req.session.user) {
    delete req.session.user
  }
  res.redirect('/')
  return
})
module.exports = router