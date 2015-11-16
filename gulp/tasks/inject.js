'use strict';
var gulp = require('gulp'),
		gulpif = require('gulp-if'),
		inject = require("gulp-inject"),
    replace = require("gulp-replace"),
    size = require("gulp-size"),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    reload = require("browser-sync").reload,
    gulpMultinject = require("gulp-multinject"),
    constants = require(config.paths.src.constants),
    fs = require('fs'),
    list_of_cdns,
    entryIndex,
    dest_css,
    apiUrl,
    dest_js,
    vendor,
    libs,
    dest,
    templates;

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

if( staging || production ){
  dest_css = config.paths.dest.targets.styles + "/" + config.files.names.targets.styles +"*.css";
  dest_js = config.paths.dest.targets.scripts + "/" + config.files.names.targets.scripts + "*.js";
  dest = BUILD_FOLDER;
  vendor = BUILD_FOLDER  + "/" + config.files.names.targets.vendors + "*.js";
  libs = BUILD_FOLDER  + "/" + config.files.names.targets.libs + "*.js";
  entryIndex = BUILD_FOLDER  + "/" + config.files.names.targets.index + ".html";
  apiUrl = staging ? constants[env]['SERVER_API'] : constants[env]['SERVER_API'];
}else{
  dest_css = config.paths.dest.development.styles + "/" + config.files.names.development.styles +"*.css";
  dest_js = config.paths.dest.development.scripts + "/" + config.files.names.development.scripts + "*.js";
  dest = TMP_FOLDER;
  vendor = TMP_FOLDER  + "/" + config.files.names.development.vendors + "*.js";
  libs = TMP_FOLDER  + "/" + config.files.names.development.libs + "*.js";
  entryIndex = TMP_FOLDER  + "/" + config.files.names.development.index + ".html";
  apiUrl = constants[env]['SERVER_API'];
}

// inject bower common
module.exports = gulp.task('inject', function () {

  fs.readFile('bower.json', 'utf8', function (err,data) {
    
    // get CDN data from bower.json
    list_of_cdns = JSON.parse(data).cdns;
    
    // get cdn's key and value information respectively
    get_obj_info(list_of_cdns, function(cdn_keys,cdn_links){
      gulp.src(entryIndex)
        // inject cdn scripts for production
        .pipe(gulpif( staging || production,gulpMultinject(cdn_links,'cdns')))
        // inject script and css
        .pipe( inject(gulp.src(vendor, {read: false}), { name: 'vendors', relative: true}))
        .pipe( inject(gulp.src(libs, {read: false}), { name: 'libs', relative: true}))
        .pipe( inject(gulp.src(dest_js, {read: false}), {relative: true}) )
        .pipe( inject(gulp.src(dest_css, {read: false}), {relative: true}) )
        .pipe(replace('_AVATIRE_API_URL_', apiUrl ))
        .pipe(gulp.dest(dest))
        .pipe(reload({stream:true}));

    gutil.log(  chalk.green('[ INJECT ] : '+chalk.bold('injected scripts and styles')) )
      
    });
  });
});