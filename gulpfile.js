var gulp = require('gulp');
var googlecdn = require('gulp-google-cdn');
var cdnizer = require("gulp-cdnizer");

gulp.task('cdnizer', function() {
  gulp.src("./src/index.html")
  .pipe(cdnizer([
    'google:angular',
    'cdnjs:jquery',
    {
      file: '**/bootstrap/**/*.css',
      package: 'bootstrap',
      cdn: '//maxcdn.bootstrapcdn.com/bootstrap/${ version }/css/${ filenameMin }' 
    },
    {
      file: '**/bootstrap/**/*.js',
      package: 'bootstrap',
      cdn: '//maxcdn.bootstrapcdn.com/bootstrap/${ version }/js/${ filenameMin }' 
    }
  ]))
  .pipe(gulp.dest("."));
});

gulp.task('watch', ['cdnizer'], function () {
  gulp.watch('src/index.html', ['cdnizer']);
});

gulp.task('default', ['watch']);
