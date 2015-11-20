"use strict";

describe("[ Main controller ] :", function(){
  
  var habitsCtrl, scopel;
  
  beforeEach(angular.mock.module("ionic-base"));

  beforeEach(inject(function($controller) {
    habitsCtrl = $controller('mainController', {});
  }));

  it('test',function(){
    expect(1).toEqual(1);
  });

});
    