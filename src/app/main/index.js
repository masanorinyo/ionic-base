"use strict";

module.exports = angular.module('ionic-base.modules.main', [])
.config(function($stateProvider) {
  return $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'mainController as mainCtrl'
  });
})
.controller("mainController", require("./main.controller"));
