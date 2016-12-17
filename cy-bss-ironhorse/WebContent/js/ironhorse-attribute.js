	angular.module('irattribute',[])
	.factory('irgetobjectbyname',function($http,$q){
		return function(securityToken,objectName){
			var deferred = $q.defer();
			callRestWs($http,'object/getObjectByName/'+objectName,'GET',
					{"Security-Token":securityToken,"Language":languageCode},
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
	.factory('irgetattributes',function($http,$q){
		return function(securityToken,id){
			var deferred = $q.defer();
			callRestWs($http,'object/'+id+'/getAttributes','GET',
					{"Security-Token":securityToken,"Language":languageCode},
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
	.factory('irsetattributevalue',function($http,$q){
		return function(securityToken,data){
			var deferred = $q.defer();
			
			var headers={"Security-Token":securityToken};
			
			callRestWs($http,'object/setAttributeValue','POST',
					headers,
					data,
			function(response){
					deferred.resolve(response);						
			}, 
			function(data, status, headers, config){
					deferred.reject(data, status, headers, config);	
			});
			
			return deferred.promise;
		} 
	})
	.factory('irattributevalues',function($http,$q){
		return function(securityToken,objectId,instId){
			var deferred = $q.defer();
			callRestWs($http,'object/'+objectId+'/getAttributeValues/'+instId,'GET',
					{"Security-Token":securityToken,"Language":languageCode},
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
	.factory('irremoveattributevalue',function($http,$q){
		return function(securityToken,attrId,instId){
			var deferred = $q.defer();
			callRestWs($http,'object/'+attrId+'/removeAttributeValue/'+instId,'GET',
					{"Security-Token":securityToken,"Language":languageCode},
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
