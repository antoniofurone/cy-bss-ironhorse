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
	;

