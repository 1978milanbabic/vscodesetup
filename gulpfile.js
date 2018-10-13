var gulp = require('gulp');

/*** beautify code modules ***/
var htmlbeautify = require('gulp-html-beautify');
var cssbeautify = require('gulp-cssbeautify');
var jsbeautify = require('gulp-beautify');
var replace = require('gulp-replace-path');

/*** create production code modules ***/
var prefix = require('gulp-autoprefixer');
var cssMin = require('gulp-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


//*********** BEAUTIFY CODE TASKS *************
//html beautify
gulp.task('html-beautify', function () {
    var options = {
        indentSize: 2
    };
    gulp.src('./development/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./development/'));
});

//css beautify
gulp.task('beautifyCSS', function () {
    gulp.src([
        './development/css/*.css'
    ])
    .pipe(cssbeautify())
    .pipe(gulp.dest('./development/css/'));
});

//js beautify
gulp.task('beautifyJS', function () {
    gulp.src([
        './development/js/*.js'
    ])
    .pipe(jsbeautify())
    .pipe(replace('function(', 'function ('))
    .pipe(gulp.dest('./development/js/'));
});

/***************************** BEAUTIFY MAIN TASK ****************************/

gulp.task('beautify_code', 
    [
        'html-beautify', 
        'beautifyCSS', 
        'beautifyJS'
    ]
);

//********* CREATE PRODUCTION CODE TASKS *******

//*** styles ***
gulp.task('css-to-production', function () {
    gulp.src([
        './development/css/*.css'
    ])
    .pipe(prefix('last 100 versions'))
    .pipe(cssMin())
    .pipe(gulp.dest('./public_html/css/'));
});

//*** javascript ***
gulp.task('js-to-production', function () {
    gulp.src([
        './development/js/*.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('./public_html/js/'));
});
//copies frameworks files (already minimized)
gulp.task('jsframeworks-to-production', function () {
    gulp.src([
        './development/js/scripts/*.js'
    ])
    .pipe(gulp.dest('./public_html/js/scripts/'));
});

//*** images ***
gulp.task('images-compress', function () {
    gulp.src([
        './development/img/**/*'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('./public_html/img/'));
});

//*** copy all other files to production ***
gulp.task('copy-html', function () {
    gulp.src([
        './development/*.html'
    ])
    .pipe(gulp.dest('./public_html/'));
});

/****************** CREATE PRODUCTION MAIN TASK *****************/

gulp.task('create_production', 
    [
        'css-to-production', 
        'js-to-production', 
        'jsframeworks-to-production', 
        'images-compress', 
        'copy-html'
    ]
);