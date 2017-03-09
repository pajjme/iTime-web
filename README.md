# iTime-web
The iTime web client

## First time setup
* Install nginx
* Install npm 
* Run **npm install**
* Run **npm run setup**
* Set nginx root path = ”(*path to iTime-web*)/www”
* Start nginx **sudo nginx**

## Folowing build
* run **npm run build**

##Clear www
* run **npm run clear

## Guidelines
Develop in the *dev* folder, not in the *www* folder.
All *js* files in the *www/js* folder will be merged to one big file named *main.min.js*
## Dependencies
* http://www.chartjs.org/
