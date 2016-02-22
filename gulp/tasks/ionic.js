"use strict";

var gulp = require('gulp'),
    shell = require('gulp-shell');

module.exports = gulp.task('ionic', [ 'ionic:serve','ionic:build:ios','ionic:build:android']);

module.exports = gulp.task('ionic:serve', shell.task([
  "ionic serve"
]));

module.exports = gulp.task('ionic:build:ios', shell.task([
  "ionic build ios"
]));

module.exports = gulp.task('ionic:build:android', shell.task([
  "ionic build android"
]));

module.exports = gulp.task('ionic:run:ios:watch:devise', shell.task([
  "ionic build ios",
  "ionic run ios --livereload --consolelogs --serverlogs --devise"
]));

module.exports = gulp.task('ionic:run:ios:watch', shell.task([
  "ionic build ios",
  "ionic run ios --livereload --consolelogs --serverlogs"
]));

module.exports = gulp.task('ionic:run:android:watch:devise', shell.task([
  "ionic build android",
  "ionic run android --livereload --consolelogs --serverlogs --devise"
]));

module.exports = gulp.task('ionic:run:android:watch', shell.task([
  "ionic build android",
  "ionic run android --livereload --consolelogs --serverlogs"
]));

module.exports = gulp.task('ionic:run:ios:devise', shell.task([
  "ionic build ios",
  "ionic run ios --devise"
]));

module.exports = gulp.task('ionic:run:ios', shell.task([
  "ionic build ios",
  "ionic run ios"
]));

module.exports = gulp.task('ionic:run:android:devise', shell.task([
  "ionic build android",
  "ionic run android --devise"
]));

module.exports = gulp.task('ionic:run:android', shell.task([
  "ionic build android",
  "ionic run android"
]));