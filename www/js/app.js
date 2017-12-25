// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'ngCordova'])


  .constant('ApiEndpoint', {
    url: 'http://localhost:8100/api'
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    //.state('app', {
    //url: '/app',
    //abstract: true,
    //templateUrl: 'templates/menu.html',
    //controller: 'AppCtrl'
  //})

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })

    .state('ws_home', {
      url: '/wholesaler-home',
      templateUrl: 'templates/ws_home.html'
    })

    .state('addProduct', {
      url: '/addProduct',
      templateUrl: 'templates/addProduct.html'
    })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

    //.state('app.signup', {
     // url: '/signup',
      //views: {
       // 'menuContent': {
        //  templateUrl: 'templates/signup.html'
        //}
      //}
    //})


    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('subcat', {
    url: '/categories',
    params: {
      obj: null
    },
    templateUrl: 'templates/subcat.html',
        controller: 'CategoriesCtrl'
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

window.fbAsyncInit = function() {
  FB.init({
    appId            : '1942652812617182',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
};

function postToFeed() {
  // calling the API ...
  var obj = {
    method: 'feed',
    link: 'http://www.facebook.com/testapp/1942652812617182/',
    picture: 'http://fbrell.com/f8.jpg',
    name: 'Facebook Dialogs',
    caption: 'Reference Documentation',
    description: 'Using Dialogs to interact with users.',
  };

  function callback(response) {
    document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
  }

  FB.ui(obj, callback);
}

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
