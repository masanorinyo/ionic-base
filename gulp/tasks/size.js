'use strict';

var gulp = require('gulp'),
    cached = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    sizereport = require('gulp-sizereport'),
    targets;
 
if(production||staging){
  targets = BUILD_FOLDER + "/**/*";
}else{
  targets = TMP_FOLDER + "/**/*";
}

module.exports = gulp.task('sizereport', function () {
    return gulp.src(targets)
        .pipe(cached("sizing"))
        .pipe(plumber())
        .pipe(sizereport({
          gzip: production || staging
        }));
});

module.exports = gulp.task('sizereport:images', function () {
    return gulp.src(targets + ".{svg,png,jpeg,jpg}")
        .pipe(plumber())
        .pipe(sizereport({
          gzip: production || staging
        }));
});

module.exports = gulp.task('sizereport:js', function () {
    return gulp.src(targets + ".js")
        .pipe(plumber())
        .pipe(sizereport({
          gzip: production || staging
        }));
});


module.exports = gulp.task('sizereport:css', function () {
    return gulp.src(targets + ".css")
        .pipe(plumber())
        .pipe(sizereport({
          gzip: production || staging
        }));
});
