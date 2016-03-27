// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('bike-report', ['ionic', 'ngCordova'])
       .controller('MainController', MainController)
       .config(mainConfig)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    function mainConfig($cordovaInAppBrowserProvider) {
      var defaultOptions = {
        location: 'yes',
        clearcache: 'no',
        toolbar: 'yes'
      };

      document.addEventListener(function () {

        $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions)

      }, false);
    }
  });
});


MainController.$inject = [
  '$ionicModal',
  '$http',
  '$scope'
];

function MainController (
  $ionicModal,
  $http,
  $scope
) {

  // Variables declarations
  var vm = this;

  vm.closeLevelModal = closeLevelModal;
  vm.getWeather      = getWeather;
  vm.openLevelModal  = openLevelModal;
  vm.openLevelModal  = openLevelModal;
  vm.setCity         = setCity;
  vm.level           = 'Beginner';
  //vm.muddy = true;
  vm.openLink=function(url){
    window.open(url,'_system');
  };

  // Cities collection for testing the app in winter time
  vm.cities = {
    Oslo: {
      lat : '59.9123',
      lon : '10.7500',
      name: 'Oslo, Norway'
    },
    Rotorua: {
      lat : '-38.1369',
      lon : '176.2506',
      name: 'Rotorua, New Zealand'
    },
    Brisbane: {
      lat : '-27.4685',
      lon : '153.0234',
      name: 'Brisbane, Australia'
    },
    Bergen: {
      lat : '60.3907',
      lon : '5.3328',
      name: 'Bergen, Norway'
    },
    Tanzania: {
      lat : '-6.3682',
      lon : '34.8852',
      name: 'Nkonko, Tanzania'
    },
    // For testing snowy conditions
    Tromso: {
      lat : '69.6510',
      lon : '18.9557',
      name: 'Tromso, Norway'
    },
    // Possible rainy conditions
    Skye: {
      lat : '57.3626',
      lon : '-6.2190',
      name: 'Isle Of Skye, UK'
    }
  };

  // Trails from mtbmap.no
  vm.trails = {
    Beginner: [
      {
        title : 'Grinda - Peder Ankers Vei',
        muddy : false,
        length: 'short',
        url   : 'http://mtbmap.no/#15/59.9653/10.7585'
      },
      {
        title : 'Mærradalsbekken',
        muddy : true,
        length: 'long',
        url   : 'http://mtbmap.no/#15/59.9336/10.6594'
      },
      {
        title : 'Bygdøy',
        muddy : true,
        length: 'short',
        url   : 'http://mtbmap.no/#14/59.9093/10.6764'
      },
      {
        title : 'Ekeberg trails',
        muddy : false,
        length: 'short',
        url   : 'http://mtbmap.no/#15/59.8895/10.7929'
      },
      {
        title : 'Haga golfklubb',
        muddy : false,
        length: 'long',
        url   : 'http://mtbmap.no/#14/59.9567/10.5746'
      }
    ],
    Intermediate: [
      {
        title : 'E6',
        muddy : false,
        length: 'long',
        url   : 'http://mtbmap.no/#14/60.0015/10.7325'
      },
      {
        title : 'Gamle skjennungsvei',
        muddy : true,
        length: 'short',
        url   : 'http://mtbmap.no/#15/59.9910/10.6975'
      },
      {
        title : 'Mojo',
        muddy : true,
        length: 'long',
        url   : 'http://mtbmap.no/#15/59.9928/10.7184'
      },
      {
        title : 'Dorullstien/Jerbanstien',
        muddy : true,
        length: 'long',
        url   : 'http://mtbmap.no/#14/60.0001/10.8081'
      },
      {
        title : 'Gamle Nordmarksvei',
        muddy : false,
        length: 'long',
        url   : 'http://mtbmap.no/#15/60.0285/10.7195'
      }
    ],
    Expert: [
      {
        title : 'Fagervann',
        muddy : true,
        length: 'long',
        url   : 'http://mtbmap.no/#15/60.0211/10.7530'
      },
      {
        title : 'Bunghole',
        muddy : false,
        length: 'long',
        url   : 'http://mtbmap.no/#15/59.9969/10.7277'
      },
      {
        title : 'Gule',
        muddy : true,
        length: 'long',
        url   : 'http://mtbmap.no/#16/59.9962/10.7317'
      },
      {
        title : 'Barlindåsen',
        muddy : false,
        length: 'long',
        url   : 'http://mtbmap.no/#15/60.0091/10.8210'
      },
      {
        title : 'Vettakollen',
        muddy : true,
        length: 'long',
        url   : 'http://mtbmap.no/#14/59.9762/10.6917'
      }
    ]
  };

  // Methods

  function setCity(city) {
    vm.currentCity = vm.cities[city];
    vm.getWeather();
  }


  // By default the weather is for Oslo, but since now its winter time,
  // we use other cities for testing the app (let's pretend its like Oslo in summer)
  function getWeather() {
    $http({
      method: 'GET',
      url   : 'https://api.forecast.io/forecast/3e2f295388a1927ac01ef00c81e0cb1d/' + vm.currentCity.lat + ',' + vm.currentCity.lon + '?units=si'
    }).then(function successCallback(response) {
      var sunriseData = response.data.daily.data[0].sunriseTime;
      var sunsetData  = response.data.daily.data[0].sunsetTime;
      vm.minTempData  = Math.round(response.data.daily.data[0].temperatureMin);
      vm.maxTempData  = Math.round(response.data.daily.data[0].temperatureMax);
      vm.weatherData  = response.data.currently;
      vm.temp         = Math.round(vm.weatherData.temperature);
      vm.sunrise      = convertTime(sunriseData);
      vm.sunset       = convertTime(sunsetData);
      vm.precipInt    = vm.weatherData.precipIntensity;
      vm.precipType   = response.data.daily.data[0].precipType;
      vm.summary      = recommend(vm.temp, vm.precipInt);
      getYesterdaysWeather();
    }, function errorCallback(err) {
      console.log('something went wrong: ', err);
    });
  }

  function getYesterdaysWeather() {
    $http({
      method: 'GET',
      url   : 'https://api.forecast.io/forecast/3e2f295388a1927ac01ef00c81e0cb1d/' + vm.currentCity.lat + ',' + vm.currentCity.lon  + '?' + getYesterdaysTime()
    }).then(function successCallback(response) {
      vm.precipIntY  = response.data.daily.data[0].precipIntensity;
      vm.precipTypeY = response.data.daily.data[0].precipType;
      getTrailStatus();
    }, function errorCallback(err) {
      console.log('something went wrong: ', err);
    });
  }

  // Convert from unix timestamp to regular time
  function convertTime(unix_timestamp) {
    var date    = new Date(unix_timestamp*1000);
    var hours   = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
  }

  function getYesterdaysTime() {
    var today     = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday.getTime();
  }

  function getTrailStatus() {
    var result = '';
    if(vm.precipType == 'snow' || vm.percipTypeY == 'snow') {
      vm.weatherClass = 'snow';
      vm.muddy = undefined;
      result = 'Snowy. Ride a fat bike.'
    } else {
      switch (true) {
        case (vm.precipInt <= 0.1 && vm.precipIntY >= 1):
          result = 'average, might be muddy';
          vm.muddy = true;
          break;
        case (vm.precipInt <= 0.1 && vm.precipIntY <= 0.1):
          vm.muddy = undefined;
          result = 'perfect';
          break;
        case (vm.precipInt <= 1 && vm.precipIntY <= 1):
          vm.muddy = undefined;
          result = 'good';
          break;
        case (vm.precipInt >= 1 && vm.precipIntY >= 1):
          result = 'bad, very muddy';
          vm.muddy = true;
          break;
        case (vm.precipInt >= 1 && vm.precipIntY <= 0.1):
          vm.muddy = true;
          result = 'average, ride before it gets too muddy';
          break;
      }
    }
    vm.getTrailStatus  = result;
  }

  function recommend (temp, precipInt) {

    if (vm.weatherData.windSpeed > 5) {
      temp = temp - 5;
      vm.windAdvice = 'Windy day today, consider taking a windproof jacket';
    }

    if (parseInt(vm.sunset) < 17) {
      vm.sunAdvice = 'The sun will set early, put some lights on your bike';
    }

    if (getPrecipation(precipInt, 'average')()) {
      temp = temp - 2;
      vm.rainAdvice = 'It might rain today, consider taking a rain jacket';
    } else if (getPrecipation(precipInt, 'high')()) {
      temp = temp - 4;
      vm.weatherClass = 'rain';
      vm.rainAdvice = 'It will rain today, take rain jacket and ride carefully';
    }

    function getPrecipation(int, type) {
      var intensity = {
        'average': function () {
          return int >= 0.1 && int < 1;
        },
        'high': function () {
          return int >= 1;
        }
      };
      return intensity[type];
    }

    function getTempCondition(type) {
      var conditions = {
        'cold': function () {
          vm.tempAdvice = 'Put on warm clothes if you decide to ride';
          return 'Bad biking conditions';
        },
        'normal': function () {
          vm.tempAdvice = '';
          return 'Average weather for riding';
        },
        'good': function () {
          vm.tempAdvice = '';
          vm.weatherClass = 'good';
          return 'Perfect day for a ride';
        },
        'hot': function () {
          vm.weatherClass = 'good';
          vm.tempAdvice = 'Make sure to drink a lot of water if you decide to ride';
          return 'Bad biking conditions';
        }
      };
      return conditions[type];
    }

    if(temp <= 0) {
      return getTempCondition('cold')();
    }
    if(temp <= 15 && temp >= 1) {
      return getTempCondition('normal')();
    }
    if(temp <= 34 && temp >= 16) {
      return getTempCondition('good')();
    }
    if(temp >= 35) {
      return getTempCondition('hot')();
    }


  }

  // configure the ionic modal before use
  $ionicModal.fromTemplateUrl('user-level-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.levelModal = modal;
  });

  function openLevelModal() {
    $scope.levelModal.show();
  }
  function closeLevelModal() {
    $scope.levelModal.hide();
  }


  // Use this function to set city for testing the app in different weather conditions
  vm.setCity('Oslo');

}