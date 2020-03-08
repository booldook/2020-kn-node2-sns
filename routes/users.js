const express = require('express');
const bcrypt = require('bcrypt');
const { connect } = require('../modules/mysql');
const { alertLoc } = require('../modules/util');
const router = express.Router();

router.post('/join', (req, res, next) => {
  let {email, username, userpw } = req.body;
  let sql, result;
  sql = "INSERT INTO user"
});

module.exports = router;
