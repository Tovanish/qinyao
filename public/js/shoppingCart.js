// JavaScript Document

var addrTbody = document.querySelector('table.adressTable tbody');
var addrTic = document.querySelector('.ct-addressTic');
var gooesTbody = document.querySelector('table.goodsTable tbody');
var gooesList = document.querySelector('.goodsTable>tbody');
var totalNum = document.getElementById('total-num');
var totalPrice = document.getElementById('total-price');
var freight = document.getElementById('freight');
var username = document.getElementById('username');
var userDiv = document.querySelector('.hd-userDiv');
var loginDiv =	document.querySelector('.hd-logDiv');
var prdList = [];
var prdAttr = 6;
var addrArray = [];
var AttrNum = 5;
var data,goosInfo,addressInfo;

if(window.name)
{
	data = JSON.parse(window.name);
	addressInfo = data.defaultAddress;
	goosInfo = data.shoppingInfo;
	if(data.isLogin && data.username.length > 0)
			{
				username.innerHTML = data.username;
				userDiv.style.display = "block";
				loginDiv.style.display = "none";
			}
	if(addressInfo.isSelect)
	{
      addAddr(addressInfo.isSelect,addressInfo.name,addressInfo.adress,addressInfo.detailAdress,addressInfo.phoneNum);
	  showAddr();
	}

	for(var i=0; i<goosInfo.length; i++)
	{
		if(goosInfo[i].number)
		{
			 switch (goosInfo[i].number){
		    case 1: {
			creatPrdObj(1,goosInfo[i].quantity,144);
			break;
		   }
		    case 2: {
			creatPrdObj(2,goosInfo[i].quantity,192);
			break;
		   }
		    case 3: {
			creatPrdObj(3,goosInfo[i].quantity,120);
			break;
		   }
		    case 4: {
			creatPrdObj(4,goosInfo[i].quantity,58);
			break;
		   }
		    case 5: {
			creatPrdObj(5,goosInfo[i].quantity,68);
			break;
		   }
		}
	  }
	}
	showPrduct();

    UpdateData();
} else {
	document.body.innerHTML = "抱歉，请<a href='login.html'>登陆</a>后再试！";
}


function addAddr(isSelect,name,city,detailAddr,phone){
  "use strict";
  var addrObj = {};
  addrObj.isSelect = isSelect; 
  addrObj.name = name;
  addrObj.city = city;
  addrObj.detailAddr = detailAddr;
  addrObj.phone = phone;	
  addrArray.push(addrObj);	
}

function showAddr(){
	"use strict";
	if(addrArray.length > 0)
	{
		addrTic.style.display = "none";	
	}
	for(var i=0; i<addrArray.length;i++)
	{
		var tr = document.createElement('tr');
		addrTbody.appendChild(tr);
		for(var j=0; j < AttrNum; j++)
		{  
			var td = document.createElement('td');
			switch (j){
				case 0 :{
					td.className = "t-select";
					var radio = document.createElement('input');
					radio.type = "radio";
					radio.name = "isSelect";
					if(addrArray[i].isSelect == 1)
						{
							radio.checked = "checked";
						}
					td.appendChild(radio);
					break;
				}
				case 1 :{
					td.className = "t-select";
					td.innerHTML = addrArray[i].name;
					break;
				}
				case 2 :{
					td.className = "t-select";
					td.innerHTML = addrArray[i].city;
					break;
				}
				case 3 :{
					td.className = "t-select";
					td.innerHTML = addrArray[i].detailAddr;
					break;
				}
				case 4 :{
					td.className = "t-select";
					td.innerHTML = addrArray[i].phone;
					break;
				}
			}
			tr.appendChild(td);
		}
	}
}

function addEvent(){
var addBtnList = document.querySelectorAll('.addBtn');
var subBtnList = document.querySelectorAll('.subBtn');
var delBtnList = document.querySelectorAll('.delBtn');
var checkboxList = document.querySelectorAll('.goodsTable tbody input[type="checkbox"]');

var transportPrice = 0;  //运输费
console.log(addBtnList);
for(var i=0; i < addBtnList.length; i++)
	{
		addBtnList[i].index = i+1;
		addBtnList[i].onclick = addNumber;
		subBtnList[i].onclick = subNumber;
		delBtnList[i].onclick = delGooes;
		checkboxList[i].onchange = UpdateData;
	}

}

/*数量增加*/
 function  addNumber(){
	var value = this.nextElementSibling.value;
	value ++;
	this.nextElementSibling.value = value;
    changeBtnIndex();
    setTodata(this,value,0);
	var unitPrice = this.parentElement.parentElement.nextElementSibling.children[0].innerHTML*1;
	var subtotal = this.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0];
	subtotal.innerHTML =  value*unitPrice +  ".00";
	UpdateData();
 }

/*数量减少*/
function subNumber(){
	var value = this.previousElementSibling.value;
	if(value > 1)
	{
	  value --;
	  this.previousElementSibling.value = value;
	  changeBtnIndex();
      setTodata(this,value,0);
	  var unitPrice = this.parentElement.parentElement.nextElementSibling.children[0].innerHTML*1;
	  var subtotal = this.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0];
	  subtotal.innerHTML =  value*unitPrice + ".00";
	  UpdateData();
	}	
 }


/*删除商品*/
function delGooes(){
	changeBtnIndex();
	var tr = this.parentNode.parentNode;
	gooesList.removeChild(tr);
    setTodata(this,0,1);
	UpdateData();
}

function setTodata(theBtn,value,isdel){
  if(1 == isdel)
  {
	//   console.log(theBtn.index);
     data.shoppingInfo.splice(theBtn.index,1);
  }else{
	 data.shoppingInfo[theBtn.index].quantity = value;  
	} 
   window.name = JSON.stringify(data);

}


function UpdateData(){
	var gosNumberIpt = document.querySelectorAll('.gosNumber');
	var subtotalList = document.querySelectorAll('.subtotal');
	var checkboxList = document.querySelectorAll('.goodsTable tbody input[type="checkbox"]');
	var number = 0;
	var theSubtotal = 0;
	transportPrice = 0;
	for(var i=0; i < checkboxList.length; i++)
	{
		if(checkboxList[i].checked)
		{
           	number += gosNumberIpt[i].value*1;
		    theSubtotal += subtotalList[i].innerHTML*1;
		}
	}
	
	if(number < 3 && number >0)
		{
			transportPrice = 15;
		}
	else if(number < 5 && number >0)
		{
			transportPrice = 30;
		}
		
	theSubtotal += ".00";
	transportPrice += ".00";
	totalNum.innerHTML = number;
	totalPrice.innerHTML = theSubtotal;
	freight.innerHTML = transportPrice;
}


function changeBtnIndex(){
	var addBtnList = document.querySelectorAll('.addBtn');
    var subBtnList = document.querySelectorAll('.subBtn');
	var delBtnList = document.querySelectorAll('.delBtn');
	for(var i=0; i<addBtnList.length; i++)
      {
		  console.log(i);
		  addBtnList[i].index = i;
		  subBtnList[i].index = i;
		  delBtnList[i].index = i;
	  }
}
/*购车添加商品*/


function creatPrdObj(index,num,prdPrice){
	var prdObj = {};
	    prdObj.number = index;
		prdObj.img = "../images/series10"+index+".png";
		switch (index){
		case 1: {
			prdObj.name = "330ML瓶装水 /箱(24瓶)";
			prdObj.href = "../view/prdDiscrib330.html"
			break;
	    }
		case 2: {
			prdObj.name = "530ML瓶装水 /箱(24瓶)";
			prdObj.href = "../view/prdDiscrib530.html"
			break;
	    }
		case 3: {
			prdObj.name = "5L瓶装水 /箱(4桶)";
			prdObj.href = "../view/prdDiscrib5L.html"
			break;
	    }
		case 4: {
			prdObj.name = "水之情之侠骨柔情330ML /盒";
			prdObj.href = "../view/prdDiscribsgrq330.html"
			break;
	    }
		case 5: {
			prdObj.name = "水之情之侠骨柔情530ML /盒";
			prdObj.href = "../view/prdDiscribsgrq530.html"
			break;
	    }		
	 }
	prdObj.num = num;
	prdObj.prdPrice = prdPrice*1+".00";
	prdObj.subtotal = num * prdPrice +".00";
	
	prdList.push(prdObj);
}

function showPrduct(){
	
	for(var i=0;i<prdList.length;i++){
		var tr = document.createElement('tr');
		gooesTbody.appendChild(tr);
		for(var j=0; j < prdAttr; j++)
		{  
			var td = document.createElement('td');
			switch (j){
				case 0 :{
				  td.className = "goosSelect";
				  var input = document.createElement('input'); 
				  input.type = "checkbox";
				  input.name = "goosSelect";
				  td.appendChild(input);
				  break;
				}
				case 1 :{
				  td.className = "goosName";
					 var img = document.createElement('img'); 
					 img.className = "gooesImg";
					 img.src = prdList[i].img;
					 td.appendChild(img);
					 var a = document.createElement('a'); 
					 a.href = prdList[i].href;
					 var div = document.createElement('div');
					 div.className = "goosNameText";
					 div.innerHTML = prdList[i].name;
					 a.appendChild(div);
					 td.appendChild(a);
				  break;
				}
				case 2 :{
				  td.className = "gooesNum";
				  if(prdList[i].number < 3)
				  {
						td.innerHTML = '<div class="gooesNum-btnDiv"><div class="addBtn">+</div><input type="text" class="gosNumber" value="'+prdList[i].num+'"><div class="subBtn">-</div><div class="unitText">箱(24瓶)</div></div>';
				  } else if(3 == prdList[i].number){
					    td.innerHTML = '<div class="gooesNum-btnDiv"><div class="addBtn">+</div><input type="text" class="gosNumber" value="'+prdList[i].num+'"><div class="subBtn">-</div><div class="unitText">箱(4桶)</div></div>';
				  } else {
					    td.innerHTML = '<div class="gooesNum-btnDiv"><div class="addBtn">+</div><input type="text" class="gosNumber" value="'+prdList[i].num+'"><div class="subBtn">-</div><div class="unitText">盒</div></div>';
				  }
				  break;
				}
				case 3 :{
				  td.className = "gooesUnitPrice";
				  td.innerHTML = '<span class="unitPrice">'+prdList[i].prdPrice+'</span> 元';	
				  break; 
				}
				case 4 :{
				  td.className = "gooesSubtotal";
				  td.innerHTML = '小计：<span class="subtotal">'+prdList[i].subtotal+'</span> 元';		
				  break;
				}
				case 5 :{
				  td.className = "gooesOpction";
				  td.innerHTML = '<div class="delBtn">删除</div>';
				  break;
				} 		
			}
			tr.appendChild(td);
		}
	}
	addEvent();
}

var secAllCheckBox = document.getElementById('AllSelect');
var batchDeleteBtn = document.querySelector('.batchDelete');

secAllCheckBox.onchange = function (){
	var isAllSelect = 0;
	if (secAllCheckBox.checked)
	{
		isAllSelect = 1;	
	} else {
		isAllSelect = 0;	
	}
	allSelect(isAllSelect);	
	UpdateData();
};


function allSelect(isAllSelect){
	var checkboxList = document.querySelectorAll('.goodsTable tbody input[type="checkbox"]');
	for(var i=0; i<checkboxList.length; i++)
	{
		if(1 == isAllSelect)
		{
			checkboxList[i].checked = true;	
		} else {
			checkboxList[i].checked = false;	
		}
	}
}

batchDeleteBtn.onclick = function (){
	var offset = 0;
	var checkboxList = document.querySelectorAll('.goodsTable tbody input[type="checkbox"]');
	for(var i=0; i<checkboxList.length; i++)
	{
		if(checkboxList[i].checked)
		{   console.log(i-offset);
			 data.shoppingInfo.splice(i-offset,1);
			var tr = checkboxList[i].parentNode.parentNode;
	        gooesList.removeChild(tr);
			offset++;	
		}
	}
	window.name = JSON.stringify(data);
	UpdateData();
};