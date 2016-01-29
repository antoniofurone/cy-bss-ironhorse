var menuMapTranslation={
		"en":
			{
				"MENU.ADMIN":"Administration",
				"MENU.ADMIN.USER":"Manage users",
				"MENU.ADMIN.CHPWD":"Change Password",
				
				"MENU.OPERATION":"Operation",
				"MENU.OPERATION.TTMS":"TTMS",
				
				"MENU.MAPS":"Maps",
				"MENU.MAPS.URBANBOT.WARN":"Warnings",
				"MENU.MAPS.URBANBOT.STORIES":"Stories",
				"MENU.MAPS.URBANBOT.SITES":"Tourist Sites"
			},
		"it":
			{
				"MENU.ADMIN":"Amministrazione",
				"MENU.ADMIN.USER":"Gestione utenti",
				"MENU.ADMIN.CHPWD":"Modifica Password",
				
				"MENU.OPERATION":"Operation",
				"MENU.OPERATION.TTMS":"TTMS",
					 
				"MENU.MAPS":"Mappe",
				"MENU.MAPS.URBANBOT.WARN":"Segnalazioni",
				"MENU.MAPS.URBANBOT.STORIES":"Storie",
				"MENU.MAPS.URBANBOT.SITES":"Siti Turistici"
		
			}
		};

angular.module('irtranslator', []).filter('irtranslate', function() {
	  return function(input) {
	  var langCode=getLanguage();  
	  return menuMapTranslation[langCode][input];
	  };
	});