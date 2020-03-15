var express = require('express');
var router = express.Router();
var { connect } = require('../modules/mysql');
var { isLogin, isLogout } = require("../modules/auth-chk");

/* GET home page. */
router.get('/', async (req, res, next) => {
  // req.app.locals.user = req.user;
  let sql, result;
  sql = "SELECT * FROM post ORDER BY id DESC";
  result = await connect.execute(sql);
  res.render('index', { user: req.user, lists: result[0] });
});

module.exports = router;
