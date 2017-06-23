var languageCode=getLanguage();

var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irsearch','irlist',
                                     'irattribute'])
.config(function($translateProvider) {
 	$translateProvider
 	.translations('en',{
 		'SEARCH.BUTTON':'Search',
 		'BACK.BUTTON':'Back',
 		'PRODUCT.TITLE':'Product',
 		'CODE.LABEL':'Code',
 		'NAME.LABEL':'Name',
 		'CATEGORY.LABEL':'Category',
 		'TYPE.LABEL':'Type',
 		'DESCRIPTION.LABEL':'Description',
 		'PARENT.LABEL':'Parent',
 		'PRODUCER.LABEL':'Poducer',
 		'ATTRIBUTE.LABEL':'Attribute',
 		'NAME.REQUIRED':'Name is required',
 		'DESCRIPTION.REQUIRED':'Description is required',
 		'CATEGORY.REQUIRED':'Category is required',
 		'TYPE.REQUIRED':'Type is required',
 	 	'EDIT.BUTTON':'Edit',
 		'DELETE.BUTTON':'Delete',
 		'NEW.BUTTON':'New',
 		'NEW.TITLE':'New',
 		'INS.OK': 'Product inserted !',
		'UPD.OK': 'Product changed !',
		'MODIFY.TITLE':'Change',
		'DELETECONFIRM.MESSAGE': 'Are you sure to delete Product ?',
		'SUBMIT.BUTTON':'Submit',
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
 		'PRODUCT.TITLE':'Prodotto',
 		'CODE.LABEL':'Codice',
 		'NAME.LABEL':'Nome',
 		'CATEGORY.LABEL':'Categoria',
 		'TYPE.LABEL':"Tipo'",
 		'DESCRIPTION.LABEL':'Descrizione',
 		'PARENT.LABEL':'Contenitore',
 		'PRODUCER.LABEL':'Produttore',
 	 	'ATTRIBUTE.LABEL':'Attribute',
 		'NAME.REQUIRED':'Nome obbligatorio',
 		'DESCRIPTION.REQUIRED':'Descrizione obbligatoria',
 		'CATEGORY.REQUIRED':'Categoria obbligatoria',
 		'TYPE.REQUIRED':'Type obbligatorio',
 	 	'EDIT.BUTTON':'Modifica',
 		'DELETE.BUTTON':'Cancella',
 		'NEW.BUTTON':'Nuova',
 		'NEW.TITLE':'Nuova',
 		'INS.OK': 'Prodotto inserito!',
		'UPD.OK': 'Prodotto modificato !',
		'MODIFY.TITLE':'Modifica',
		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare il Prodotto ?",
		'SUBMIT.BUTTON':'Conferma',
 		'ATTRIBUTES.LABEL':'Attributi',
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

app.controller('pageCtrl', function($q,$scope,$http,$translate,ircompany,irproduct,
		irgetobjectbyname,irgetattributes,irsetattributevalue,irattributevalues,irremoveattributevalue) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	
	callRestWs($http,'product/getCategoryAll','GET',{},{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.categories=response.data.categories;
					}
					else
					{
						manageError($scope,response.data.resultCode,response.data.resultDesc);
					}
				}, 
				function(data, status, headers, config){
						manageError($scope,status,data);
				});
	
	callRestWs($http,'product/getTypeAll','GET',{},{},
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
	
	
	irgetobjectbyname($scope.securityToken,"Product").then(function(response) {
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
	
		
	$scope.onSearchParent=function(){
		irproduct($scope.parentName,'','','','',$scope.securityToken).then(function(response) {
			if (response.data.resultCode==RESULT_OK){
					//alert (JSON.stringify(response));
					$scope.parents=response.data.products;
				}
			else
				{
					manageError($scope,response.data.resultCode,response.data.resultDesc);
				}
			}, function(data, status, headers, config) {
    	    	manageError($scope,status,data);
    	    });
	}
	
	$scope.onUpdateParent=function(){
		if ($scope.parents!=undefined && $scope._selectedParent!=undefined){
			$scope._parentId=$scope._selectedParent;
			for (var i=0;i<$scope.parents.length;i++){
				if ($scope.parents[i].id==$scope._parentId){
					$scope._parentName=$scope.parents[i].name;
					return;
				}
			}
		}
	}
	
	$scope.onDeleteParent=function(){
		$scope._parentId="";
		$scope._parentName="";
	}
	
	$scope.onSearchProducer=function(){
		ircompany('',$scope.producerName,$scope.securityToken).then(function(response) {
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
	
	$scope.onUpdateProducer=function(){
		if ($scope.companies!=undefined && $scope._selectedProducer!=undefined){
			$scope._producerId=$scope._selectedProducer;
			for (var i=0;i<$scope.companies.length;i++){
				if ($scope.companies[i].id==$scope._producerId){
					$scope._producerName=$scope.companies[i].name;
					return;
				}
			}
		}
	}
	
	$scope.onDeleteProducer=function(){
		$scope._producerId="";
		$scope._producerName="";
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
