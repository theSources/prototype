var gulp = require('gulp');
var bower = require('gulp-bower-deps');
var webserver = require('gulp-webserver');
var cached = require('gulp-cached');
var remember = require('gulp-remember');
var amdOtimize = require('gulp-amd-optimize');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');

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
      underscore: {
        version: '^1.8.2',
        files: ['underscore.js']
      },
      sinon: {
        files: 'pkg/sinon.js'
      },
      exoskeleton: {
        version: '^0.7.0',
        files: 'exoskeleton.js'
      },
      jquery: {
        version: '^2.1.3',
        files: 'dist/jquery.js'
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


var assets = [allFiles(paths.html)].concat(bower.deps);
var sources = [allFiles(paths.js)].concat(bower.deps);


gulp.task('server', function() {
  gulp.src(paths.dist)
      .pipe(webserver({
        livereload: true
      }));
});

gulp.task('clean', function () {
  del(paths.dist);
});

gulp.task('jsBuild', ['bower'], function () {
  return gulp.src(sources)
             .pipe(cached('js'))
             .pipe(sourcemaps.init())
             .pipe(remember('js'))
             .pipe(amdOtimize('main'))
             .pipe(gulpif(function (file) { return bower.deps.indexOf(file.path) < 0; }, concat('index.js')))
             .pipe(sourcemaps.write())
             .pipe(gulp.dest(paths.dist));
});

gulp.task('assetsBuild', ['bower'], function () {
  return gulp.src(assets)
    .pipe(cached('assets'))
    .pipe(remember('assets'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['jsBuild', 'assetsBuild']);

gulp.task('watch', function () {
  var watcher = gulp.watch(sources, ['build']);
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      delete cached.caches.js[event.path];
      delete cached.caches.assets[event.path];
      remember.forget('js', event.path);
      remember.forget('assets', event.path);
    }
  });
});


gulp.task('default', ['build']);
