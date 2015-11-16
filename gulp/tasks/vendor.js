'use strict';

var concat_with_map = require('gulp-concat-sourcemap'),
    concat_without_map = require('gulp-concat'),
    uglify = require("gulp-uglify"),
    gulpif = require('gulp-if'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    gulp = require('gulp'),
    reload = require("browser-sync").reload,
    rename = require('gulp-rename'),
    fs = require('fs'),
    bower = require('gulp-bower'),
    bootstrap_code = [
      "/bootstrap-sass-official/", 
      "/bootstrap.js/", 
      "/bootstrap.css/"
    ],
    vendor_dest,
    list_of_cdns,
    wiredep,
    entryIndex,
    dest,
    new_name;

function get_obj_info(obj, callback){
  var keys = [],
      attrs = [];
      
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      keys.push("/"+key+"/");
      attrs.push(obj[key]);
    }else{
      console.log(key," cannot be found in cdn array");
    }
  };
  return callback( keys , attrs );
}

if(production || staging ){
  vendor_dest = config.paths.dest.targets.vendors;
}else{
  vendor_dest = config.paths.dest.development.vendors;
}


// install bower packages into the directory specified by
module.exports = gulp.task('bower', function () {
    
  gutil.log(  chalk.green('[ Bower ] : '+chalk.bold('bower packages are installed into ' + config.paths.src.bower_directory )) );
  // install bower packages
  return bower({cmd: 'install'},['--allow-root']);
});

module.exports = gulp.task('vendor:custom', function(){
  gulp.src(config.paths.src.vendors)
    .pipe(gulp.dest(vendor_dest));
});

// inject bower common - gulp task "bower" needs to be completed beforehand
module.exports = gulp.task('vendor', ['bower', 'vendor:custom' ], function () {

  fs.readFile('bower.json', 'utf8', function (err,data) {
    
    // get CDN data from bower.json
    list_of_cdns = JSON.parse(data).cdns;
    
    // get cdn's key and value information respectively
    get_obj_info(list_of_cdns, function(cdn_keys,cdn_links){

      // configure 
      // - which file to ingnore in compiling vendor scripts
      // - the location to insert compiled file
      if( staging || production ){
        wiredep = require('wiredep')({
          directory: config.paths.src.bower_directory,
          exclude: bootstrap_code.concat(cdn_keys)
        });
        dest = config.paths.dest.targets.bower;
        entryIndex = BUILD_FOLDER + "/index.html";
        new_name = config.files.names.targets.libs + ".js";
      }else{
        wiredep = require('wiredep')({
          directory: config.paths.src.bower_directory
        });
        dest = config.paths.dest.development.bower;
        entryIndex = TMP_FOLDER + "/index.html";
        new_name = config.files.names.development.libs + ".js";
      }

      gutil.log(  chalk.green('[ VENDOR ] : '+chalk.bold('bower dependencies organized')) );
      // concatenate bower scripts
      gulp.src(wiredep.js)
        .pipe(gulpif( staging || production,
          concat_without_map('libs.js'),
          concat_with_map('libs.js')
        ))
        .pipe(gulpif( staging || production,uglify()))
        .pipe(gulpif( staging || production,rename(new_name)))
        .pipe(gulp.dest(dest))
        .pipe(reload({stream:true}))
        .pipe(size({ "title" : "lib size"})); 

    });
  });
});

