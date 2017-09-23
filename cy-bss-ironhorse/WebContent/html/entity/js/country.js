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
 		'NEW.BUTTON':'New',
 		'EDIT.BUTTON':'Edit',
 		'DELETE.BUTTON':'Delete',
 		'COUNTRY.TITLE':'Country',
 		'NEW.TITLE':'New Country',
 		'MODIFY.TITLE':'Change Country',
 		'NAME.REQUIRED':'Name is required',
 		'CODE.REQUIRED':'Code is required',
 	 	'INS.OK': 'Country inserted !',
		'UPD.OK': 'Country changed !',
		'SUBMIT.BUTTON':'Submit',
		'DELETECONFIRM.MESSAGE': 'Are you sure to delete Country ?'
 	  })
	  
	.translations('it',{
		'SEARCH.BUTTON':'Ricerca',
		'BACK.BUTTON':'Indietro',
		'CODE.LABEL':'Codice',
		'NAME.LABEL':'Nome',
 		'NEW.BUTTON':'Nuovo',
 		'EDIT.BUTTON':'Modifica',
 		'DELETE.BUTTON':'Cancella',
 		'COUNTRY.TITLE':"Paese",
 		'NEW.TITLE':'Nuovo Paese',
 		'MODIFY.TITLE':'Modifica Paese',
 		'NAME.REQUIRED':'Nome obbligatorio',
 		'CODE.REQUIRED':'Codice obbligatorio',
 		'INS.OK': "Paese inserito !",
		'UPD.OK': "Paese modificato !",
		'SUBMIT.BUTTON':'Submit',
		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare il Paese ?"
		});
 	
 	
 	 $translateProvider.preferredLanguage(getLanguage());
	});


app.controller('pageCtrl', function($q,$scope,$http,$translate,ircountrysearch) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	
	$search=function(){
		
		ircountrysearch($scope.name,$scope.securityToken).then(function(response) {
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
		if ($scope.countries!=undefined)
			$search();
	}
	
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		
		$scope._name='';
		$scope._code='';
		
	}
		
		
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if  ($scope._name=='' || $scope._name==undefined
			 || $scope._code=='' || $scope._code==undefined)
			return;
	
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['name']=$scope._name;
		data['code']=$scope._code;
				
		callRestWs($http,!$scope.modify?'country/add':'country/'+$scope.countryId+'/update','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							$scope.countryId=response.data.country.id;
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
	
	$scope.editCountry = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'country/'+id+'/get','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$scope.countryId=response.data.country.id;
						$scope._name=response.data.country.name;
						$scope._code=response.data.country.code;
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
	
	$scope.deleteCountry = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'country/'+id+'/remove','GET',
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
