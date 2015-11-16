"use strict";

module.exports = angular.module('habiteater.filters.convertInvalid', [])
  .filter('convertInvalid', require('./convertInvalid.filter'));