'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence');

module.exports = gulp.task('default', function () {
  
  if( production ){
    
    runSequence(
      "clean",
      "entry",
      "vendor",
      ["template","images",'misc','svg','i18n',"constant"],
      ["browserify","styles", 'fonts'],
      "cachebust",
      "inject"
    );

  }else if ( staging ) {
    
    runSequence(
      "clean",
      "entry",
      "vendor",
      ["template","images",'misc','svg','i18n',"constant"],
      ["styles", 'fonts'],
      "browserify",
      "cachebust",
      "inject",
      ["analysis","sizereport"],
      "ionic:serve",
      "test"
    );

  } else {
    runSequence(
      "clean",
      "entry",
      "vendor",
      ["html:templateCache","html","images",'fonts','i18n',"constant", "misc"],
      ["jslint", "watchify","watch","styles"],
      "inject",
      ["analysis", "sizereport"],
      "serve",
      "test:unit:watch",
      "test:unit"
    );
  }
});


module.exports = gulp.task("info", ["analysis:full","sizereport"]);