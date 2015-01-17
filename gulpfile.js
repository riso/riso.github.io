var gulp = require('gulp');
var googlecdn = require('gulp-google-cdn');

gulp.task('default', function () {
  return gulp.src('src/index.html')
  .pipe(googlecdn(require('./bower.json'), {
    cdn: {
      angular: {
        versions: ['1.3.9'],
        url: function(version) {
          return '//ajax.googleapis.com/ajax/libs/angularjs/' + version  +'/angular.min.js';
        }
      }
    }
  }))
  .pipe(gulp.dest('.'));
});
