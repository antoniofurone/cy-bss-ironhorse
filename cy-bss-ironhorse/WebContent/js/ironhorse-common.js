var RESULT_OK = "00";

var ROLE_SA="Super Administrator";
var ROLE_ADMIN="Administrator";
var ROLE_USER="User";
var ROLE_PARTNER="Partner";

var CORE_URL="http://localhost:8080/cy-bss-core";

var URBANBOT_DEFAULT_LATITUDE=40.706160;
var URBANBOT_DEFAULT_LONGITUDE=17.658472;


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
		$scope.errorMessage=status+" - "+data;	
}

function dateToStringDDMMYYYY(date){
	var year=date.getFullYear().toString();
	var month=(date.getMonth()+1).toString();
	var day=date.getDate().toString();
	return (day.length==2?day:"0"+day)+"/"+month+"/"+year;
}

