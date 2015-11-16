"use strict";

module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'C',
    templateUrl: 'app/{{FILE_PATH}}/{{FILE_NAME}}.html',
    replace: true,
    scope: {
      {{MODULE_NAME}} : "="
    },
    link: function(){
      return {};
    }
  };
};

