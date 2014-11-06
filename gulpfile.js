'use strict';

var gulp = require('gulp'),
    open = require('gulp-open'),
    sass = require('gulp-ruby-sass'),
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

gulp.task('styles', function() {
    return gulp.src(SCSS_FILES)
        .pipe(sass({
            style: 'compact',
            precision: 10,
            loadPath: './public/bower_components/bootstrap-sass-official/assets/stylesheets/'
        }))
        .on('error', function(err) {
            console.log('you call that scss? check out this error: \n', err);
        })
        .pipe(gulp.dest(CSS_FOLDER))
        .pipe(livereload());
});

gulp.task('scssWatch', function() {
    gulp.watch(SCSS_FILES, ['styles'])
});

gulp.task('htmlJsWatch', function() {
    watch( [HTML_FILES, JS_FILES] );

    watch(HTML_FILES)
        .pipe(livereload());

    watch(JS_FILES)
        .pipe(livereload());
});
