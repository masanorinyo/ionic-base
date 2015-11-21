'use strict';

var gulp = require('gulp'),
    size = require('gulp-size'),
    replace = require("gulp-replace"),
    prompt = require('gulp-prompt'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

module.exports = gulp.task('change:name', function () {
  var all_app_path = [
    APP_PATH + "/**/*",
    "!" + APP_PATH + "/node_modules",
    "!" + APP_PATH + "/src/bower_components",
    "!" + APP_PATH + "/hooks",
    "!" + APP_PATH + "/platforms",
    "!" + APP_PATH + "/plugins",
  ];
  return gulp.src(all_app_path)
    .pipe(prompt.prompt([{
        type: 'input',
        name: 'app_name',
        message: "What is the name of this app?",
        default: "app"
    }], function(res){
      gulp.src(all_app_path)
        .pipe(replace("ionic-app", res.app_name))
        .pipe(gulp.dest(APP_PATH));
    }));
  
});