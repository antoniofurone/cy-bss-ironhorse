var languageCode=getLocalStorageItem("org.cysoft.bss.ih.user.languageCode");

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
	     		'SEARCH.BUTTON':'Search',
	     		'CATEGORY.LABEL':'Category',
	     		'STATUS.LABEL':'Status',
	     		'NEWSTATUS.LABEL':'New Status',
	     		'PERSID.LABEL':'Person Id',
	     		'DATEFROM.LABEL':'From',
	     		'DATETO.LABEL':'To',
	     		'DATECRE.LABEL':'Creation Date',
	     		'TEXT.LABEL':'Text',
	     		'NOTE.LABEL':'Note',
	     		'BACK.BUTTON': 'Back',
	     		'CHANGESTATUS.BUTTON': 'Change',
	     		'OWNER.LABEL':'Owner',
	     		'STARTSTATUS.LABEL':'Start Status',
	     		'ENDSTATUS.LABEL':'End Status',
	     		'USERNAME.LABEL':'User Name',
	     		'DATETRANS.LABEL':'Date',
	     		'FILENAME.LABEL':'File Name',
	     		'FILESIZE.LABEL':'Size (Byte)',
	     		'CONTENTTYPE.LABEL':'Content Type',
	     		'OPEN.LABEL':'Open',
	     		'TICKETDETAIL.TITLE':'Ticket Detail',
	     		'CHANGESTATUS.LABEL':'Change Status',
	     		'ATTACCHEDFILES.LABEL':'Attacched Files',
	     		'STATUSTRACE.LABEL':'Status Trace'
	     	  })
    		  
    		.translations('it',{
    			'SEARCH.BUTTON':'Ricerca',
    			'CATEGORY.LABEL':'Categoria',
    			'PERSID.LABEL':'Id Persona',
    			'STATUS.LABEL':'Stato',
    			'NEWSTATUS.LABEL':'Nuovo Stato',
    			'DATEFROM.LABEL':'Dal',
    			'DATETO.LABEL':'Al',
    			'DATECRE.LABEL':'Data Creazione',
    			'TEXT.LABEL':'Testo',
    			'NOTE.LABEL':'Nota',
	     		'BACK.BUTTON': 'Indietro',
	     		'CHANGESTATUS.BUTTON': 'Modifica',
	     		'OWNER.LABEL':'Proprietario',
	     		'STARTSTATUS.LABEL':'Stato Iniziale',
	     		'ENDSTATUS.LABEL':'Stato Finale',
	     		'USERNAME.LABEL':'Nome Utente',
	     		'DATETRANS.LABEL':'Data',
	     		'FILENAME.LABEL':'Nome File',
	     		'FILESIZE.LABEL':'Dimensioni (Byte)',
	     		'CONTENTTYPE.LABEL':'Content Type',
	     		'OPEN.LABEL':'Apri',
	     		'TICKETDETAIL.TITLE':'Dettaglio Ticket',
	     		'CHANGESTATUS.LABEL':'Modifica Stato',
	     		'ATTACCHEDFILES.LABEL':'File Allegati',
	     		'STATUSTRACE.LABEL':'Trace degli Stati'
	    	  });
	     	
	     	
	     	 $translateProvider.preferredLanguage(getLanguage());
	 	});
	
	
	app.controller('pageCtrl', function($q,$scope,$http,$translate,irticketstatus,irticketcategory,irticketnextstates) {
		
			$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
			$scope.coreUrl=getLocalStorageItem("org.cysoft.bss.ih.coreurl");
			
			
			irticketstatus($scope.securityToken).then(function(response) {
    			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.states=response.data.ticketStates;
					
					irticketcategory($scope.securityToken).then(function(response) {
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
				var headers={"Security-Token":$scope.securityToken};
				
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
			
			var $ticketStatusTrace=function(id) {
				var deferred = $q.defer();
				var headers={"Security-Token":$scope.securityToken};
				
				callRestWs($http,'ticket/'+id+'/getStatusTrace','GET',
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
			
			
			var $ticketChangeStatus=function(id,statusId,note) {
				var deferred = $q.defer();
				var headers={"Security-Token":$scope.securityToken};
				
				var data = {};
				
	    		data['statusId']=statusId;
	    		if ($scope.note!=undefined && $scope.note!='')
	    			data['note']=note;
	    		
				callRestWs($http,'ticket/'+id+'/changeStatus','POST',
						{"Security-Token":$scope.securityToken},
						data,
						function(response){
								deferred.resolve(response);
							}, 
							function(data, status, headers, config){
								deferred.reject(data, status, headers, config);
							});
				return deferred.promise;
			}
			
			var $ticketDetail=function(id){
				$ticket(id).then(function(response) {
	    			if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.ticket=response.data.ticket;
						irticketnextstates($scope.securityToken,$scope.ticket.statusId).then(function(response) {
			    			if (response.data.resultCode==RESULT_OK){
								//alert (JSON.stringify(response));
								$scope.newStates=response.data.ticketStates;
								
								$ticketStatusTrace(id).then(function(response) {
					    			if (response.data.resultCode==RESULT_OK){
										//alert (JSON.stringify(response));
										$scope.statusTraces=response.data.statusTraces;
									
										$ticketFiles(id).then(function(response) {
							    			if (response.data.resultCode==RESULT_OK){
												//alert (JSON.stringify(response));
												$scope.files=response.data.files;
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
							}
							else
							{
								manageError($scope,response.data.resultCode,response.data.resultDesc);
							}
			    	    }, function(data, status, headers, config) {
			    	    	manageError($scope,status,data);
			    	    });
						
						if (navigator.geolocation)
			            {
							if ($scope.ticket.location!=undefined){
								var latitude = $scope.ticket.location.latitude;
								var longitude = $scope.ticket.location.longitude;
								var coords = new google.maps.LatLng(latitude, longitude);
	
				                var mapOptions = {
				                zoom: 15,
				                center: coords,
				                mapTypeControl: true,
				                mapTypeId: google.maps.MapTypeId.ROADMAP
				            	};
								
				              	//create the map
				                map = new google.maps.Map(
				                document.getElementById("mapPlaceholder"), mapOptions
				                );
					   			
				                var marker = new google.maps.Marker({
				                    position: coords,
				                    map: map,
				                    title: $scope.ticket.text
				                    });
				            
				                google.maps.event.addDomListener(window, 'resize', function() {
									map.setCenter(coords);
									});
							}
							
			            }
			            else
			            {
			               alert("Geolocation API not supported.");
			            }
						
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
	    	    }, function(data, status, headers, config) {
	    	    	manageError($scope,status,data);
	    	    });
				
			}// $ticketDetail	
			
			$scope.onSearch = function() {
	    		$scope.errorMessage="";
	    		$scope.infoMessage="";
	    		
	    		$search().then(function(response) {
	    			if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.tickets=response.data.tickets;
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
	    	    }, function(data, status, headers, config) {
	    	    	manageError($scope,status,data);
	    	    });
	    	}
			
			
			$scope.onChangeStatus = function(ticketId) {
				$scope.errorMessage="";
	    		$scope.infoMessage="";
	    		
				$ticketChangeStatus(ticketId,$scope.selectedStatusNew,$scope.note).then(function(response) {
	    			if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.note='';
						$ticketDetail(ticketId);
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
	    	    }, function(data, status, headers, config) {
	    	    	manageError($scope,status,data);
	    	    });
	    	}
			
			
			$scope.editTicket = function(id) {
				$scope.detail=true;
				$scope.errorMessage="";
	    		$scope.infoMessage="";
	    		
				$ticketDetail(id);
			}
		    	
			$scope.onBack = function() {
	    		$scope.detail=false;
	    		$scope.errorMessage="";
	    		$scope.infoMessage="";
	    		
	    		$search().then(function(response) {
	    			if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.tickets=response.data.tickets;
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
	    	    }, function(data, status, headers, config) {
	    	    	manageError($scope,status,data);
	    	    });
			}
    		
	}); 
	// end pageListCtrl
	setMenuCntl(app);