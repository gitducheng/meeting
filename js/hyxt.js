var tds = document.getElementsByClassName('qtr-wrap');
var ty = document.getElementById("ty");
var wrap_bg = document.getElementsByClassName('wrap-bg')[0];
var apply = document.getElementsByClassName('apply')[0];

window.onload=function(){
	xinxi();

	ty.onclick=function(){
		agree();
	}

	apply.onclick=function(){
		wrap_bg.parentNode.style.display="block";
	}

	wrap_bg.addEventListener('click',function(){
		this.parentNode.style.display="none";
	},false);

}

/* 信息弹出 */
function xinxi(){
	var xx = document.getElementsByClassName('xinxi');
	for(var i=0;i<tds.length;i++){
		tds[i].onclick=function(){
			var div = document.createElement("div");
			div.setAttribute("class", "xinxi");
			div.innerHTML="<p>1、name</p><p>2、time</p><p>3、其他</p>";
			for(var i = 0;i<xx.length;i++){
				var td = xx[i].parentNode;
				td.removeChild(xx[i]);
			}
			this.appendChild(div);
			var xinxi = document.getElementsByClassName('xinxi')[0];
			xinxi.style.display = "block";
		}
	}
}

/*使用规范，同意按钮*/
function agree(){
	var jx_bg=document.getElementById('jx-bg');
	var checked=document.getElementById("ty").checked;
	if(checked){
		jx_bg.style.backgroundColor="#156ecd";
		jx_bg.parentNode.className="";
	}
	jx_bg.onclick=function(){
		wrap_bg.parentNode.style.display="none";
	}
}

/*对cookie操作*/
var cookie = {
  add: function(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if (expiresHours > 0) {
      var date = new Date();
      date.setTime(date.getTime + expiresHours * 3600 * 1000);
      cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
  },
  change: function(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if (expiresHours > 0) {
      var date = new Date();
      date.setTime(date.getTime + expiresHours * 3600 * 1000); //单位是多少小时后失效
      cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
  },
  get: function(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if (arr[0] == name) {
        return unescape(arr[1]);
      } else {
        return "";
      }
    }

  },
  del: function(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000); //设定一个过去的时间即可
    document.cookie = name + "=v; expires=" + date.toGMTString();
  }

}



$(document).ready(function(){ 
	/*每天的格子集合*/
	var one=rank(tds,1),
		two=rank(tds,2),
		three=rank(tds,3),
		four=rank(tds,4),
		five=rank(tds,5),
		six=rank(tds,6),
		seven=rank(tds,7);

	$("#register").click(function(){
		$.ajax({ 
		    type: "POST", 	
			url: "http://youyinnn.cn/test.jsp",
			data: {
				//a: $("#user").val(), 
				//b: $("#password").val()
			},
			success: function(data){
				if (data=="success") { //cookie（sessionId）保持登录状态
					//window.location.href="dlh.html"; 
					//cookie.add("session",data.sessionId,1);
					//cookie.add("userId",data.userId,1);
				} else {
					//alert("账户或密码错误!");  
				}  
			},
			error: function(jqXHR){     
			   alert("发生错误：" + jqXHR.status);  
			},     
		});
	});
		/*切换教室*/
		
			$("#room_507").click(function(){ 
			$.ajax({ 
		    type: "POST", 	
			url: "http://youyinnn.cn/test.jsp",
			data: {
				//a: $("#user").val(), 
				//b: $("#password").val()
			},
			success: function(data){
				if (data=="") { 
					//window.location.href="dlh.html"; 
					//cookie.add("session",data.sess,1);
				} else {
					 //alert("账户或密码错误!");  
				}  
			},
			error: function(jqXHR){     
			   alert("发生错误：" + jqXHR.status);  
			},     
			});
			});


	});

/*课表四分之一单元格排序*/
function rank(array_2,start){
	var array_1=[];
	for(var i = (start-1);i < array_2.length;i=i+7){
		var divs = array_2[i].getElementsByTagName('div');
		for(var j=0;j<divs.length;j++){
			array_1.push(divs[j]);
		}
		
	}
	return array_1;
}