var gulp = require('gulp');
var bower = require('gulp-bower-deps');
var webserver = require('gulp-webserver');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

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


var paths = {
  dist: './dist',
  html: './html'
};

var allFiles = function (path) {
  return path + '/*';
};

var sources = [allFiles(paths.html)].concat(bower.deps);


gulp.task('server', function() {
  gulp.src(paths.dist)
      .pipe(webserver({
        livereload: true
      }));
});

gulp.task('clean', function () {
  del(paths.dist);
});

gulp.task('build', ['bower'], function () {
  return gulp.src(sources)
             .pipe(cached('build'))
             .pipe(remember('build'))
             .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(sources, ['build']);
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      delete cached.caches.build[event.path];
      remember.forget('build', event.path);
    }
  });
});


gulp.task('default', ['build']);
