var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'PRODUCTCATEGORY.TITLE':'Product Categories',
     		'NEW.TITLE':'New Product Category',
     		'MODIFY.TITLE':'Edit Product Category',
     		'DESCRIPTION.LABEL':'Description',
     		'NAME.LABEL':'Name',
     		'NAME.REQUIRED':'Name is required',
     		'METRIC.REQUIRED':'Metric is required',
     		'VAT.REQUIRED':'Vat required and numeric',
     		'VAT.LABEL':'Vat',
     		'METRIC.LABEL':'Metric',
     		'SUBMIT.BUTTON':'Submit',
		    'BACK.BUTTON': 'Back',
		    'EDIT.BUTTON': 'Edit',
		    'DELETE.BUTTON': 'Delete',
		    'INS.OK': 'Category added !',
		    'UPD.OK': 'Category updated !',
		    'DELETECONFIRM.MESSAGE': 'Are you sure to delete Category?'
		  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'PRODUCTCATEGORY.TITLE':'Categorie di Prodotto',
			'NEW.TITLE':'Nuova Categoria di Prodotto',
			'MODIFY.TITLE':'Modifica Categoria di Prodotto',
			'DESCRIPTION.LABEL':'Descrizione',
			'NAME.LABEL':'Nome',
			'NAME.REQUIRED':'Nome obbligatorio',
			'METRIC.REQUIRED':'Metrica obbligatoria',
			'VAT.REQUIRED':'Iva obbligaotoria e numerica',
     		'VAT.LABEL':'Iva',
     		'METRIC.LABEL':'Metric',
     		'SUBMIT.BUTTON':'Conferma',
    		'BACK.BUTTON': 'Indietro',
    	    'EDIT.BUTTON': 'Modifica',
   		    'DELETE.BUTTON': 'Cancella',
   		 	'INS.OK': 'Categoria di prodotto inserita !',
    		'UPD.OK': 'Categoria di prodotto modificata !',
    		'DELETECONFIRM.MESSAGE': "Sei sicuro di cancellare la Categoria di Prodotto?"
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages,irmetrics) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	irmetrics($scope.securityToken).then(function(response) {
		if (response.data.resultCode==RESULT_OK){
			//alert (JSON.stringify(response));
			$scope.metrics=response.data.metrics;
		}
		else
		{
			manageError($scope,response.data.resultCode,response.data.resultDesc);
		}
    }, function(data, status, headers, config) {
    	manageError($scope,status,data);
    });
	
	
	$search=function(){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'product/getCategoryAll','GET',
			headers,
			{},
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
		$scope._vat='';
		$scope._selectedMetric='';
		
	}
	// end new
	
	$scope.onSubmit = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.productCategoryList._name.$error.required || 
			$scope.productCategoryList._selectedMetric.$error.required ||	
			$scope.productCategoryList._vat.$error.required || $scope.productCategoryList._vat.$error.number
			)
    		return;
		
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		data['name']=$scope._name;
		data['description']=$scope._description;
		data['vat']=$scope._vat;
		data['metricId']=$scope._selectedMetric;
		
		
		callRestWs($http,!$scope.modify?'product/addCategory':'product/'+$scope.category_id+'/updateCategory','POST',
				headers,
				data,
				function(response){
					if (response.data.resultCode==RESULT_OK){
						
						if (!$scope.modify){
   							$translate('INS.OK')
   		    	          		.then(function (translatedValue) {
   		    	              		$scope.infoMessage=translatedValue;
   		    	          	});
   							$scope.category_id=response.data.category.id;
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
	
	
	$scope.editCategory = function(id){
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		$scope.modify=true;
		$scope.detail=true;
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'product/'+id+'/getCategory','GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.category_id=response.data.category.id;
							$scope._name=response.data.category.name;
							$scope._description=response.data.category.description;
							$scope._vat=response.data.category.vat;
							$scope._selectedMetric=response.data.category.metricId;
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
	
	$scope.deleteCategory = function(id){
		
		$translate('DELETECONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'product/'+id+'/removeCategory','GET',
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
