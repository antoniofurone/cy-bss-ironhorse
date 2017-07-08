var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'OBJECT.LABEL':'Object',
     		'SEARCH.TITLE':'Attributes',
     		'NEW.TITLE':'New Attribute',
     		'MODIFY.TITLE':'Edit Attribute',
     		'NAME.REQUIRED':'Name required',
     		'OBJECT.REQUIRED':'Object required',
     		'TYPE.REQUIRED':'Type required',
     		'NAME.LABEL':'Name',
     		'OBJECTNAME.LABEL':'Object',
     		'ENTITYNAME.LABEL':'Entity',
     		'TYPE.LABEL':'Type',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'EDIT.BUTTON': 'Edit',
		    'DELETE.BUTTON': 'Delete',
		    'INS.OK': 'Attribute added !',
		    'UPD.OK': 'Attribute updated !',
		    'LANGUAGE.LABEL':'Language',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete attribute ?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'OBJECT.LABEL':'Oggetto',
			'SEARCH.TITLE':'Attributi',
			'NEW.TITLE':'Nuovo Attributo',
			'MODIFY.TITLE':'Modifica Attributo',
			'NAME.REQUIRED':'Nome obbligatorio',
	     	'OBJECT.REQUIRED':'Oggetto obbligatorio',
	     	'TYPE.REQUIRED':'Tipo obbligatorio',
     		'NAME.LABEL':'Nome',
     		'OBJECTNAME.LABEL':'Oggetto',
     		'ENTITYNAME.LABEL':"Entita'",
     		'TYPE.LABEL':'Tipo',
     		'SUBMIT.BUTTON':'Conferma',
    		'BACK.BUTTON': 'Indietro',
    		'EDIT.BUTTON': 'Modifca',
  		    'DELETE.BUTTON': 'Cancella',
  		    'INS.OK': 'Attributo inserito !',
    		'UPD.OK': 'Attributo modificato !',
    		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare l'attributo?",
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages,irperson) {
	$scope.showList=true;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	callRestWs($http,'object/getObjectAll','GET',{},{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.cyBssObjects=response.data.cyBssObjects;
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
				}, 
				function(data, status, headers, config){
						manageError($scope,status,data);
				});
	
	callRestWs($http,'object/getAttributeTypeAll','GET',{},{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.types=response.data.attributeTypes;
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
				}, 
				function(data, status, headers, config){
						manageError($scope,status,data);
				});
	
	
	$search=function(objectId){
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'object/'+objectId+'/getAttributes','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.attributes=response.data.attributes;
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
		
		if ($scope.selectedObject==undefined || $scope.selectedObject=='')
    		return;
		
		$search($scope.selectedObject);
	}
	// end search
	
	$scope.onBack = function() {
		$scope.detail=false;
		$scope.errorMessage="";
		$scope.infoMessage="";
		if ($scope.attributes!=undefined)
			$search($scope.selectedObject);
	}
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope._name='';
		$scope._selectedObject=undefined;
		$scope._selectedType=undefined;
		
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope._name=='' || $scope._selectedObject=='' || $scope._selectedType=='')
			return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['name']=$scope._name;
		data['typeId']=$scope._selectedType;
		data['objectId']=$scope._selectedObject;
		if ($scope.modify)
			data['id']=$scope.attribute_id;
		
		callRestWs($http,!$scope.modify?'object/addAttribute':'object/updateAttribute','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							
   							$scope.attribute_id=response.data.attribute.id;
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
	
	$scope.editAttribute = function(id){
		$scope.modify=true;
		$scope.detail=true;
		    	
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'object/'+id+'/getAttribute','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope._name=response.data.attribute.name;
							$scope._selectedObject=response.data.attribute.objectId;
							$scope._selectedType=response.data.attribute.typeId;
							$scope.attribute_id=response.data.attribute.id;
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
	
	$scope.deleteAttribute = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'object/'+id+'/removeAttribute','GET',
 					headers,
 					{},
 					function(response){
 							if (response.data.resultCode==RESULT_OK){
 								$search($scope.selectedObject);							
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

