"use strict";
    
describe("[ checkNull filter ]:", function() {
  
  var $filter;

  beforeEach(angular.mock.module("ionic-base"));

  it('convertInvalid exists', inject(function(_$filter_) {
    $filter = _$filter_;
    expect($filter("convertInvalid")).not.toBeNull();
  }));

  it('should convert the target string to be the optional value if input is invalid', function() {
    var optional = "untitled",
        result,
        input = "";
    
    result = $filter('convertInvalid')(input, optional);
    return expect(result).toEqual(optional);
  });

  it('should return the original input value if it is valid', function() {
    var optional = "untitled",
        input = "test",
        result;
    
    result = $filter('convertInvalid')(input, optional);
    return expect(result).toEqual(input);
  });  

  
});