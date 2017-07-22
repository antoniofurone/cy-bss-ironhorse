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
 		'PURCHASE.TITLE':'Purchase',
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
 		'PRICETOT.LABEL':'Total Price',
 		'VAT.LABEL':'Vat',
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
	    'HYPOTHESIS.OPTION':'Hypothesis'
	  })
	  
	.translations('it',{
		'SEARCH.BUTTON':'Ricerca',
		'BACK.BUTTON':'Indietro',
		'PURCHASE.TITLE':'Vendita',
 		'COMPANY.LABEL':'Azienda',
 		'PRODUCTID.LABEL':'Id Prodotto',
 		'PRODUCTNAME.LABEL':'Nome Prodotto',
 		'SUPPLIERID.LABEL':'Id Fornitore',
 		'SUPPLIERCODE.LABEL':'Codice Fornitore:',
 		'SUPPLIERNAME.LABEL':'Nome Fornitore:',
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
 		'PRICETOT.LABEL':'Prezzo Totale',
 		'VAT.LABEL':'Iva',
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
 		'NEW.BUTTON':'Nuova',
 		'NEW.TITLE':'Nuova',
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
	    'HYPOTHESIS.OPTION':'Ipotesi'
	  
  	  });
 	
 	
 	 $translateProvider.preferredLanguage(getLanguage());
	});

app.controller('pageCtrl', function($q,$scope,$http,$translate,ircompany,irproduct,
		irgetobjectbyname,irgetattributes,irsetattributevalue,irattributevalues,irremoveattributevalue) {
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
		
		irproduct($scope.name,$scope.selectedCategory,$scope.selectedType,attrName,$scope.attributeValue,$scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
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
	
	
	$scope.onSearch = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$search();
		
		}
	
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.productForm._name.$error.required || 
			$scope.productForm._selectedCategory.$error.required ||
			$scope.productForm._selectedType.$error.required ||
			$scope.productForm._description.$error.required
			)
			return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['name']=$scope._name;
		data['code']=$scope._code;
		data['description']=$scope._description;
		data['categoryId']=$scope._selectedCategory;
		data['typeId']=$scope._selectedType;
		data['parentId']=$scope._parentId;
		data['producerId']=$scope._producerId;
		
		callRestWs($http,!$scope.modify?'product/add':'product/'+$scope.productId+'/update','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							
   							$scope.productId=response.data.product.id;
   						}
						else {
							$translate('UPD.OK')
	    	          		.then(function (translatedValue) {
	    	              		$scope.infoMessage=translatedValue;
	    	          		});
						}
						
						callRestWs($http,'product/'+$scope.productId+'/get','GET',
									headers,
									{},
									function(response){
											if (response.data.resultCode==RESULT_OK){
												//console.log(JSON.stringify(response));
												$scope._parentName=response.data.product.parentName;
												$scope._producerName=response.data.product.producerName;
												
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
						
						$productAttributes();
						
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
		if ($scope.products!=undefined)
			$search();
	}
	
	
	$scope.onNew = function() {
		$scope.detail=true;
		$scope.modify=false;
		
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope._code='';
		$scope._name='';
		$scope._selectedCategory='';
		$scope._selectedType='';
		$scope._description='';
		$scope._parentId='';
		$scope._producerId='';
		$scope._parentName='';
		$scope._producerName='';
		
		
	}
	
	
	$scope.editProduct = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken,"Language":languageCode};
		callRestWs($http,'product/'+id+'/get','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						//console.log(JSON.stringify(response));
						$scope.productId=response.data.product.id;
						//console.log($scope.productId);
						$scope._code=response.data.product.code;
						$scope._name=response.data.product.name;
						$scope._selectedCategory=response.data.product.categoryId;
						$scope._selectedType=response.data.product.typeId;
						$scope._description=response.data.product.description;
						$scope._parentId=response.data.product.parentId;
						$scope._parentName=response.data.product.parentName;
						$scope._producerId=response.data.product.producerId;
						$scope._producerName=response.data.product.producerName;
						
						$scope.attributeValues=undefined;
						
						$productAttributes();
						
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
	

	$scope.deleteProduct = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'product/'+id+'/remove','GET',
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
	
	
	// attributes
	$scope.addAttribute = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
	
		
		if (($scope.modify && ($scope._selectedAttribute=='' || $scope._selectedAttribute==undefined)) 
				|| $scope._attributeValue=='' ||  $scope._attributeValue==undefined)
				return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['objInstId']=$scope.productId;
		data['id']=$scope._selectedAttribute;
		data['value']=$scope._attributeValue;
		
		irsetattributevalue($scope.securityToken,data).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
				$productAttributes();
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
	
 			irremoveattributevalue($scope.securityToken,attributeId,$scope.productId).then(function(response) {
 				if (response.data.resultCode==RESULT_OK){
 					$productAttributes();
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
	
	$productAttributes=function(){
		var headers={"Security-Token":$scope.securityToken};
		
		irattributevalues($scope.securityToken,$scope.objectId,$scope.productId).then(function(response) {
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
	
	
});

setMenuCntl(app);
