var languageCode=getLanguage();


$('#datepickerBirth').datepicker({
    autoclose:true,format: 'dd/mm/yyyy',language:languageCode
  }).on("changeDate", function(e){
   console.log('datepickerBirth:'+e.date);
});


var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator',
                                     'irsearch','irlist',
                                     'irattribute'])
.config(function($translateProvider) {
 	$translateProvider
 	.translations('en',{
 		'SEARCH.BUTTON':'Search',
 		'BACK.BUTTON':'Back',
 		'CODE.LABEL':'Code',
 		'FIRSTNAME.LABEL':'First Name',
 		'SECONDNAME.LABEL':'Second Name',
 		'ADDRESS.LABEL':'Address',
 		'CITY.LABEL':'City',
 		'ZIP.LABEL':'Zip Code',
 		'FISCALCODE.LABEL':'Fiscal Code',
 		'NEW.BUTTON':'New',
 		'EDIT.BUTTON':'Edit',
 		'DELETE.BUTTON':'Delete',
 		'PERSON.TITLE':'Person',
 		'NEW.TITLE':'New',
 		'GENDER.LABEL':'Gender',
 		'MALE.GENDER':'Male',
 		'FEMALE.GENDER':'Female',
 		'BIRTHDAY.LABEL':'Birth Day',
 		'BORNCITY.LABEL':'Born City',
 		'MODIFY.TITLE':'Change',
 		'CODE.REQUIRED':'Code is required',
 		'FIRSTNAME.REQUIRED':'First name is required',
 		'SECONDNAME.REQUIRED':'Second name is required',
 		'INS.OK': 'Person inserted !',
		'UPD.OK': 'Person changed !',
		'SUBMIT.BUTTON':'Submit',
		'DELETECONFIRM.MESSAGE': 'Are you sure to delete Person ?',
		'DELETECONTACTCONFIRM.MESSAGE': 'Are you sure to delete Contact ?',
		'RESET.BUTTON': 'Reset',
	    'CONTACTS.LABEL':'Contacts',
	    'CONTACTTYPE.LABEL':'Contact Type',
	    'CONTACT.LABEL': 'Contact',
	    'CONTACTTYPE.REQUIRED':'Contact Type is required',
	    'CONTACT.REQUIRED': 'Contact is required',
	    'ADDCONTACT.BUTTON':'Add Contact',
	    'ATTRIBUTES.LABEL':'Attributes',
	    'ATTRIBUTENAME.LABEL':'Name',
	    'ATTRIBUTETYPE.LABEL':'Type',
	    'ATTRIBUTEVALUE.LABEL':'Value',
	    'ATTRIBUTENAME.REQUIRED':'Attribute Name is required',
	    'ATTRIBUTEVALUE.REQUIRED':'Attribute Value is required',
	    'ADDATTRIBUTE.BUTTON':'Add Attribute',
	    'DELETEATTRIBUTECONFIRM.MESSAGE': "Are you sure to delete Attribute ?"
	  })
	  
	.translations('it',{
		'SEARCH.BUTTON':'Ricerca',
		'BACK.BUTTON':'Indietro',
		'CODE.LABEL':'Codice',
		'FIRSTNAME.LABEL':'Nome',
 		'SECONDNAME.LABEL':'Cognome',
 		'ADDRESS.LABEL':'Indirizzo',
 		'CITY.LABEL':"Citta'",
 		'ZIP.LABEL':'Cap',
 		'FISCALCODE.LABEL':'Codice Fiscale',
 		'NEW.BUTTON':'Nuova',
 		'EDIT.BUTTON':'Modifica',
 		'DELETE.BUTTON':'Cancella',
 		'PERSON.TITLE':'Persona',
 		'GENDER.LABEL':'Sesso',
 		'MALE.GENDER':'Maschio',
 		'FEMALE.GENDER':'Femmina',
 		'BIRTHDAY.LABEL':'Data di nascita',
 		'NEW.TITLE':'Nuova',
 		'BORNCITY.LABEL':"Citta' di nascita",
 		'MODIFY.TITLE':'Modifica',
 		'CODE.REQUIRED':'Codice obbligatorio',
 		'FIRSTNAME.REQUIRED':'Nome obbligatorio',
 		'SECONDNAME.REQUIRED':'Cognome obbligatorio',
 		'INS.OK': 'Persona inserita !',
		'UPD.OK': 'Persona modificata !',
		'SUBMIT.BUTTON':'Submit',
		'DELETECONFIRM.MESSAGE': 'Sei sicuro di cancellare la Persona ?',
		'DELETECONTACTCONFIRM.MESSAGE': 'Sei sicuro di cancellare il Contatto ?',
	    'RESET.BUTTON': 'Reset',
	    'CONTACTS.LABEL':'Contatti',
	    'CONTACTTYPE.LABEL':'Tipo Contatto',
	    'CONTACT.LABEL': 'Contatto',
	    'CONTACTTYPE.REQUIRED':'Tipo Contatto obbligatorio',
	    'CONTACT.REQUIRED': 'Contatto obbligatorio',
	    'ADDCONTACT.BUTTON':'Aggiungi Contatto',
	    'ATTRIBUTES.LABEL':'Attribute',
	    'ATTRIBUTENAME.LABEL':'Nome',
	    'ATTRIBUTETYPE.LABEL':'Tipo',
	    'ATTRIBUTEVALUE.LABEL':'Valore',
	    'ATTRIBUTENAME.REQUIRED':'Nome Attributo obbligatorio',
	    'ATTRIBUTEVALUE.REQUIRED':'Valore Attributo obbligatorio',
	    'ADDATTRIBUTE.BUTTON':'Aggiungi Attributo',
	    'DELETEATTRIBUTECONFIRM.MESSAGE': "Sei sicuro di cancellare l'Attributo ?"
	  });
 	
 	
 	 $translateProvider.preferredLanguage(getLanguage());
	});


app.controller('pageCtrl', function($q,$scope,$http,$translate,
		irperson,ircities,ircontacttypes,
		irgetobjectbyname,irgetattributes,irsetattributevalue,irattributevalues,irremoveattributevalue) {
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
	
	
	ircontacttypes($scope.securityToken).then(function(response) {
		if (response.data.resultCode==RESULT_OK){
			//alert (JSON.stringify(response));
			$scope.contactTypes=response.data.contactTypes;
		}
		else
		{
			manageError($scope,response.data.resultCode,response.data.resultDesc);
		}
    }, function(data, status, headers, config) {
    	manageError($scope,status,data);
    });
	
	irgetobjectbyname($scope.securityToken,"Person").then(function(response) {
		if (response.data.resultCode==RESULT_OK){
			//alert (JSON.stringify(response));
			$scope.objectId=response.data.object.id;
			
			irgetattributes($scope.securityToken,$scope.objectId).then(function(response) {
				if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.attributes=response.data.attributes;
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
	
	
	$search=function(){
		irperson($scope.code,$scope.firstName,$scope.secondName,$scope.securityToken).then(function(response) {
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
	
	
	$scope.onSearch = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$search();
		
		}
	
	$scope.onBack = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.detail=false;
		if ($scope.persons!=undefined)
			$search();
	}
	
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		
		$scope._code='';
		$scope._firstName='';
		$scope._secondName='';
		$scope._selectedGender='';
		$scope._address='';
		$scope._selectedCityId='';
		$scope._fiscalCode='';
		$scope._birthDay='';
		$scope._selectedBornCityId='';
		
		
	}
	
	// attributes
	$scope.addAttribute = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
	
		
		if (($scope.modify && ($scope._selectedAttribute=='' || $scope._selectedAttribute==undefined)) 
				|| $scope._attributeValue=='' ||  $scope._attributeValue==undefined)
				return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['objInstId']=$scope.personId;
		data['id']=$scope._selectedAttribute;
		data['value']=$scope._attributeValue;
		
		irsetattributevalue($scope.securityToken,data).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				$personAttributes();
				$scope._selectedAttribute=undefined;
				$scope._attributeValue='';
				$translate('UPD.OK')
	          		.then(function (translatedValue) {
	              		$scope.infoMessage=translatedValue;
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
	
	$scope.deleteAttribute = function(attributeId) {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETEATTRIBUTECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
	
 			irremoveattributevalue($scope.securityToken,attributeId,$scope.personId).then(function(response) {
 				if (response.data.resultCode==RESULT_OK){
 					$personAttributes();
 					$scope._selectedAttribute=undefined;
 					$scope._attributeValue='';
 					$translate('UPD.OK')
 		          		.then(function (translatedValue) {
 		              		$scope.infoMessage=translatedValue;
 		          		});
 					}
 				else
 					{
 						manageError($scope,response.data.resultCode,response.data.resultDesc);
 					}
 				}, function(data, status, headers, config) {
 	    	    	manageError($scope,status,data);
 	    	    });	
 		});
	}
	
	$personAttributes=function(){
		var headers={"Security-Token":$scope.securityToken};
		
		irattributevalues($scope.securityToken,$scope.objectId,$scope.personId).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				$scope.attributeValues=response.data.attributes;
				}
			else
				{
					manageError($scope,response.data.resultCode,response.data.resultDesc);
				}
			}, function(data, status, headers, config) {
    	    	manageError($scope,status,data);
    	    });
	
	};
	// end attributes
	
	// contacts
	$scope.addContact = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if (($scope.modify && ($scope._selectedContactType=='' || $scope._selectedContactType==undefined)) 
				|| $scope._contact=='' ||  $scope._contact==undefined)
				return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['contactTypeId']=$scope._selectedContactType;
		data['entityName']='Person';
		data['entityId']=$scope.personId;
		data['contact']=$scope._contact;
	
		callRestWs($http,'contact/add','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						$personContacts();
						$scope._selectedContactType=undefined;
						$scope._contact='';
						$translate('UPD.OK')
	    	          		.then(function (translatedValue) {
	    	              		$scope.infoMessage=translatedValue;
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
		
	} 
	
	$scope.deleteContact = function(contactId) {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETECONTACTCONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'contact/'+contactId+'/remove','GET',
 					headers,
 					{},
 					function(response){
 							if (response.data.resultCode==RESULT_OK){
 								$translate('UPD.OK')
 		    	          		.then(function (translatedValue) {
 		    	              		$scope.infoMessage=translatedValue;
 		    	          		});
 								$personContacts();							
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
	
	$personContacts=function(){
		var headers={"Security-Token":$scope.securityToken};
		
		callRestWs($http,'person/'+$scope.personId+'/getContactAll','GET',
				{"Security-Token":$scope.securityToken},
				{},
				function(response){
					if (response.data.resultCode==RESULT_OK){
						//alert (JSON.stringify(response));
						$scope.contacts=response.data.contacts;
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
	// end contancts
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if (($scope.modify && ($scope._code=='' || $scope._code==undefined)) 
			|| $scope._firstName=='' ||  $scope._firstName==undefined
			|| $scope._secondName=='' || $scope._secondName==undefined)
			return;
	
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['firstName']=$scope._firstName;
		data['secondName']=$scope._secondName;
		
		if ($scope._code!=undefined && $scope._code!='')
			data['code']=$scope._code;
		if ($scope._selectedGender!=undefined && $scope._selectedGender!='')
			data['gender']=$scope._selectedGender;
		if ($scope._address!=undefined && $scope._address!='')
			data['address']=$scope._address;
		if ($scope._zip!=undefined && $scope._zip!='')
			data['zipCode']=$scope._zip;
		if ($scope._selectedCityId!=undefined && $scope._selectedCityId!='')
			data['cityId']=$scope._selectedCityId;
		if ($scope._fiscalCode!=undefined && $scope._fiscalCode!='')
			data['fiscalCode']=$scope._fiscalCode;
		if ($scope._birthDay!=undefined && $scope._birthDay!='')
			data['birthDay']=$scope._birthDay;
		if ($scope._selectedBornCityId!=undefined && $scope._selectedBornCityId!='')
			data['birthCityId']=$scope._selectedBornCityId;

		
		callRestWs($http,!$scope.modify?'person/add':'person/'+$scope.personId+'/update','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							$scope.personId=response.data.person.id;
   							
   							callRestWs($http,'person/'+$scope.personId+'/get','GET',
   									headers,
   									{},
   									function(response){
   											if (response.data.resultCode==RESULT_OK){
   												//console.log(JSON.stringify(response));
   												$scope._code=response.data.person.code;
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
	
	$scope.editPerson = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'person/'+id+'/get','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$scope.personId=response.data.person.id;
						$scope._code=response.data.person.code;
						$scope._firstName=response.data.person.firstName;
						$scope._secondName=response.data.person.secondName;
						$scope._selectedGender=response.data.person.gender;
						$scope._address=response.data.person.address;
						$scope._selectedCityId=response.data.person.cityId==0?'':response.data.person.cityId;
						$scope._fiscalCode=response.data.person.fiscalCode;
						$scope._birthDay=response.data.person.birthDay;
						$scope._selectedBornCityId=response.data.person.birthCityId==0?'':response.data.person.birthCityId;
					
						$personContacts($scope.personId);
						$personAttributes();
						
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
	
	$scope.deletePerson = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'person/'+id+'/remove','GET',
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
