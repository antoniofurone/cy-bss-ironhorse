angular.module('irsearch',[])
	.factory('irperson',function($http,$q){
		return function(code,firstName,secondName,securityToken){
			
			var query="?code="+(code!=undefined?encodeURIComponent(code):'');
			query+="&firstName="+(firstName!=undefined?encodeURIComponent(firstName):'');
			query+="&secondName="+(secondName!=undefined?encodeURIComponent(secondName):'');
			
			
			var deferred = $q.defer();
			callRestWs($http,'person/find'+query,'GET',
					{"Security-Token":securityToken},
					{},
					function(response){
							deferred.resolve(response);						
					}, 
					function(data, status, headers, config){
							deferred.reject(data, status, headers, config);	
			});
			return deferred.promise;
		} 
	})
	.factory('ircompany',function($http,$q){
		return function(code,name,securityToken){
			
			var query="?code="+(code!=undefined?encodeURIComponent(code):'');
			query+="&name="+(name!=undefined?encodeURIComponent(name):'');
			
			var deferred = $q.defer();
			callRestWs($http,'company/find'+query,'GET',
					{"Security-Token":securityToken},
					{},
					function(response){
							deferred.resolve(response);						
					}, 
					function(data, status, headers, config){
							deferred.reject(data, status, headers, config);	
			});
			return deferred.promise;
		} 
	})
	.factory('irproduct',function($http,$q){
		return function(name,categoryId,typeId,attrName,attrValue,securityToken){
			
			var query="?name="+(name!=undefined?encodeURIComponent(name):'');
			query+="&categoryId="+(categoryId!=undefined?encodeURIComponent(categoryId):'0');
			query+="&typeId="+(typeId!=undefined?encodeURIComponent(typeId):'0');
			query+="&attrName="+(attrName!=undefined?encodeURIComponent(attrName):'');
			query+="&attrValue="+(attrValue!=undefined?encodeURIComponent(attrValue):'');
			
			var deferred = $q.defer();
			callRestWs($http,'product/find'+query,'GET',
					{"Security-Token":securityToken},
					{},
					function(response){
							deferred.resolve(response);						
					}, 
					function(data, status, headers, config){
							deferred.reject(data, status, headers, config);	
			});
			return deferred.promise;
		} 
	})
	.factory('irpurchase',function($http,$q){
		return function(companyId,productId,productName,
				supplierId,supplierCode,supplierName,
				personId,personCode,personName,
				attrName,attrValue,
				fromDate,toDate,
				securityToken){
			
			var query="?companyId="+(companyId!=undefined?encodeURIComponent(companyId):'0');
			query+="&productId="+(productId!=undefined?encodeURIComponent(productId):'0');
			query+="&productName="+(productName!=undefined?encodeURIComponent(productName):'');
			
			query+="&supplierId="+(supplierId!=undefined?encodeURIComponent(supplierId):'0');
			query+="&supplierCode="+(supplierCode!=undefined?encodeURIComponent(supplierCode):'');
			query+="&supplierName="+(supplierName!=undefined?encodeURIComponent(supplierName):'');
			
			query+="&personId="+(personId!=undefined?encodeURIComponent(personId):'0');
			query+="&personCode="+(personCode!=undefined?encodeURIComponent(personCode):'');
			query+="&personName="+(personName!=undefined?encodeURIComponent(personName):'');
			
			query+="&attrName="+(attrName!=undefined?encodeURIComponent(attrName):'');
			query+="&attrValue="+(attrValue!=undefined?encodeURIComponent(attrValue):'');
			
			query+="&fromDate="+(fromDate!=undefined?encodeURIComponent(fromDate):'');
			query+="&toDate="+(toDate!=undefined?encodeURIComponent(toDate):'');
			
			var deferred = $q.defer();
			callRestWs($http,'purchase/find'+query,'GET',
					{"Security-Token":securityToken},
					{},
					function(response){
							deferred.resolve(response);						
					}, 
					function(data, status, headers, config){
							deferred.reject(data, status, headers, config);	
			});
			return deferred.promise;
		} 
	})
	.factory('irsale',function($http,$q){
		return function(companyId,productId,productName,
				customerId,customerCode,customerName,
				personId,personCode,personName,
				attrName,attrValue,
				fromDate,toDate,
				securityToken){
			
			var query="?companyId="+(companyId!=undefined?encodeURIComponent(companyId):'0');
			query+="&productId="+(productId!=undefined?encodeURIComponent(productId):'0');
			query+="&productName="+(productName!=undefined?encodeURIComponent(productName):'');
			
			query+="&customerId="+(customerId!=undefined?encodeURIComponent(customerId):'0');
			query+="&customerCode="+(customerCode!=undefined?encodeURIComponent(customerCode):'');
			query+="&customerName="+(customerName!=undefined?encodeURIComponent(customerName):'');
			
			query+="&personId="+(personId!=undefined?encodeURIComponent(personId):'0');
			query+="&personCode="+(personCode!=undefined?encodeURIComponent(personCode):'');
			query+="&personName="+(personName!=undefined?encodeURIComponent(personName):'');
			
			query+="&attrName="+(attrName!=undefined?encodeURIComponent(attrName):'');
			query+="&attrValue="+(attrValue!=undefined?encodeURIComponent(attrValue):'');
			
			query+="&fromDate="+(fromDate!=undefined?encodeURIComponent(fromDate):'');
			query+="&toDate="+(toDate!=undefined?encodeURIComponent(toDate):'');
			
			var deferred = $q.defer();
			callRestWs($http,'sale/find'+query,'GET',
					{"Security-Token":securityToken},
					{},
					function(response){
							deferred.resolve(response);						
					}, 
					function(data, status, headers, config){
							deferred.reject(data, status, headers, config);	
			});
			return deferred.promise;
		} 
	})
	.factory('irinvoice',function($http,$q){
		return function(number,year,companyId,
				tpCompanyId,tpCompanyCode,tpCompanyName,
				personId,personCode,personName,
				fromDate,toDate,invoiceType,
				securityToken){
			
			var query="?companyId="+(companyId!=undefined?encodeURIComponent(companyId):'0');
			query+="&tpCompanyId="+(tpCompanyId!=undefined?encodeURIComponent(tpCompanyId):'0');
			query+="&tpCompanyCode="+(tpCompanyCode!=undefined?encodeURIComponent(tpCompanyCode):'');
			query+="&tpCompanyName="+(tpCompanyName!=undefined?encodeURIComponent(tpCompanyName):'');
			
			query+="&personId="+(personId!=undefined?encodeURIComponent(personId):'0');
			query+="&personCode="+(personCode!=undefined?encodeURIComponent(personCode):'');
			query+="&personName="+(personName!=undefined?encodeURIComponent(personName):'');
			
			query+="&number="+(number!=undefined?encodeURIComponent(number):'0');
			query+="&year="+(year!=undefined?encodeURIComponent(year):'0');
			
			query+="&fromDate="+(fromDate!=undefined?encodeURIComponent(fromDate):'');
			query+="&toDate="+(toDate!=undefined?encodeURIComponent(toDate):'');
			
			var deferred = $q.defer();
			callRestWs($http,'invoice/'+invoiceType+'/find'+query,'GET',
					{"Security-Token":securityToken},
					{},
					function(response){
							deferred.resolve(response);						
					}, 
					function(data, status, headers, config){
							deferred.reject(data, status, headers, config);	
			});
			return deferred.promise;
		} 
	})
	.factory('ircitysearch',function($http,$q){
		return function(name,stateRegion,countryId,securityToken){
			
			var query="?name="+(name!=undefined?encodeURIComponent(name):'');
			query+="&stateRegion="+(stateRegion!=undefined?encodeURIComponent(stateRegion):'');
			query+="&countryId="+(countryId!=undefined?encodeURIComponent(countryId):'0');
			
			var deferred = $q.defer();
			callRestWs($http,'city/find'+query,'GET',
					{"Security-Token":securityToken},
					{},
					function(response){
							deferred.resolve(response);						
					}, 
					function(data, status, headers, config){
							deferred.reject(data, status, headers, config);	
			});
			return deferred.promise;
		} 
	})
	.factory('ircountrysearch',function($http,$q){
		return function(name,securityToken){
			
			var query="?name="+(name!=undefined?encodeURIComponent(name):'');
			
			var deferred = $q.defer();
			callRestWs($http,'country/find'+query,'GET',
					{"Security-Token":securityToken},
					{},
					function(response){
							deferred.resolve(response);						
					}, 
					function(data, status, headers, config){
							deferred.reject(data, status, headers, config);	
			});
			return deferred.promise;
		} 
	})
	;
