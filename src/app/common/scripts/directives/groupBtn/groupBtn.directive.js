"use strict";

module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'C',
    templateUrl: 'app/common/scripts/directives/groupBtn/groupBtn.html',
    replace: true,
    scope: {
      groupBtn : "=",
      activeBtn : "="
    },
    link: function(scope){
      scope.activateBtn = function(btn){ 
        scope.activeBtn = btn;
      };
    }
  };
};

