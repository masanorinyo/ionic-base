"use strict";
    
xdescribe("[ toString filter ]:", function() {
  
  var $filter;

  beforeEach(angular.mock.module("habiteater"));

  it('toFlattenString exists', inject(function(_$filter_) {
    $filter = _$filter_;
    expect($filter("toFlattenString")).not.toBeNull();
  }));

  it('should return a string if input type is string', function() {
    var testString = "testing",
        result;

    result = $filter("toFlattenString")( testString );

    expect(result).toEqual(testString);
    expect(typeof result).toEqual('string');
  });  

  it('should return a flatten string if the input type is an array', function() {
    var testArray = ["testing","testing2"],
        result;

    result = $filter("toFlattenString")( testArray, "/");

    expect(result).not.toEqual(testArray);
    expect(result).toEqual("testing/testing2");
    expect(typeof result).toEqual('string');
  });  

  it('should flat an object array and concatenate specified object keys if the input type is an object array', function() {
    var testObjArray = [{ display: "testing"}, { display: "testing2"}],
        result;

    result = $filter("toFlattenString")( testObjArray, "/", "display");

    expect(result).not.toEqual(testObjArray);
    expect(result).toEqual("testing/testing2");
    expect(typeof result).toEqual('string');
  });

  it('should return the original value if the value is null', function() {
    var testObjArray = null,
        result;

    result = $filter("toFlattenString")( testObjArray );
    expect(result).toEqual(testObjArray);
  });


  it('should return the backup string if the original value or the converted value are falsy', function() {
    var testObjArray = [],
        result;

    result = $filter("toFlattenString")( testObjArray, "/", "display", "none");
    expect(result).not.toEqual(testObjArray);
    expect(result).toEqual("none");
    expect(typeof result).toEqual('string');
  });
  
});