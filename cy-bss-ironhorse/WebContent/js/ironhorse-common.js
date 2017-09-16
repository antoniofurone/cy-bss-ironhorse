var RESULT_OK = "00";

var ROLE_SA="Super Administrator";
var ROLE_ADMIN="Administrator";
var ROLE_USER="User";
var ROLE_PARTNER="Partner";

var CORE_URL="http://localhost:8080/cy-bss-core";

var URBANBOT_DEFAULT_LATITUDE=40.706160;
var URBANBOT_DEFAULT_LONGITUDE=17.658472;
var LOCATION_DEFAULT_LANGUAGE='it';

function getLocalStorageItem(paramName){ 
	if (typeof(Storage) !== "undefined") 
	   return localStorage.getItem(paramName);
	else 
		{
		alert("Local storage isn't supported !");
		}
}	

function setLocalStorageItem(paramName,value){
	if (typeof(Storage) !== "undefined") 
		localStorage.setItem(paramName, value); 
	else 
    alert("Local storage isn't supported !");
}

function getLanguage(){
	var userLang=getLocalStorageItem("org.cysoft.bss.ih.user.languageCode");
	if (userLang==undefined)  		
		userLang = navigator.language || navigator.userLanguage;
	if (userLang=='it-IT' || userLang=='it')
   	 return 'it';
    else
   	 return 'en';
}


function callRestWs($http,endPoint,method,headers,data,success,error){
	var request = '{"method": "'+method+'","url": "';
	request+=getLocalStorageItem("org.cysoft.bss.ih.coreurl")+'/rest/'+endPoint+'",'; 
	request+='"headers": '+JSON.stringify(headers)+',';
	request+='"data": '+JSON.stringify(data)+'}';
	
	console.log('request='+request);
	
	//alert(request);
	
	var reqObj=JSON.parse(request);
   	$http(reqObj).then(
			function(response){
				success(response);
			}, 
			function(data, status, headers, config){
				error(data, status, headers, config);
			});
}

function callFileServiceWs($http,endPoint,method,headers,data,success,error){
	var request = '{"method": "'+method+'","url": "';
	request+=getLocalStorageItem("org.cysoft.bss.ih.coreurl")+'/fileservice/'+endPoint+'",'; 
	request+='"headers": '+JSON.stringify(headers)+',';
	request+='"data": '+JSON.stringify(data)+'}';
	
	console.log('request='+request);
	
	//alert(request);
	
	var reqObj=JSON.parse(request);
   	$http(reqObj).then(
			function(response){
				success(response);
			}, 
			function(data, status, headers, config){
				error(data, status, headers, config);
			});
}



function setMenuCntl(app) {
	
	app.controller('menuCtrl', function($scope, $http, $translate) {
		var userRole=getLocalStorageItem('org.cysoft.bss.ih.user.role');
		if (userRole!=undefined)
			$scope.userRole=userRole;
		
		console.log('user role='+$scope.userRole);
		$scope.urbanbotMenu=getLocalStorageItem("org.cysoft.bss.ih.urbanbotmenu");
		console.log('urbanbotMenu='+$scope.urbanbotMenu);
		
		$scope.onLogOff = function() {
			 $scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
			 callRestWs($http,'cybss-auth/logOff','GET',
					 {"Security-Token": $scope.securityToken},
					 {},
						function(response){
								if (response.data.resultCode==RESULT_OK){
									setLocalStorageItem("org.cysoft.bss.ih.securityToken",'');
									$("#callPage").attr("action","/cy-bss-ironhorse/html/logOn.html");
		   	       		 			$("#callPage").submit();
								}
								else
								{
									alert(response.data.resultCode+'-'+response.data.resultDesc);
								}
							}, 
							function(data, status, headers, config){
									alert(status+'-'+data);
							});
			 
		 }
		
		
	});  
}

function manageError($scope,status,data){
		$scope.errorMessage=status+" - "+JSON.stringify(data);	
}

function StringToStringDDMMYYYY(stringDate){
	var date=new Date(stringDate);
	var year=date.getFullYear().toString();
	var month=(date.getMonth()+1).toString();
	var day=date.getDate().toString();
	return (day.length==2?day:"0"+day)+"/"+(month.length==2?month:"0"+month)+"/"+year;
}

function dateToStringDDMMYYYY(date){
	var year=date.getFullYear().toString();
	var month=(date.getMonth()+1).toString();
	var day=date.getDate().toString();
	return (day.length==2?day:"0"+day)+"/"+(month.length==2?month:"0"+month)+"/"+year;
}

function dateToStringI18N(date){
	var year=date.getFullYear().toString();
	var month=(date.getMonth()+1).toString();
	var day=date.getDate().toString();
	return getLanguage()=='it'?(day.length==2?day:"0"+day)+"/"+(month.length==2?month:"0"+month)+"/"+year:
		(month.length==2?month:"0"+month)+"/"+(day.length==2?day:"0"+day)+"/"+year;
	
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
}

String.prototype.dateFormat = function(){
	var date=new Date(this);
	var year=date.getFullYear().toString();
	var month=(date.getMonth()+1).toString();
	var day=date.getDate().toString();
	return (day.length==2?day:"0"+day)+"/"+(month.length==2?month:"0"+month)+"/"+year;
}	

Number.prototype.round=function(n){
	return Math.round(this*Math.pow(10,n))/Math.pow(10,n);
}


Number.prototype.formatI18N = function(n) {
	var browserLang = navigator.language || navigator.userLanguage;
	if (browserLang=='it-IT' || browserLang=='it')
		return this.format(n, 3, '.', ',');
	else
		return this.format(n, 3, ',', '.');
}

/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

//12345678.9.format(2, 3, '.', ',');  // "12.345.678,90"
//123456.789.format(4, 4, ' ', ':');  // "12 3456:7890"
//12345678.9.format(0, 3, '-');       // "12-345-679"
//var a = parseFloat("10")
