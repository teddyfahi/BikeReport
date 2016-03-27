### Assignment Master of Applied Computer Science ###

Student Project, Module: MA210, Mobile Computing
This assignment take the form of an application-led project and the group consist of the two students Yuriy Lianguzov (yuriylianguzov@gmail.com) and Teddy Falsen Hiis (teddyfahi@gmail.com).

### About BikeRport ###

BikeReport is an app that is about making a choice whether it’s a good day for bike riding or not, based on location based weather data such as wind speed, temperature, sunrise/sunset and rain. In addition to this, the application will recommend bike trails, based on your chosen user level. It will also give you some daily bike-related tips, suitable for the conditions of the day, such as "Sun will set early today, remember to bring light". 

The location of the user is set default Oslo, and all tracks are to be found in Oslo. Therefore, there is no input field for changing location. For testing purposes though, we have added an array of locations with varied weather conditions of which can be tested manually (see more info below).

The delivered code is a proof-of-concept ios version of the application. 

### How to test the app ###

BikeReport application is delivered through Ionic View. 

Download Ionic View to your iPhone 5 or later: 
[https://itunes.apple.com/us/app/ionic-view/id849930087?mt=8](https://itunes.apple.com/us/app/ionic-view/id849930087?mt=8)

Log in with the following credentials:
email: **bikereport.westerdals@gmail.com**
password: **bikereportWesterdals**

Click BikeReport and choose **VIEW APP** 
Note that the app will take a while to download the first time it is tested on a new device.

For testing purposes, the application comes with an option of changing the default location to see how the app adapts to weather change.
You find this option simply by clicking the cogwheel found in the top left corner of the screen. As soon as you click a new location, the app will adapt and you can simply press X to excecute on your choice. Note, as this is only added for testing purposes, the application will not provide any UI elements of response when you change the location. 
Available locations are: Oslo (default), Brisbane, Tromsø, Isle of Skye (UK).

### Looking into the code ###

All code is delivered as a .zip file through It'slearning. The code can be run and app can be tested if Ionic is installed. To learn more about Ionic visit [http://ionicframework.com](http://ionicframework.com)
There is two ways to test the code locally:

1. First alternative:
cd to the project folder
run: ionic emulate ios

2. Second alternative: 
cd to the project folder
run: ionic serve --lab
This command will simulate the application in Chrome. 
Note that for the API of forecast.io (weather data used in this project) to send the request there is the need of installing a Chrome plugin called CORS. To enable cross-origin resource sharing, overwriting the location of the tester. This is a mechanism that allows JavaScript on a web page to make XMLHttpRequests to another domain, not the domain the JavaScript originated from.
Follow the link to enable the Chrome plugin: [https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi)





