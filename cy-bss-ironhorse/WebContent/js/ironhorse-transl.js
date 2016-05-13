var menuMapTranslation={
		"en":
			{
				"MENU.ADMIN":"Administration",
				"MENU.ADMIN.USER":"Manage users",
				"MENU.ADMIN.CHPWD":"Change Password",
				"MENU.ADMIN.CONTACTTYPE":"Contact Type",
				"MENU.ADMIN.ATTRIBUTE":"Attributes",
				
				"MENU.ENTITY":"Entity",
				'MENU.ENTITY.CITY':"City",
				'MENU.ENTITY.COUNTRY':"Country",
				"MENU.ENTITY.COMPANY":"Company",
				"MENU.ENTITY.PERSON":"Person",
				"MENU.ENTITY.FILE":"File",
				
				"MENU.OPERATION":"Operation",
				"MENU.OPERATION.TTMS":"TTMS",
				
				"MENU.MAPS":"Maps",
				"MENU.MAPS.URBANBOT.WARN":"Warnings",
				"MENU.MAPS.URBANBOT.EVENTS":"Events",
				"MENU.MAPS.URBANBOT.STORIES":"Stories",
				"MENU.MAPS.URBANBOT.SITES":"Tourist Sites"
			},
		"it":
			{
				"MENU.ADMIN":"Amministrazione",
				"MENU.ADMIN.USER":"Gestione utenti",
				"MENU.ADMIN.CHPWD":"Modifica Password",
				"MENU.ADMIN.CONTACTTYPE":"Tipologie Contatti",
				"MENU.ADMIN.ATTRIBUTE":"Attributi",
				
				"MENU.ENTITY":"Entita'",
				'MENU.ENTITY.CITY':"Citta'",
				'MENU.ENTITY.COUNTRY':"Paese",
				"MENU.ENTITY.COMPANY":"Azienda",
				"MENU.ENTITY.PERSON":"Persona",
				"MENU.ENTITY.FILE":"File",
				
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