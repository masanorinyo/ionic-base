"use strict";
    
xdescribe("modal module", function() {
  
  beforeEach(angular.mock.module("habiteater"));

  it('has modal service', inject(function(modalService) {
    expect(modalService).not.toBeNull();
  }));

  
});