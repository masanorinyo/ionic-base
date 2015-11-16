"use strict";
    
describe("[ {{MODULE_NAME}} filter ]:", function() {
  
  var $filter;

  beforeEach(angular.mock.module("{{APP_NAME}}"));

  it('{{MODULE_NAME}} exists', inject(function(_$filter_) {
    $filter = _$filter_;
    expect($filter("{{MODULE_NAME}}")).not.toBeNull();
  }));

  it('[ sample test ] : should return the original value', function() {
    var testString = "testing",
        optionString = "/",
        result;
    result = $filter("{{MODULE_NAME}}")( testString, optionString);
    expect(typeof result).toEqual('string');
    expect(result).toEqual(testString);
  });  
  
});