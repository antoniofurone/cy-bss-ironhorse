var languageCode=getLocalStorageItem("org.cysoft.bss.ih.user.languageCode");

$('#datepicker').datepicker({
      autoclose:true,format: 'dd/mm/yyyy',language:languageCode
    }).on("changeDate", function(e){
     console.log('datepicker:'+e.date);
});

$('#dateStartpicker').datepicker({
    autoclose:true,format: 'dd/mm/yyyy',language:languageCode
  }).on("changeDate", function(e){
   console.log('dateStartpicker:'+e.date);
});

$('#dateEndpicker').datepicker({
    autoclose:true,format: 'dd/mm/yyyy',language:languageCode
  }).on("changeDate", function(e){
   console.log('dateEndpicker:'+e.date);
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
 		'PURCHASE.TITLE':'Purchases',
 		'COMPANY.LABEL':'Company',
 		'PRODUCTID.LABEL':'Product Id',
 		'PRODUCTNAME.LABEL':'Product Name',
 		'SUPPLIERID.LABEL':'Supplier Id',
 		'SUPPLIERCODE.LABEL':'Supplier Code',
 		'SUPPLIERNAME.LABEL':'Supplier Name',
 		'PERSONID.LABEL':'Person Id',
 		'PERSONCODE.LABEL':'Person Code',
 		'PERSONNAME.LABEL':'Person Name',
 		'DATEFROM.LABEL':'From',
 		'DATETO.LABEL':'To',
 		'PRODUCT.LABEL':'Product',
 		'SUPPLIER.LABEL':'Supplier',
 		'PERSON.LABEL':'Person',
 		'COMPONENT.LABEL':'Component',
 		'UM.LABEL':'Um',
 		'QTY.LABEL':'Qty',
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
 		'SUPPLIER_PERSON.REQUIRED':'Supplier o Person is required',
 		'COMPONENT.REQUIRED':'Component is required',
 		'CURRENCY.REQUIRED':'Currency is required',
 		'VAT.REQUIRED':'Vat is required',
 	 	'EDIT.BUTTON':'Edit',
 		'DELETE.BUTTON':'Delete',
 		'NEW.BUTTON':'New',
 		'NEW.TITLE':'New',
 		'INS.OK': 'Purchase inserted !',
		'UPD.OK': 'Purchase changed !',
		'MODIFY.TITLE':'Change',
		'DELETECONFIRM.MESSAGE': 'Are you sure to delete Purchase ?',
		'SUBMIT.BUTTON':'Submit',
		'ATTRIBUTES.LABEL':'Attributes',
 		'ATTRIBUTENAME.LABEL':'Name',
	    'ATTRIBUTETYPE.LABEL':'Type',
	    'ATTRIBUTEVALUE.LABEL':'Value',
	    'ATTRIBUTENAME.REQUIRED':'Attribute Name is required',
	    'ATTRIBUTEVALUE.REQUIRED':'Attribute Value is required',
	    'ADDATTRIBUTE.BUTTON':'Add Attribute',
	    'DELETEATTRIBUTECONFIRM.MESSAGE': "Are you sure to delete Attribute ?",
	    'YES.OPTION':'Yes',
	    'NO.OPTION':'No',
	    'BILLABLE.OPTION':'Billable',
	    'HYP.OPTION':'Hypothesis'
	  })
	  
	.translations('it',{
		'SEARCH.BUTTON':'Ricerca',
		'BACK.BUTTON':'Indietro',
		'PURCHASE.TITLE':'Acquisti',
 		'COMPANY.LABEL':'Azienda',
 		'PRODUCTID.LABEL':'Id Prodotto',
 		'PRODUCTNAME.LABEL':'Nome Prodotto',
 		'SUPPLIERID.LABEL':'Id Fornitore',
 		'SUPPLIERCODE.LABEL':'Codice Fornitore',
 		'SUPPLIERNAME.LABEL':'Nome Fornitore',
 		'PERSONID.LABEL':'Id Persona',
		'PERSONCODE.LABEL':'Codice Persona',
 		'PERSONNAME.LABEL':'Nome Persona',
		'DATEFROM.LABEL':'Da',
 		'DATETO.LABEL':'A',
 		'PRODUCT.LABEL':'Prodotto',
 		'SUPPLIER.LABEL':'Fornitore',
 		'PERSON.LABEL':'Persona',
 		'COMPONENT.LABEL':'Componente',
 		'UM.LABEL':'Um',
 		'QTY.LABEL':"Quantita'",
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
 		'SUPPLIER_PERSON.REQUIRED':'Fornitore o Persona obbligatorio',
 		'COMPONENT.REQUIRED':'Componente obbligatorio',
 		'CURRENCY.REQUIRED':'Valuta obbligatoria',
 		'VAT.REQUIRED':'Iva obbligatoria',
 	 	'EDIT.BUTTON':'Modifica',
 		'DELETE.BUTTON':'Cancella',
 		'NEW.BUTTON':'Nuovo',
 		'NEW.TITLE':'Nuovo',
 		'INS.OK': 'Acquisto inserito!',
		'UPD.OK': 'Acquisto modificato !',
		'MODIFY.TITLE':'Modifica',
		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare l'acquisto ?",
		'SUBMIT.BUTTON':'Conferma',
 		'ATTRIBUTES.LABEL':'Attributi',
	    'ATTRIBUTENAME.LABEL':'Nome',
	    'ATTRIBUTETYPE.LABEL':'Tipo',
	    'ATTRIBUTEVALUE.LABEL':'Valore',
	    'ATTRIBUTENAME.REQUIRED':'Nome Attributo obbligatorio',
	    'ATTRIBUTEVALUE.REQUIRED':'Valore Attributo obbligatorio',
	    'ADDATTRIBUTE.BUTTON':'Aggiungi Attributo',
	    'DELETEATTRIBUTECONFIRM.MESSAGE': "Sei sicuro di cancellare l'Attributo ?",
	    'YES.OPTION':'Si',
	    'NO.OPTION':'No',
	    'BILLABLE.OPTION':'Billabile',
	    'HYP.OPTION':'Ipotesi'
	  
  	  });
 	
 	
 	 $translateProvider.preferredLanguage(getLanguage());
	});

app.controller('pageCtrl', function($q,$scope,$http,$translate,ircompany,irproduct,irperson,
		irgetobjectbyname,irgetattributes,irsetattributevalue,irattributevalues,irremoveattributevalue,
		irpurchase) {
	
	
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
	
	callRestWs($http,'price/getPriceComponentAll','GET',{},{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.components=response.data.components;
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
	
	
	irgetobjectbyname($scope.securityToken,"Purchase").then(function(response) {
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
		
		var attrName="";
		if ($scope.attributes!=undefined && $scope.selectedAttribute!=undefined){
			for (var i=0;i<$scope.attributes.length;i++){
				if ($scope.attributes[i].id==$scope.selectedAttribute){
					attrName=$scope.attributes[i].name;
					break;
				}
			}
		}
		
		irpurchase($scope.selectedCompany,$scope.productId,$scope.productName,
				$scope.supplierId,$scope.supplierCode,$scope.supplierName,
				$scope.personId,$scope.personCode,$scope.personName,
				attrName,$scope.attributeValue,
				$scope.dateFrom,$scope.dateTo,
				$scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.purchases=response.data.purchases;
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
		
		if ($scope.purchaseForm._selectedCompany.$error.required || 
			$scope.purchaseForm._productId.$error.required ||
			($scope.purchaseForm._supplierId.$error.required && $scope.purchaseForm._personId.$error.required) ||
			$scope.purchaseForm._selectedComponent.$error.required ||
			$scope.purchaseForm._selectedCurrency.$error.required ||
			$scope.purchaseForm._vat.$error.required
			)
			return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['companyId']=$scope._selectedCompany;
		data['productId']=$scope._productId;
		data['supplierId']=$scope._supplierId;
		data['personId']=$scope._personId;
		data['qty']=$scope._qty;
		data['qtyUmId']=$scope._selectedUm;
		data['componentId']=$scope._selectedComponent;
		data['price']=$scope._price;
		data['priceTot']=$scope._priceTot;
		data['currencyId']=$scope._selectedCurrency;
		data['vat']=$scope._vat;
		data['date']=$scope._date;
		data['dateStart']=$scope._dateStart;
		data['dateEnd']=$scope._dateEnd;
		data['frequencyId']=$scope._selectedFrequency;
		data['tacitRenewal']=$scope._selectedTacitRenewal;
		data['transactionType']=$scope._selectedType;
		
		callRestWs($http,!$scope.modify?'purchase/add':'purchase/'+$scope.purchaseId+'/update','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							
   							$scope.purchaseId=response.data.purchase.id;
   						}
						else {
							$translate('UPD.OK')
	    	          		.then(function (translatedValue) {
	    	              		$scope.infoMessage=translatedValue;
	    	          		});
						}
						
						callRestWs($http,'purchase/'+$scope.purchaseId+'/get','GET',
									headers,
									{},
									function(response){
											if (response.data.resultCode==RESULT_OK){
												//console.log(JSON.stringify(response));
												$scope._price=response.data.purchase.price.round(2);
												$scope._priceTot=response.data.purchase.priceTot.round(2);
												$scope._amount=response.data.purchase.amount.round(2);
												$scope._vatAmount=response.data.purchase.vatAmount.round(2);
												$scope._amountTot=(response.data.purchase.amount+response.data.purchase.vatAmount).round(2);
											}
											else
											{
												manageError($scope,response.data.resultCode,response.data.resultDesc);
											}
										}, 
										function(data, status, headers, config){
												manageError($scope,status,data);
										});
						
						
						$scope.attributeValues=undefined;
						
						$purchaseAttributes();
						
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
		if ($scope.purchases!=undefined)
			$search();
	}
	
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		
		$scope._selectedCompany='';
		$scope._productId='';
		$scope._productName='';
		$scope._selectedProduct='';
		$scope._supplierId='';
		$scope._supplierName='';
		$scope._selectedSupplier='';
		$scope._personId='';
		$scope._personName='';
		$scope._selectedPerson='';
		$scope._qty='';
		$scope._selectedUm='';
		$scope._selectedComponent='';
		$scope._price='';
		$scope._priceTot='';
		$scope._selectedCurrency='';
		$scope._vat='';
		$scope._date='';
		$scope._dateStart='';
		$scope._dateEnd='';
		$scope._selectedFrequency='';
		$scope._selectedTacitRenewal='';
		$scope._selectedType='';
		
	}
	
	
	$scope.editPurchase = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		callRestWs($http,'purchase/'+id+'/get','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$scope.purchaseId=response.data.purchase.id;
						
						$scope._selectedCompany=response.data.purchase.companyId;
						$scope._productId=response.data.purchase.productId;
						$scope._productName=response.data.purchase.productName;
						
						$scope._supplierId=response.data.purchase.supplierId;
						$scope._supplierName=response.data.purchase.supplierName==undefined?'':response.data.purchase.supplierName;
						
						$scope._personId=response.data.purchase.personId;
						$scope._personName=(response.data.purchase.personFirstName==undefined?'':response.data.purchase.personFirstName+' ')
							+(response.data.purchase.personSecondName==undefined?'':response.data.purchase.personSecondName);
	
						$scope._qty=response.data.purchase.qty;
						var um=response.data.purchase.qtyUmId;
						
						var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
						callRestWs($http,'product/'+$scope._productId+'/get','GET',
							headers,
							{},
							function(response){
									if (response.data.resultCode==RESULT_OK){
										//console.log(JSON.stringify(response));
										//console.log($scope.productId);
										callRestWs($http,'metric/'+response.data.product.category.metricId+'/getMetricScaleAll','GET',
												headers,
												{},
												function(response){
														if (response.data.resultCode==RESULT_OK){
															$scope.ums=response.data.metricScales;
															$scope._selectedUm=um;
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

						
						$scope._selectedComponent=response.data.purchase.componentId;
						$scope._price=response.data.purchase.price.round(2);
						$scope._priceTot=response.data.purchase.priceTot.round(2);
						$scope._amount=response.data.purchase.amount.round(2);
						$scope._vatAmount=response.data.purchase.vatAmount.round(2);
						$scope._amountTot=(response.data.purchase.amount+response.data.purchase.vatAmount).round(2);
						$scope._selectedCurrency=response.data.purchase.currencyId;
						$scope._vat=response.data.purchase.vat.round(2);
						$scope._date=dateToStringDDMMYYYY(new Date(response.data.purchase.date));
						$scope._dateStart=response.data.purchase.dateStart==undefined?undefined:dateToStringDDMMYYYY(new Date(response.data.purchase.dateStart));
						$scope._dateEnd=response.data.purchase.dateEnd==undefined?undefined:dateToStringDDMMYYYY(new Date(response.data.purchase.dateEnd));;
						$scope._selectedFrequency=response.data.purchase.frequencyId;
						$scope._selectedTacitRenewal=response.data.purchase.tacitRenewal;
						$scope._selectedType=response.data.purchase.transactionType;
						
						
						$scope.attributeValues=undefined;
						
						$purchaseAttributes();
						
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
	

	$scope.deletePurchase = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'purchase/'+id+'/remove','GET',
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
	
		
	$scope.onSearchProduct=function(){
		irproduct($scope.productName,'','','','',$scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//console.log (JSON.stringify(response));
					$scope.products=response.data.products;
				}
			else
				{
					manageError($scope,response.data.resultCode,response.data.resultDesc);
				}
			}, function(data, status, headers, config) {
    	    	manageError($scope,status,data);
    	    });
	}
	
	
	$scope.onUpdateProduct=function(){
		if ($scope.products!=undefined && $scope._selectedProduct!=undefined){
			$scope._productId=$scope._selectedProduct;
			for (var i=0;i<$scope.products.length;i++){
				if ($scope.products[i].id==$scope._productId){
					$scope._productName=$scope.products[i].name;
					$scope._vat=$scope.products[i].category.vat;
					
					var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
					callRestWs($http,'metric/'+$scope.products[i].category.metricId+'/getMetricScaleAll','GET',
							headers,
							{},
							function(response){
									if (response.data.resultCode==RESULT_OK){
										$scope.ums=response.data.metricScales;
									}
									else
									{
										manageError($scope,response.data.resultCode,response.data.resultDesc);
									}
								}, 
								function(data, status, headers, config){
										manageError($scope,status,data);
								});
					
					return;
					} // end if
					
				} // end for
			}
		}// onUpdateProduct
	
	$scope.onDeleteProduct=function(){
		$scope._productId="";
		$scope._productName="";
	}
	
	$scope.onSearchSupplier=function(){
		ircompany('',$scope.supplierName,$scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.suppliers=response.data.companies;
				}
			else
				{
					manageError($scope,response.data.resultCode,response.data.resultDesc);
				}
			}, function(data, status, headers, config) {
    	    	manageError($scope,status,data);
    	    });
	}
	
	$scope.onUpdateSupplier=function(){
		$scope._personId="";
		$scope._personName="";
		
		if ($scope.suppliers!=undefined && $scope._selectedSupplier!=undefined){
			$scope._supplierId=$scope._selectedSupplier;
			for (var i=0;i<$scope.suppliers.length;i++){
				if ($scope.suppliers[i].id==$scope._supplierId){
					$scope._supplierName=$scope.suppliers[i].name;
					return;
				}
			}
		}
	}
	
	$scope.onDeleteSupplier=function(){
		$scope._supplierId="";
		$scope._supplierName="";
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
		$scope._supplierId="";
		$scope._supplierName="";
		
		if ($scope.persons!=undefined && $scope._selectedPerson!=undefined){
			$scope._personId=$scope._selectedPerson;
			for (var i=0;i<$scope.persons.length;i++){
				if ($scope.persons[i].id==$scope._personId){
					$scope._personName=$scope.persons[i].firstName+' '+$scope.persons[i].secondName;
					return;
				}
			}
		}
	}
	
	$scope.onDeletePerson=function(){
		$scope._personId="";
		$scope._personName="";
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
		data['objInstId']=$scope.purchaseId;
		data['id']=$scope._selectedAttribute;
		data['value']=$scope._attributeValue;
		
		irsetattributevalue($scope.securityToken,data).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				$purchaseAttributes();
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
	
 			irremoveattributevalue($scope.securityToken,attributeId,$scope.purchaseId).then(function(response) {
 				if (response.data.resultCode==RESULT_OK){
 					$purchaseAttributes();
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
	
	$purchaseAttributes=function(){
		var headers={"Security-Token":$scope.securityToken};
		
		irattributevalues($scope.securityToken,$scope.objectId,$scope.purchaseId).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				//alert (JSON.stringify(response));
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
	
	
});

setMenuCntl(app);
