var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'CONTACTTYPE.TITLE':'Contact Types',
     		'NEW.TITLE':'New Contact Type',
     		'MODIFY.TITLE':'Edit Contact Type',
     		'DESCRIPTION.LABEL':'Description',
     		'NAME.LABEL':'Nome',
     		'NAME.REQUIRED':'Name is required',
     		'TYPE.LABEL':'Type',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'INS.OK': 'Contact Type added !',
		    'UPD.OK': 'Contact Type updated !',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete Contact Type?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'CONTACTTYPE.TITLE':'Tipologie di Contatto',
			'NEW.TITLE':'Nuova Tipologia Contatto',
			'MODIFY.TITLE':'Modifica Tipologia Contatto',
			'DESCRIPTION.LABEL':'Desrizione',
			'NAME.LABEL':'Nome',
			'NAME.REQUIRED':'Nome obbigatorio',
     		'TYPE.LABEL':'Tipo',
     		'SUBMIT.BUTTON':'Conferma',
    		'BACK.BUTTON': 'Indietro',
    		'INS.OK': 'Tipologia Contatto inserita !',
    		'UPD.OK': 'Tipologia Contatto modificata !',
    		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare la Tipologia Contatto?"
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages,irperson) {
	$scope.detail=false;
	
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$search=function(){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'contact/getContactTypeAll','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.contactTypes=response.data.contactTypes;
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
		$scope._type='';
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope._name=='')
    		return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['name']=$scope._name;
		data['description']=$scope._description;
		data['type']=$scope._type;
		
		callRestWs($http,!$scope.modify?'contact/addType':'contact/'+$scope.contactType_id+'/updateType','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							$scope.contactType_id=response.data.contactType.id;
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
	
	
	$scope.editUser = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'contact/'+id+'/getType','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.contactType_id=response.data.contactType.id;
							$scope._name=response.data.contactType.name;
							$scope._description=response.data.contactType.description;
							$scope._type=response.data.contactType.type;
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
	
	$scope.deleteUser = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'contact/'+id+'/removeType','GET',
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
