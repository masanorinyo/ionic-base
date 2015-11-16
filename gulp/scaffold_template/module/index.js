"use strict";

module.exports = angular.module('{{APP_NAME}}.modules.{{MODULE_NAME}}', [])
  .config(function($stateProvider) {
    return $stateProvider.state('{{FILE_NAME}}', {
      url: '/{{FILE_NAME}}',
      templateUrl: 'app/{{FILE_PATH}}/{{FILE_NAME}}.html',
      controller: '{{MODULE_NAME}}Controller as {{MODULE_NAME}}Ctrl'
    });
  })
  .controller('{{MODULE_NAME}}Controller',require('./{{FILE_NAME}}.controller'))
  .factory('{{MODULE_NAME}}Model',require('./{{FILE_NAME}}.model'));