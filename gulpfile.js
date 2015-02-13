var gulp = require('gulp');
var bower = require('gulp-bower');
var webserver = require('gulp-webserver');

var config = {
    bowerDir : './bower_components'
};

gulp.task('bower', function() {
    return bower().pipe(gulp.dest(config.bowerDir));
});

gulp.task('server', function() {
    gulp.src('html')
        .pipe(webserver({
            livereload: true
        }));
});

gulp.task('default', ['bower'], function() {
});
