'use strict';

var gulp = require('gulp'),
    size = require('gulp-size'),
    replace = require("gulp-replace"),
    prompt = require('gulp-prompt'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

module.exports = gulp.task('change:name', function () {
  var all_path = {
    "gulp" : [
      APP_PATH + "/gulp/**/*.js",
      APP_PATH + "/gulp/*.js"
    ],
    "src" : [ 
      APP_PATH + "/src/*",
      APP_PATH + "/src/**/*"
    ],
    "e2e" : [
      APP_PATH + "/e2e/**/*",
      APP_PATH + "/e2e/*"
    ],
    "config" : [
      APP_PATH + "/config/**/*",
      APP_PATH + "/config/*"
    ],
    "": APP_PATH + "/*"  
  };
  
  gulp.src(APP_PATH)
    .pipe(prompt.prompt([{
        type: 'input',
        name: 'app_name',
        message: "What is the name of this app?",
        default: "app"
    }], function(res){
      
      for(var key in all_path){
        gulp.src(all_path[key])
          .pipe(replace("neighborchef", res.app_name))
          .pipe(gulp.dest(APP_PATH + "/" + key));
      }
      
    }));
  
});