var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'CURRENCY.TITLE':'Currencies',
     		'NEW.TITLE':'New Currency',
     		'MODIFY.TITLE':'Edit Currency',
     		'CODE.LABEL':'Code',
     		'NAME.LABEL':'Name',
     		'NAME.REQUIRED':'Name is required',
     		'CODE.REQUIRED':'Code is required',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'INS.OK': 'Currency added !',
		    'UPD.OK': 'Currency updated !',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete Currency?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'CURRENCY.TITLE':'Valute',
			'NEW.TITLE':'Nuova Valuta',
			'MODIFY.TITLE':'Modifica Valuta',
			'CODE.LABEL':'Codice',
			'NAME.LABEL':'Nome',
			'CODE.REQUIRED':'Codice obbligatorio',
			'NAME.REQUIRED':'Nome obbligatorio',
			'SUBMIT.BUTTON':'Conferma',
    		'BACK.BUTTON': 'Indietro',
    		'INS.OK': 'Valuta inserita !',
    		'UPD.OK': 'Valuta modificata !',
    		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare la Valuta?"
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$search=function(){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'metric/getCurrencyAll','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.currencies=response.data.currencies;
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
				}, 
				function(data, status, headers, config){
						manageError($scope,status,data);
				});
	};
	
	$search();
	
	$scope.onBack = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		
		$scope.detail=false;
		$search();
	}
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope._code='';
		$scope._name='';
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.currencyList._name.$error.required || $scope.currencyList._code.$error.required)
	    	return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['code']=$scope._code;
		data['name']=$scope._name;
		
		callRestWs($http,!$scope.modify?'metric/addCurrency':'metric/'+$scope.type_id+'/updateCurrency','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							$scope.type_id=response.data.type.id;
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
			
	}// end onSubmit
	
	
	$scope.editCurrency = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'metric/'+id+'/getCurrency','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.type_id=response.data.currency.id;
							$scope._code=response.data.currency.code;
							$scope._name=response.data.currency.name;
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
	
	$scope.deleteCurrency = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'metric/'+id+'/removeCurrency','GET',
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
	// deleteCurrency
}); 
   
setMenuCntl(app);
