"use strict";

module.exports = angular.module('ionic-base.filters.convertInvalid', [])
  .filter('convertInvalid', require('./convertInvalid.filter'));