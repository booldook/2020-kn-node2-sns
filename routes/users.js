const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { connect } = require('../modules/mysql');
const { alertLoc } = require('../modules/util');
const { isLogin, isLogout } = require('../modules/auth-chk');
const router = express.Router();

router.post('/join', async (req, res, next) => {
  let {email, username, userpw } = req.body;
  let sql, sqlVals, result, pugVals;
  sql = "SELECT email FROM user WHERE email=?";
  result = await connect.execute(sql, [email]);
  if(result[0][0]) {
    res.send(alertLoc("이미 존재하는 이메일 입니다.", "/"));
  }
  else {
    userpw = await bcrypt.hash(userpw, 11);
    sql = "INSERT INTO user SET email=?, username=?, userpw=?, api=?, api_id=?, created=now(), updated=now()";
    sqlVals = [email, username, userpw, 'local', ''];
    result = await connect.execute(sql, sqlVals);
    res.send(alertLoc("회원가입이 되었습니다", "/"));
  }
});

router.post("/login", async (req, res, next) => {
  let { email, userpw } = req.body;
  let sql, sqlVals, result;
  sql = "SELECT * FROM user WHERE email=?";
  result = await connect.execute(sql, [email]);
  if(result[0][0]) {
    let match = await bcrypt.compare(userpw, result[0][0].userpw);
    if(match) {
      res.send(alertLoc("로그인 되었습니다.", "/"));
    }
    else {
      res.send(alertLoc("이메일/패스워드가 일치하지 않습니다.", "/"));
    }
  }
  else {
    res.send(alertLoc("이메일/패스워드가 일치하지 않습니다.", "/"));
  }
});

router.get("/logout", (req, res, next) => {

});

// /users/idchk, body => email=booldook@gmail.com
router.post("/idchk", async (req, res, next) => {
  let { email } = req.body;
  let sql, result;
  sql = "SELECT email FROM user WHERE email=?";
  result = await connect.execute(sql, [email]);
  if(result[0][0]) res.json({result: false});
  else res.json({result: true});
});

module.exports = router;
