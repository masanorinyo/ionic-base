"use strict";

module.exports = /*@ngInject*/ function() {
  return function(input, option){
  
    var output = input;
    if(option) output = input;
  
    return output;
  };
};

