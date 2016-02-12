Cy-bss-ironhorse is a GUI (Web) of cy-bss-core (https://github.com/antoniofurone/cy-bss-core.git). 
The app is based on html5, AngularJS, Bootstrap and Google Maps.

Installation
------------ 
1) Download zip from https://github.com/antoniofurone/cy-bss-ironhorse.git (or import project in Eclipse);
2) go under WebContent/js/ironhorse-common.js and change the cy-bss-core URL:
	var CORE_URL="http://localhost:8080/cy-bss-core";
3) after cy-bss-core installation, from root folder of project (contains build.xml) run ant;
6) Deploy cy-bss-core.war to Tomcat.

Try App
-------
If the installation is successful completed at http://<address>:<port>/cy-bss-ironhorse you can try the app.
The inital userid and password are cybss/cybss.

 
	