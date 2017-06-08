// JavaScript Document

window.onload = function(){
	var shoppingBtn = document.querySelector(".nav-list3");	
	var buyBtn = document.getElementById('buyBtn');

    shoppingBtn.onclick = checkLogin;
	buyBtn.onclick = checkLogin;

	function checkLogin(e){
	if(window.name){
		var data = JSON.parse(window.name);
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