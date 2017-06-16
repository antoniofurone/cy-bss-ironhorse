var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'SCALE.LABEL':'Scale',
     		'SEARCH.TITLE':'Scales',
     		'NEW.TITLE':'New Scale',
     		'MODIFY.TITLE':'Edit Scale',
     		'NAME.REQUIRED':'Name required',
     		'SIMBOL.REQUIRED':'Simbol required',
     		'SCALE.REQUIRED':'Scale required and numeric',
     		'METRIC.REQUIRED':'Metric required',
     		'NAME.LABEL':'Name',
     		'SIMBOL.LABEL':'Simbol',
     		'SCALE.LABEL':'Scale',
     		'METRIC.LABEL':'Metric',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'INS.OK': 'Scale added !',
		    'UPD.OK': 'Scale updated !',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete scale ?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
     		'SCALE.LABEL':'Scala',
     		'SEARCH.TITLE':'Scales',
     		'NEW.TITLE':'Nuova Scale',
     		'MODIFY.TITLE':'Modiifa Scala',
     		'NAME.REQUIRED':'Nome obbligatorio',
     		'SIMBOL.REQUIRED':'Simbolo obbligatorio',
     		'SCALE.REQUIRED':'Scala obbligatoria e numerica',
     		'METRIC.REQUIRED':'Metrica obbligatoria',
     		'NAME.LABEL':'Nome',
     		'SIMBOL.LABEL':'Simbolo',
     		'SCALE.LABEL':'Scala',
     		'METRIC.LABEL':'Metrica',
     		'SUBMIT.BUTTON':'Conferma',
		    'BACK.BUTTON': 'Indietro',
		    'INS.OK': 'Scala inserita !',
		    'UPD.OK': 'Scala modificata !',
		    'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare la scala?",
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages,irperson) {
	$scope.showList=true;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	callRestWs($http,'metric/getMetricAll','GET',{},{},
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
	
	
	$search=function(metricId){
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'metric/'+metricId+'/getMetricScaleAll','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.scales=response.data.metricScales;
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
	
	
	$scope.onSearch = function() {
		$scope.errorMessage="";
		
		if ($scope.selectedMetric==undefined || $scope.selectedMetric=='')
    		return;
		
		$search($scope.selectedMetric);
	}
	// end search
	
	$scope.onBack = function() {
		$scope.detail=false;
		$scope.errorMessage="";
		$scope.infoMessage="";
		if ($scope.selectedMetric!=undefined)
			$search($scope.selectedMetric);
	}
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope._name='';
		$scope._simbol='';
		$scope._scale='';
		$scope._selectedMetric=undefined;
		
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.scaleList._name.$error.required || $scope.scaleList._simbol.$error.required
			|| $scope.scaleList._scale.$error.required || $scope.scaleList._scale.$error.number
			|| $scope.scaleList._selectedMetric.$error.required) 
		return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['name']=$scope._name;
		data['simbol']=$scope._simbol;
		data['scale']=$scope._scale;
		data['metricId']=$scope._selectedMetric;
		if ($scope.modify)
			data['id']=$scope.scale_id;
		
		callRestWs($http,!$scope.modify?'metric/addMetricScale':'metric/'+$scope.scale_id+'/updateMetricScale','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							
   							$scope.scale_id=response.data.metricScale.id;
   							$scope.selectedMetric=$scope._selectedMetric;
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
	
	$scope.editScale = function(id){
		$scope.modify=true;
		$scope.detail=true;
		    	
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'metric/'+id+'/getMetricScale','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope._name=response.data.metricScale.name;
							$scope._simbol=response.data.metricScale.simbol;
							$scope._scale=response.data.metricScale.scale;
							$scope._selectedMetric=response.data.metricScale.metricId;
							$scope.scale_id=response.data.metricScale.id;
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
	
	$scope.deleteScale = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'metric/'+id+'/removeMetricScale','GET',
 					headers,
 					{},
 					function(response){
 							if (response.data.resultCode==RESULT_OK){
 								$search($scope.selectedMetric);							
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

