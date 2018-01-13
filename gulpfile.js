var gulp = require('gulp');

var concat  = require('gulp-concat');
var stylus  = require('gulp-stylus');
var csso    = require('gulp-csso');
var csscomb = require('gulp-csscomb');

var CSS_APP_FILES   = ['src/stylus/app.styl'];
var CSS_THEME_FILES = ['src/stylus/theme.styl'];

gulp.task('js:app', function () {
  return gulp.src(['src/js/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('css:app', function () {
  return gulp.src(CSS_APP_FILES)
    .pipe(stylus())
    .pipe(concat('app.min.css'))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('css:theme', function () {
  return gulp.src(CSS_THEME_FILES)
    .pipe(stylus())
    .pipe(concat('theme.min.css'))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('webcomponents:lib', () => {
  return gulp.src([
    'node_modules/x-zangief/*'
  ], {
    base: 'node_modules'
  }).pipe(gulp.dest('public/webcomponents'));
});

gulp.task('webcomponents:app', () => {
  return gulp.src([
    'src/webcomponents/css-loading.js',
    'src/webcomponents/result-list.js',
    'src/webcomponents/result-item.js'
  ]).pipe(gulp.dest('public/webcomponents'));
});

gulp.task('webcomponents', function () {
  gulp.start('webcomponents:lib', 'webcomponents:app');
});

gulp.task('js', function () {
  gulp.start('js:app');
});

gulp.task('css', function () {
  gulp.start('css:app', 'css:theme');
});

gulp.task('build', function () {
  gulp.start('js', 'css', 'webcomponents');
});
