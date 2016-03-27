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
  }


  // By default the weather is for Oslo, but since now its winter time,
  // we use other cities for testing the app (let's pretend its like Oslo in summer)
  function getWeather() {
    $http({
      method: 'GET',
      url   : 'https://api.forecast.io/forecast/3e2f295388a1927ac01ef00c81e0cb1d/' + vm.currentCity.lat + ',' + vm.currentCity.lon + '?units=si'
    }).then(function successCallback(response) {
      console.log(response);
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
      vm.summary      = recommend(vm.temp, vm.precipInt, vm.precipType);
      vm.comment      = getComment(vm.precipInt, vm.precipType, vm.sunsetTime);
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
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
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
      result = 'Consider riding a fat bike, it should be fun!'
    } else {
      switch (true) {
        case (vm.precipInt <= 0.1 && vm.precipIntY >= 1):
          result = 'It was raining yesterday, trails status: average, might be muddy';
          vm.muddy = true;
          break;
        case (vm.precipInt <= 0.1 && vm.precipIntY <= 0.1):
          result = 'Trails status: perfect';
          break;
        case (vm.precipInt <= 1 && vm.precipIntY <= 1):
          result = 'Trails status: good';
          break;
        case (vm.precipInt >= 1 && vm.precipIntY >= 1):
          result = 'It was raining yesterday and today, trails status: bad, very muddy';
          vm.muddy = true;
          break;
        case (vm.precipInt >= 1 && vm.precipIntY <= 0.1):
          result = 'trails status: average, consider riding early in the day, before it gets too muddy';
          break;
      }
    }
    vm.getTrailStatus  = result;
  }

  function recommend (temp, precipInt, precipType) {
    if (vm.weatherData.windSpeed > 5) {
      temp = temp - 5;
    }


    if (precipType == 'snow') {
      switch (true) {
        case (5 >= temp):
          return 'Stay at home';
          break;
        case (6 <= temp && 15 >= temp):
          return 'Average conditions, but snowy';
          break;
      }
    } else {
      if (precipInt <= 0.1) {
        switch (true) {
          case (0 >= temp):
            return 'Stay at home';
            break;
          case (10 <= temp && 1 >= temp):
            return 'Average conditions';
            break;
          case (11 <= temp && 25 >= temp):
            return 'Perfect conditions';
            break;
          case (26 <= temp && 40 >= temp):
            return 'Average conditions (too hot)';
            break;
        }
      } else if(precipInt >= 0.1 && precipInt <= 1) {
          switch (true) {
            case (2 >= temp):
              return 'Stay at home';
              break;
            case (3 <= temp && 12 >= temp):
              return 'Average conditions';
              break;
            case (13 <= temp && 28 >= temp):
              return 'Perfect conditions';
              break;
            case (29 <= temp && 43 >= temp):
              return 'Average conditions (too hot)';
              break;
            default:
              return 'I am confused';
              break;
          }
      } else if(precipInt >= 1) {
          switch (true) {
            case (5 >= temp):
              return 'Stay at home';
              break;
            case (6 <= temp && 15 >= temp):
              return 'Average conditions';
              break;
            case (16 <= temp && 29 >= temp):
              return 'Good conditions, but rainy';
              break;
            case (30 <= temp && 45 >= temp):
              return 'Average conditions (too hot)';
              break;
          }
      } 
    }

  }


// Comment of the day
  function getComment (precipInt, temp, sunsetTime) {
    if (precipInt <= 0.1) {
      switch (true) {
        case (precipInt <= 0.1 && 28 >= temp):
          return 'Could be hot today, so make sure to drink alot of water';
          break;
        case (precipInt <= 0.1 && vm.weatherData.windSpeed > 2):
          return 'Windy day today! Consider bringing a jacket';
          break; 
      }
    }  
    else if (precipInt >= 1) {
      switch (true) {
        case (5 >= temp):
          return 'It might rain today. Bring a rainjacket to stay nice and dry';
          break;
        case (5 <= temp):
          return 'Brrr, looks like a cold and rainy day. Bring a jacket to stay nice and dry';
          break;
      }
    } 
    else if (sunsetTime >= 1453907830) {
      switch (true) {
        default:
        return 'The sun will set early so bring some lights for your bike'
      }
    } 
    else {
        return 'Enjoy your ride today';
    }
  } 
 

// Tip of today


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
  vm.setCity('Rotorua');

  vm.getWeather();


}