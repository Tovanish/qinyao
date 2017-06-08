// JavaScript Document

window.onload = function(){
	
	var loginBtn =  document.querySelector('.subBtn');
	var pattern1 = /^[A-Z|a-z]+\w{2,14}[A-Z|a-z|0-9]$/;
	var pattern2 = /^[\w.*#]{4,12}$/;
	var pattern3 = /^t63z$/i;
	var shoppingBtn = document.querySelector(".nav-list3");	

    shoppingBtn.onclick = checkLogin;

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
		var result = confirm("登录之后才能订购，是否前往订购页面？");
		if(result)
			{
			   location.href = "../view/login.html";
			}
	}	
}
		
	
	loginBtn.onclick = function (){
		var account = document.getElementById('account').value;
	    var password = document.getElementById('password').value;
	    var checkCode = document.getElementById('checkCode').value;
		var data;
		
		var result1 = pattern1.test(account);
		var result2 = pattern2.test(password);
		var result3 = pattern3.test(checkCode);
		
		console.log(account+","+result1);
		console.log(password+","+result2);
		console.log(checkCode+","+result3);
		
		if(result1)
		{
			if(result2)
			{
					if(result3)
				  {
					 if(!window.name)
						 {
							var adressInfo = {};
        			       	adressInfo.isSelect = 1;
							adressInfo.name = "金文丰";
							adressInfo.adress = "甘谷县天水市甘谷县";
							adressInfo.detailAdress = "竹子镇余田村";
							adressInfo.phoneNum = 13527896778;

						    data={};
							
							data.username = "";
							data.shoppingInfo = [];
							data.adressList = [];
							data.adressList.push(adressInfo);
							data.defaultAddress = adressInfo;
							
						 }else {
							data = JSON.parse(window.name);
						 }
					        data.isLogin=true;
					        data.username = account;
							window.name = JSON.stringify(data);
							alert("登录成功");
							location.href = "../../index.html";	
				  }else{
					  alert("验证码错误!");
				  }
			} else {
					alert("密码格式错误!");
				}
		} else  {
			alert("账号格式错误!");
		}
	};
	
};
