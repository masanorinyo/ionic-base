"use strict";

module.exports = /*@ngInject*/ function( $rootScope, $ionicPopup ) {
  return {
    // make it private and make a method
    week : [ 
      { "value" : "s", "name" : "sunday" },
      { "value" : "m", "name" : "monday" },
      { "value" : "t", "name" : "tuesday" },
      { "value" : "w", "name" : "wednesday" },
      { "value" : "t", "name" : "thursday" },
      { "value" : "f", "name" : "friday" },
      { "value" : "s", "name" : "saturday" }
    ],


    showPopup : function( type, title, message ){
      if(type!=='custom'){
        return $ionicPopup[type]({
           title: title,
           template: message
        });
      }
    },

    validate : function(target, credential, options){
      var valid = true,
          self = this;

      switch(credential) {
        case "empty": 
          if( target === null || target === "" ){
            self.report("error", "input","empty");
            valid = false;
          }  
          break;
        case "short": 
          if(target.length < options){
            self.report("error", "input","short");
            valid = false;
          }
          break;
      }
      return valid;

    },


    report : function(type, kind, why){
      var reportName = type + ":"+kind+":"+why;
      return $rootScope.$broadcast(reportName);
    }

  };
};

