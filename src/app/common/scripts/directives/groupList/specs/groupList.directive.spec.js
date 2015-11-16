"use strict";
    
xdescribe("[ groupList directive ]:", function() {

  var ctrl, 
      compile, 
      $scope, 
      directiveElem;

  function getCompiledElement(){
    var element = angular.element('<div class="group-list-directive" group-list="sampleData"></div>');
    var compiledElement = compile(element)($scope);
    
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
      $scope = $rootScope.$new();
    });

    $scope.sampleData = [
      { display:'s', value:'sun'},
      { display:'m', value:'mon'},
      { display:'t', value:'tue'},
      { display:'w', value:'wed'},
      { display:'t', value:'thu'},
      { display:'f', value:'fri'},
      { display:'s', value:'sat'}
    ];

    directiveElem = getCompiledElement();
    $scope.$digest();
  });

  it('should have 7 div with class called "group-list-line"', function() {
    var divElements = directiveElem.find('.group-list-line');
    expect(divElements).toBeDefined();
    expect(divElements.hasClass('group-list-line')).toBe(true);
    expect(divElements.length).toBe(7);
  });

  it('should output object\'s display property as a html text ', function() {
    var divElement = directiveElem.find('.group-list-line').first().find('.line-text');
    expect(divElement.text()).toEqual('s');
  });

  describe('activate list function',function(){
    it('should change the value of activeList scope object to the clicked element', function() {
      var divElements = directiveElem.find('.group-list-line');
      var firstElement = divElements.first();
      var testElement = firstElement.find('.ng-hide');

      expect(testElement).toBeDefined();
    });
  });

  
});