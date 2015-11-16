"use strict";

/*
  this will convert an array, object array, or object value to be a string
  with given optional values
 */
module.exports = /*@ngInject*/ function() {
  return function(input, separator, objProperty, backupString) {
    var output = input;

    if( typeof input === 'string' && !!input ){
      output = input;
    }else if( _.isArray(input) && !_.isEmpty(input) ){
      // check if it is an object array or jsut an array
      if( objProperty !== undefined ){
        var keys = [];
        for(var i=0; i < input.length; i++){
          keys.push(input[i][objProperty]);
        }
        output = keys.join(separator);   
      }else{
        output = input.join(separator);
      }  
    }else if( input !== null && input !== undefined ){
      // if value is an object type
      output = input[objProperty];
    
    }

    // if output is falsy but backupstring is defined, then 
    // define output with backupstring
    if(backupString !== undefined && !output ) output = backupString;
    
    return output;


  };

};

