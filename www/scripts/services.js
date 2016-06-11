angular.module('starter')

.factory('AppZanatlijaFactory', function($http, $localStorage) {
  //SETTINGS
  var url = 'js/data.json';
  var ZanatlijaFactory = {};
  //END - SETTINGS

  /*ZanatlijaFactory.getObject = function() {
      return $http.get(url, {
         headers: {}
         })
      .then(function(response) {
          return response.data;
      });
  };*/
  ZanatlijaFactory.getObject = function(className) {
    return $http.get('https://api.parse.com/1/classes/' + className + '/', {
      headers: {
        'X-Parse-Application-Id':'a4AoXutQ2mf95haI5DU3dJKTYZKX7YXxtzQOsXAS',
        'X-Parse-REST-API-Key':'RIMyGtbhV4qkw1q9oG3GboQYMUMOspXQIk2QFtLh'}
      })
      .then(function(response) {
        return response.data;
      });
  };

ZanatlijaFactory.numberOfAds = function(id) {
    var numberOfAds = 0;
    for(var i = 0; i < $localStorage.oglasi.length; i++) {
        if($localStorage.oglasi[i].podkategorijaID.objectId == id) {
            numberOfAds++;
        }
    }
    return numberOfAds;
};

ZanatlijaFactory.numberOfAdsWithOp = function(id, op) {
    var numberOfAds = 0;
    for(var k = 0; k < $localStorage.opstine.length; k++) {
        for(var i = 0; i < $localStorage.oglasi.length; i++) {
            if($localStorage.oglasi[i].podkategorijaID.objectId == id && $localStorage.opstine[k] == $localStorage.oglasi[i].OpstinaID.objectId) {
                numberOfAds++;
            }
        }
    }
    return numberOfAds;
};
  return ZanatlijaFactory;
})
