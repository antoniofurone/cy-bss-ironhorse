var languageCode=getLocalStorageItem("org.cysoft.bss.ih.user.languageCode");

var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irsearch','irlist',
                                     'irattribute']);

app.config(function($translateProvider) {
 	$translateProvider
 	.translations('en',{
 		'PRODUCT.LABEL':'Product',
 		'UM.LABEL':'Um',
 		'QTY.LABEL':"Qty",
 		'PRICE.LABEL':'Price',
 		'AMOUNT.LABEL':'Amount',
 		'VAT.LABEL':'Vat',
 		'VATAMOUNT.LABEL':'Vat Amount',
 		'AMOUNTTOT.LABEL':'Total Amount',
 		'DATE.LABEL':'Date',
 		'FISCALCODE.LABEL':'Fiscal Code',
 		'VATCODE.LABEL':'VAT Code',
 		'NUMBER.LABEL':'Self Invoice Nr.',
 		'NOTE.LABEL':'Note',
 		'CURRENCY.LABEL':'Currency',
 		'TOTALAMOUNT.LABEL':'Total Amount',
 		'TOTALVAT.LABEL':'Total Vat',
 		'TOTAL.LABEL':'Invoice Amount',
 		'TO.LABEL':'To'
 	  })
	  
	.translations('it',{
		'PRODUCT.LABEL':'Prodotto',
		'UM.LABEL':'Um',
		'QTY.LABEL':"Quantita'",
		'PRICE.LABEL':'Prezzo',
 		'AMOUNT.LABEL':'Importo',
 		'VAT.LABEL':'Iva',
 		'VATAMOUNT.LABEL':'Importo Iva',
 		'AMOUNTTOT.LABEL':'Importo Totale',
 		'DATE.LABEL':'Data',
 		'FISCALCODE.LABEL':'Codice Fiscale',
		'VATCODE.LABEL':'Partita IVA',
		'NUMBER.LABEL':'Autofattura Nr.',
		'NOTE.LABEL':'Nota',
		'CURRENCY.LABEL':'Valuta',
		'TOTALAMOUNT.LABEL':'Importo Totale',
		'TOTALVAT.LABEL':'IVA Totale',
		'TOTAL.LABEL':'Importo Fattura',
		'TO.LABEL':'A'
	  });
 	
 	
 	 $translateProvider.preferredLanguage(getLanguage());
	});

app.controller('pageCtrl', function($q,$scope,$http,$translate,$location,ircompany,irproduct,irperson,
		irinvoice) {
	
	$scope.invoiceType='p';
	$scope.detail=false;
	$scope.coreUrl=getLocalStorageItem("org.cysoft.bss.ih.coreurl");
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$scope.invoiceId=getUrlParameter('invoiceId');
	
	var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
	callRestWs($http,'invoice/'+$scope.invoiceType+'/'+$scope.invoiceId+'/get','GET',
		headers,
		{},
		function(response){
			if (response.data.resultCode==RESULT_OK){
				//console.log(JSON.stringify(response));
				$scope.invoiceId=response.data.invoice.id;
				
				$scope._companyId=response.data.invoice.companyId;
				$scope._companyName=response.data.invoice.companyName;
				
				$scope._supplierId=response.data.invoice.tpCompanyId;
				$scope._supplierName=response.data.invoice.tpCompanyName==undefined?'':response.data.invoice.tpCompanyName;
				
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
				$scope._stringNumber=response.data.invoice.stringNumber;
				$scope._date=response.data.invoice.date;
				$scope._note=response.data.invoice.note;
				
				
				callRestWs($http,'company/'+$scope._companyId+'/get','GET',
						headers,
						{},
						function(response){
								if (response.data.resultCode==RESULT_OK){
									//console.log(JSON.stringify(response));
									$scope._companyName=response.data.company.name;
									$scope._companyAddress=response.data.company.address;
									$scope._companyFiscalCode=response.data.company.fiscalCode;
									$scope._companyVatCode=response.data.company.vatCode;
									$scope._companyCity=response.data.company.city;
									$scope._companyZip=response.data.company.zipCode;
									
									$scope._companyZipCityCountry=(response.data.company.zipCode!=undefined && response.data.company.zipCode!='')?
											response.data.company.zipCode:'';
									$scope._companyZipCityCountry+=(response.data.company.city!=undefined && response.data.company.city!='')?' '+
											response.data.company.city:'';
									$scope._companyZipCityCountry+=(response.data.company.country!=undefined && response.data.company.country!='')?' ('+
											response.data.company.country+')':'';
									
									
									if ($scope._supplierId!=0){
										
											callRestWs($http,'company/'+$scope._supplierId+'/get','GET',
													headers,
													{},
													function(response){
															if (response.data.resultCode==RESULT_OK){
																console.log(JSON.stringify(response));
																$scope._supplierName=response.data.company.name;
																$scope._supplierAddress=response.data.company.address;
																$scope._supplierFiscalCode=response.data.company.fiscalCode;
																$scope._supplierVatCode=response.data.company.vatCode;
																$scope._supplierCity=response.data.company.city;
																$scope._supplierZip=response.data.company.zipCode;
																
																$scope._supplierZipCityCountry=(response.data.company.zipCode!=undefined && response.data.company.zipCode!='')?
																		response.data.company.zipCode:'';
																
																$scope._supplierZipCityCountry+=(response.data.company.city!=undefined && response.data.company.city!='')?' '+
																		response.data.company.city:'';
																$scope._supplierZipCityCountry+=(response.data.company.country!=undefined && response.data.company.country!='')?' ('+
																		response.data.company.country+')':'';
																
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
										// Person
										callRestWs($http,'person/'+$scope._personId+'/get','GET',
												headers,
												{},
												function(response){
														if (response.data.resultCode==RESULT_OK){
															//console.log(JSON.stringify(response));
															$scope._supplierName=response.data.person.secondName+' '+response.data.person.firstName;
															$scope._supplierAddress=response.data.person.address;
															$scope._supplierVatCode='';
															$scope._supplierFiscalCode=response.data.person.fiscalCode;
															$scope._supplierCity=response.data.person.city;
															$scope._supplierZip=response.data.person.zipCode;
															
															$scope._supplierZipCityCountry=(response.data.person.zipCode!=undefined && response.data.person.zipCode!='')?
																	response.data.person.zipCode:'';
															$scope._supplierZipCityCountry+=(response.data.person.city!=undefined && response.data.person.city!='')?' '+
																	response.data.person.city:'';
															$scope._supplierZipCityCountry+=(response.data.person.country!=undefined && response.data.person.country!='')?' ('+
																	response.data.person.country+')':'';
															
															
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
									
								   
									callRestWs($http,'company/'+$scope._companyId+'/getManaged','GET',
											headers,
											{},
											function(response){
													if (response.data.resultCode==RESULT_OK){
														$scope._invoiceLogoId=response.data.company.invoiceLogoId;
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

setMenuCntl(app);
