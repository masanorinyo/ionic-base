'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    tap = require('gulp-tap'),
    del = require('del'),
    runSequence = require('run-sequence'),
    revall = require('gulp-rev-all'),
    fs = require("fs"),
    glob = require("glob"),
    path = require("path"),
    files = [];


module.exports = gulp.task('cachebust', [ "cachebust:vendor","cachebust:app" ], function(done){
  
  runSequence("cachebust:validate");
  del(files,done);
});

module.exports = gulp.task('cachebust:vendor', function () {
  return gulp.src(config.files.cachebust.targets.vendors)
    .pipe(tap(function(file) {
      var isDir = fs.lstatSync(file.path).isDirectory();
      if(!isDir){
        files.push(file.path);  
      }
    }))
    .pipe(revall())
    .pipe(gulp.dest(config.paths.dest.targets.bower)); 
});


module.exports = gulp.task('cachebust:app',  function () {

  return gulp.src([
      config.files.cachebust.targets.styles,
      config.files.cachebust.targets.assets,
      config.files.cachebust.targets.scripts
    ])
    .pipe(tap(function(file) {
      var isDir = fs.lstatSync(file.path).isDirectory();
      if(!isDir){
        files.push(file.path);  
      }
    }))
    .pipe(revall())
    .pipe(gulp.dest(config.paths.dest.targets.app))
    .pipe(revall.manifest({ fileName: 'manifest.json' })) 
    .pipe(gulp.dest(config.paths.dest.targets.revinfo));
});

function validate_cachebust (files){
  var manifest,
      key,
      regex,
      newPath,
      result;
  
  fs.readFile(config.files.cachebust.manifest,'utf8', function (err,data) {
    manifest = JSON.parse(data);
  })
  glob(files, function (er, files) {
    fs.readFile(files[0], 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      // Loop through the manifest data
      // - replace pre-revised data in js file with revised data.
      for( key in manifest){
        regex = new RegExp(path.basename(key),"g");
        newPath = path.basename(manifest[key]);
        data = data.replace( regex, newPath );
      }

      fs.writeFile(files[0], data, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });  
  })
}


// This will replace 
module.exports = gulp.task("cachebust:validate",function(){
  validate_cachebust(config.files.cachebust.targets.index);
  validate_cachebust(config.files.cachebust.targets.scripts);
})