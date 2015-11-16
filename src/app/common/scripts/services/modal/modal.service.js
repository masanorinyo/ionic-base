"use strict";

module.exports =  /*@ngInject*/ function($ionicModal) {
      
  function Modal( filename, animation ){
    this.filename = filename;
    this.animation = animation || 'slide-in-up';
  }

  Modal.prototype = {
    open : function() {
      
      var self = this;

      $ionicModal.fromTemplateUrl( this.filename, {
        scope: null,
        animation: this.animation
      }).then(function(modal) {
          self.modal = modal;
          self.modal.show();
      });
    },
    
    remove: function(){
      this.modal.remove();
    },

    close :function() {
      this.modal.hide();
    }
  };


  return {
    instance : null,
    
    getNewInstance: function(filename, animation){
      this.instance = new Modal(filename, animation);
      return this.instance;
    },
    getInstance : function(filename, animation){
      if(this.instance){
        return this.instance;
      }else{
        return this.getNewInstance(filename, animation);
      }
    }
  };

};
