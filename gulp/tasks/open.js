"use strict"

var gulp = require('gulp'),
    open = require('gulp-open'),
    gulpif = require('gulp-if'),
    link,
    hosted_url,
    options;
module.exports = gulp.task("open", function(){
  
  hosted_url = "http://localhost:"+config.servers.ports.devServer;
  

  link = config.paths.dest.targets.index + "/index.html";
  options = {
    url: hosted_url ,
    app: "Google Chrome"
  };

  gulp.src(link)
    .pipe(gulpif( staging, open(link, options)));
});

module.exports = gulp.task("open:analysis", function(){
  
  hosted_url = config.others.analysis.path;
  

  link = config.paths.dest.targets.index + "/index.html";
  options = {
    url: hosted_url ,
    app: "Google Chrome"
  };

  gulp.src(link)
    .pipe(open(link, options));
});

module.exports = gulp.task("open:coverage", function(){
  
  hosted_url = config.others.coverage.path;
  

  link = config.paths.dest.targets.index + "/index.html";
  options = {
    url: hosted_url ,
    app: "Google Chrome"
  };

  gulp.src(link)
    .pipe(open(link, options));
});

