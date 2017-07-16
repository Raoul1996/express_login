/**
 * Created by raoul on 17-7-16.
 */
let express = require('express')
let router = express.Router()
let mongoose  = require('mongoose')
router.route('/')
  .get(function (req, res, next) {
    res.render('register')
  })
  .post(function (req, res, next) {
    let username = req.body.username
    let password = req.body.password
    let passwordConfirm = req.body['password-confirm']
    let userData = {username: username, password: password}
    if (!username || !password) {
      res.json({
        'message': 'Password or userName is empty!'
      })
      return
    }
    if (password !== passwordConfirm) {
      res.json({
        'message': 'Password and confirm password do not match!'
      })
      return
    }
    let db = mongoose.createConnection('mongodb://123.207.252.230:12345/test')
    let Schema = new mongoose.Schema({
      username: String,
      password: String
    })
    let User = db.model('user', Schema)
    User.findOne({username: username}, function (err, data) {
      if (err) {
        res.send(err)
        return
      }
      if (data) {
        res.send('<p>Account already exists</p>')
        return
      }
      User.create(userData, function (err, data, afterNums) {
        if (err) {
          res.json({
            message: err
          })
          return
        }
        if (afterNums === 0) {
          res.send('<p>Register Error</p>')
          return
        }
        req.session.user = {username: username}
        res.redirect('/')
      })
    })
  })
module.exports = router