// JavaScript Document
var PrivincesList = ["-请选择省-","甘谷县","甘肃省","陕西省"];

var cityList = ["-请选择市-","天水市"];

var areaList = ["-请选择区-","甘谷县","麦积区","秦安县","秦州区","清水县","武山县","张家川回族自治县"];

var selectPrevince = document.getElementById('provinces');
var citySelect = document.getElementById('city');
var areaSelect = document.getElementById('area');
var saveBtn = document.querySelector('.saveBtn');
var adressTable =  document.querySelector('.adressTable tbody');

var adressObjList = [];
var data,defaultAddress;


if(window.name)
{
	 data = JSON.parse(window.name);
	 if(data.isLogin)
	 {
       if( data.adressList)
	   {
		   adressObjList = data.adressList;
		   showAllAddress();
	   }	
 } else {
		 document.body.style.color = "#ff0000";
		 document.body.innerHTML = "抱歉，请<a href='login.html'>登陆</a>后再试！";
	 }
} else {
	document.body.innerHTML = "抱歉，请<a href='login.html'>登陆</a>后再试！";
}




selectPrevince.onchange = function (){
	citySelect.innerHTML="";
	if(1 == selectPrevince.value)
		{
			
			for(var i=0; i < cityList.length; i++)
			{
				var cityOpt = document.createElement('option');
			    cityOpt.value = i;
			    cityOpt.innerHTML = cityList[i];
			    citySelect.appendChild(cityOpt);
			}
		} else {
			var cityOpt = document.createElement('option');
			cityOpt.value = 0;
			cityOpt.innerHTML = cityList[0];
			citySelect.appendChild(cityOpt);
		}
};

citySelect.onchange = function (){
	areaSelect.innerHTML="";
	if(1 == citySelect.value)
		{
			for(var i=0; i < areaList.length; i++)
			{
				var areaOpt = document.createElement('option');
			    areaOpt.value = i+1;
			    areaOpt.innerHTML = areaList[i];
			    areaSelect.appendChild(areaOpt);
			}
		} else {
		        var areaOpt = document.createElement('option');
			    areaOpt.value = 0;
			    areaOpt.innerHTML = areaList[0];
			    areaSelect.appendChild(areaOpt);
	}
};




var pattern1 = /^([\u4e00-\u9fa5]{2,15})$/;         //中文名称匹配
var pattern2 = /^([\u4e00-\u9fa5]{3,30})$/;         //中文地名匹配
var pattern3 = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
                                                   //电话号码匹配
saveBtn.onclick = function (){
	var Address = "";
	if(selectPrevince.value !=0 && citySelect.value !=0  && areaSelect.value !=0)
	{
		Address = PrivincesList[selectPrevince.value];
	    Address += cityList[citySelect.value];
	    Address += areaList[areaSelect.value];	
	}
	
  var Name = document.querySelector('.ct-addript[name="name"]').value;
  var DetailAddr = document.querySelector('textarea').value;
  var Phone = document.querySelector('.ct-addript[name="phone"]').value;
  if(pattern1.test(Name))
  {
	  if(Address)
	  {
		  if(pattern3.test(Phone))
		  {
             if(pattern2.test(DetailAddr))
		   {
             createAdressObj(Name,Address,DetailAddr,Phone,0);
		   } else {
            alert('详细地址错误!');
		  }
		  } else {
            alert('手机号码错误!');
		  }
	  } else {
        alert('地址选择错误!');
	  }
  }else{
	  alert("名称错误!");
  }	
};



function createAdressObj (name,address,detailAddr,Phone,isDefault){
	
   var adressObj = {};
   adressObj.name = name;
   adressObj.adress = address;
   adressObj.detailAdress = detailAddr;
   adressObj.phoneNum = Phone;
   if(data.adressList.length == 0){
     adressObj.isSelect = 1;
	 data.defaultAddress = adressObj;
   } else {
	   adressObj.isSelect = isDefault;
   }
  adressObjList.push(adressObj);
  showAddress(name,address,detailAddr,Phone,isDefault);
  data.adressList = adressObjList;
  window.name = JSON.stringify(data);
  alert("保存成功!");
}

function showAllAddress(){
  for(var i=0; i< data.adressList.length; i++)
  {
    showAddress(data.adressList[i].name,data.adressList[i].adress,data.adressList[i].detailAdress,data.adressList[i].phoneNum,data.adressList[i].isSelect);
  }
}


function showAddress(name,address,detailAddr,Phone,isDefault){
	 var tr = document.createElement('tr');
		adressTable.appendChild(tr);
		for(var i = 0; i<6; i++)
		{
			var td = document.createElement('td');
			switch (i){
				case 0:{
					td.innerHTML = name;
					break;
				}
				case 1:{
					td.innerHTML = address;
					break;
				}
				case 2:{
					td.innerHTML = detailAddr;
					break;
				}
				case 3:{
					td.innerHTML = Phone;
					break;
				}
				case 4:{
					td.innerHTML = '<a href="resetAddress.html"><span class="resetAddr">修改</span></a>|<span class="delAddr">删除</span>';
					break;
				}
				case 5:{
					if(isDefault)
					{
                      td.innerHTML = '<input type="radio" name="defaultAddr" checked="checked">';
					} else {
					  td.innerHTML = '<input type="radio" name="defaultAddr">';
					}
					break;
				}	
			}
			tr.appendChild(td);	
		}
		addDelEvent();
		addRadioEvent();
		document.querySelector('.ct-addressTic').style.display = "none";
}


function addDelEvent(){
	var delBtnList = document.querySelectorAll('.delAddr');
	for(var i=0; i < delBtnList.length; i++)
		{
			delBtnList[i].onclick = function (){
			changeBtnIndex();	
			var tr = this.parentNode.parentNode;
			adressTable.removeChild(tr);
			if(this.index == 0)
			{
               if(data.adressList.length > 1)
			   {
				   data.adressList[1].isSelect = 1;
				   data.defaultAddress =  data.adressList[1];
			   }else{
				   data.defaultAddress = {};
			   }
			}
			data.adressList.splice(this.index,1);
			window.name = JSON.stringify(data);
			var tr1 = adressTable.children;
	         if(0 == tr1.length)
			  {
				document.querySelector('.ct-addressTic').style.display = "block";	 
			  }
			  alert("删除成功!");	
			  showAllAddress();
			};
		}
}

function changeBtnIndex() {
	var delBtnList = document.querySelectorAll('.delAddr');
	var updateBtnList = document.querySelectorAll('.resetAddr');
	var radioList = document.querySelectorAll('.adressTable tbody input[type="radio"]');
    for(var i=0; i<delBtnList.length; i++)
	{
       delBtnList[i].index = i;
	   updateBtnList[i].index = i;
	   radioList[i].index = i;
	}
}
