var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'USERNAME.LABEL':'User Name',
     		'SEARCH.TITLE':'Search Users',
     		'NEW.TITLE':'New User',
     		'MODIFY.TITLE':'Edit User',
     		'USERID.LABEL':'User Id',
     		'USER_ID.REQUIRED':'User Id required',
     		'PWD.LABEL':'Password',
     		'PWD.REQUIRED':'Password required',
     		'CONFPWD.LABEL':'Confirm Password',
     		'CONFPWD.REQUIRED':'Confirm Password required',
     		'NAME.LABEL':'Name',
     		'NAME.REQUIRED':'Name required',
     		'ROLE.LABEL':'Role',
     		'ROLE.REQUIRED':'Role required',
    		'LANGUAGE.LABEL':'Language',
     		'LANGUAGE.REQUIRED':'Language required',
			'SUBMIT.BUTTON':'Submit',
		    'RESET.BUTTON': 'Reset',
		    'BACK.BUTTON': 'Back',
		    'PWD.DIFF': 'Password different from Confirm Password. Please Check !',
		    'INS.OK': 'User added !',
		    'UPD.OK': 'User updated !',
		    'ROLE.LABEL':'Role',
		    'LANGUAGE.LABEL':'Language',
		    'ACTIVE.LABEL':'Active',
		    'ASSOCPERSON.LABEL':'Set Person',
		    'FIRSTNAME.LABEL':'First Name',
		    'SECONDNAME.LABEL':'Second Name',    		    
			'PERSON.LABEL':'Person',
			'SETPERSON.BUTTON':'Set Person',
			'DELETECONFIRM.MESSAGE': 'Are you sure to delete User?',
			'PERSON.REQUIRED':'Person required'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'USERNAME.LABEL':'Nome Utente',
			'SEARCH.TITLE':'Ricerca Utenti',
			'NEW.TITLE':'Nuovo Utente',
			'MODIFY.TITLE':'Modifica Utente',
			'USERID.LABEL':'User Id',
			'USER_ID.REQUIRED':'User Id obbligatorio',
			'PWD.LABEL':'Password',
     		'PWD.REQUIRED':'Password obbligatoria',
    		'CONFPWD.LABEL':'Conferma Password',
     		'CONFPWD.REQUIRED':'Conferma Password obbligatoria',
     		'NAME.LABEL':'Nome',
     		'NAME.REQUIRED':'Nome obbligatorio',
    		'LANGUAGE.LABEL':'Lingua',
     		'LANGUAGE.REQUIRED':'Lingua obbligatoria',
			'SUBMIT.BUTTON':'Conferma',
    		'RESET.BUTTON': 'Reset',
    		'BACK.BUTTON': 'Indietro',
    		'PWD.DIFF': 'Password differente da Confirm Password. Verifica, Grazie !',
    		'INS.OK': 'Utente inserito !',
    		'UPD.OK': 'Utente modificato !',
    		'ROLE.LABEL':'Ruolo',
    		'LANGUAGE.LABEL':'Linguaggio',
    		'ACTIVE.LABEL':'Attivo',
    		'ASSOCPERSON.LABEL':'Associa Persona',
    		'FIRSTNAME.LABEL':'Nome',
		    'SECONDNAME.LABEL':'Cognome',
			'PERSON.LABEL':'Persona',
			'SETPERSON.BUTTON':'Associa Persona',
			'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare l'utente?",
			'PERSON.REQUIRED':'Persona obbligatoria'
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages,irperson) {
	$scope.showList=true;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$scope.onSearch = function() {
		$scope.errorMessage="";
		search($http,$scope);
	}
	// end search
	
	$scope.onBack = function() {
		resetForm($scope);
		$scope.showList=true;
		if ($scope.users!=undefined)
			search($http,$scope);
	}
	
	$scope.onNew = function() {
		$scope.showList=false;
		$scope.modify=false;
		
		resetForm($scope);
		
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
		
		iruserroles($scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.roles=response.data.roles;
				}
				else
				{
					manageError($scope,response.data.resultCode,response.data.resultDesc);
				}
	    }, function(data, status, headers, config) {
	    	manageError($scope,status,data);
	    });
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		$scope.personFirstName="";
		$scope.personSecondName="";
		
		
		if (!$scope.modify) {
			// add
			if ($scope.userId=='' || $scope.name=='' || $scope.pwd=='' || $scope.confPwd==''
				|| $scope.selectedRole=='' || $scope.selectedLanguage=='' )
    			return;
		
    		if ($scope.pwd!=$scope.confPwd){
    			$translate('PWD.DIFF')
    	          .then(function (translatedValue) {
    	              $scope.errorMessage=translatedValue;
    	          }); 
    			return;
    			}
			}
		else
			{
			// modify
			if ($scope.userId=='' || $scope.name=='')					
				return;
			}
		
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['userId']=$scope.userId;
		data['name']=$scope.name;
		data['pwd']=$scope.pwd;
		data['roleId']=$scope.selectedRole;
		data['languageId']=$scope.selectedLanguage;
		if ($scope.modify)
			data['id']=$scope.user_id;
		
		callRestWs($http,!$scope.modify?'user/add':'user/'+$scope.user_id+'/update','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
						}
						else {
							$translate('UPD.OK')
	    	          		.then(function (translatedValue) {
	    	              		$scope.infoMessage=translatedValue;
	    	          		});
						}
						
						$scope.modify=true;
						
						callRestWs($http,'user/getByUserId?userId='+$scope.userId,'GET',
			    				headers,
			    				{},
			    				function(response){
			   						if (response.data.resultCode==RESULT_OK){
			   							$scope.user_id=response.data.user.id;
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
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
				}, 
				function(data, status, headers, config){
						manageError($scope,status,data);
				});
			
	}// end onSubmit
	
	$scope.onReset = function() {
		resetForm($scope);
	}// end onReset
	
	
	$scope.editUser = function(id){
		$scope.modify=true;
		$scope.showList=false;
		$scope.selectedPerson=undefined;
		$scope.persons=undefined;
    	
		irlanguages($scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
				$scope.languages=response.data.languages;
				
				iruserroles($scope.securityToken).then(function(response) {
	    			if (response.data.resultCode==RESULT_OK){
							//alert (JSON.stringify(response));
							$scope.roles=response.data.roles;
							readUser($http,$scope,id);
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
	    }, function(data, status, headers, config) {
	    	manageError($scope,status,data);
	    });
		
		
	}
	
	$scope.deleteUser = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'user/'+id+'/remove','GET',
 					headers,
 					{},
 					function(response){
 							if (response.data.resultCode==RESULT_OK){
 								search($http,$scope);							
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
	
	
	$scope.onSearchPerson=function(){
		
		irperson('',$scope.firstName,$scope.secondName,$scope.securityToken).then(function(response) {
				if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.persons=response.data.persons;
					}
				else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
				}, function(data, status, headers, config) {
	    	    	manageError($scope,status,data);
	    	    });
	
	
	}
	// onSearchPerson
	
	
	$scope.onSetPerson=function(){
		if ($scope.selectedPerson=='' || $scope.selectedPerson==undefined)					
			return;
	
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'user/'+$scope.user_id+'/addPerson/'+$scope.selectedPerson,'GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							readUser($http,$scope,$scope.user_id)
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
	// onSetPerson
	
	
	$scope.onRemovePerson=function(){
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'user/'+$scope.user_id+'/removePerson','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							readUser($http,$scope,$scope.user_id)
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
	// onRemovePerson
	
	
}); 

   
setMenuCntl(app);

function readUser($http,$scope,id){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'user/'+id+'/get','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						console.log(JSON.stringify(response));
						$scope.user_id=response.data.user.id;
						$scope.userId=response.data.user.userId;
						$scope.name=response.data.user.name;
						$scope.selectedRole=response.data.user.roleId;
						$scope.selectedLanguage=response.data.user.languageId;
						$scope.personFirstName=response.data.user.personFirstName;
						$scope.personSecondName=response.data.user.personSecondName;
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

function search($http,$scope){
	callRestWs($http,'user/find?name='+($scope.userName!=undefined?encodeURIComponent($scope.userName):''),'GET',
			{"Security-Token":$scope.securityToken},
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.users=response.data.users;
						//alert ($scope.users);
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

function resetForm($scope){
	$scope.user_id='';
	$scope.userId='';
	$scope.name='';
	$scope.pwd='';
	$scope.confPwd='';
	$scope.selectedRole='';
	$scope.selectedLanguage='';
	$scope.errorMessage="";
	$scope.infoMessage="";
	
}
