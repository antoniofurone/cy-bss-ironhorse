var languageCode=getLocalStorageItem("org.cysoft.bss.ih.user.languageCode");

$('#datepicker').datepicker({
      autoclose:true,format: 'dd/mm/yyyy',language:languageCode
    }).on("changeDate", function(e){
     console.log('datepicker:'+e.date);
});

$('#datepickerFrom').datepicker({
    autoclose:true,format: 'dd/mm/yyyy',language:languageCode
  }).on("changeDate", function(e){
   console.log('datepickerFrom:'+e.date);
});

$('#datepickerTo').datepicker({
    autoclose:true,format: 'dd/mm/yyyy',language:languageCode
  }).on("changeDate", function(e){
   console.log('datepickerTo:'+e.date);
});

var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irsearch','irlist',
                                     'irattribute'])
.config(function($translateProvider) {
 	$translateProvider
 	.translations('en',{
 		'SEARCH.BUTTON':'Search',
 		'BACK.BUTTON':'Back',
 		'INVOICE.TITLE':'Invoices',
 		'NUMBER.LABEL':'Number',
 		'YEAR.LABEL':'Year',
 		'BILLABLE.LABEL':'Billable',
 		'COMPANY.LABEL':'Company',
 		'PRODUCTID.LABEL':'Product Id',
 		'PRODUCTNAME.LABEL':'Product Name',
 		'CUSTOMERID.LABEL':'Customer Id',
 		'CUSTOMERCODE.LABEL':'Customer Code',
 		'CUSTOMERNAME.LABEL':'Customer Name',
 		'PERSONID.LABEL':'Person Id',
 		'PERSONCODE.LABEL':'Person Code',
 		'PERSONNAME.LABEL':'Person Name',
 		'DATEFROM.LABEL':'From',
 		'DATETO.LABEL':'To',
 		'PRODUCT.LABEL':'Product',
 		'CUSTOMER.LABEL':'Customer',
 		'PERSON.LABEL':'Person',
 		'COMPONENT.LABEL':'Component',
 		'CHANGENUMBER.LABEL':'New Number',
 		'CHANGENUMBER.BUTTON':'Change',
 		'UM.LABEL':'Um',
 		'QTY.LABEL':'Qty',
		'NOTE.LABEL':'Note',
		'CURRENCY.LABEL':'Currency',
 		'PRICE.LABEL':'Price',
 		'AMOUNT.LABEL':'Amount',
 		'PRICETOT.LABEL':'Total Price',
 		'VAT.LABEL':'Vat',
 		'VATAMOUNT.LABEL':'Vat Amount',
 		'AMOUNTTOT.LABEL':'Total Amount',
 	 	'FREQUENCY.LABEL':'Frequency',
 		'TACITRENEWAL.LABEL':'Tacit Renewal',
 		'TYPE.LABEL':'Type',
 		'DATE.LABEL':'Date',
 		'DATESTART.LABEL':'Date Start',
 		'DATEEND.LABEL':'Date End',
 		'ATTRIBUTE.LABEL':'Attribute',
 		'COMPANY.REQUIRED':'Company is required',
 		'PRODUCT.REQUIRED':'Product is required',
 		'CUSTOMER_PERSON.REQUIRED':'Customer o Person is required',
 		'COMPONENT.REQUIRED':'Component is required',
 		'CURRENCY.REQUIRED':'Currency is required',
 		'VAT.REQUIRED':'Vat is required',
 		'CHANGENUMBER.REQUIRED':'New Number is numeric',
 		'ADD.BUTTON':'Add',
 		'EDIT.BUTTON':'Edit',
 		'DELETE.BUTTON':'Delete',
 		'NEW.BUTTON':'New',
 		'LOCK.BUTTON':'Lock',
 		'UNLOCK.BUTTON':'Unlock',
 		'PRINT.BUTTON':'Print',
 		'NEW.TITLE':'New Invoice',
 		'INS.OK': 'Invoice inserted !',
		'UPD.OK': 'Invoice changed !',
		'MODIFY.TITLE':'Change Invoice',
		'DELETECONFIRM.MESSAGE': 'Are you sure to delete Invoice ?',
		'LOCKCONFIRM.MESSAGE': 'Are you sure to lock Invoice ?',
		'UNLOCKCONFIRM.MESSAGE': 'Are you sure to unlock Invoice ?',
		'SUBMIT.BUTTON':'Submit',
		'CANCELLED.LABEL':'Cancelled'
 	  })
	  
	.translations('it',{
		'SEARCH.BUTTON':'Ricerca',
		'BACK.BUTTON':'Indietro',
		'INVOICE.TITLE':'Fatture',
		'NUMBER.LABEL':'Numero',
		'YEAR.LABEL':'Anno',
		'BILLABLE.LABEL':'Fatturabili',
 		'COMPANY.LABEL':'Azienda',
 		'PRODUCTID.LABEL':'Id Prodotto',
 		'PRODUCTNAME.LABEL':'Nome Prodotto',
 		'CUSTOMERID.LABEL':'Id Cliente',
 		'CUSTOMERCODE.LABEL':'Codice Cliente',
 		'CUSTOMERNAME.LABEL':'Nome Cliente',
 		'PERSONID.LABEL':'Id Persona',
		'PERSONCODE.LABEL':'Codice Persona',
 		'PERSONNAME.LABEL':'Nome Persona',
		'DATEFROM.LABEL':'Da',
 		'DATETO.LABEL':'A',
 		'PRODUCT.LABEL':'Prodotto',
 		'CUSTOMER.LABEL':'Cliente',
 		'PERSON.LABEL':'Persona',
 		'COMPONENT.LABEL':'Componente',
 		'CHANGENUMBER.LABEL':'Nuovo Numero',
 		'CHANGENUMBER.BUTTON':'Modifica',
 		'UM.LABEL':'Um',
 		'QTY.LABEL':"Quantita'",
		'NOTE.LABEL':'Nota',
 		'CURRENCY.LABEL':'Valuta',
 		'PRICE.LABEL':'Prezzo',
 		'AMOUNT.LABEL':'Importo',
 		'PRICETOT.LABEL':'Prezzo Totale',
 		'VAT.LABEL':'Iva',
 		'VATAMOUNT.LABEL':'Importo Iva',
 		'AMOUNTTOT.LABEL':'Importo Totale',
 		'FREQUENCY.LABEL':'Frequenza',
 		'TACITRENEWAL.LABEL':'Tacito Rinnovo',
 		'TYPE.LABEL':'Tipo',
 		'DATE.LABEL':'Data',
 		'DATESTART.LABEL':'Data Inizio',
 		'DATEEND.LABEL':'Data Fine',
 		'ATTRIBUTE.LABEL':'Attribute',
 		'COMPANY.REQUIRED':'Azienda obbligatoria',
 		'PRODUCT.REQUIRED':'Prodotto obbligatorio',
 		'CUSTOMER_PERSON.REQUIRED':'Cliente o Persona obbligatorio',
 		'COMPONENT.REQUIRED':'Componente obbligatorio',
 		'CURRENCY.REQUIRED':'Valuta obbligatoria',
 		'VAT.REQUIRED':'Iva obbligatoria',
 		'CHANGENUMBER.REQUIRED':"Nuovo numero e' numerico",
 		'ADD.BUTTON':'Aggiungi',
 	 	'EDIT.BUTTON':'Modifica',
 		'DELETE.BUTTON':'Cancella',
 		'NEW.BUTTON':'Nuova',
 		'LOCK.BUTTON':'Chiudi',
 		'UNLOCK.BUTTON':'Apri',
 		'PRINT.BUTTON':'Stampa',
 		'NEW.TITLE':'Nuova Fattura',
 		'INS.OK': 'Fattura inserita !',
		'UPD.OK': 'Fattura modificata !',
		'MODIFY.TITLE':'Modifica Fattura',
		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare la fattura ?",
		'LOCKCONFIRM.MESSAGE': 'Sei sicuro di chiudere la fattura ?',
		'UNLOCKCONFIRM.MESSAGE': 'Sei sicuro di voler aprire la fattura ?',
		'SUBMIT.BUTTON':'Conferma',
		'CANCELLED.LABEL':'Cancellata'
  	  });
 	
 	
 	 $translateProvider.preferredLanguage(getLanguage());
	});

app.controller('pageCtrl', function($q,$scope,$http,$translate,$window,ircompany,irproduct,irperson,
		irinvoice) {
	
	
	$scope.invoiceType='a';
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	
	callRestWs($http,'company/getManagedAll','GET',{},{},
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
	
	
	callRestWs($http,'metric/getCurrencyAll','GET',{},{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.currencies=response.data.currencies;
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
				}, 
				function(data, status, headers, config){
						manageError($scope,status,data);
				});
	
	
	$search=function(){
		
		irinvoice($scope.number,$scope.year,$scope.selectedCompany,
				$scope.customerId,$scope.customerCode,$scope.customerName,
				$scope.personId,$scope.personCode,$scope.personName,
				$scope.dateFrom,$scope.dateTo,
				$scope.invoiceType,$scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.invoices=response.data.invoices;
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
		
		if ($scope.invoiceForm._selectedCompany.$error.required || 
			($scope.invoiceForm._customerId.$error.required && $scope.invoiceForm._personId.$error.required) ||
			$scope.invoiceForm._selectedCurrency.$error.required )
			return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['companyId']=$scope._selectedCompany;
		data['tpCompanyId']=$scope._customerId;
		data['personId']=$scope._personId;
		data['currencyId']=$scope._selectedCurrency;
		data['date']=$scope._date;
		data['note']=$scope._note;
			
		callRestWs($http,!$scope.modify?'invoice/'+$scope.invoiceType+'/add':'invoice/'+$scope.invoiceType+"/"+$scope.invoiceId+'/update','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							
   							$scope.invoiceId=response.data.invoice.id;
   						}
						else {
							$translate('UPD.OK')
	    	          		.then(function (translatedValue) {
	    	              		$scope.infoMessage=translatedValue;
	    	          		});
						}
						
						$getInvoice($scope.invoiceId);	
						
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
	
	$getInvoice = function (invoiceId){
		
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		callRestWs($http,'invoice/'+$scope.invoiceType+'/'+invoiceId+'/get','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$scope.invoiceId=response.data.invoice.id;
						
						$scope._selectedCompany=response.data.invoice.companyId;
						$scope._companyName=response.data.invoice.companyName;
						
						$scope._customerId=response.data.invoice.tpCompanyId;
						$scope._customerName=response.data.invoice.tpCompanyName==undefined?'':response.data.invoice.tpCompanyName;
						
						$scope._personId=response.data.invoice.personId;
						$scope._personName=(response.data.invoice.personFirstName==undefined?'':response.data.invoice.personFirstName+' ')
							+(response.data.invoice.personSecondName==undefined?'':response.data.invoice.personSecondName);
	
						$scope._note=response.data.invoice.note;
						$scope._amount=response.data.invoice.amount.round(2).formatI18N(2);
						$scope._vatAmount=response.data.invoice.vatAmount.round(2).formatI18N(2);
						$scope._amountTot=response.data.invoice.totAmount.round(2).formatI18N(2);
						
						$scope._selectedCurrency=response.data.invoice.currencyId;
						$scope._currencyName=response.data.invoice.currencyCode;
						
						
						$scope.items=response.data.invoice.billables;
						$scope._number=response.data.invoice.number==0?'':response.data.invoice.number;
						$scope._year=response.data.invoice.year;
						$scope._date=dateToStringDDMMYYYY(new Date(response.data.invoice.date));
						$scope._note=response.data.invoice.note;
						
						if (response.data.invoice.number==0){
							// Read Billables
							
							callRestWs($http,'invoice/'+$scope.invoiceType+'/'+invoiceId+'/getBillables','GET',
									headers,
									{},
									function(response){
											if (response.data.resultCode==RESULT_OK){
												console.log(JSON.stringify(response));
												$scope.billables=response.data.billables;
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
		if ($scope.invoices!=undefined)
			$search();
	}
	
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		
		$scope._selectedCompany='';
		$scope._customerId='';
		$scope._customerName='';
		$scope._selectedCustomer='';
		$scope._personId='';
		$scope._personName='';
		$scope._selectedPerson='';
		$scope._selectedCurrency='';
		$scope._date='';
		$scope._note='';
		
		$scope._amount='';
		$scope._vatAmount='';
		$scope._amountTot='';
		
		
	}
	
	
	$scope.editInvoice = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		$scope._changeNumber="";
		
		$scope.modify=true;
		$scope.detail=true;
	
		$getInvoice(id);
	}
	
	
	
	$scope.printInvoice = function(id){
		$window.open("printInvoice.html?invoiceId="+id);

	}
		

	$scope.addBillable = function(billableId){
		
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		callRestWs($http,'invoice/'+$scope.invoiceType+'/'+$scope.invoiceId+'/addBillable/'+billableId,'GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$getInvoice($scope.invoiceId);	
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

	$scope.removeBillable = function(billableId){
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		callRestWs($http,'invoice/'+$scope.invoiceType+'/'+$scope.invoiceId+'/removeBillable/'+billableId,'GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$getInvoice($scope.invoiceId);	
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
	
	
	$scope.lockInvoice = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('LOCKCONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'invoice/'+$scope.invoiceType+'/'+id+'/lock','GET',
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
		
	
	$scope.unlockInvoice = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('UNLOCKCONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'invoice/'+$scope.invoiceType+'/'+id+'/unlock','GET',
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
		
	$scope.deleteInvoice = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'invoice/'+$scope.invoiceType+'/'+id+'/remove','GET',
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
	
	
	$scope.onSearchCustomer=function(){
		ircompany('',$scope.customerName,$scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.customers=response.data.companies;
				}
			else
				{
					manageError($scope,response.data.resultCode,response.data.resultDesc);
				}
			}, function(data, status, headers, config) {
    	    	manageError($scope,status,data);
    	    });
	}
	
	$scope.onUpdateCustomer=function(){
		$scope._personId="";
		$scope._personName="";
		
		$scope._customerId=$scope._selectedCustomer;
		
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		callRestWs($http,'company/'+$scope._customerId+'/get','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							//console.log(JSON.stringify(response));
							$scope._customerName=response.data.company.name;
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
	
	$scope.onDeleteCustomer=function(){
		$scope._customerId="";
		$scope._customerName="";
	}
	
	$scope.onSearchPerson=function(){
		irperson('',$scope.personFirstName,$scope.personSecondName,$scope.securityToken).then(function(response) {
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
	
	$scope.onUpdatePerson=function(){
		$scope._customerId="";
		$scope._customerName="";
		
		$scope._personId=$scope._selectedPerson;
		
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		callRestWs($http,'person/'+$scope._personId+'/get','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							//console.log(JSON.stringify(response));
							$scope._personName=response.data.person.firstName+' '+response.data.person.secondName;
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
	
	$scope.onDeletePerson=function(){
		$scope._personId="";
		$scope._personName="";
	}
	
	$scope.onChangeNumber=function(){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.invoiceForm._changeNumber.$error.required || $scope.invoiceForm._changeNumber.$error.number) 
			return;
		
		var headers={"Security-Token":$scope.securityToken};
			callRestWs($http,'invoice/'+$scope.invoiceType+'/'+$scope.invoiceId+'/updateNumber/'+$scope._changeNumber,'GET',
					headers,
					{},
					function(response){
							if (response.data.resultCode==RESULT_OK){
								$translate('UPD.OK')
		    	          		.then(function (translatedValue) {
		    	              		$scope.infoMessage=translatedValue;
		    	          		});
							
								$getInvoice($scope.invoiceId);
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
	
});

setMenuCntl(app);
