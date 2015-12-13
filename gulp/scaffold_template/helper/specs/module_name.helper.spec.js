"use strict";
    
describe("[ {{MODULE_NAME}} helper ]:", function() {
  
  var {{MODULE_NAME}}Helper;

  beforeEach(angular.mock.module("{{APP_NAME}}"));

  beforeEach(inject(function(_{{MODULE_NAME}}Helper_) {
    {{MODULE_NAME}}Helper = _{{MODULE_NAME}}Helper_;
  }));

  it('{{MODULE_NAME}}Helper exists', function() {
    expect({{MODULE_NAME}}Helper).not.toBeNull();
  });

  describe('sample param', function(){
    
    it('should return sample param value', function() {
      expect({{MODULE_NAME}}Helper.params).toEqual('{{MODULE_NAME}}');
    });
  });

  
});