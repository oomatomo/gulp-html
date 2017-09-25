var gulp = require("gulp");
var ejs = require("gulp-ejs");
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();

var webserver = require('gulp-webserver');
var prettify  = require('gulp-prettify');
var htmlhint  = require("gulp-htmlhint");
var minify    = require('gulp-minify');
var rename    = require("gulp-rename");
var plumber = require('gulp-plumber')
var gnf = require('gulp-npm-files');

gulp.task('webserver', function() {
  gulp.src('dist/')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true,
      open: true
    }));
});

gulp.task('js', function () {
  gulp.src('src/**/js/*.js')
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
  gulp.src('src/**/*.html')
    .pipe(prettify({indent_size: 2}))
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest("dist/"));
});

gulp.task('css', function () {
  gulp.src(['src/**/css/*.css', 'src/**/css/**/**.css'])
   .pipe(gulp.dest('dist/'));
});

gulp.task('img', function() {
  gulp.src('src/**/images/*')
    .pipe(gulp.dest('dist/'));
  gulp.src('src/**/images/*/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('font', function() {
  gulp.src('src/**/fonts/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('lib', function() {
  gulp.src(gnf(), {base:'./'})
    .pipe(gulp.dest('dist/'));
});

//ファイルの監視
gulp.task('watch',function(){
  gulp.watch(['src/**/*.html'],['html']);
  gulp.watch(['src/js/*.js', 'src/**/js/*.js'],['js']);
  gulp.watch(['src/css/*', 'src/**/css/*', 'src/**/css/**/*'],['css']);
  gulp.watch(['src/images/*', 'src/**/images/*'],['img']);
  gulp.watch(['src/fonts/*', 'src/**/fonts/*'],['font']);
});

gulp.task('build',['js', 'html', 'css', 'img', 'font', 'lib']);
gulp.task('default',['js', 'html', 'css', 'img', 'font', 'lib', 'webserver', 'watch' ]);
