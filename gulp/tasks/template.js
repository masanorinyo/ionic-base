'use strict';

var gulp = require('gulp'),
    gulpif = require("gulp-if"),
    jade = require("gulp-jade"),
    header = require("gulp-header"),
    size = require("gulp-size"),
    minifyHTML = require('gulp-minify-html'),
    header = require("gulp-header"),
    inject = require("gulp-inject"),
    templateCache = require('gulp-angular-templatecache'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    dest_temp = TMP_FOLDER + "/app",
    dest = config.paths.dest.targets.app;


function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
   return base;
}

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

module.exports = gulp.task('template', function () {
  gutil.log(  chalk.green('[ TEMPLATE ] : '+chalk.bold('Jade compiled')) );

  gulp.src( config.paths.src.templates )
    .pipe(jade().on('error', handleError))
    .pipe(minifyHTML({empty: true, spare: true, quotes: true}))
    .pipe(templateCache({ 
      standalone:true,
      root:"app"
    }))
    .pipe(header('module.exports = '))
    .pipe(gulp.dest(dest_temp))
    .pipe(size({ "title" : "template size"}));

  gulp.src([config.paths.src.templates])
    .pipe(jade().on('error', handleError))
    .pipe(minifyHTML({empty: true, spare: true, quotes: true}))
    .pipe(gulp.dest(config.paths.dest.targets.app))
    .pipe(size({ "title" : "template size"}));  

});

