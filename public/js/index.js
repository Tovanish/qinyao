// JavaScript Document
window.onload = function(){

var username = document.getElementById('username');
var userDiv = document.querySelector('.hd-userDiv');
var loginDiv =	document.querySelector('.hd-logDiv');



var swiper = new Swiper('.swiper-container', {
		autoplay: 3000,
        slidesPerView: 3,
		autoplayDisableOnInteraction: false,
		pagination: '.swiper-pagination',
        paginationClickable: true
    });	

	
if(window.name){
		var data = JSON.parse(window.name);
		if(data.isLogin && data.username.length > 0)
			{
				username.innerHTML = data.username;
				userDiv.style.display = "block";
				loginDiv.style.display = "none";
			}
	}
	
	
var shoppingBtn = document.querySelector(".nav-list3");	
	
shoppingBtn.onclick = function (e){
	if(window.name){
		var data = JSON.parse(window.name);
		if(!data.isLogin)
			{
				e.preventDefault();
				var result = confirm("登录之后才能订购，是否前往订购页面？");
		       if(result)
			   {
			      location.href = "public/view/login.html";
			   }
			}
	} else {
		e.preventDefault();
		var result = confirm("登录之后才能订购，是否前往订购页面？");
		if(result)
			{
			   location.href = "public/view/login.html";
			}
	}	
};	
	
};


 