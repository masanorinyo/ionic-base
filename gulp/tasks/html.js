'use strict';
var gulp = require('gulp'),
    templateCache = require('gulp-angular-templatecache'),
    reload = require("browser-sync").reload,
    jade = require('gulp-jade'),
    header = require("gulp-header"),
    changed = require('gulp-changed'),
    cached = require('gulp-cached'),
    size = require('gulp-size'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    plumber = require('gulp-plumber'),
    jadeInheritance = require('gulp-jade-inheritance'),
    plumber = require('gulp-plumber'),
    filter = require('gulp-filter');


module.exports = gulp.task('html:templateCache', function() {
    
  // create a template placehlder with empty contents
  gulp.src('')
    .pipe(plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))  
    .pipe(templateCache({
        standalone:true,
        root:"app"
    }))
    .pipe(header('module.exports = '))
    .pipe(gulp.dest(TMP_FOLDER + "/app"));
});


module.exports = gulp.task('html', function() {
  gutil.log(  chalk.green('[ HTML ] : '+chalk.bold('Compiled')) );
    
  gulp.src([config.paths.src.templates,config.paths.src.index])
    .pipe(plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))

    //only pass unchanged *landing* files and *all* the partials
    .pipe(changed(config.paths.src.templates, {extension: '.html'}))

    //filter out unchanged partials, but it only works when watching
    .pipe(gulpif( !staging || !production,cached('jade')))

    //filter out partials (folders and files starting with "_" )
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) || !/^_/.test(file.relative);
    }))
    
    //find files that depend on the files that have changed
    .pipe(jadeInheritance({ basedir : SRC_FOLDER }))

    //filter out unchanged partials, but it only works when watching
    .pipe(jade({pretty: false}))
    
    //save all the files
    .pipe(gulp.dest(config.paths.dest.development.html))

    .pipe(reload({stream:true}))

    .pipe(size({ "title" : "html size"}));
});
