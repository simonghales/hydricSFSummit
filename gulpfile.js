var gulp = require('gulp');
var sass      = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    concat    = require('gulp-concat'),
    watch    = require('gulp-watch'),
    minifyCSS = require('gulp-minify-css'),
    rename    = require('gulp-rename'),
    inline = require('gulp-inline'),
    inlinesource = require('gulp-inline-source'),
    inlineStyle = require('gulp-inline-style'),
    livereload = require('gulp-livereload');

gulp.task('watch', ['sass'], function() {
    livereload.listen();
    gulp.run('sass');
    gulp.watch('css/**/*.scss', ['sass']);
    gulp.watch('dev-index.html', ['htmlUpdate']);
});

gulp.task('htmlUpdate', function() {
    gulp.src('dev-index.html')
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

gulp.task('build', function() {
    return gulp.src('dev-index.html')
        .pipe(inline({
            disabledTypes: ['svg', 'img', 'js']
        }))
        .pipe(gulp.dest('./out'));
});

gulp.task('default', ['watch'], function() {
});