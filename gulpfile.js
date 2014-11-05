'use strict';

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

gulp.task('watch', ['nodeWatch', 'scssWatch', 'htmlJsWatch'], function() {
    gulp.src('./public/index.html')
        .pipe(open('', {
            url: 'http://localhost:3000',
        }));
});

gulp.task('nodeWatch', function() {
    nodemon({
        script: 'server.js',
        ignore: ['public/', 'gulpfile.js']
    })
    .on('restart', function() {
        console.log('restarting node server');
    })
    .on('crash', function() {
        console.log('\n!!! node has crashed - will restart after next save !!!');
    });
});

gulp.task('scssWatch', function() {
    watch(SCSS_FILES)
        .pipe(sass({
            onError: function(err) {
                console.log('you call that scss? check out this error: \n', err);
            }
        }))
        .pipe(gulp.dest(CSS_FOLDER))
        .pipe(livereload());
});

gulp.task('htmlJsWatch', function() {
    watch( [HTML_FILES, JS_FILES] );

    watch(HTML_FILES)
        .pipe(livereload());

    watch(JS_FILES)
        .pipe(livereload());
});
