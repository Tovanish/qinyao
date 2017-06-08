window.onload = function(){
var isLogin = false;
var shoppingBtn = document.querySelector(".nav-list3");	
var buyBtn = document.getElementById('buyBtn');

var data;
	
var username = document.getElementById('username');
var userDiv = document.querySelector('.hd-userDiv');
var loginDiv =	document.querySelector('.hd-logDiv'); 	
var buyButton =	document.querySelectorAll('.buyButton');	
	
	if(window.name){
		data = JSON.parse(window.name);
		isLogin = data.isLogin;
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
		var data = JSON.parse(window.name);
		if(!data.isLogin)
			{
				e.preventDefault();
				layer.confirm('登录之后才能订购，是否前往订购页面？', {
                btn: ['前往','取消'] //按钮
                }, function(){
                location.href = "../view/login.html";
              });
			}
	} else {
		e.preventDefault();
		 layer.confirm('登录之后才能订购，是否前往订购页面？', {
             btn: ['前往','取消'] //按钮
             }, function(){
             location.href = "../view/login.html";
             });
	}	
	
}
    for(var i = 0; i<buyButton.length; i++)
	{
		buyButton[i].index = i+1;
		buyButton[i].onclick = function (){
			if(isLogin){
				var obj = JSON.parse(window.name);
				var shoppingInfo = obj.shoppingInfo;
//			    console.log(this.index);
		       addToShoppingCart(shoppingInfo,this.index);
			} else {
		     //询问框
             layer.confirm('登录之后才能订购，是否前往订购页面？', {
             btn: ['前往','取消'] //按钮
             }, function(){
             location.href = "../view/login.html";
              });
			}
		}
	}
	
	function addToShoppingCart(shoppingInfo,number){
		console.log(checkPrd(shoppingInfo,number));
		if(checkPrd(shoppingInfo,number))
		{
           var prd = {};
		   if(number)
		   {
             prd.number = number;
		     prd.quantity = 1;
			 data.shoppingInfo.push(prd);
		     window.name = JSON.stringify(data);
		     console.log(data);
		     layer.alert("加入购物车成功");
		   } 
		}
	}


    function checkPrd(shoppingInfo,number){
     for(var i=0; i<shoppingInfo.length; i++)
	 {
		 if(shoppingInfo[i].number == number)
		 {
             layer.alert("购物车中已存在该商品");
			 return false;
		 }
	 }
	 return true;
	}
};