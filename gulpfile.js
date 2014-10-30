var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

var SCSS_FILES = './public/styles/scss/**/*.scss';
var CSS_FOLDER = './public/styles/css';
var HTML_FILES = './public/**/*.html';

gulp.task('scss', function() {
    gulp.src(SCSS_FILES)
        .pipe(sass())
        .pipe(gulp.dest(CSS_FOLDER));
});

gulp.task('watch', function() {
    gulp.src(SCSS_FILES)
        .pipe(watch(SCSS_FILES))
        .pipe(sass())
        .pipe(gulp.dest(CSS_FOLDER))
        .pipe(livereload());

    watch(HTML_FILES)
        .pipe(livereload());

});