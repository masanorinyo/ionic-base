"use strict";
    
describe("[ {{MODULE_NAME}} Model ]:", function() {
  
  var {{MODULE_NAME}}Model;

  beforeEach(angular.mock.module("{{APP_NAME}}"));

  beforeEach(inject(function(_{{MODULE_NAME}}Model_) {
    {{MODULE_NAME}}Model = _{{MODULE_NAME}}Model_;
  }));

  it('{{MODULE_NAME}}Model exists', function() {
    expect({{MODULE_NAME}}Model).not.toBeNull();
  });

  describe('sample param', function(){
    
    it('should return sample param value', function() {
      expect({{MODULE_NAME}}Model.params).toEqual('{{MODULE_NAME}}');
    });
  });

  
});