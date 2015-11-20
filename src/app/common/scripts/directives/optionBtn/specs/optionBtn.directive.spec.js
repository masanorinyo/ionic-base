"use strict";
    
describe("optionBtn directive", function() {

  var compile, $scope, directiveElem, ctrl;

  function getCompiledElement(){

    var element = angular.element(
      '<div class="option-btn-directive" '+
        'option-btns="testGroup" ' +
        'active-btn="activeValues" ' +
        'multi-on="{{multi}}" ' +
      '></div>');

    var compiledElement = compile(element)($scope);

    return compiledElement;
  }
  
  beforeEach(angular.mock.module("ionic-base", function($provide, $urlRouterProvider){
    $provide.value('$ionicTemplateCache', function(){} );
    $urlRouterProvider.deferIntercept();
  }));
  
  beforeEach(angular.mock.module('templateCache'));

  beforeEach(function(){

    inject(function($compile, $rootScope){
      compile = $compile;
      $scope = $rootScope.$new();
    });
    
  });


  describe("directive template", function(){

    beforeEach(function(){
      $scope.testGroup = [{display:'t',value:'test1'},{display:'t',value:'test2'}];
      directiveElem = getCompiledElement();
      $scope.$digest();
    });

    it('should have two divs with option-btns class', function() {
      var divElements = directiveElem.find('.option-btn');
      expect(divElements).toBeDefined();
      expect(divElements.hasClass('option-btn')).toBe(true);
      expect(divElements.length).toBe(2);
    });

    it('the first div with option-btn class should have html text "t"', function() {
      var divElements = directiveElem.find('.option-btn');
      var firstElement = divElements.first();
      expect(firstElement.text()).toEqual('t');
    });
  });
  
  describe('activateBtn function with multi option off',function(){
    
    beforeEach(function(){
      $scope.testGroup = [{display:'t',value:'test1'},{display:'v',value:'test2'}];
      $scope.multi = "off";
      directiveElem = getCompiledElement();
      $scope.$digest();

    });

    it('should add active class to the element which triggerred the function and remvoe it from other elements', function() {
      var firstElement = $(directiveElem.children(".option-btns .option-btn")[0]);
      var secondElement = $(directiveElem.children(".option-btns .option-btn")[1]);
      firstElement.click();
      secondElement.click();
      expect(firstElement.hasClass('active')).toBe(false);
      expect(secondElement.hasClass('active')).toBe(true);
    });

  });

  describe('activateBtn function with multi option on',function(){

    beforeEach(function(){
      $scope.testGroup = [{display:'t',value:'test1'},{display:'v',value:'vtest2'}];
      $scope.multi = "on";
      directiveElem = getCompiledElement();
      $scope.$digest();
    });

    it('should add active class to the elements which triggerred the function', function() {
      var firstElement = $(directiveElem.children(".option-btns .option-btn")[0]);
      var secondElement = $(directiveElem.children(".option-btns .option-btn")[1]);      
      firstElement.click();
      secondElement.click();
      expect(firstElement.hasClass('active')).toBe(true);
      expect(secondElement.hasClass('active')).toBe(true);

    });

  });

  
});