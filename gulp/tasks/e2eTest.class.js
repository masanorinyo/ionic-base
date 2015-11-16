var gulp = require('gulp'),
    args = require('yargs').argv,
    replace = require("gulp-replace"),
    rename = require("gulp-rename"),
    notify = require("gulp-notify"),
    gulpif = require("gulp-if"),
    protractor = require("gulp-protractor").protractor,
    run = require('gulp-run'),
    fs = require('fs'),
    Q = require('q'),
    _ = require('lodash');


module.exports = function( params ){
  
  function E2eTest ( params ){

    this.protractorFiles = [];

    // these browsers need to be tested one by one 
    // because different selenium servers needs to be used for each ie version
    this.ieBrowsers = params.ie || {};

    // these browsers can test all at once
    this.betterBrowsers = params.betterBrowser || "";
    this.seleniumAddress = params.seleniumAddress;
    this.protractorConfig = params.protractorConfig;
    this.configName = params.name;
    this.host = params.host;
    this.server = params.server;
    this.testAddress = params.host + ":" + params.server;
    this.dest = params.dest;
    this.files = params.files;

  }


  E2eTest.prototype = {
    

    start : function(){
      var self = this, type;
      fs.readdir(".tmp/protractor", function(err,file){
        for( var i=0; i < file.length; i++){
          var configFile = file[i];
          self._startServer(self.dest + "/"+ configFile);
        }
      });
    },
    
    prepare : function(callback){
      
      return Q.all([
        this.identifyBrowser(),
        this.parepareConfig(),
        this.startVMServer()
      ]);
            
    },

    identifyBrowser : function(){
      var deferred = Q.defer();
      var browsers = [];

      // check which browser to run tests on
      if( all || staging ){
        browsers = ['chrome','firefox','safari'];//, 'ie10''edge', 'ie8' 'ie11', 'ie9'
      }else{
        
        if(safari) browsers.push("safari");
        if(firefox) browsers.push("firefox");
        if(chrome) browsers.push("chrome");
        // if(edge) browsers.push("edge");
        // if(ie11) browsers.push("ie11");
        // if(ie10) browsers.push("ie10");
        // if(ie9) browsers.push("ie9");
        // if(ie8) browsers.push("ie8");
      }

      if( _.isEmpty(browsers)) browsers.push('chrome');
      console.log(browsers);
      this._addBrowsers(browsers, deferred);

      return deferred.promise;
    },

    parepareConfig : function(){
      
      var fileName, seleniumAddress, self = this;
      var deferred = Q.defer();

      if( !_.isEmpty(self.betterBrowsers) ){
        fileName = self.configName + ".js";
        seleniumAddress = self.seleniumAddress;
        this.protractorFiles.push( self.dest + "/" + fileName);
        this._createConfigFile(self.betterBrowsers, fileName, seleniumAddress, deferred);
      } 

      if( !_.isEmpty(self.ieBrowsers) ){ 
        for( var ieVersion in self.ieBrowsers ){
          var browser = self.ieBrowsers[ieVersion];
          fileName = self.configName + ".ie." + ieVersion +".js";
          seleniumAddress = "\n seleniumAddress :'http://ie" + ieVersion + ".dev:4444/wd/hub',";
          this.protractorFiles.push( self.dest + "/" + fileName);
          this._createConfigFile(browser, fileName, seleniumAddress, deferred);
        }
      }

      return deferred.promise;
    },

    startVMServer : function(){
      var deferred = Q.defer();
      for( var i=0; i < this.protractorFiles.length; i++){
        var configFile = this.protractorFiles[i];
        if(configFile.indexOf('ie') > -1 ){
          var version = configFile.split('.')[4];
          
          run("vboxmanage startvm 'ie" + version + "'").exec();

          // run("if [ $( vboxmanage showvminfo 'ie"+ version +"' | grep -c 'running (since' ) -eq 1 ] ; then " + commands + " ; else echo 'ie"+ version +" is already running.' ; fi").exec();

          setTimeout(function(){
            run("vboxmanage guestcontrol 'ie" + version + "' --username IEUser --password Passw0rd! run --exe 'C:\\Users\\IEUser\\AppData\\Roaming\\npm\\webdriver-manager.cmd' webdriver-manager start").exec();
            console.log('IE version' + version +' started');
          }, 15000);

          setTimeout(function(){
            run("vboxmanage controlvm 'ie" + version + "' poweroff").exec();
          }, 25000);

          deferred.resolve();

        }else{
          deferred.resolve();
        }
      }
      return deferred.promise;
    },


    _startServer : function(configFile){  
      gulp.src(config.others.protractor.files)
        .pipe(protractor({
            configFile: configFile,
            args: [
              '--suite',  args.suite || ""
            ]
        }))
        .on('error', notify.onError(function (error) {
          return "e2e test failed:", error;
        }))
        .on('error', function (error) {
          throw error;
        });
    },


    _addBrowsers: function(browserList, deferred){
      
      var configuredBrowser, type, ieVersion, self = this;
      
      if(_.isArray(browserList)){
        for(var i=0; i< browserList.length; i++){
          var browser = browserList[i];
          if( browser.indexOf('ie') > -1 ){
            ieVersion = browser.match(/\d+/)[0];
            configuredBrowser = self._configureBrowser( browser, ieVersion );
            self.ieBrowsers[ieVersion.toString()] = configuredBrowser;    
          }else{
            configuredBrowser = self._configureBrowser(browser);
            self.betterBrowsers += configuredBrowser;
          }
        }  
      }else{
        configuredBrowser = self._configureBrowser(browserList);
        self.betterBrowsers += configuredBrowser;
      }

      return deferred.resolve();

    },

    _configureBrowser : function( browser, ieVersion){
      
      if( !!ieVersion ){
        return "{ \n" + 
          "browserName: 'internet explorer',\n " + 
          "version : '"+ ieVersion +"'\n " +
        "},\n";
      }else{
        return '{ browserName : "' + browser + '" },\n';
      }  
    },

    _createConfigFile : function(browser, fileName, seleniumAddress, deferred){
      var self = this;
      gulp.src(this.protractorConfig)
        .pipe(replace("{{_TEST_ADDRESS_}}", this.testAddress ))
        .pipe(replace("{{_INSERT_BROWSER_}}", "\n"+ browser))
        .pipe(replace("{{_INSERT_SELENIUM_ADDRESS_}}", seleniumAddress))
        .pipe(rename( fileName ))
        .pipe(gulp.dest(this.dest))
        .on('end',function(){
          console.log('E2E configuration created');
          return deferred.resolve();
        });
    }


  };
  

  return new E2eTest(params);

};