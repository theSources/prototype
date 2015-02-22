var gulp = require('gulp');
var bower = require('gulp-bower-deps');
var webserver = require('gulp-webserver');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var gulpif = require('gulp-if');
var amdOtimize = require('gulp-amd-optimize');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var lazypipe = require('lazypipe');

var del = require('del');
var path = require('path');

var config = {
  bower: {
    directory: './bower_components',
    deps: {
      requirejs: {
        version: '^2.1.0',
        files: 'require.js'
      },
      fontawesome: {
        version: '^4.3.0',
        files: 'css/font-awesome.css'
      },
      bootstrap: {
        version: '~3.3.2',
        files: [ 'dist/js/bootstrap.js', 'dist/css/bootstrap.min.css' ]
      }
    }
  }
};

bower = bower(config.bower);
bower.installtask(gulp);


var paths = {
  dist: './dist',
  html: './src/html',
  js: './src/js'
};

var allFiles = function (filePath) {
  return filePath + '/*';
};

var isInPath = function (dirPath) {
  var absolutePath = path.resolve(dirPath);

  return function (file) {
    return file.path.indexOf(absolutePath) === 0;
  };
};


var sources = [allFiles(paths.html), allFiles(paths.js)].concat(bower.deps);

var jsBuild = lazypipe()
                .pipe(sourcemaps.init)
                .pipe(remember, 'js')
                .pipe(amdOtimize, 'main')
                .pipe(concat, 'index.js')
                .pipe(sourcemaps.write);


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
             .pipe(gulpif(isInPath(paths.js), jsBuild()))
             .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(sources, ['build']);
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      delete cached.caches.build[event.path];
      remember.forget('js', event.path);
    }
  });
});


gulp.task('default', ['build']);
