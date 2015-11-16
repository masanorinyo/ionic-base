"use strict";

module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'C',
    templateUrl: 'app/common/scripts/directives/groupList/groupList.html',
    replace: true,
    scope: {
      groupList : "=",
      activeList : "="
    },
    link: function(scope){
      scope.activateList = function(list){
        scope.activeList = list;
      };
    }
  };
};

