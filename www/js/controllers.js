angular.module('starter.controllers', ['starter.services', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http,  DataService, ApiEndpoint, $state, UserService, $ionicLoading) {



var url = "http://localhost:9000/";
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Create the signup modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  })
    .then(function(modal) {
    $scope.signupModal = modal;
  });

  // Open the signup modal
  $scope.signup = function() {
    $scope.signupModal.show();
  };

  $scope.showSignup = function () {
    $state.go('signup');
  }

  $scope.doSignup = function() {
    console.log('signup');
    var signup_fullname = $scope.signup.fullname;
    var signup_email = $scope.signup.email;
    var signup_phone= $scope.signup.phone;

    if(signup_fullname && signup_email && signup_phone){
      DataService.post(ApiEndpoint.url+'/signup', {"fullname": signup_fullname, "email": signup_email, "phone": signup_phone })
        .then(function(response){
        if(response.status == 200) {
          $state.go('ws_home');
        }});
    }
    else{
      alert("Fill The Fields");
    }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('login', $scope.loginData);
    var login_email = $scope.login.email;
    var login_password = $scope.login.password;

    if(login_email && login_password){
      $http.get("http://localhost:9000/login", { params: { "email": "login_email", "password": "login_password" } })
        .success(function(data) {
          alert("GOOD!!!");
          alert(login_email);
        })
        .error(function(data) {
          alert("ERROR");
        });
    }
    else{
      alert("Fill The Fields");
    }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


// This method is executed when the user press the "Sign in with Google" button
  $scope.googleSignIn = function() {
  $ionicLoading.show({
    template: 'Logging in...'
  });

  window.plugins.googleplus.login(
    {},
    function (user_data) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        userID: user_data.userId,
        name: user_data.displayName,
        email: user_data.email,
        picture: user_data.imageUrl,
        accessToken: user_data.accessToken,
        idToken: user_data.idToken
      });

      $ionicLoading.hide();
      $state.go('ws_home');
    },
    function (msg) {
      $ionicLoading.hide();
    }
  );
};

  //Open ADD PRODUCT page
  $scope.showAddProduct= function () {
    $state.go('addProduct');
  }

  $scope.showSubcat = function (id) {
    $state.go('subcat', {obj : id})
  }
})


.controller('CategoriesCtrl', function($scope, $state) {
  console.log($state.params.obj);
  $scope.categories = [
    { name: 'Beauty & Perfumes', id: 1 },
    { name: 'Books & Stationary', id: 2 },
    { name: 'Computers', id: 3 },
    { name: 'Electronics & Appliances', id: 4 },
    { name: 'Fabric', id: 5 },
    { name: 'Fashion', id: 6 },
    { name: 'Hardware', id: 7 },
    { name: 'Home Decor', id: 8 },
    { name: 'Mobiles & Tablets', id: 9 },
    { name: 'Sports & Fitness', id: 10 },
    { name: 'Watches', id: 11 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('FbCtrl', function($scope, $state) {
  $scope.FBLogin = function () {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          $state.go('ws_home');
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  $scope.FBLogout = function(){
    FB.logout(function(response) {
      // user is now logged out
    });
  }

})

  .controller('SideMenuCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeftSideMenu = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
  })

  .controller("CameraCtrl", function ($scope, Camera, $cordovaFile){

    $scope.takePicture = function (options) {

      var options = {
        quality: 75,
        targetWidth: 200,
        targetHeight: 200,
        //destinationType: 1,
        sourceType: 1
      };


      Camera.getPicture(options).then(function (imageData) {
        console.log(imageData);
        $scope.fileName = imageData;
        var sourceDirectory = imageData.substring(0, imageData.lastIndexOf('/') + 1);
        var sourceFileName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.length);

        console.log("Copying from : " + sourceDirectory + sourceFileName);
        console.log("Copying to : " + $cordovaFile.dataDirectory + sourceFileName);
        $cordovaFile.copyFile(sourceDirectory, sourceFileName, $cordovaFile.dataDirectory, sourceFileName).then(function (success) {
       //   $scope.fileName = $cordovaFile.dataDirectory + sourceFileName;
        }, function (err) {
          console.dir(err);
        });
      }, function (err) {
        console.log(err);
      });

    };

    $scope.getPicture = function (options) {

      var options = {
        quality : 75,
        targetWidth: 200,
        targetHeight: 200,
        sourceType: 0
      };

      Camera.getPicture(options).then(function(imageData) {
        $scope.fileName = imageData;;
      }, function(err) {
        console.log(err);
      });
    };


  });
