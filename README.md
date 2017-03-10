# iTime-web
The iTime web client

## First time setup
* Install nginx
* Install npm 
* Run **npm install**
* Run **gulp setup**
* Set nginx root path = ”(*path to iTime-web*)/www”
* Start nginx **sudo nginx**

## Following builds
* run **gulp build**

##Clear www
* run **gulp clear**

##Watch
* run **gulp watch**

## Guidelines
Develop in the *dev* folder, not in the *www* folder.
All *js* files in the *www/js* folder will be merged to one big file named *main.min.js*
## Dependencies
* http://www.chartjs.org/
