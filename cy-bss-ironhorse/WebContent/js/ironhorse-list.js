	angular.module('irlist',[])
	.factory('irticketstatus',function($http,$q){
		return function(securityToken,languageCode){
			
			var deferred = $q.defer();
			callRestWs($http,'ticket/getStatusAll','GET',
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
	.factory('irticketcategory',function($http,$q){
		return function(securityToken,languageCode){
			
			var deferred = $q.defer();
			callRestWs($http,'ticket/getCategoryAll','GET',
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
	.factory('irticketnextstates',function($http,$q){
		return function(securityToken,statusId){
			
			var deferred = $q.defer();
			callRestWs($http,'ticket/'+statusId+'/getNextStates','GET',
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
	.factory('iruserroles',function($http,$q){
		return function(securityToken){
			var deferred = $q.defer();
			callRestWs($http,'user/getRoleAll','GET',
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
	.factory('irlanguages',function($http,$q){
		return function(securityToken){
			var deferred = $q.defer();
			callRestWs($http,'language/getLanguageAll','GET',
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
	.factory('ircities',function($http,$q){
		return function(securityToken){
			var deferred = $q.defer();
			callRestWs($http,'city/getCityAll','GET',
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
	.factory('ircontacttypes',function($http,$q){
		return function(securityToken){
			var deferred = $q.defer();
			callRestWs($http,'contact/getContactTypeAll','GET',
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
