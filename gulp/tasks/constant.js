'use strict';

var gulp = require('gulp'),
    ngConstant = require('gulp-ng-constant'),
    rename = require('gulp-rename'),
    constants = require(config.paths.src.constants),
    dest,
    dest_script,
    env_constants;

if(production){
  dest = config.paths.dest.targets.index;
  dest_script = config.paths.dest.targets.scripts;
  env_constants = constants["production"];
}else if (staging){
  dest = config.paths.dest.targets.index;
  dest_script = config.paths.dest.targets.scripts;
  env_constants = constants["staging"];
}else{
  dest = config.paths.dest.development.index;
  dest_script = config.paths.dest.development.scripts;
  env_constants = constants["development"];
}

module.exports = gulp.task('constant', function () {
  gulp.src('')
    .pipe(ngConstant({
      "name": APP_NAME + ".constants",
      "wrap_style": "commonjs",
      "constants": env_constants
    }))
    .pipe(rename('constants.js'))
    .pipe(gulp.dest(dest_script));
});


