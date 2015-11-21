'use strict';

var gulp = require('gulp'),
    size = require('gulp-size'),
    replace = require("gulp-replace"),
    prompt = require('gulp-prompt'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

module.exports = gulp.task('change:name', function () {
  var all_app_path = [
    APP_PATH + "/gulp/**/*.js",
    APP_PATH + "/gulp/*.js",
    APP_PATH + "/src/*",
    APP_PATH + "/src/**/*",
    APP_PATH + "/e2e/**/*",
    APP_PATH + "/e2e/*",
    APP_PATH + "/config/**/*",
    APP_PATH + "/config/*",
    APP_PATH + "/*",
  ];
  return gulp.src(all_app_path)
    .pipe(prompt.prompt([{
        type: 'input',
        name: 'app_name',
        message: "What is the name of this app?",
        default: "app"
    }], function(res){
      gulp.src(all_app_path)
        .pipe(replace("ionic-base", res.app_name))
        .pipe(gulp.dest(APP_PATH));
    }));
  
});