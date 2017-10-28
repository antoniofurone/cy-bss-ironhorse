var app = angular.module('pageApp', ['pascalprecht.translate','irtranslator','irlist','irsearch'])
	.config(function($translateProvider) {
     	$translateProvider
     	.translations('en',{
     		'SEARCH.BUTTON':'Search',
     		'NEW.BUTTON':'New',
     		'SERVER.TITLE':'Server',
     		'COMMAND.TITLE':'Commands',
     		'QUEUE.TITLE':'Queue',
     		'SERVER.LABEL':'Server',
     		'COMMAND.LABEL':'Command',
     		'NODEID.LABEL':'Node',
     		'STATUS.LABEL':'Status',
     		'IP.LABEL':'IP',
     		'MACHINE.LABEL':'Machine',
     		'STARTDATE.LABEL':'Start Date',
     		'STOPDATE.LABEL':'Stop Date',
     		'SENDCOMMAND.BUTTON':'Send',
     		'SERVER.REQUIRED':'Server Required',
     		'COMMAND.REQUIRED':'Command Required',
     		'SERVERID.LABEL':'ServerId',
     		'REQEXECDATE.LABEL':'Requested Execution Date',
     		'EXECDATE.LABEL':'Execution Date',
     		'RESULT.LABEL':'Result',
     		'DELETE.BUTTON': 'Delete',
     		'DELETECOMMANDCONFIRM.MESSAGE':'Are you sure to delete command ?',
     		'DELETEITEMCONFIRM.MESSAGE':'Are you sure to delete item ?',
     		'OBJECTNAME.LABEL':'Object Name',
     		'OBJECTID.LABEL':'Object Id',
     		'STARTEXECDATE.LABEL':'Start Execution',
     		'ENDEXECDATE.LABEL':'End Execution',
     		'INS.OK':'Command Sent'
     	     		
     	  })
		  
		.translations('it',{
			'SEARCH.BUTTON':'Ricerca',
			'NEW.BUTTON':'Nuovo',
			'SERVER.TITLE':'Server',
			'COMMAND.TITLE':'Commandi',
			'QUEUE.TITLE':'Coda',
     		'SERVER.LABEL':'Server',
			'COMMAND.LABEL':'Commando',
     		'NODEID.LABEL':'Nodo',
			'STATUS.LABEL':'Stato',
			'IP.LABEL':'IP',
			'MACHINE.LABEL':'Macchina',
			'STARTDATE.LABEL':'Data Start',
			'STOPDATE.LABEL':'Data Stop',
			'SENDCOMMAND.BUTTON':'Invia',
			'SERVER.REQUIRED':'Server Obbligatorio',
			'COMMAND.REQUIRED':'Comando Obbligatorio',
			'SERVERID.LABEL':'ServerId',
			'REQEXECDATE.LABEL':'Data Esecuzione Richiesta',
			'EXECDATE.LABEL':'Data Esecuzione',
			'RESULT.LABEL':'Risultato',
			'DELETE.BUTTON': 'Delete',
			'DELETECOMMANDCONFIRM.MESSAGE':'Sei sicuro di cancellare il comando ?',
			'DELETEITEMCONFIRM.MESSAGE':"Sei sicuro di cancellare l'item ?",
			'OBJECTNAME.LABEL':'Nome Oggetto',
			'OBJECTID.LABEL':'Id Oggetto',
			'STARTEXECDATE.LABEL':'Inizio Esecuzione',
			'ENDEXECDATE.LABEL':'Fine Esecuzione',
			'INS.OK':'Comando Inviato'
	     	    
		  });
     	
     	 $translateProvider.preferredLanguage(getLanguage());
 	});



app.controller('pageCtrl', function($q,$scope,$http,$translate,iruserroles,irlanguages) {
	$scope.detail=false;
	$scope.securityToken=getLocalStorageItem("org.cysoft.bss.ih.securityToken");
	
	$search=function(){
	var headers={"Security-Token":$scope.securityToken};
	callRestWs($http,'server/getAll','GET',
			headers,
			{},
			function(response){
					if (response.data.resultCode==RESULT_OK){
						$scope.servers=response.data.servers;
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
	
	
	$scope.onSendCommand = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		if ($scope.serverList._selectedServer.$error.required || $scope.serverList._command.$error.required) 
		return;
			
		var headers={"Security-Token":$scope.securityToken};
		var data = {};
		
		data['command']=$scope._command;
		data['serverId']=$scope._selectedServer;
			
		callRestWs($http,'server/addCommand','POST',
			headers,
			data,
			function(response){
				if (response.data.resultCode==RESULT_OK){
					
						$translate('INS.OK')
	    	          		.then(function (translatedValue) {
	    	              		$scope.infoMessage=translatedValue;
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
	
	$scope.onSearhCommand = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		var query="?serverId="+($scope._selectedServerCommand!=undefined?encodeURIComponent($scope._selectedServerCommand):'');
		query+="&status="+($scope._selectedStatusCommand!=undefined?encodeURIComponent($scope._selectedStatusCommand):'');
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'server/getCommands'+query,'GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.commands=response.data.commands;
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
	
	
	
	
	$scope.deleteCommand = function(id){
		
		$translate('DELETECOMMANDCONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'server/'+id+'/removeCommand','GET',
 					headers,
 					{},
 					function(response){
 							if (response.data.resultCode==RESULT_OK){
 								$scope.onSearhCommand();							
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
	
	$scope.onSearhQueue = function() {
		$scope.errorMessage="";
		$scope.infoMessage="";
		
		var query="?serverId="+($scope._selectedServerQueue!=undefined?encodeURIComponent($scope._selectedServerQueue):'');
		query+="&status="+($scope._selectedStatusQueue!=undefined?encodeURIComponent($scope._selectedStatusQueue):'');
		
		var headers={"Security-Token":$scope.securityToken};
		callRestWs($http,'server/getQueueItems'+query,'GET',
				headers,
				{},
				function(response){
						if (response.data.resultCode==RESULT_OK){
							$scope.items=response.data.items;
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
	
	$scope.deleteQueue = function(id){
		
		$translate('DELETEITEMCONFIRM.MESSAGE')
 		.then(function (translatedValue) {
 			if (!confirm(translatedValue))
				return;
			
 			var headers={"Security-Token":$scope.securityToken};
 			callRestWs($http,'server/'+id+'/removeQueueItem','GET',
 					headers,
 					{},
 					function(response){
 							if (response.data.resultCode==RESULT_OK){
 								$scope.onSearhQueue();							
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
