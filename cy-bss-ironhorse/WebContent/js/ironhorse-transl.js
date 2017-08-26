var menuMapTranslation={
		"en":
			{
				"MENU.ADMIN":"Administration",
				"MENU.ADMIN.USER":"Users",
				"MENU.ADMIN.CHPWD":"Change Password",
				"MENU.ADMIN.CONTACTTYPE":"Contact Types",
				"MENU.ADMIN.PRICECOMPONENT":"Price Components",
				"MENU.ADMIN.ATTRIBUTE":"Attributes",
				"MENU.ADMIN.CURRENCY":"Currencies",
				"MENU.ADMIN.MANAGED":"Managed Company",
				"MENU.ADMIN.METRIC":"Metrics",
				"MENU.ADMIN.SCALE":"Metric Scales",
				"MENU.ADMIN.PRODUCTCATEGORY":"Product Categories",
				"MENU.ADMIN.PRODUCTTYPE":"Product Types",
				
				"MENU.ENTITY":"Entity",
				'MENU.ENTITY.CITY':"City",
				'MENU.ENTITY.COUNTRY':"Country",
				"MENU.ENTITY.COMPANY":"Company",
				"MENU.ENTITY.PERSON":"Person",
				"MENU.ENTITY.PRODUCT":"Product",
				"MENU.ENTITY.FILE":"File",
				
				"MENU.OPERATION":"Operation",
				"MENU.OPERATION.INVOICE":"Invoices",
				"MENU.OPERATION.SELFINVOICE":"Self Invoices",
				"MENU.OPERATION.PURCHASE":"Purchases",
				"MENU.OPERATION.SALES":"Sales",
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
				"MENU.ADMIN.USER":"Utenti",
				"MENU.ADMIN.CHPWD":"Modifica Password",
				"MENU.ADMIN.COMPONENTTYPE":"",
				"MENU.ADMIN.CONTACTTYPE":"Tipologie Contatti",
				"MENU.ADMIN.PRICECOMPONENT":"Componenti di Prezzo",
				"MENU.ADMIN.ATTRIBUTE":"Attributi",
				"MENU.ADMIN.CURRENCY":"Valute",
				"MENU.ADMIN.MANAGED":"Aziende Gestite",
				"MENU.ADMIN.METRIC":"Metriche",
				"MENU.ADMIN.SCALE":"Scale",
				"MENU.ADMIN.PRODUCTCATEGORY":"Categorie Prodotto",
				"MENU.ADMIN.PRODUCTTYPE":"Tipologie Prodotto",
				
				
				"MENU.ENTITY":"Entita'",
				'MENU.ENTITY.CITY':"Citta'",
				'MENU.ENTITY.COUNTRY':"Paese",
				"MENU.ENTITY.COMPANY":"Azienda",
				"MENU.ENTITY.PERSON":"Persona",
				"MENU.ENTITY.PRODUCT":"Prodotto",
				"MENU.ENTITY.FILE":"File",
				
				"MENU.OPERATION":"Operazioni",
				"MENU.OPERATION.INVOICE":"Fatture",
				"MENU.OPERATION.SELFINVOICE":"Auto Fatture",
				"MENU.OPERATION.PURCHASE":"Aquisti",
				"MENU.OPERATION.SALES":"Vendite",
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