var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'PRICECOMPONENT.TITLE':'Price Components',
     		'MODIFY.TITLE':'Edit Component',
     		'CODE.LABEL':'Code',
     		'NAME.LABEL':'Name',
     		'DESCRIPTION.LABEL':'Description',
     		'PRICETYPE.LABEL':'Price Type',
     		'PERIODMETRIC.LABEL':'Period Metric',
     		'NAME.REQUIRED':'Name is required',
     		'CODE.REQUIRED':'Code is required',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'EDIT.BUTTON': 'Edit',
		    'INS.OK': 'Component added !',
		    'UPD.OK': 'Component updated !',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete Component?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'PRICECOMPONENT.TITLE':'Componenti di Prezzo',
			'MODIFY.TITLE':'Modifica Componente',
			'CODE.LABEL':'Codice',
     		'NAME.LABEL':'Nome',
			'DESCRIPTION.LABEL':'Descrizione',
			'PRICETYPE.LABEL':'Tipo di Prezzo',
			'PERIODMETRIC.LABEL':'Metrica di Periodo',
     		'CODE.REQUIRED':'Codice obbligatorio',
			'NAME.REQUIRED':'Nome obbligatorio',
			'SUBMIT.BUTTON':'Conferma',
    		'BACK.BUTTON': 'Indietro',
    		'EDIT.BUTTON': 'Modifica',
		    'INS.OK': 'Componente inserito !',
    		'UPD.OK': 'Componente modificato !',
    		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare il Componente?"
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$search=function(){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'price/getPriceComponentAll','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.components=response.data.components;
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
		
		if ($scope.priceComponentList._name.$error.required)
	    	return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['name']=$scope._name;
		data['description']=$scope._description;
		
		callRestWs($http,!$scope.modify?'price/addPriceComponet':'price/'+$scope.component_id+'/updatePriceComponent','POST',
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
	
	
	$scope.editComponent = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'price/'+id+'/getPriceComponent','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.component_id=response.data.component.id;
							$scope._code=response.data.component.code;
							$scope._name=response.data.component.name;
							$scope._description=response.data.component.description;
							$scope._priceType=response.data.component.priceType.name;
							$scope._periodMetric=response.data.component.periodMetricName;
							
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
