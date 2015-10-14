var gulp = require('gulp');
var sass      = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    concat    = require('gulp-concat'),
    watch    = require('gulp-watch'),
    minifyCSS = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    livereload = require('gulp-livereload');

gulp.task('watch', ['sass'], function() {
    livereload.listen();
    gulp.run('sass');
    gulp.watch('css/**/*.scss', ['sass']);
    gulp.watch('index.html', ['htmlUpdate']);
});

gulp.task('htmlUpdate', function() {
    console.log("Update the html dawg");
    gulp.src('index.html')
        .pipe(livereload());
});

gulp.task('sass', function() {
    gulp.src('css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('default', ['watch'], function() {
});