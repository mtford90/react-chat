var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('scss', function () {
    gulp.src('./public/styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/styles/css'));
});


gulp.task('default', function() {
    // place code for your default task here
});
