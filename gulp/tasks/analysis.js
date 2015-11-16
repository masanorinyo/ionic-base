var gulp = require('gulp'),
    complexity = require('gulp-complexity'),
    runSequence = require('run-sequence'),
    cached = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    parker = require('gulp-parker'),
    buddyjs = require('gulp-buddy.js'),
    plato = require('plato');


module.exports = gulp.task('analysis', function(){
  return gulp.src(config.paths.src.scripts)
    .pipe(plumber())
    .pipe(cached('analysis'))
    .pipe(complexity({ "breakOnErrors" : false }));
});

module.exports = gulp.task('analysis:report', function(){
  
    var options = {
      jshint: {
        options: config.others.jshint
      },
      complexity: {
        trycatch: true
      }
    };

    var callback = function (report){
      runSequence("open:analysis");
    };

    plato.inspect( config.paths.src.scripts, REPORT_PATH, options, callback);

});

module.exports = gulp.task('analysis:css', function() {
    return gulp.src(config.paths.src.styles)
        .pipe(plumber())
        .pipe(parker());
});

// this will detect all the magic numbers 
// - see reference (https://github.com/danielstjules/buddy.js)
module.exports = gulp.task('analysis:buddy', function () {
  return gulp.src(config.paths.src.scripts)
    .pipe(plumber())
    .pipe(buddyjs({
      disableIgnore: true,
      reporter: 'detailed'
    }));
});

module.exports = gulp.task('analysis:full', [ "analysis:report", "analysis:css", "analysis:buddy", "open:coverage"]);