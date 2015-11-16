"use strict";
    
describe("[ {{MODULE_NAME}} service ]:", function() {
  
  var {{MODULE_NAME}}Service;

  beforeEach(angular.mock.module("{{APP_NAME}}"));

  beforeEach(inject(function(_{{MODULE_NAME}}Service_) {
    {{MODULE_NAME}}Service = _{{MODULE_NAME}}Service_;
  }));

  it('{{MODULE_NAME}}Service exists', function() {
    expect({{MODULE_NAME}}Service).not.toBeNull();
  });

  describe('sample param', function(){
    
    it('should return sample param value', function() {
      expect({{MODULE_NAME}}Service.params).toEqual('{{MODULE_NAME}}');
    });
  });

  
});