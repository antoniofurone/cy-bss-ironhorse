var menuMapTranslation={
		"en":
			{
				"MENU.ADMIN":"Administration",
				"MENU.ADMIN.USER":"Manage users",
				
				"MENU.OPERATION":"Operation",
				"MENU.OPERATION.TTMS":"TTMS"
					
			},
		"it":
			{
				"MENU.ADMIN":"Amministrazione",
				"MENU.ADMIN.USER":"Gestione utenti",
				
				"MENU.OPERATION":"Operation",
				"MENU.OPERATION.TTMS":"TTMS"
					 
			}
		};

angular.module('irtranslator', []).filter('irtranslate', function() {
	  return function(input) {
	  var langCode=getLanguage();  
	  return menuMapTranslation[langCode][input];
	  };
	});