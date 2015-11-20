"use strict";
    
describe("utilityService module", function() {
  
  var utilityService, $rootScope, $ionicPopup;

  beforeEach(angular.mock.module("ionic-base"));
  beforeEach(inject(function( _utilityService_, _$rootScope_, _$ionicPopup_ ){
    utilityService = _utilityService_;
    $rootScope = _$rootScope_;
    $ionicPopup = _$ionicPopup_;
  }));


  it('exists', inject(function(utilityService) {
    expect(utilityService).not.toBeNull();
  }));

  describe("showPopup method",function(){
    beforeEach(function(){
      spyOn($ionicPopup, "alert");
    });
    it("should show popup alert message", function(){
      utilityService.showPopup("alert","please enter name","yo");
      expect($ionicPopup.alert).toHaveBeenCalled();
    });
  });

  describe("validate method",function(){
  
    it("should return true if the string is valid", function(){
      var target = "something",
          kind,
          result;
      
      kind = "empty";
      result = utilityService.validate(target, kind);
      expect(result).toBeTruthy();      

      kind = "short";
      result = utilityService.validate(target, kind, 3);
      expect(result).toBeTruthy();
    });

    it("should check if the string is empty",function(){
      var target = "",
          result = utilityService.validate(target, "empty");

      expect(result).toBeFalsy();
    });

    it("should check if the string is too short",function(){
      var target = "t",
          result = utilityService.validate(target, "short", 4);

      expect(result).toBeFalsy();
    });

  });

  describe("report method",function(){
    
    beforeEach(function(){
      spyOn($rootScope, '$broadcast');
    });

    it("should broadcast different types of info", function(){
      var type = "error",
          kind = "input",
          why = "empty";
      utilityService.report(type, kind, why);
      expect($rootScope.$broadcast).toHaveBeenCalled();
      expect($rootScope.$broadcast).toHaveBeenCalledWith( type + ':' + kind + ':' + why );
    });
  });
    
});