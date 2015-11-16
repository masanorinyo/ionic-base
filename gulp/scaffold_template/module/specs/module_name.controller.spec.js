"use strict";

describe("[ {{MODULE_NAME}} controller ]:", function(){
  
  var {{MODULE_NAME}}Ctrl, {{MODULE_NAME}}Model, $scope;
  
  beforeEach(angular.mock.module("{{APP_NAME}}"));
  beforeEach(inject(function($controller, $rootScope, _{{MODULE_NAME}}Model_) {
    $scope = $rootScope.$new();
    {{MODULE_NAME}}Model = _{{MODULE_NAME}}Model_;
    {{MODULE_NAME}}Ctrl = $controller('{{MODULE_NAME}}Controller', { 
      "$scope" : $scope,
      "{{MODULE_NAME}}Model" : {{MODULE_NAME}}Model
    });
  }));

  it("should be defined",function(){
    expect({{MODULE_NAME}}Ctrl).toBeDefined();
  });

  it("[ sample ] : should have name property of {{MODULE_NAME}}", function(){
    expect({{MODULE_NAME}}Ctrl.name).toEqual('{{MODULE_NAME}}');
  });
  
});
    