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





var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist'])
		.config(function($translateProvider) {
	     	$translateProvider
	     	.translations('en',{
	     		'PAGE.TITLE':'Warnings',
	     		'CATEGORY.LABEL':'Category',
	     		'STATUS.LABEL':'Status',
	     		'DATEFROM.LABEL':'From',
	     		'DATETO.LABEL':'To',
	     		'SEARCH.BUTTON':'Search',
	     		'NOWARNS.MESSAGE':'Warnings not found',
	     		'TEXT.LABEL':'Text',
	     		'DATECRE.LABEL':'Creation Date',
	     		'OWNER.LABEL':'Owner',
	     		'TYPE.LABEL':'Type',
	     		'OPEN.LABEL':'Open',
	     		'BACK.BUTTON': 'Back'
	     	  })
    		  
    		.translations('it',{
    			'PAGE.TITLE':'Warnings',
    			'CATEGORY.LABEL':'Categoria',
    			'STATUS.LABEL':'Stato',
    			'DATEFROM.LABEL':'Dal',
    			'DATETO.LABEL':'Al',
    			'SEARCH.BUTTON':'Ricerca',
    			'NOWARNS.MESSAGE':'Nessuna segnalazione trovata',
    			'TEXT.LABEL':'Testo',
    			'DATECRE.LABEL':'Data Creazione',
    			'OWNER.LABEL':'Proprietario',
    			'TYPE.LABEL':'Tipo',
    			'OPEN.LABEL':'Apri',
    			'BACK.BUTTON': 'Back'
    		  });
	     	
	     	
	     	 $translateProvider.preferredLanguage(getLanguage());
	 	});
	 	
	 	
app.controller('pageCtrl', function($q,$scope,$http,$translate,$filter,irticketstatus,irticketcategory) {
		
	$scope.coreUrl=CORE_URL;
   	var coreUrl=getLocalStorageItem("org.cysoft.bss.ih.coreurl");
	
   	$scope.detail=false;
   	
	if (coreUrl==undefined || coreUrl=='undefined' || coreUrl=='' || $scope.coreUrl!=coreUrl)
		setLocalStorageItem("org.cysoft.bss.ih.coreurl",$scope.coreUrl);
	
	$scope.loadProgress=0;
	
	var currentDate_30=new Date();
	currentDate_30.setDate(currentDate_30.getDate()-90);
	
	$scope.dateFrom=dateToStringDDMMYYYY(currentDate_30);
	
	var pinImageRed=undefined;
	var pinImageGreen=undefined;
	var pinImageOrange=undefined;
	var pinImageGray=undefined;
	var pinImageGray=undefined;
    var center_coords=undefined;
	
	var pinShadow=undefined;
	if (typeof google==='object' && typeof google.maps==='object'){
		
		center_coords = new google.maps.LatLng(URBANBOT_DEFAULT_LATITUDE, URBANBOT_DEFAULT_LONGITUDE);
			
		pinImageRed = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000",
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));
		    
		pinImageGreen = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00FF00",
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));

		pinImageOrange = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFA500",
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));
		        
		pinImageGray = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|808080",
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));

		
		pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
		        new google.maps.Size(40, 37),
		        new google.maps.Point(0, 0),
		        new google.maps.Point(12, 35));
	}
	
	irticketstatus($scope.securityToken,languageCode).then(function(response) {
		if (response.data.resultCode==RESULT_OK){
			//alert (JSON.stringify(response));
			$scope.states=response.data.ticketStates;
			
			irticketcategory($scope.securityToken,languageCode).then(function(response) {
    			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.categories=response.data.ticketCategories;
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
	
	
	var $search = function() {
		
		var deferred = $q.defer();
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		
		var query="?text="+($scope.text!=undefined?encodeURIComponent($scope.text):'');
		query+="&categoryId="+($scope.selectedCategory!=undefined?encodeURIComponent($scope.selectedCategory):'');
		query+="&statusId="+($scope.selectedStatus!=undefined?encodeURIComponent($scope.selectedStatus):'');
		query+="&fromDate="+($scope.dateFrom!=undefined?encodeURIComponent($scope.dateFrom):'');
		query+="&toDate="+($scope.dateTo!=undefined?encodeURIComponent($scope.dateTo):'');
		
		//alert(query);
		
		callRestWs($http,'ticket/find'+query,'GET',
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
	
	var $setContentMarker = function(map,marker,ticket){
		
		var textColor='Orange';
		if (ticket.statusId==2){
			pinImage=pinImageRed;
			textColor='Red';
		}
		if (ticket.statusId==3){
			pinImage=pinImageGreen;
			textColor='Green';
		}
		if (ticket.statusId==4){
			pinImage=pinImageGray;
			textColor='Gray';
		}
		
		var person=(ticket.personId==0?'':(ticket.personFirstName==undefined 
				|| ticket.personFirstName=='null'?'':'['+ticket.personFirstName+']'));
		
		
		callRestWs($http,'ticket/'+ticket.id+'/getFiles','GET',
				{"Security-Token":$scope.securityToken},
				{},
				function(response){
					if (response.data.resultCode==RESULT_OK){
						var files=response.data.files;
						console.log("files="+JSON.stringify(files));
							
							
						var contentString = '<div id="content" style="overflow:auto; width:240px;height:100px;">';
						contentString+='<p><strong>#'+ticket.id+' '+person+' <span style="color:'+textColor+';">'+ticket.statusName+'</span> @'+ticket.creationDate+'</strong><br>';
						contentString+=''+ticket.text+'</p>';
						
						
						if (files.length>0){
							contentString+='<table border=1>';
							for(var k in files){
								
								contentString+='<tr class="small" valign="top"><td  style="padding: 2px;">';
								if (files[k].visibility=='P')
									contentString+='<a href="'+$scope.coreUrl+'/fileservice/file/'+
										files[k].id+'/download"><span class="glyphicon glyphicon-open">'+$filter('translate')('OPEN.LABEL')+'</span></a>';
								contentString+='</td>';
												
								contentString+='<td style="padding: 2px;">'+files[k].contentType+'</td>'+'<td style="padding: 2px;">'+files[k].fileType+'</td>';
								
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
		$scope.detail=false;
		
		if (!navigator.geolocation){
			alert("Geolocation API not supported.");
			return;
		}
        	
		
		$search().then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
				$scope.tickets=response.data.tickets;
				console.log("ticket.length="+$scope.tickets.length);
				
					
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
					for(var i in $scope.tickets){
						
						var ticket=$scope.tickets[i];
									
						var position=undefined;
						
						var min = .999999;
						var max = 1.000001;
						
						if (ticket.locationId==0 || ticket.location==undefined)
							position=new google.maps.LatLng(URBANBOT_DEFAULT_LATITUDE*(Math.random()*(max - min) + min), 
									URBANBOT_DEFAULT_LONGITUDE*(Math.random()*(max - min) + min));
						else
							position=new google.maps.LatLng(ticket.location.latitude*(Math.random()*(max - min) + min),
									ticket.location.longitude*(Math.random()*(max - min) + min));
						
						var pinImage=pinImageOrange;
						var textColor='Orange';
						if (ticket.statusId==2){
							pinImage=pinImageRed;
							textColor='Red';
						}
						if (ticket.statusId==3){
							pinImage=pinImageGreen;
							textColor='Green';
						}
						if (ticket.statusId==4){
							pinImage=pinImageGray;
							textColor='Gray';
						}
					
						var person=(ticket.personId==0?'':(ticket.personFirstName==undefined 
								|| ticket.personFirstName=='null'?'':'['+ticket.personFirstName+']'));
						
						var marker = new google.maps.Marker({
			                position: position, 
			                map: map,
			                icon: pinImage,
			                shadow: pinShadow,
			                title: '#'+ticket.id +' '+person 
			            });
						
						$setContentMarker(map,marker,ticket);
						
						marker_list.push(marker);
						 
						$scope.count++;
						$scope.loadProgress=$scope.count/$scope.tickets.length*100;
								
					} // for
					
					markerCluster = new MarkerClusterer(map, marker_list, {
					    gridSize:3,
					    minimumClusterSize: 2,
					    calculator: function(markers, numStyles) {
					    return {
					    	text: markers.length,
					    	index: numStyles
					    };
					    }
					});
				} //google
				
				
			if ($scope.tickets.length==0){
				
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
	
	var $ticket= function(id) {
			var deferred = $q.defer();
			var headers={"Security-Token":$scope.securityToken};
			
			callRestWs($http,'ticket/'+id+'/get','GET',
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
	
	var $ticketFiles=function(id) {
		var deferred = $q.defer();
		var headers={"Security-Token":$scope.securityToken};
		
		callRestWs($http,'ticket/'+id+'/getFiles','GET',
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
	
	
	//$showTicket
	$scope.showTicket=function(id){
		
		$ticket(id).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
				$scope.ticket=response.data.ticket;
				
				$ticketFiles(id).then(function(response) {
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
		
	}// $showTicket	
	
	
	$scope.onBack = function() {
		$scope.detail=false;
	}
	
	$scope.onSearch();
});
