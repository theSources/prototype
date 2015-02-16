var gulp = require('gulp');
var bower = require('gulp-bower-deps');
var webserver = require('gulp-webserver');

var del = require('del');

var config = {
  bower: {
    directory: './bower_components',
    deps: {
      fontawesome: {
        version: '^4.3.0',
        files: 'css/font-awesome.css'
      },
      bootstrap: {
        version: '~3.3.2',
        files: [ 'dist/js/bootstrap.js', 'dist/css/bootstrap.css' ]
      }
    }
  }
};


bower = bower(config.bower);

bower.installtask(gulp);

gulp.task('server', function() {
  gulp.src('./dist')
      .pipe(webserver({
        livereload: true
      }));
});

gulp.task('build', ['bower'], function () {
  del('./dist');

  return gulp.src(['./html/*'].concat(bower.deps))
             .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['build']);
