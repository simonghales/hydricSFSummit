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
    inject = require('gulp-inject'),
    urlAdjuster = require('gulp-css-url-adjuster'),
    compressor = require('gulp-compressor'),
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

gulp.task('moveFiles', function() {
    gulp.src(['images/**/*'], {base: "./"})
        .pipe(gulp.dest('../build'));
});

gulp.task('html', function() {

    //return gulp.src('/**/*.*')
    //    // and inject them into the HTML
    //    .pipe(inject('dev-index.html', {
    //        addRootSlash: false,  // ensures proper relative paths
    //        ignorePath: '../' // ensures proper relative paths
    //    }))
    //    .pipe(gulp.dest('build'));


    return gulp.src('dev-index.html')
        .pipe(inline({
            //css: urlAdjuster({ this works but isnt needed now
            //   replace: ['../', '']
            //}),
            //disabledTypes: ['svg', 'img', 'js']
        }))
        //.pipe(inject('dev-index.html', {
        //    addRootSlash: false,  // ensures proper relative paths
        //    ignorePath: '../' // ensures proper relative paths
        //}))
        .pipe(compressor({
            'remove-intertag-spaces': true,
            'simple-bool-attr': true,
            'compress-js': true,
            'compress-css': true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('../build'));
});

gulp.task('build', function() {
    gulp.run('html');
    //gulp.run('moveFiles');
});

gulp.task('default', ['watch'], function() {
});