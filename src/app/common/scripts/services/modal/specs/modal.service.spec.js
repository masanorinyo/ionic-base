"use strict";
    
describe("modal module", function() {
  
  beforeEach(angular.mock.module("ionic-base"));

  it('has modal service', inject(function(modalService) {
    expect(modalService).not.toBeNull();
  }));

  
});