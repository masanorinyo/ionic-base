"use strict";
/*
  convert an object array to be multiple circle btns
  - if multi option is on, multiple circle btns can be activated
  - array parameter needs to have a property value
 */
module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'C',
    templateUrl: 'app/common/scripts/directives/optionBtn/optionBtn.html',
    replace: true,
    scope: {
      multiOn : "@",
      optionShape : "@",
      optionBtns : "=",
      activeBtn : "="
    },
    link: function(scope){
      
      function compareBtns(activeBtns, btns){
        _.forEach(btns, function(btn){
          btn.active = _.include(_.map(activeBtns,'value'), btn.value);
        });
      }

      scope.activateBtn = function(btn){ 
        if(!scope.multiOn || scope.multiOn === "off"){
          _.forEach(scope.optionBtns, function(otherBtn){
            if(btn.value !== otherBtn.value) otherBtn.active = false;
          });
        }
        btn.active = !btn.active;
        scope.activeBtn = _.where(scope.optionBtns, { 'active': true });
      };

      scope.$watch( function(){
        return scope.activeBtn;
      }, function(){
        compareBtns(scope.activeBtn, scope.optionBtns);
      });
    }
  };
};

