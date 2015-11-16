"use strict";

module.exports = /*@ngInject*/ function() {
  return function(input, option){
    return !input ? option : input;
  };
};

