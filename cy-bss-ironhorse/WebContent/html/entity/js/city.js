var languageCode=getLanguage();


$('#datepickerBirth').datepicker({
    autoclose:true,format: 'dd/mm/yyyy',language:languageCode
  }).on("changeDate", function(e){
   console.log('datepickerBirth:'+e.date);
});


var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irsearch','irlist'])
.config(function($translateProvider) {
 	$translateProvider
 	.translations('en',{
 		'SEARCH.BUTTON':'Search',
 		'BACK.BUTTON':'Back',
 		'CODE.LABEL':'Code',
 		'NAME.LABEL':'Name',
 		'STATEREGION.LABEL':'State/Region',
 		'COUNTRY.LABEL':'Country',
 		'LATITUDE.LABEL':'Latitude',
 		'LONGITUDE.LABEL':'Longitude',
 		'NEW.BUTTON':'New',
 		'EDIT.BUTTON':'Edit',
 		'DELETE.BUTTON':'Delete',
 		'CITY.TITLE':'City',
 		'NEW.TITLE':'New City',
 		'GENDER.LABEL':'Gender',
 		'MALE.GENDER':'Male',
 		'FEMALE.GENDER':'Female',
 		'BIRTHDAY.LABEL':'Birth Day',
 		'BORNCITY.LABEL':'Born City',
 		'MODIFY.TITLE':'Change City',
 		'NAME.REQUIRED':'Name is required',
 		'COUNTRY.REQUIRED':'Coutry is required',
 		'INS.OK': 'City inserted !',
		'UPD.OK': 'City changed !',
		'SUBMIT.BUTTON':'Submit',
		'DELETECONFIRM.MESSAGE': 'Are you sure to delete City ?',
		'LATITUDE.NUMBER':'Latitude is numeric',
 		'LONGITUDE.NUMBER':'Longitude is numeric'
 	  })
	  
	.translations('it',{
		'SEARCH.BUTTON':'Ricerca',
		'BACK.BUTTON':'Indietro',
		'CODE.LABEL':'Codice',
		'NAME.LABEL':'Nome',
 		'STATEREGION.LABEL':'Stato/Regione',
 		'COUNTRY.LABEL':"Paese",
 		'LATITUDE.LABEL':'Latitudine',
 		'LONGITUDE.LABEL':'Longitudine',
 		'NEW.BUTTON':'Nuova',
 		'EDIT.BUTTON':'Modifica',
 		'DELETE.BUTTON':'Cancella',
 		'CITY.TITLE':"Citta'",
 		'GENDER.LABEL':'Sesso',
 		'MALE.GENDER':'Maschio',
 		'FEMALE.GENDER':'Femmina',
 		'BIRTHDAY.LABEL':'Data di nascita',
 		'NEW.TITLE':"Nuova Citta'",
 		'BORNCITY.LABEL':"Citta' di nascita",
 		'MODIFY.TITLE':"Modifica Citta'",
 		'NAME.REQUIRED':'Nome obbligatorio',
 		'COUNTRY.REQUIRED':'Pase obbligatorio',
 		'INS.OK': "Citta' inserita !",
		'UPD.OK': "Citta' modificata !",
		'SUBMIT.BUTTON':'Submit',
		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare la Citta' ?",
		'LATITUDE.NUMBER':'Latitude numerica',
 		'LONGITUDE.NUMBER':'Longitude numerica'
		});
 	
 	
 	 $translateProvider.preferredLanguage(getLanguage());
	});


app.controller('pageCtrl', function($q,$scope,$http,$translate,ircountries,ircitysearch) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	ircountries($scope.securityToken).then(function(response) {
		if (response.data.resultCode==RESULT_OK){
			//alert (JSON.stringify(response));
			$scope.countries=response.data.countries;
		}
		else
		{
			manageError($scope,response.data.resultCode,response.data.resultDesc);
		}
    }, function(data, status, headers, config) {
    	manageError($scope,status,data);
    });
	
	
	$search=function(){
		
		ircitysearch($scope.name,$scope.stateRegion,$scope.selectedCuntry,$scope.securityToken).then(function(response) {
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
	}
	
	
	$scope.onSearch = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$search();
		
		}
	
	$scope.onBack = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.detail=false;
		if ($scope.cities!=undefined)
			$search();
	}
	
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		
		$scope._name='';
		$scope._code='';
		$scope._latitude='';
		$scope._longitude='';
		$scope._stateRegion='';
		$scope._selectedCountry='';
		
		
	}
		
		
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if  ($scope._name=='' || $scope._name==undefined ||  
			 $scope._selectedCountry=='' || $scope._selectedCountry==undefined ||
			 $scope.cityForm._latitude.$error.number ||  $scope.cityForm._longitude.$error.number)
			return;
	
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['name']=$scope._name;
		data['countryId']=$scope._selectedCountry;
		if ($scope._code!=undefined && $scope._code!='')
			data['code']=$scope._code;
		if ($scope._stateRegion!=undefined && $scope._stateRegion!='')
			data['stateRegion']=$scope._stateRegion;
		if ($scope._latitude!=undefined && $scope._latitude!='')
			data['latitude']=$scope._latitude;
		if ($scope._longitude!=undefined && $scope._longitude!='')
			data['longitude']=$scope._longitude;
		
				
		callRestWs($http,!$scope.modify?'city/add':'city/'+$scope.cityId+'/update','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							$scope.cityId=response.data.city.id;
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
	
	$scope.editCity = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'city/'+id+'/get','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$scope.cityId=response.data.city.id;
						$scope._name=response.data.city.name;
						$scope._stateRegion=response.data.city.stateRegion;
						$scope._code=response.data.city.code;
						$scope._latitude=response.data.city.latitude==0?'':response.data.city.latitude;
						$scope._longitude=response.data.city.longitude==0?'':response.data.city.longitude;
						$scope._selectedCountry=response.data.city.countryId==0?'':response.data.city.countryId;
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
	
	$scope.deleteCity = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'city/'+id+'/remove','GET',
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
	
	});

setMenuCntl(app);
