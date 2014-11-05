var gulp = require('gulp'),
    open = require('gulp-open'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),

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

    gulp.src('./public/index.html')
        .pipe(open('', {
          url: 'http://localhost:3000'
        }))

    watch(HTML_FILES)
        .pipe(livereload());

    watch(JS_FILES)
        .pipe(livereload());
});
