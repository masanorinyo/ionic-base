var gulp = require('gulp'),
  watch = require('gulp-watch'),
  cached = require('gulp-cached'),

// This will keeps pipes working after error event
  plumber = require('gulp-plumber'),

// linting
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),

// Used in linting custom reporter
  map = require('map-stream'),
  events = require('events'),
  notify = require('gulp-notify'),
  emmitter = new events.EventEmitter(),
  path = require('path'),
  jshintConf;

// Custom linting reporter used for error notify
var jsHintErrorReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    file.jshint.results.forEach(function (err) {
      if (err) {
        //console.log(err);

        // Error message
        var msg = [
          path.basename(file.path),
          'Line: ' + err.error.line,
          'Reason: ' + err.error.reason
        ];

        // Emit this error event
        emmitter.emit('error', new Error(msg.join('\n')));

      }
    });

  }
  cb(null, file);
});

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

if( production || staging ){
  jshintConf = merge_options(config.others.jshint.defaultConf, config.others.jshint.customizedConf.prd);
}else{
  jshintConf = merge_options(config.others.jshint.defaultConf, config.others.jshint.customizedConf.dev);
}

module.exports = gulp.task('jslint', function () {
  gulp.src(config.paths.src.scripts)
    .pipe(watch())
    // .pipe(cached('analysis'))
    .pipe(plumber())
    .pipe(jshint(jshintConf))
    .pipe(jshint.reporter(stylish)) // Console output
    .pipe(jsHintErrorReporter) // If error pop up a notify alert
    .on('error', notify.onError(function (error) {
      return error.message;
    }));
});