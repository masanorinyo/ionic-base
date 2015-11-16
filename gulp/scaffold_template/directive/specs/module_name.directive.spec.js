"use strict";
    
describe("[ {{MODULE_NAME}} directive ]:", function() {

  var ctrl, 
      compile, 
      $scope, 
      directiveElem, 
      sampleText = "I am a sample data. Please kill me if you wish, though it would be sad.";

  function getCompiledElement(){
    var element = angular.element('<div class="{{MODULE_DIRECTIVE}}-directive" {{MODULE_DIRECTIVE}}="sampleData"></div>');
    var compiledElement = compile(element)($scope);
    
    return compiledElement;
  }
  
  beforeEach(angular.mock.module("{{APP_NAME}}", function($provide, $urlRouterProvider){
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(angular.mock.module('templateCache'));
  
  beforeEach(function(){

    inject(function($compile, $rootScope){
      compile = $compile;
      $scope = $rootScope.$new();
    });

    $scope.sampleData = sampleText;

    directiveElem = getCompiledElement();
    $scope.$digest();
  });

  it('should compile a template wrapped with a div with classname - {{MODULE_NAME}} ', function() {
    expect(directiveElem).toBeDefined();
    expect(directiveElem.hasClass("{{MODULE_NAME}}")).toBe(true);
  });

  it('should output the value of scope object', function() {
    var divElement = directiveElem.find("p");
    expect(divElement.text()).toEqual(sampleText);
  });

  
});