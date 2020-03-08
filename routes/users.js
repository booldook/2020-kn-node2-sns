const express = require('express');
const bcrypt = require('bcrypt');
const { connect } = require('../modules/mysql');
const { alertLoc } = require('../modules/util');
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

module.exports = router;
