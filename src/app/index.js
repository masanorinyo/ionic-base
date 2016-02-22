"use strict";

module.exports = angular.module( 'ionic-base.modules', [
  // "gulp module" will automatically insert a new module 
  // DO NOT REMOVE THE BELOW COMMENT
  //{{INSERT-MODULE}}
  require('./main').name,
]);

module.exports = angular.module( 'ionic-base.services', [
  // "gulp module" will automatically insert a new service 
  // DO NOT REMOVE THE BELOW COMMENT
  //{{INSERT-SERVICE}}
  require('./common/scripts/services/utility').name,
  require('./common/scripts/services/modal').name,
]);

module.exports = angular.module( 'ionic-base.resources', [
  // "gulp module" will automatically insert a new resource 
  // DO NOT REMOVE THE BELOW COMMENT
  //{{INSERT-RESOURCE}}
]);

module.exports = angular.module( 'ionic-base.helpers', [
  // "gulp module" will automatically insert a new helper
  // DO NOT REMOVE THE BELOW COMMENT
  //{{INSERT-HELPER}}
]);

module.exports = angular.module( 'ionic-base.filters', [
  // "gulp module" will automatically insert a new filter
  // DO NOT REMOVE THE BELOW COMMENT
  //{{INSERT-FILTER}}
  require('./common/scripts/filters/convertInvalid').name,
  require('./common/scripts/filters/toFlattenString').name,
]);

module.exports = angular.module( 'ionic-base.directives', [
  // "gulp module" will automatically insert a new directive 
  // DO NOT REMOVE THE BELOW COMMENT
  //{{INSERT-DIRECTIVE}}
  require('./common/scripts/directives/groupList').name,
  require('./common/scripts/directives/optionBtn').name,
  require('./common/scripts/directives/groupBtn').name, 
]);


module.exports = angular.module('ionic-base', [
  
  // third vendor modules //
  'ionic',
  'LocalForageModule',
  // "ngCordova",
  
  // own code
  "ionic-base.filters",
  "ionic-base.services",
  "ionic-base.helpers",
  "ionic-base.directives",
  "ionic-base.modules",
  "ionic-base.constants",
  
  // html-cached template //
  require('../../.tmp/app/templates').name

])
.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

  $rootScope.$on( '$stateChangeSuccess',
    function() {
      $rootScope.page = $state.current.name;
      console.log("you are currently on:", $rootScope.page);
    }
  );

})
.config(function($stateProvider, $urlRouterProvider, $logProvider) {
  
  $urlRouterProvider.otherwise('/');
  
  
  $logProvider.debugEnabled(true);

});
