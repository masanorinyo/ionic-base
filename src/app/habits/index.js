"use strict";

module.exports = angular.module('habiteater.modules.habits', [])
.config(function($stateProvider) {
  return $stateProvider.state('habits', {
    url: '/',
    templateUrl: 'app/habits/habits.html',
    controller: 'habitsController as habitsCtrl'
  });
})
.controller("habitsController", require("./habits.controller"));
