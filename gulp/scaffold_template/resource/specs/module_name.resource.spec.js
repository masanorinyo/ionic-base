"use strict";
    
describe("[ {{MODULE_NAME}} resource ]:", function() {
  
  var {{MODULE_NAME}}Resource;

  beforeEach(angular.mock.module("{{APP_NAME}}"));

  beforeEach(inject(function(_{{MODULE_NAME}}Resource_) {
    {{MODULE_NAME}}Resource = _{{MODULE_NAME}}Resource_;
  }));

  it('{{MODULE_NAME}}Resource exists', function() {
    expect({{MODULE_NAME}}Resource).not.toBeNull();
  });

  describe('sample param', function(){
    
    it('should return sample param value', function() {
      expect({{MODULE_NAME}}Resource.params).toEqual('{{MODULE_NAME}}');
    });
  });

  
});