var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'MANAGED.TITLE':'Managed Companies',
     		'NEW.TITLE':'New Managed Company',
     		'MODIFY.TITLE':'Edit Managed Company',
     		'COMPANY.LABEL':'Company',
     		'COMPANY.REQUIRED':'Company is required',
     		'CODE.LABEL':'Code',
     		'NAME.LABEL':'Name',
     		'ADDRESS.LABEL':'Address',
     		'CITY.LABEL':'City',
     		'ZIP.LABEL':'Zip Code',
     		'FISCALCODE.LABEL':'Fiscal Code',
     		'VATCODE.LABEL':'Vat Code',
     		'EDIT.BUTTON':'Edit',
     		'DELETE.BUTTON':'Delete',
     		'INVOICEICON.LABEL':'Invoice Icon File Id',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'INS.OK': 'Managed Company added !',
		    'UPD.OK': 'Managed Company updated !',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete Managed Company?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'MANAGED.TITLE':'Aziende Gestite',
			'NEW.TITLE':'Nuova Azienda Gestita',
			'MODIFY.TITLE':'Modifica Azienda Gestita',
			'COMPANY.LABEL':'Azienda',
			'COMPANY.REQUIRED':'Azienda obbligatoria',
			'CODE.LABEL':'Codice',
	 		'NAME.LABEL':'Nome',
	 		'ADDRESS.LABEL':'Indirizzo',
	 		'CITY.LABEL':"Citta'",
	 		'ZIP.LABEL':'Cap',
	 		'FISCALCODE.LABEL':'Codice Fiscale',
	 		'VATCODE.LABEL':'P.Iva',
	 		'EDIT.BUTTON':'Modifica',
	 		'DELETE.BUTTON':'Cancella',
	 		'INVOICEICON.LABEL':"File Id per l'icona della fattura",
     		'SUBMIT.BUTTON':'Conferma',
    		'BACK.BUTTON': 'Indietro',
    		'INS.OK': 'Gestione inserita !',
    		'UPD.OK': 'Gestione modificata !',
    		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare la Gestione?"
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,ircompany,irlanguages) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$search=function(){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'company/getManagedAll','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.managedCompanies=response.data.companies;
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
		
		$scope._companyId='';
		$scope._companyName='';
		$scope._invoiceIcon='';
		
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.managedList._companyId.$error.required)
	    	return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['id']=$scope._companyId;
		data['invoiceLogoId']=$scope._invoiceIcon;
		
		callRestWs($http,!$scope.modify?'company/addManaged':'company/'+$scope._companyId+'/updateManaged','POST',
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
	
	
	$scope.editManaged = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'company/'+id+'/getManaged','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope._companyId=response.data.company.id;
							$scope._companyName=response.data.company.name;
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
	
	$scope.deleteManaged = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'company/'+id+'/removeManaged','GET',
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
	// deleteManaged
	
	$scope.onSearchCompany=function(){
		ircompany('',$scope.companyName,$scope.securityToken).then(function(response) {
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
	
	$scope.onDeleteCompany=function(){
		$scope._companyId="";
		$scope._companyName="";
	}
	
	$scope.onUpdateCompany=function(){
		if ($scope.companies!=undefined && $scope._selectedCompany!=undefined){
			$scope._companyId=$scope._selectedCompany;
			for (var i=0;i<$scope.companies.length;i++){
				if ($scope.companies[i].id==$scope._companyId){
					$scope._companyName=$scope.companies[i].name;
					return;
				}
			}
		}
	}
	
}); 
   
setMenuCntl(app);
