var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    nodemon = require('nodemon');

var SCSS_FILES = './public/styles/scss/**/*.scss';
var CSS_FOLDER = './public/styles/css';
var HTML_FILES = './public/**/*.html';
var JS_FILES = './public/js/**/*.js';

gulp.task('scss', function() {
    gulp.src(SCSS_FILES)
        .pipe(sass())
        .pipe(gulp.dest(CSS_FOLDER));
});

gulp.task('watch', function() {
    nodemon({
        script: 'server.js',
        ignore: ['public/']
    });

    gulp.src(SCSS_FILES)
        .pipe(watch(SCSS_FILES))
        .pipe(sass())
        .pipe(gulp.dest(CSS_FOLDER))
        .pipe(livereload());

    watch(HTML_FILES)
        .pipe(livereload());

    watch(JS_FILES)
        .pipe(livereload());
});
