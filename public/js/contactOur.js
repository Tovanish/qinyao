// JavaScript Document

window.onload = function (){
    var username = document.getElementById('username');
    var userDiv = document.querySelector('.hd-userDiv');
	var loginDiv =	document.querySelector('.hd-logDiv');
	var shoppingBtn = document.querySelector(".nav-list3");	
	var data ;
	
	if(window.name){
	    data = JSON.parse(window.name);
		if(data.isLogin && data.username.length > 0)
			{
				username.innerHTML = data.username;
				userDiv.style.display = "block";
				loginDiv.style.display = "none";
			}
	}
	
	shoppingBtn.onclick = checkLogin;
	
	function checkLogin(e){
	if(window.name){
		data = JSON.parse(window.name);
		if(!data.isLogin)
			{
				e.preventDefault();
				var result = confirm("登录之后才能订购，是否前往订购页面？");
		       if(result)
			   {
			      location.href = "../view/login.html";
			   }
			}
	} else {
		e.preventDefault();
		var result1 = confirm("登录之后才能订购，是否前往订购页面？");
		if(result1)
			{
			   location.href = "../view/login.html";
			}
	}	
}
	
};