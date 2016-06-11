// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngStorage', 'ngResource', 'ngCordova', 'jett.ionic.filter.bar', 'ionic-ratings', 'ngIOS9UIWebViewPatch'])

.run(function ($ionicPlatform, AppZanatlijaFactory, $localStorage, $http, $state) {
	if($localStorage.opstine == undefined) {
		$localStorage.opstine = [];

		$http.get('https://api.parse.com/1/classes/' + 'Oglasi' + '/', {
	        headers: {
				'X-Parse-Application-Id':'a4AoXutQ2mf95haI5DU3dJKTYZKX7YXxtzQOsXAS',
				'X-Parse-REST-API-Key':'RIMyGtbhV4qkw1q9oG3GboQYMUMOspXQIk2QFtLh'}
			})
			.then(function(response) {
	        	$localStorage.oglasi = response.data.results;
	    	});

		AppZanatlijaFactory.getObject('Opstina')
			.then(function (data) {
                console.log(data);
				for(var i = 0; i < data.results.length; i++) {
                    $localStorage.opstine.push(data.results[i].objectId);
                }
			})
			.catch(function (object, error) {
					console.log('error');
			});
	}

	if($localStorage.ocenjeno == undefined) {
			$localStorage.ocenjeno = [];
	}
    $ionicPlatform.ready(function () {
        $state.go('home');
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider) {
    $ionicFilterBarConfigProvider.theme('stable');
    $ionicConfigProvider.views.swipeBackEnabled(true);
    $ionicFilterBarConfigProvider.placeholder('Pretraga');
    $ionicConfigProvider.backButton.text('');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .state('mojiOglasi', {
            url: "/mojiOglasi",
            templateUrl: 'templates/mojiOglasi.html',
            controller: 'MojiOglasiController'
        })
        .state('postaviOglas', {
            url: '/postaviOglas',
            templateUrl: 'templates/postaviOglas.html',
            controller: 'PostaviOglasController'
        })
        .state('odaberi-opstinu', {
            url: '/odaberi-opstinu',
            templateUrl: 'templates/odaberiOpstinu.html',
            controller: 'OdaberiOpstinuController',
						cache: false
        })
        .state('uslovi-koriscenja', {
            url: '/uslovi-koriscenja',
            templateUrl: 'templates/usloviKoriscenja.html',
            controller: 'UsloviKoriscenjaController'
        })
        .state('podkategorija', {
            url: '/podkategorija/:kategorijaId',
            templateUrl: 'templates/podkategorija.html',
            controller: 'PodkategorijaController',
						cache: false
        })
        .state('lista-zanatlija', {
            url: '/lista-zanatlija/:podkategorijaId',
            templateUrl: 'templates/lista-zanatlija.html',
            controller: 'ListaZanatlijaController'
        })
        .state('oglas-single-view', {
            url: "/oglas-single-view/:zanatlijaId",
            templateUrl: 'templates/oglas-single-view.html',
            controller: 'OglasSingleController'
        })
				.state('ocena', {
            url: "/ocena/:zanatlijaId",
            templateUrl: 'templates/ocena.html',
            controller: 'OcenaController'
        })
        .state('about-us', {
            url: '/about-us',
            templateUrl: 'templates/about-us.html',
            controller: 'AboutUsController'
        })
        .state('mapa-single-view', {
            url: '/mapa-single-view/:address',
            templateUrl: 'templates/mapa-single-view.html',
            controller: 'MapaSingleController'
        })
    $urlRouterProvider.otherwise('/home');
});
