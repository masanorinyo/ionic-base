"use strict"

var gulp = require('gulp'),
    del = require('del'),
    watch = require('gulp-watch'),
    replace = require("gulp-replace"),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    karmaParseConfig = require('karma/lib/config').parseConfig,
    karmaConfigFile,
    configFilePath,
    files,
    Server = require('karma').Server,
    devip = require('dev-ip'),
    notifier = require('node-notifier'),
    e2eTestClass = require("./e2eTest.class");


var params = {
  seleniumAddress : config.others.protractor.seleniumAddress,
  name : config.others.protractor.config.name,
  server : config.servers.ports.devServer,
  dest : config.others.protractor.config.dest,
  files : config.others.protractor.files
};

if( production ){
  params.protractorConfig = config.others.protractor.config.temp.prd;
  params.host = config.servers.host.local;
}else{
  params.protractorConfig = config.others.protractor.config.temp.dev;
  params.host = staging ? config.servers.host.local : "http://"+devip()[0];
}


var e2eTest = e2eTestClass(params);


module.exports = gulp.task('test', ["test:unit", "test:e2e"]);

module.exports = gulp.task('test:e2e:prep', function(){
  e2eTest.prepare().done(function(){
    console.log("E2E test preparation done");
  });
});

module.exports = gulp.task('test:e2e:start',function(){
  e2eTest.start();
});

module.exports = gulp.task('test:e2e:clean',function(done){
  if( !production ) del([config.others.protractor.config.dest], done );
});

module.exports = gulp.task('test:e2e',['test:e2e:clean'], function(){
  e2eTest.prepare().then(function(){
    return e2eTest.start();
  });
});


//**********************************************************************//
//**********************       UNIT TEST       *************************//
//**********************************************************************//

module.exports = gulp.task('test:unit', function (done) {
  
  karmaConfigFile = config.others.karma.all;

  fs.readFile('bower.json', 'utf8', function (err,data) {
    configFilePath = path.resolve(karmaConfigFile);
    files = _.pluck(karmaParseConfig(configFilePath, {}).files, 'pattern');
   

    var ownScripts = 4;
    var vendorsInKarma = files.length - ownScripts;
    var bowerModules = Object.keys(JSON.parse(data).dependencies).length;

    if( bowerModules > vendorsInKarma ){
      console.log("\n number of bower modules :", bowerModules);
      console.log("\n number of karma files :", vendorsInKarma);
      notifier.notify({
        'title': 'Karma config',
        'message':"Make sure any third party libraries added using Bower are added to karma config"
      });
    }


    var server = new Server({
      configFile: config.others.karma.all
    },function(karmaExitCode){
      console.log('Karma finished testing.');
      if(staging||production) process.exit(karmaExitCode);
    });
    server.start();
  })
});

module.exports = gulp.task('test:unit:watch',function(){
  gulp.watch(config.paths.src.scripts, function(e){
    
    var filepath = e.path,
        specfileArray,
        specfile,
        filename = filepath.replace(/^.*[\\\/]/, '');

    if(all){
      karmaConfigFile = config.others.karma.all;
    }else{
      karmaConfigFile = config.others.karma.single;
    }

    if(filename!=="index.js"){
      // if file is a spec file, ignore the following condition code
      if( filepath.indexOf(".spec.") == -1){
        specfileArray = filepath.replace(".js",".spec.js").split('/');
        specfile = specfileArray.pop();
        specfileArray.push('**/*');
        specfileArray.push(specfile);
        filepath = specfileArray.join('/');
      }
      configFilePath = path.resolve(karmaConfigFile);
      files = _.pluck(karmaParseConfig(configFilePath, {}).files, 'pattern');
      files.push(filepath);
    
      var server = new Server({
        configFile: karmaConfigFile,
        files : files
      },function(karmaExitCode){
        console.log('Karma is watching changes');
      });
      server.start();
    }
  });
});

