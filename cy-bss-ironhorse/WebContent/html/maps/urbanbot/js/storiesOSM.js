var languageCode=getLanguage();

$('#datepickerFrom').datepicker({
    autoclose:true,format: 'dd/mm/yyyy',language:languageCode
  }).on("changeDate", function(e){
   console.log('datepickerFrom:'+e.date);
});

$('#datepickerTo').datepicker({
    autoclose:true,format: 'dd/mm/yyyy',language:languageCode
  }).on("changeDate", function(e){
   console.log('datepickerTo:'+e.date);
});


var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator'])
		.config(function($translateProvider) {
	     	$translateProvider
	     	.translations('en',{
	     		'PAGE.TITLE':'Stories',
	     		'DATEFROM.LABEL':'From',
	     		'DATETO.LABEL':'To',
	     		'SEARCH.BUTTON':'Search',
	     		'NOWARNS.MESSAGE':'Stories not found',
	     		'TYPE.LABEL':'Type',
	     		'TEXT.LABEL':'Story',
	     		'DATECRE.LABEL':'Creation Date',
	     		'OWNER.LABEL':'Owner',
	     		'OPEN.LABEL':'Open',
	     		'BACK.BUTTON': 'Back'
	     	  })
    		  
    		.translations('it',{
    			'PAGE.TITLE':'Storie',
    			'DATEFROM.LABEL':'Dal',
    			'DATETO.LABEL':'Al',
    			'SEARCH.BUTTON':'Ricerca',
    			'NOWARNS.MESSAGE':'Nessuna storia trovata',
    			'TYPE.LABEL':'Tipo',
    			'TEXT.LABEL':'Storia',
	     		'DATECRE.LABEL':'Creation Date',
	     		'OWNER.LABEL':'Owner',
	     		'OPEN.LABEL':'Apri',
	     		'BACK.BUTTON': 'Indietro'
    		  });
	     	
	     	
	     	 $translateProvider.preferredLanguage(getLanguage());
	 	});
	 	
	 	
app.controller('pageCtrl', function($q,$scope,$http,$translate,$filter) {
		
	$scope.coreUrl=CORE_URL;
   	var coreUrl=getLocalStorageItem("org.cysoft.bss.ih.coreurl");
	
   	$scope.detail=false;
   	
	if (coreUrl==undefined || coreUrl=='undefined' || coreUrl=='' || $scope.coreUrl!=coreUrl)
		setLocalStorageItem("org.cysoft.bss.ih.coreurl",$scope.coreUrl);
		
	$scope.loadProgress=0;
	
	var currentDate_30=new Date();
	currentDate_30.setDate(currentDate_30.getDate()-90);
	
	$scope.dateFrom=dateToStringDDMMYYYY(currentDate_30);
	
	var markerIcon=undefined;
	var map=undefined;
	
	if (typeof L==='object'){
		markerIcon = L.icon({
			  iconUrl: '/cy-bss-ironhorse/html/maps/images/pin24.png',
			  iconRetinaUrl: '/cy-bss-ironhorse/html/maps/images/pin48.png',
			  iconSize: [29, 24],
			  iconAnchor: [9, 21],
			  popupAnchor: [0, -14]
			});
	}
	
	var $search = function() {
		
		var deferred = $q.defer();
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		
		var query="?locationType=StoryLocation";
		query+="&fromDate="+($scope.dateFrom!=undefined?encodeURIComponent($scope.dateFrom):'');
		query+="&toDate="+($scope.dateTo!=undefined?encodeURIComponent($scope.dateTo):'');
		
		//alert(query);
		
		callRestWs($http,'location/find'+query,'GET',
				headers,
				{},
				function(response){
						deferred.resolve(response);
					}, 
					function(data, status, headers, config){
						deferred.reject(data, status, headers, config);
					});
		return deferred.promise;
		};
	// end $search	
	
	var infoWindow = undefined;
	
	var $setContentMarker = function(markerClusters,location) {
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};	
		console.log("location="+JSON.stringify(location));
		
		var person=(location.personId==0?'':(location.personFirstName==undefined 
				|| location.personFirstName=='null'?'':'['+location.personFirstName+']'));
		
		callRestWs($http,'location/'+location.id+'/getFiles','GET',
			{"Security-Token":$scope.securityToken},
			{},
			function(response){
				if (response.data.resultCode==RESULT_OK){
					var files=response.data.files;
					console.log("files="+JSON.stringify(files));
					
					var contentString = '<div id="content" style="overflow:auto; width:240px;height:100px;">';
					contentString+='<p><strong>#'+location.id+' '+person+' @'+location.creationDate+'</strong><br>';
					contentString+=''+replaceURLWithHTMLLinks(location.description)+'</p>';
					
					
					if (files.length>0){
						contentString+='<table border=1>';
						//contentString+='<tr><th>Content</th><th>'+$filter('translate')('TYPE.LABEL') +'</th><th></th></tr>';  
						for(var k in files){
							contentString+='<tr class="small" valign="top"><td  style="padding: 2px;">';
							if (files[k].visibility=='P')
								contentString+='<a href="'+$scope.coreUrl+'/fileservice/file/'+
										files[k].id+'/download"><span class="glyphicon glyphicon-open">'+$filter('translate')('OPEN.LABEL')+'</span></a>';
							contentString+='</td>';
							
							contentString+='<td style="padding: 2px;">'+files[k].contentType+'</td><td style="padding: 2px;">'+files[k].fileType+'</td>';
							
							if (files[k].fileType=='Photo' && files[k].visibility=='P')
								contentString+='<td><img width="40" src="'+$scope.coreUrl+'/fileservice/file/'+files[k].id+'/download"></td>';
							else
								contentString+='<td></td>';
							
							
							contentString+='</tr>';
						}
						contentString+='</table>'				
					}
					
					
					contentString+='</div>';
					
					var popup = contentString;
					var m = L.marker( [location.latitude, location.longitude], {icon: markerIcon} )
	                  .bindPopup( popup );
					
					markerClusters.addLayer( m );
					
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}			
				
				}, 
				function(data, status, headers, config){
					manageError($scope,response.data.resultCode,response.data.resultDesc);
				});
		
	};
	
	
	$scope.onSearch = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		$scope.loadProgress=0;
		$scope.detail=false;
		
		if (!navigator.geolocation){
			alert("Geolocation API not supported.");
			return;
		}
        	
		
		$search().then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
				$scope.locations=response.data.locations;
				console.log("locations.length="+$scope.locations.length);
				
				if (typeof L==='object'){
					if (map!=undefined)
						map.remove();
					
					map = L.map( 'mapPlaceholder', {
						  center: [ URBANBOT_DEFAULT_LATITUDE,URBANBOT_DEFAULT_LONGITUDE],
						  minZoom: 2,
						  zoom: 11
						});
					
					
					L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
							{attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'}).addTo(map);	
				
					
					$scope.count=0;
					var markerClusters = L.markerClusterGroup();
					for(var i in $scope.locations){
						var location=$scope.locations[i];
						$setContentMarker(markerClusters,location);
						
						$scope.count++;
						$scope.loadProgress=$scope.count/$scope.locations.length*100;
					}
					map.addLayer( markerClusters );
				} // end L===
			
				
				
				if ($scope.locations.length==0){
					$translate('NOWARNS.MESSAGE')
	    	          .then(function (translatedValue) {
	    	              $scope.errorMessage=translatedValue;
	    	          });
				}
			
			}
			else
			{
				manageError($scope,response.data.resultCode,response.data.resultDesc);
			}
	    }, function(data, status, headers, config) {
	    	manageError($scope,status,data);
	    });
		}
	// end onSearch
	
	
	var $location= function(id) {
			var deferred = $q.defer();
			var headers={"Security-Token":$scope.securityToken};
			
			callRestWs($http,'location/'+id+'/get','GET',
					{"Security-Token":$scope.securityToken},
					{},
					function(response){
							deferred.resolve(response);
						}, 
						function(data, status, headers, config){
							deferred.reject(data, status, headers, config);
						});
			return deferred.promise;
	}
	
	var $locationFiles=function(id) {
		var deferred = $q.defer();
		var headers={"Security-Token":$scope.securityToken};
		
		callRestWs($http,'location/'+id+'/getFiles','GET',
				{"Security-Token":$scope.securityToken},
				{},
				function(response){
						deferred.resolve(response);
					}, 
					function(data, status, headers, config){
						deferred.reject(data, status, headers, config);
					});
		return deferred.promise;
	}
	
	
	
	//$showStory
	$scope.showStory=function(id){
		
		$location(id).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
				$scope.location=response.data.location;
				
				$locationFiles(id).then(function(response) {
	    			if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.files=response.data.files;
						$scope.detail=true;
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
	    	    }, function(data, status, headers, config) {
	    	    	manageError($scope,status,data);
	    	    });
					}
			else
			{
				manageError($scope,response.data.resultCode,response.data.resultDesc);
			}
	    }, function(data, status, headers, config) {
	    	manageError($scope,status,data);
	    });
		
	}// $showStory	
	
	
	$scope.onBack = function() {
		$scope.detail=false;
	}
	
	$scope.onSearch();
});