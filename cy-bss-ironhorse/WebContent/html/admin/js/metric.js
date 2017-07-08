var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'METRIC.TITLE':'Metrics',
     		'NEW.TITLE':'New Metric',
     		'MODIFY.TITLE':'Edit Metric',
     		'NAME.LABEL':'Name',
     		'NAME.REQUIRED':'Name is required',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'EDIT.BUTTON': 'Edit',
		    'DELETE.BUTTON': 'Delete',
		    'INS.OK': 'Metric added !',
		    'UPD.OK': 'Metric updated !',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete Metric?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'METRIC.TITLE':'Metriche',
			'NEW.TITLE':'Nuova Metrica',
			'MODIFY.TITLE':'Modifica Metrica',
			'NAME.LABEL':'Nome',
			'NAME.REQUIRED':'Nome obbligatorio',
			'SUBMIT.BUTTON':'Conferma',
    		'BACK.BUTTON': 'Indietro',
    		'EDIT.BUTTON': 'Modifca',
  		    'DELETE.BUTTON': 'Cancella',
  		    'INS.OK': 'Metrica inserita !',
    		'UPD.OK': 'Metrica modificata !',
    		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare la Metrica?"
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$search=function(){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'metric/getMetricAll','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.metrics=response.data.metrics;
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
		
		$scope._name='';
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.metricList._name.$error.required)
	    	return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['name']=$scope._name;
		
		callRestWs($http,!$scope.modify?'metric/addMetric':'metric/'+$scope.metric_id+'/updateMetric','POST',
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
	
	
	$scope.editMetric = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'metric/'+id+'/getMetric','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.metric_id=response.data.metric.id;
							$scope._name=response.data.metric.name;
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
	
	$scope.deleteMetric = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'metric/'+id+'/removeMetric','GET',
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
	// deleteMetric
}); 
   
setMenuCntl(app);
