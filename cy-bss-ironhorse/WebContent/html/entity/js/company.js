var languageCode=getLanguage();

var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irsearch','irlist'])
.config(function($translateProvider) {
 	$translateProvider
 	.translations('en',{
 		'SEARCH.BUTTON':'Search',
 		'BACK.BUTTON':'Back',
 		'COMPANY.TITLE':'Company',
 		'CODE.LABEL':'Code',
 		'NAME.LABEL':'Name',
 		'ADDRESS.LABEL':'Address',
 		'CITY.LABEL':'City',
 		'ZIP.LABEL':'Zip Code',
 		'FISCALCODE.LABEL':'Fiscal Code',
 		'CODE.REQUIRED':'Code is required',
 		'NAME.REQUIRED':'Name is required',
 		'VATCODE.LABEL':'Vat Code',
 		'EDIT.BUTTON':'Edit',
 		'DELETE.BUTTON':'Delete',
 		'NEW.BUTTON':'New',
 		'NEW.TITLE':'New',
 		'INS.OK': 'Company inserted !',
		'UPD.OK': 'Company changed !',
		'MODIFY.TITLE':'Change',
		'DELETECONFIRM.MESSAGE': 'Are you sure to delete Company ?',
		'DELETEPERSONCONFIRM.MESSAGE': 'Are you sure to delete Person ?',		
 		'SUBMIT.BUTTON':'Submit',
 		'PERSONS.LABEL':'Persons',
 		'FIRSTNAME.LABEL':'First Name',
 		'SECONDNAME.LABEL':'Second Name',
 		'PERSON.LABEL':'Person',
 		'ROLENAME.LABEL':'Role',
 		'DEPTCODE.LABEL':'Dept Code',
 		'DEPT.LABEL':'Department',
 		'ADDPERSON.BUTTON':'Add Person',
 		'PERSON.REQUIRED':'Person is required',
 		'DEPT.REQUIRED':'Dept is required',
 		'ROLE.REQUIRED':'Role is required'
 	  })
	  
	.translations('it',{
		'SEARCH.BUTTON':'Ricerca',
		'BACK.BUTTON':'Indietro',
 		'COMPANY.TITLE':'Azienda',
 		'CODE.LABEL':'Codice',
 		'NAME.LABEL':'Nome',
 		'ADDRESS.LABEL':'Indirizzo',
 		'CITY.LABEL':"Citta'",
 		'ZIP.LABEL':'Cap',
 		'FISCALCODE.LABEL':'Codice Fiscale',
 		'VATCODE.LABEL':'P.Iva',
 		'CODE.REQUIRED':'Codice obbligatorio',
 		'NAME.REQUIRED':'Nome obbligatorio',
 		'EDIT.BUTTON':'Modifica',
 		'DELETE.BUTTON':'Cancella',
 		'NEW.BUTTON':'Nuova',
 		'NEW.TITLE':'Nuova',
 		'INS.OK': 'Azienda inserita!',
		'UPD.OK': 'Azienda modificata !',
		'MODIFY.TITLE':'Modifica',
		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare l'Azienda ?",
		'DELETEPERSONCONFIRM.MESSAGE':"Sei sicuro di cancellare la Persona ?",		
 		'SUBMIT.BUTTON':'Conferma',
 		'PERSONS.LABEL':'Persone',
 		'FIRSTNAME.LABEL':'Nome',
 		'SECONDNAME.LABEL':'Cognome',
 		'PERSON.LABEL':'Persona',
 		'ROLENAME.LABEL':'Ruolo',
 		'DEPTCODE.LABEL':'Codice Dip',
 		'DEPT.LABEL':'Dipartimento',
 		'ADDPERSON.BUTTON':'Aggiungi Persona',
 		'PERSON.REQUIRED':'Persona obbligatoria',
 		'DEPT.REQUIRED':'Dipartimento obbligatorio',
 		'ROLE.REQUIRED':'Ruolo obbligatorio'
  	  });
 	
 	
 	 $translateProvider.preferredLanguage(getLanguage());
	});

app.controller('pageCtrl', function($q,$scope,$http,$translate,ircompany,ircities,irperson) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	ircities($scope.securityToken).then(function(response) {
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
	

	var $companyDept=function(id) {
		var headers={"Security-Token":$scope.securityToken};
		
		callRestWs($http,'company/'+id+'/getDeptAll','GET',
				{"Security-Token":$scope.securityToken},
				{},
				function(response){
					if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.depts=response.data.companyDepts;
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
	
	var $companyRole=function() {
		var headers={"Security-Token":$scope.securityToken};
		
		callRestWs($http,'company/getPersonRoleAll','GET',
				{"Security-Token":$scope.securityToken},
				{},
				function(response){
					if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.roles=response.data.personRoles;
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
	
	var $companyPerson=function(id) {
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		
		callRestWs($http,'company/'+id+'/getPersonAll','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							//console.log(JSON.stringify(response));
							$scope.companyPersons=response.data.companyPersons;
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
		
	
	$search=function(){
		ircompany($scope.code,$scope.name,$scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.companies=response.data.companies;
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
	
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if (($scope.modify && ($scope._code=='' || $scope._code==undefined)) 
			|| $scope._name=='' ||  $scope._name==undefined)
			return;
	
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['name']=$scope._name;
		
		if ($scope._code!=undefined && $scope._code!='')
			data['code']=$scope._code;
		if ($scope._address!=undefined && $scope._address!='')
			data['address']=$scope._address;
		if ($scope._zip!=undefined && $scope._zip!='')
			data['zipCode']=$scope._zip;
		if ($scope._selectedCityId!=undefined && $scope._selectedCityId!='')
			data['cityId']=$scope._selectedCityId;
		if ($scope._fiscalCode!=undefined && $scope._fiscalCode!='')
			data['fiscalCode']=$scope._fiscalCode;
		if ($scope._vatCode!=undefined && $scope._vatCode!='')
			data['vatCode']=$scope._vatCode;
	
		
		callRestWs($http,!$scope.modify?'company/add':'company/'+$scope.companyId+'/update','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							
   							$scope.companyId=response.data.company.id;
   						
   							$companyDept($scope.companyId);
   							
   							if ($scope.roles==undefined)
   								$companyRole();
   							
   							
   							callRestWs($http,'company/'+$scope.companyId+'/get','GET',
   									headers,
   									{},
   									function(response){
   											if (response.data.resultCode==RESULT_OK){
   												//console.log(JSON.stringify(response));
   												$scope._code=response.data.company.code;
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

	
	
	$scope.onBack = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.detail=false;
		if ($scope.companies!=undefined)
			$search();
	}
	
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		
		$scope._code='';
		$scope._name='';
		$scope._address='';
		$scope._selectedCityId='';
		$scope._fiscalCode='';
		$scope._vatCode;
		
	}
	
	
	$scope.editCompany = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		callRestWs($http,'company/'+id+'/get','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$scope.companyId=response.data.company.id;
						$scope._code=response.data.company.code;
						$scope._name=response.data.company.name;
						$scope._address=response.data.company.address;
						$scope._selectedCityId=response.data.company.cityId==0?'':response.data.company.cityId;
						$scope._fiscalCode=response.data.company.fiscalCode;
						$scope._vatCode=response.data.company.vatCode;
						
						$companyDept($scope.companyId);
						if ($scope.roles==undefined)
							$companyRole();
						
						$companyPerson(id);
						
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
	

	$scope.deleteCompany = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'company/'+id+'/remove','GET',
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
	
	
	$scope.deleteCompanyPerson = function(deptId,personId){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETEPERSONCONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
 			});
 				
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'company/'+deptId+'/removePerson/'+personId,'GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$companyPerson($scope.companyId);
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
	
	$scope.addCompanyPerson = function(){
		$scope.errorMessage="";
		$scope.infoMessage="";
	
		if (($scope.modify && ($scope._selectedPerson=='' || $scope._selectedPerson==undefined)) 
				|| $scope._selectedDept=='' ||  $scope._selectedDept==undefined
				|| $scope._selectedRole=='' ||  $scope._selectedRole==undefined)
			return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
			
		data['deptId']=$scope._selectedDept;
		data['personId']=$scope._selectedPerson;
		data['roleId']=$scope._selectedRole;
		
		callRestWs($http,'company/'+$scope._selectedDept+'/addPerson','POST',
			headers,
			data,
			function(response){
				if (response.data.resultCode==RESULT_OK){
					$companyPerson($scope.companyId);
					
					$scope._selectedDept=undefined;
					$scope._selectedPerson=undefined;
					$scope._selectedRole=undefined;
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
	
	$scope.onSearchPerson=function(){
		irperson('',$scope._firstName,$scope._secondName,$scope.securityToken).then(function(response) {
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
	
	
});

setMenuCntl(app);
