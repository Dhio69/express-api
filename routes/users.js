var express = require('express');
var router = express.Router();
require('dotenv').config()
const Validator = require('fastest-validator')
const v = new Validator();
const { User } = require('../models')
var md5 = require('md5');
const jwt = require('jsonwebtoken');
const {
    TOKEN_SECRET,
} = process.env


router.post('/signup', async (req, res) => {
  const schema = {
      username : 'string',
      password : 'string',
  }
  const validate = v.validate(req.body, schema);
  if (validate.length) {
      return res.status(400).json({
          code : 200,
          message : 'error',
          data : validate
      })
  }

  let usr = req.body.username
  let pwd = req.body.password
  pwd = md5(pwd)
  const request = {
    "username": usr,
    "password": pwd
  }
  users = await User.create(request)
  return res.status(200).json({
      code : 200,
      message : 'success',
      data : users
  })
})

router.post('/signin', async (req, res) => {
  const schema = {
      username : 'string',
      password : 'string',
  }
  const validate = v.validate(req.body, schema);
  if (validate.length) {
      return res.status(400).json({
          code : 200,
          message : 'error',
          data : validate
      })
  }

  let usr = req.body.username
  let pwd = req.body.password
  pwd = md5(pwd)
  

  users = await User.findOne({where: {username:usr, password:pwd}})

  if (!users) {
    return res.status(400).json({
        code : 200,
        message : 'Ops your username and password wrong',
        data : users
    })
  }

  let accessToken = jwt.sign({username:usr}, TOKEN_SECRET, { expiresIn: '12h' });
  
  return res.status(200).json({
      code : 200,
      message : 'success',
      data : users,
      token : 'Bearer ' + accessToken
  })
})

module.exports = router;
