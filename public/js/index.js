function joinSubmit(f) {
	if(f.email.value.trim() === "") {
		alert("이메일을 입력하세요.");
		f.email.focus();
		return false;
	}
	if(f.userpw.value.trim() === "") {
		alert("패스워드를 입력하세요.");
		f.userpw.focus();
		return false;
	}
	if(f.username.value.trim() === "") {
		alert("이름(닉네임)을 입력하세요.");
		f.username.focus();
		return false;
	}
	return true;
}

function idChk(el) {
	if(el.value.trim()) {
		$.ajax({
			url: "/users/idchk",
			type: "post",
			dataType: "json", 
			data: {
				email: el.value.trim()
			}, 
			success: function(res) {
				if(res) {
					
				}
				else {

				}
			}, 
			error: function(xhr) {
				console.log(xhr);
			}
		});
	}
	else {

	}
}