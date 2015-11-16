"use strict";
    
xdescribe("habiteater module", function() {

  var compile, scope, directiveElem;

  function getCompiledElement(){
    var element = angular.element('<div class="group-btn-directive" group-btn="testGroup" active-btn="" ></div>');
    var compiledElement = compile(element)(scope);
    
    scope.$digest(); 
    
    return compiledElement;
  }
  
  beforeEach(angular.mock.module("habiteater", function($provide, $urlRouterProvider){
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));
  
  beforeEach(angular.mock.module('templateCache'));

  beforeEach(function(){

    inject(function($compile, $rootScope){
      compile = $compile;
      scope = $rootScope.$new();
    });
    
    scope.testGroup = ['test1','test2'];

    directiveElem = getCompiledElement();
  });

  
  it('should have two divs with group-btn class', function() {
    var divElements = directiveElem.find('.group-btn');
    expect(divElements).toBeDefined();
    expect(divElements.hasClass('group-btn')).toBe(true);
    expect(divElements.length).toBe(2);
  });

  it('should have a dive with group-btn class', function() {
    var divElements = directiveElem.find('.group-btn');
    var firstElement = divElements.first();
    expect(firstElement.text()).toEqual('test1');
  });

  describe('activateBtn function',function(){
    it('should add active class to the element which triggerred the function', function() {
      var divElements = directiveElem.find('.group-btn');
      var firstElement = divElements.first();
      firstElement.click();
      expect(firstElement.hasClass('active')).toBe(true);
    });
  });


  
});