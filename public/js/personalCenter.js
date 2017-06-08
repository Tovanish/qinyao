// JavaScript Document
window.onload = function (){
	var data;
	if(window.name)
	{
		data = JSON.parse(window.name);
		if(!data.isLogin)
		{
			document.body.innerHTML = "抱歉，请<a href='login.html'>登陆</a>后再试！";
		}
	}else{
		document.body.innerHTML = "抱歉，请<a href='login.html'>登陆</a>后再试！";
	}
	
	var exitBtn = document.getElementById('exit');
	
	exitBtn.onclick = function (){
		window.name = "";
		location.href = "../../index.html";
	};
};