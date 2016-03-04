var languageCode=getLanguage();

var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator'])
		.config(function($translateProvider) {
	     	$translateProvider
	     	.translations('en',{
	     		'PAGE.TITLE':'Tourist Sites',
	     		'DATEFROM.LABEL':'From',
	     		'DATETO.LABEL':'To',
	     		'SEARCH.BUTTON':'Update Map',
	     		'NOWARNS.MESSAGE':'Sites not found',
	     		'TYPE.LABEL':'Type',
	     		'NAME.LABEL':'Name',
	     		'TEXT.LABEL':'Description',
	     		'DATECRE.LABEL':'Creation Date',
	     		'OPEN.LABEL':'Open',
	     		'BACK.BUTTON': 'Back'
	     	  })
    		  
    		.translations('it',{
    			'PAGE.TITLE':'Siti Turistici',
    			'DATEFROM.LABEL':'Dal',
    			'DATETO.LABEL':'Al',
    			'SEARCH.BUTTON':'Aggiorna Mappa',
    			'NOWARNS.MESSAGE':'Nessun sito trovato',
    			'TYPE.LABEL':'Tipo',
    			'NAME.LABEL':'Nome',
	     		'TEXT.LABEL':'Descrizione',
	     		'DATECRE.LABEL':'Data Creazione',
	     		'OPEN.LABEL':'Apri',
	     		'BACK.BUTTON': 'Indietro'
    		  });
	     	
	     	
	     	 $translateProvider.preferredLanguage(getLanguage());
	 	});

app.filter('replaceURLWithHTMLLinks', function () {
	   return function (text) {
	      //your date parser here
		   return replaceURLWithHTMLLinks(text);
	   };
	});
	 	
app.controller('pageCtrl', function($q,$scope,$http,$translate,$filter) {
	
	$scope.coreUrl=CORE_URL;
   	var coreUrl=getLocalStorageItem("org.cysoft.bss.ih.coreurl");
	
   	if (coreUrl==undefined || coreUrl=='undefined' || coreUrl=='' || $scope.coreUrl!=coreUrl)
		setLocalStorageItem("org.cysoft.bss.ih.coreurl",$scope.coreUrl);
		
	$scope.loadProgress=0;
	var center_coords=undefined;
	
	if (typeof google==='object' && typeof google.maps==='object'){
		center_coords = new google.maps.LatLng(URBANBOT_DEFAULT_LATITUDE, URBANBOT_DEFAULT_LONGITUDE);
		}
	
	var $search = function() {
		
		var deferred = $q.defer();
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		
		var query="?locationType=TouristSiteLocation";
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
	
	var $setContentMarker = function(map,marker,location) {
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};	
		console.log("location="+JSON.stringify(location));
		
		callRestWs($http,'location/'+location.id+'/getFiles','GET',
			{"Security-Token":$scope.securityToken},
			{},
			function(response){
				if (response.data.resultCode==RESULT_OK){
			
					var files=response.data.files;
					console.log("files="+JSON.stringify(files));
					
					var contentString = '<div id="content" style="overflow:auto; width:280px;height:140px;">';
					contentString+='<p><strong>#'+location.id+' '+location.name+'</strong><br>';
					contentString+=''+replaceURLWithHTMLLinks(location.description)+'</p>';
					
					
					if (files.length>0){
						contentString+='<table border=1>';
						for(var k in files){
							
							contentString+='<tr class="small" valign="top"><td  style="padding: 2px;">';
							if (files[k].visibility=='P')
								contentString+='<a href="'+$scope.coreUrl+'/fileservice/file/'+
										files[k].id+'/download"><span class="glyphicon glyphicon-open">'+$filter('translate')('OPEN.LABEL')+'</span></a>';
							contentString+='</td>';
							
							//contentString+='<td style="padding: 2px;">'+files[k].contentType+'</td>';
							contentString+='<td style="padding: 2px;">'+files[k].fileType+'</td>';
							contentString+='<td style="padding: 2px;">'+files[k].note+'</td>';
							
							
							if (files[k].fileType=='Photo' && files[k].visibility=='P')
								contentString+='<td><img width="40" src="'+$scope.coreUrl+'/fileservice/file/'+files[k].id+'/download"></td>';
							else
								contentString+='<td></td>';
							contentString+='</tr>';
								
						}
						contentString+='</table>'				
					}
					
					contentString+='</div>';
					marker.content=contentString;
					
					infoWindow = new google.maps.InfoWindow();
					
					google.maps.event.addListener(marker, 'click', function(){
						infoWindow.close();
						infoWindow.setContent(this.content); 
						infoWindow.open(map, this);
						});
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
		
		if (!navigator.geolocation){
			alert("Geolocation API not supported.");
			return;
		}
        	
		
		$search().then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
				$scope.locations=response.data.locations;
				console.log("locations.length="+$scope.locations.length);
				
					
				var map = undefined;
				if (typeof google==='object' && typeof google.maps==='object'){
					
					var mapOptions = {
			                zoom: 11,
			                center: center_coords,
			                 mapTypeControl: true,
			                 //mapTypeId: google.maps.MapTypeId.ROADMAP
			                 mapTypeId:google.maps.MapTypeId.HYBRID
			            	};
					var map = new google.maps.Map(
			                document.getElementById("mapPlaceholder"), mapOptions
			                );
					google.maps.event.addDomListener(window, 'resize', function() {
						map.setCenter(center_coords);
						});
					
					$scope.count=0;
					var marker_list = [];
					var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
					for(var i in $scope.locations){
						
						var location=$scope.locations[i];
						
						var position=new google.maps.LatLng(location.latitude,
									location.longitude);
						
						var marker = new google.maps.Marker({
			                position: position, 
			                map: map,
			                title: '#'+location.id +' '+location.name 
			            });
						
						$setContentMarker(map,marker,location);
						
						marker_list.push(marker);
						 
						$scope.count++;
						$scope.loadProgress=$scope.count/$scope.locations.length*100;
					} // for
					
					markerCluster = new MarkerClusterer(map, marker_list, {
					    gridSize:2,
					    minimumClusterSize: 2,
					    calculator: function(markers, numStyles) {
					    return {
					    	text: markers.length,
					    	index: numStyles
					    };
					    }
					});
				} // google
				
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
	
	
	//$showSite
	$scope.showSite=function(id){
		
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
		
	}// $showSite
	
	
	$scope.onBack = function() {
		$scope.detail=false;
	}
	
	
	$scope.onSearch();
});	 	
