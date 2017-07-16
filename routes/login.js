/**
 * Created by raoul on 17-7-16.
 */
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
router.route('/').get(function (req, res, next) {
  res.render('login')
})
  .post(function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    if (!username || !password) {
      res.send('<p>your should submit the username and password</p>')
      return
    }
    let db = mongoose.createConnection('mongodb://123.207.252.230:12345/test')
    let User = db.model('user', new mongoose.Schema({
      username: String,
      password: String
    }))
    User.findOne({username: username}, 'password', function (err, data, affectNums) {
      if (!data) {
        res.send('<p>this username is not exists!</p>')
        return
      }
      if (data.password === password) {
        req.session.user = {username: username}
        res.redirect('/')
        return
      }
      res.send('<p>your password is error!</p>')
    })
  })
module.exports = router