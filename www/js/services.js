angular.module('starter.services', [])

//Factory For Api Endpoint Calling
  .factory('DataService',function($http){
    var dataService = {};
    dataService.get = function(url){
      return	$http.get(url).then(function(success){
        return success;
      },function(error){
        return error;
      })
    };

    dataService.post = function(url,data){
      return	$http.post(url,data).then(function(success){
        return success;
      },function(error){
        return error;
      })
    };

    dataService.customRequest = function(object){
      return	$http.get(object).then(function(success){
        return success;
      },function(error){
        return error;
      })
    };

    return dataService;
  })



  .factory('Api', function($http, $q, ApiEndpoint) {
    console.log('ApiEndpoint', ApiEndpoint)

    var getApiData = function() {
      var q = $q.defer();

      $http.get(ApiEndpoint.url)
        .success(function(data) {
          console.log('Got some data: ', data)
          q.resolve(data);
        })
        .error(function(error){
          console.log('Had an error')
          q.reject(error);
        })

      return q.promise;
    }

    return {
      getApiData: getApiData
    };
  })

  .factory('Camera', function($q) {

    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          console.log(result);
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  })

  .factory('facebookService', function($q) {
    return {
      getMyLastName: function() {
        var deferred = $q.defer();
        FB.api('/me', {
          fields: 'last_name'
        }, function(response) {
          if (!response || response.error) {
            deferred.reject('Error occured');
          } else {
            deferred.resolve(response);
          }
        });
        return deferred.promise;
      }
    }
  })


  .service('UserService', function() {
    // For the purpose of this example I will store user data on ionic local storage but you should save it on a database

    var setUser = function(user_data) {
      window.localStorage.starter_google_user = JSON.stringify(user_data);
    };

    var getUser = function(){
      return JSON.parse(window.localStorage.starter_google_user || '{}');
    };

    return {
      getUser: getUser,
      setUser: setUser
    };
  });
