var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'PRODUCTTYPE.TITLE':'Product Types',
     		'NEW.TITLE':'New Product Type',
     		'MODIFY.TITLE':'Edit Product Type',
     		'DESCRIPTION.LABEL':'Description',
     		'NAME.LABEL':'Name',
     		'NAME.REQUIRED':'Name is required',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'EDIT.BUTTON': 'Edit',
		    'DELETE.BUTTON': 'Delete',
		    'INS.OK': 'Type added !',
		    'UPD.OK': 'Type updated !',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete Type?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'PRODUCTTYPE.TITLE':'Tipi di Prodotto',
			'NEW.TITLE':'Nuovo Tipo di Prodotto',
			'MODIFY.TITLE':'Modifica Tipo di Prodotto',
			'DESCRIPTION.LABEL':'Descrizione',
			'NAME.LABEL':'Nome',
			'NAME.REQUIRED':'Nome obbligatorio',
			'SUBMIT.BUTTON':'Conferma',
    		'BACK.BUTTON': 'Indietro',
    		'EDIT.BUTTON': 'Modifca',
  		    'DELETE.BUTTON': 'Cancella',
  		    'INS.OK': 'Tipo di prodotto inserito !',
    		'UPD.OK': 'Tipo di prodotto modificato !',
    		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare il Tipo di Prodotto?"
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$search=function(){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'product/getTypeAll','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.types=response.data.types;
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
		$scope._description='';
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.productTypeList._name.$error.required)
	    	return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['name']=$scope._name;
		data['description']=$scope._description;
		
		callRestWs($http,!$scope.modify?'product/addType':'product/'+$scope.type_id+'/updateType','POST',
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
	
	
	$scope.editType = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'product/'+id+'/getType','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.type_id=response.data.type.id;
							$scope._name=response.data.type.name;
							$scope._description=response.data.type.description;
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
	
	$scope.deleteType = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'product/'+id+'/removeType','GET',
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
	// deleteUser
}); 
   
setMenuCntl(app);
