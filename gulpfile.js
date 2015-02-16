var gulp = require('gulp');
var bower = require('gulp-bower-deps');
var webserver = require('gulp-webserver');

var config = {
    bower: {
        directory: './bower_components',
        deps: {
            fontawesome: {
                version: '^4.3.0',
                files: 'fontawesome.css'
            },
            bootstrap: {
                version: '~3.3.2',
                files: [ 'bootstrap.js', 'bootstrap.css' ]
            }
        }
    }
};


bower = bower(config.bower);

bower.installtask(gulp);

gulp.task('server', function() {
    gulp.src('html')
        .pipe(webserver({
            livereload: true
        }));
});

gulp.task('default', ['bower'], function() {
});
