var express = require('express');
var router = express.Router();
var { connect } = require('../modules/mysql');
const { upload } = require('../modules/multer');
const {isLogin, isLogout} = require('../modules/auth-chk');

router.post("/save", isLogin, upload.single('img'), async (req, res, next) => {
	let sql, sqlVals, result, postId, tagId;
	let { content } = req.body;
	let img = req.file ? req.file.filename : '';
	let tags = content.match(/#[^\s]*/g); // [#트와이스, #걸그룹]
	console.log(tags);
	sql = "INSERT INTO post SET content=?, img=?, user_id=?";
	sqlVals = [content, img, req.user.id];
	result = await connect.execute(sql, sqlVals);
	postId = result[0].insertId;
	if(tags){
		for(let v of tags) {
			sql = "INSERT INTO tag SET title=? ON DUPLICATE KEY UPDATE updated=now()";
			result = await connect.execute(sql, [v.substr(1)]);
			tagId = result[0].insertId;
			sql = "INSERT INTO post_tag SET post_id=?, tag_id=?";
			result = await connect.execute(sql, [postId, tagId]);
		}
	}
	res.redirect("/");
})



module.exports = router;