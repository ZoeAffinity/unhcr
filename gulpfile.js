var gulp = require('gulp'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    pathUtil = require('path');


var dest = path('./');

gulp.task('default', ['watch']);

gulp.task('watch', ['watchify']);

gulp.task('watchify', function () {
    var bundler = watchify('./src/index.js');

    bundler.on('update', rebundle);
    bundler.on('log', gutil.log);

    function rebundle() {
        var stream = bundler.bundle({ debug: true });

        stream.on('error', function (err) {
            gutil.beep();
            gutil.log(err.message);
        });

        return stream
            .pipe(source('app.js'))
            .pipe(dest('/js'));
    }

    return rebundle();
});

function path() {
    var base = pathUtil.join.apply(pathUtil, Array.prototype.slice.call(arguments, 0));
    return function () {
        var args = Array.prototype.slice.call(arguments, 0),
            pieces = [base].concat(args);
        return gulp.dest(pathUtil.join.apply(pathUtil, pieces));
    };
}

