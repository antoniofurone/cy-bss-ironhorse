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

	
	var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irsearch','irlist'])
	.config(function($translateProvider) {
	 	$translateProvider
	 	.translations('en',{
	 		'SEARCH.BUTTON':'Search',
	 		'NEW.BUTTON':'Nuova',
	 		'BACK.BUTTON':'Back',
	 		'ADDFILE.BUTTON':'Add File',
	 		'NEW.TITLE':'New',
	 		'MODIFY.TITLE':'Change',
	 		'NAME.LABEL':'Name',
	 		'PERSONFIRSTNAME.LABEL':'Person First Name',
	 		'PERSONSECONDNAME.LABEL':'Person Second Name',
	 		'USERNAME.LABEL':'UserName',
	 		'LOCATIONTYPE.LABEL':'Type',
	 		'CREATIONDATE.LABEL':'Creation Date',
	 		'DESC.LABEL':'Description',
	 		'LATITUDE.LABEL':'Latitude',
	 		'LONGITUDE.LABEL':'Longitude',
	 		'CITY.LABEL':'City',
	 		'NAME.REQUIRED':'Name is required',
	 		'DESCRIPTION.REQUIRED':'Description is required',
	 		'LATITUDE.REQUIRED':'Latitude is required and numeric',
	 		'LONGITUDE.REQUIRED':'Longitude is required and numeric',
	 		'LANGUAGE.REQUIRED':'Language is required',
	 		'DATEFROM.LABEL':'From',
     		'DATETO.LABEL':'To',
     		'ADDRESS.LABEL':'Address',
     		'ZIPCODE.LABEL':'Zip Code',
     		'INS.OK': 'Location inserted !',
			'UPD.OK': 'Location changed !',
			'DELETECONFIRM.MESSAGE': 'Are you sure to delete Location?',
			'ATTACCHEDFILES.LABEL':'Files',	
			'LANGUAGES.LABEL':'Languages',
			'LANGUAGE.LABEL':'Language',
			'OPEN.LABEL':'Open',
			'FILENAME.LABEL':'File Name',
			'FILETYPE.LABEL':'Type',
			'FILESIZE.LABEL':'File Size',
			'CONTENTTYPE.LABEL':'Content Type',
			'NOTE.LABEL':'Note',
			'DELETEFILECONFIRM.MESSAGE': 'Are you sure to delete File?',
			'ADDLANGUAGE.BUTTON':'Add Language',		
			'REMOVELANGUAGE.BUTTON':'Remove Language',
     		'EDIT.BUTTON':'Edit',
     		'SUBMIT.BUTTON':'Submit',
     		'DELETE.BUTTON':'Delete'
     		
     	  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'New',
			'BACK.BUTTON':'Indietro',
			'ADDFILE.BUTTON':'Aggiungi File',
			'NEW.TITLE':'Nuova',
	 		'MODIFY.TITLE':'Modifica',
	 		'NAME.LABEL':'Nome',
	 		'PERSONFIRSTNAME.LABEL':'Nome Persona',
	 		'PERSONSECONDNAME.LABEL':'Cognome Persona',
	 		'USERNAME.LABEL':'UserName',
	 		'LOCATIONTYPE.LABEL':'Tipo',
	 		'CREATIONDATE.LABEL':'Data Creazione',
	 		'DESC.LABEL':'Descrizione',
	 		'LATITUDE.LABEL':'Latitudine',
	 		'LONGITUDE.LABEL':'Longitudine',
	 		'DATEFROM.LABEL':'Dal',
     		'DATETO.LABEL':'Al',
     		'ADDRESS.LABEL':'Indirizzo',
     		'ZIPCODE.LABEL':'Cap',
     		'CITY.LABEL':"Citta'",
     		'NAME.REQUIRED':'Nome obbligatorio',
     		'DESCRIPTION.REQUIRED':'Descrizione obbligatoria',
	 		'LATITUDE.REQUIRED':'Latitudine obbligatoria e numerica',
	 		'LONGITUDE.REQUIRED':'Longitudine obbligatoria e numerica',
	 		'LANGUAGE.REQUIRED':'Lingua Obbligatoria',
	 		'INS.OK': 'Location inserita !',
			'UPD.OK': 'Location modificata !',
			'DELETECONFIRM.MESSAGE': 'Sei sicuro di cancellare la Location ?',
			'ATTACCHEDFILES.LABEL':'Files',
			'LANGUAGES.LABEL':'Linguaggi',
			'LANGUAGE.LABEL':'Lingua',
			'OPEN.LABEL':'Apri',
			'FILENAME.LABEL':'Nome File',
			'FILETYPE.LABEL':'Tipo',
			'FILESIZE.LABEL':'Dimensioni',
			'CONTENTTYPE.LABEL':'Content Type',
			'NOTE.LABEL':'Nota',
			'DELETEFILECONFIRM.MESSAGE': 'Sei sicuro di cancellare il File ?',
			'ADDLANGUAGE.BUTTON':'Aggiungi Lingua',
			'REMOVELANGUAGE.BUTTON':'Cancella Lingua',
			'EDIT.BUTTON':'Modifica',
	 		'SUBMIT.BUTTON':'Submit',
     		'DELETE.BUTTON':'Cancella'
     	  });
	 	
	 	
	 	 $translateProvider.preferredLanguage(getLanguage());
		});

	app.directive('fileModel', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);
	
	
	app.service('fileUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(uploadUrl,$scope){
	    	var file = $scope.file;
	        console.log('file is ' );
	        console.dir(file);
	        var name = $scope._fileName;
	        console.log('file name = '+name);
	        var fileType = $scope._fileType;
	        console.log('file type = '+fileType);
	        var entityName = 'Location';
	        console.log('entity name = '+entityName);
	        var entityId = $scope.locationId;
	        console.log('entity id = '+entityId);
	        var note = $scope._fileNote;
	        console.log('note = '+note);
	        
	    	
	    	var fd = new FormData();
	    	fd.append('file', file);
	        if (name!=undefined)
	    		fd.append('name', name);
	        if (fileType!=undefined)
	        	fd.append('fileType', fileType);
	        if (entityName!=undefined)
	        	fd.append('entityName', entityName);
	        fd.append('entityId', entityId);
	        if (note!=undefined)
	        	fd.append('note', note);
	        
	        
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined, 'Security-Token':$scope.securityToken}
	        })
	        .success(function(response){
	        	$scope._fileName='';
	        	$scope._fileType='';
	        	$scope._fileNote='';
	        	$scope.file='';
	        	
	        	var headers={"Security-Token":$scope.securityToken};
				
				callRestWs($http,'location/'+$scope.locationId+'/getFiles','GET',
						{"Security-Token":$scope.securityToken},
						{},
						function(response){
							$scope.files=response.data.files;
					}, 
					function(data, status, headers, config){
						manageError($scope,status,data);
					});
		
			
	        })
	        .error(function(data, status, headers, config){
	        	$scope.errorMessage=status+" "+data;
	        });
	    }
	    
	    this.makeOperation = function(removeUrl,$scope){
	    	var request = '{"method": "GET","url": "'+removeUrl+'", "headers": {"Security-Token": "'+$scope.securityToken+'"}}';
			$http(JSON.parse(request)).then(
	    			function(response){
	    				$scope.response=JSON.stringify(response);
	    			}, 
	    			function(data, status, headers, config){
	    				$scope.errorMessage=status+" "+data;
	    	});
	    }
	    
	}]);

	
	app.controller('pageCtrl', function($q,$scope,$http,$translate,ircities,irlanguages,fileUpload) {
		$scope.detail=false;
		$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
		$scope.coreUrl=getLocalStorageItem("org.cysoft.bss.ih.coreurl");
		
		ircities($scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
				$scope.cities=response.data.cities;
			}
			else
			{
				manageError($scope,response.data.resultCode,response.data.resultDesc);
			}
	    }, function(data, status, headers, config) {
	    	manageError($scope,status,data);
	    });
		
		irlanguages($scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
				$scope.languages=response.data.languages;
			}
			else
			{
				manageError($scope,response.data.resultCode,response.data.resultDesc);
			}
	    }, function(data, status, headers, config) {
	    	manageError($scope,status,data);
	    });
		
		
		$scope.uploadFile = function(){
		       	$scope.errorMessage='';
		       	$scope.result='';
		       	
		    	var uploadUrl = "/cy-bss-core/fileservice/file/upload";
		        fileUpload.uploadFileToUrl(uploadUrl,$scope);
					
		 };
		   
		
		$search=function(){
			var query="?name="+($scope.name!=undefined?encodeURIComponent($scope.name):'');
			query+="&locationType="+($scope.locationType!=undefined?encodeURIComponent($scope.locationType):'');
			query+="&fromDate="+($scope.dateFrom!=undefined?encodeURIComponent($scope.dateFrom):'');
			query+="&toDate="+($scope.dateTo!=undefined?encodeURIComponent($scope.dateTo):'');
			
			callRestWs($http,'location/find'+query,'GET',
					{"Security-Token":$scope.securityToken,"Language":LOCATION_DEFAULT_LANGUAGE},
					{},
					function(response){
						if (response.data.resultCode==RESULT_OK){
							//alert (JSON.stringify(response));
							$scope.locations=response.data.locations;
						}
					else
						{
							manageError($scope,response.data.resultCode,response.data.resultDesc);
						}					
					}, 
					function(data, status, headers, config){
						manageError($scope,status,data);	
			});
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
		
		
		
		$scope.addLanguage = function() {
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			if ($scope._nameLang=='' || $scope._nameLang==undefined 
				|| $scope._selectedLangId==''	|| $scope._selectedLangId==undefined 
				|| $scope._descriptionLang=='' || $scope._descriptionLang==undefined)
				return;
			
			var headers={"Security-Token":$scope.securityToken};
			var data = {};
			data['langId']=$scope._selectedLangId;
			data['name']=$scope._nameLang;
			data['description']=$scope._descriptionLang;
			
			
			callRestWs($http,'location/'+$scope.locationId+'/addUpdLang','POST',
					headers,
					data,
					function(response){
						if (response.data.resultCode==RESULT_OK){
							
							$translate('UPD.OK')
		    	          		.then(function (translatedValue) {
		    	              		$scope.infoMessage=translatedValue;
		    	          		});
							
							$scope._langId=$scope._selectedLangId;
							
						}
						else
						{
							manageError($scope,response.data.resultCode,response.data.resultDesc);
						}
					}, 
					function(data, status, headers, config){
							manageError($scope,status,data);
					});
				
			}
		
		
		$scope.removeLanguage = function() {
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			if ($scope._selectedLangIdt==''	|| $scope._selectedLangId==undefined) 
				return;
			
			var headers={"Security-Token":$scope.securityToken};
			callRestWs($http,'location/'+$scope.locationId+'/removeLang/'+$scope._selectedLangId,'GET',
					headers,
					{},
					function(response){
						if (response.data.resultCode==RESULT_OK){
						
							$translate('UPD.OK')
	    	          		.then(function (translatedValue) {
	    	              		$scope.infoMessage=translatedValue;
	    	          		});
							
							$scope._selectedLangId='';
							$scope._nameLang='';
							$scope._descriptionLang='';
						}
						else
						{
							manageError($scope,response.data.resultCode,response.data.resultDesc);
						}
					}, 
					function(data, status, headers, config){
							manageError($scope,status,data);
					});
			
			}
		
		
		
		$scope.onSearch = function() {
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			$search();
			
			}
		
		
		$scope.onSelectLang = function() {
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			
			var languageCode='';
			for(var i=0;i<$scope.languages.length;i++){
				var lang=$scope.languages[i];
				if (lang.id==$scope._selectedLangId){
					languageCode=lang.code;
					break;
				}
			}
			//alert(languageCode);
			var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
			callRestWs($http,'location/'+$scope.locationId+'/get','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							//console.log(JSON.stringify(response));
							$scope._descriptionLang=response.data.location.description;
							$scope._nameLang=response.data.location.name;
							$scope._langId=response.data.location.langId;
							
						}
						else
						{
							manageError($scope,response.data.resultCode,response.data.resultDesc);
						}
					}, 
					function(data, status, headers, config){
							manageError($scope,status,data);
					});
			
			}
		
		$scope.onBack = function() {
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			$scope.detail=false;
			if ($scope.locations!=undefined)
				$search();
		}
		
		$scope.onNew = function() {
			$scope.detail=true;
			$scope.modify=false;
			
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			
			$scope.locationId=0;
			$scope._name='';
			$scope._latitude='';
			$scope._longitude='';
			$scope._locationType='';
			$scope._creationDate='';
			$scope._personFirstName='';
			$scope._personSecondName='';
			$scope._userName='';
			$scope._description='';
			$scope._address='';
			$scope._zipCode='';
			$scope._selectedCityId='';
			
			$scope._fileName='';
        	$scope._fileType='';
        	$scope._fileNote='';
        	$scope.file='';
        	$scope.files=undefined;
        	
        	$scope._selectedLangId='';
			$scope._nameLang='';
			$scope._descriptionLang='';
			
			}
		
		
		$scope.onSubmit = function() {
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			
			if ($scope._name=='' || $scope._name==undefined 
				|| $scope._latitude=='' || $scope._latitude==undefined || $scope.locationForm._latitude.$error.number
				|| $scope._longitude=='' || $scope._longitude==undefined || $scope.locationForm._longitude.$error.number)
				return;
		
			//alert('onSubmit !'+$scope._name+"-"+ $scope._latitude+"-"+$scope._longitude);
			
			
			var headers={"Security-Token":$scope.securityToken};
			var data = {};
			data['name']=$scope._name;
			data['latitude']=$scope._latitude;
			data['longitude']=$scope._longitude;
			if ($scope._locationType!=undefined && $scope._locationType!='')
				data['locationType']=$scope._locationType;
			if ($scope._description!=undefined && $scope._description!='')
				data['description']=$scope._description;
			if ($scope._address!=undefined && $scope._address!='')
				data['address']=$scope._address;
			if ($scope._zipCode!=undefined && $scope._zipCode!='')
				data['zipCode']=$scope._zipCode;
			if ($scope._selectedCityId!=undefined && $scope._selectedCityId!='')
				data['cityId']=$scope._selectedCityId;
			
			
			callRestWs($http,!$scope.modify?'location/add':'location/'+$scope.locationId+'/update','POST',
					headers,
					data,
					function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.locationId=response.data.location.id;
							
							if (!$scope.modify){
	   							$translate('INS.OK')
	   		    	          		.then(function (translatedValue) {
	   		    	              		$scope.infoMessage=translatedValue;
	   		    	              		
	   		    	            var headers={"Security-Token":$scope.securityToken,"Language":LOCATION_DEFAULT_LANGUAGE};
	   		    	 			callRestWs($http,'location/'+$scope.locationId+'/get','GET',
	   		    	 				headers,
	   		    	 				{},
	   		    	 				function(response){
	   		    	 						if (response.data.resultCode==RESULT_OK){
	   		    	 							//console.log(JSON.stringify(response));
	   		    	 							$scope._creationDate=response.data.location.creationDate;
	   		    	 							$scope._personFirstName=response.data.location.personFirstName;
	   		    	 							$scope._personSecondName=response.data.location.personSecondName;
	   		    	 							$scope._userName=response.data.location.userName;
	   		    	 						}
	   		    	 						else
	   		    	 						{
	   		    	 							manageError($scope,response.data.resultCode,response.data.resultDesc);
	   		    	 						}
	   		    	 					}, 
	   		    	 					function(data, status, headers, config){
	   		    	 							manageError($scope,status,data);
	   		    	 					});  		
	   		    	              		
	   		    	          	});
	   							
	   							
							}
							else {
								$translate('UPD.OK')
		    	          		.then(function (translatedValue) {
		    	              		$scope.infoMessage=translatedValue;
		    	          		});
							}
							$scope.modify=true;
						}
						else
						{
							manageError($scope,response.data.resultCode,response.data.resultDesc);
						}
					}, 
					function(data, status, headers, config){
							manageError($scope,status,data);
					});
		
		}
		
		
		$scope.editLoc = function(id){
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			$scope.modify=true;
			$scope.detail=true;
			
			var headers={"Security-Token":$scope.securityToken,"Language":LOCATION_DEFAULT_LANGUAGE};
			callRestWs($http,'location/'+id+'/get','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							//console.log(JSON.stringify(response));
							$scope.locationId=response.data.location.id;
							$scope._creationDate=response.data.location.creationDate;
							$scope._description=response.data.location.description;
							$scope._name=response.data.location.name;
							$scope._locationType=response.data.location.locationType;
							$scope._address=response.data.location.address;
							$scope._selectedCityId=response.data.location.cityId==0?'':response.data.location.cityId;
							$scope._zipCode=response.data.location.zipCode;
							$scope._personFirstName=response.data.location.personFirstName;
							$scope._personSecondName=response.data.location.personSecondName;
							$scope._latitude=response.data.location.latitude;
							$scope._longitude=response.data.location.longitude;
							$scope._userName=response.data.location.userName;
							
							$scope._selectedLangId='';
							$scope._nameLang='';
							$scope._descriptionLang='';
							
							$locationFiles(id).then(function(response) {
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
					}, 
					function(data, status, headers, config){
							manageError($scope,status,data);
					});
		}
		
		
		$scope.deleteLoc = function(id){
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			$translate('DELETECONFIRM.MESSAGE')
         		.then(function (translatedValue) {
         			if (!confirm(translatedValue))
        				return;
        			
         			var headers={"Security-Token":$scope.securityToken};
        			callRestWs($http,'location/'+id+'/remove','GET',
        					headers,
        					{},
        					function(response){
        							if (response.data.resultCode==RESULT_OK){
        								$search();							
        							}
        							else
        							{
        								manageError($scope,response.data.resultCode,response.data.resultDesc);
        							}
        						}, 
        						function(data, status, headers, config){
        								manageError($scope,status,data);
        						});
         	});
		}
		
		$scope.deleteFile = function(fileId) {
			$scope.errorMessage="";
			$scope.infoMessage="";
			
			$translate('DELETEFILECONFIRM.MESSAGE')
     		.then(function (translatedValue) {
     			if (!confirm(translatedValue))
    				return;
     			var headers={"Security-Token":$scope.securityToken};
				callFileServiceWs($http,'file/'+fileId+'/remove','GET',
						headers,
						{},
						function(response){
							if (response.data.resultCode==RESULT_OK){
								
								$locationFiles($scope.locationId).then(function(response) {
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
						}, 
						function(data, status, headers, config){
							manageError($scope,status,data);
						});
     			
     		});
		};


	});

	setMenuCntl(app);