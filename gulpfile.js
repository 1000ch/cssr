var gulp = require('gulp');

var concat  = require('gulp-concat');
var stylus  = require('gulp-stylus');
var csso    = require('gulp-csso');
var csscomb = require('gulp-csscomb');

var JS_LIB_FILES = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/cheet.js/cheet.js'
];
var CSS_LIB_FILES   = ['bower_components/normalize.css/normalize.css'];
var CSS_APP_FILES   = ['src/stylus/app.styl'];
var CSS_THEME_FILES = ['src/stylus/theme.styl'];

gulp.task('js:lib', function () {
  return gulp.src(JS_LIB_FILES)
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('js:app', function () {
  return gulp.src(['src/js/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('css:lib', function () {
  return gulp.src(CSS_LIB_FILES)
    .pipe(concat('lib.min.css'))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('public/css/'));
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
    'bower_components/x-zangief/*'
  ], {
    base: 'bower_components'
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
  gulp.start('js:lib', 'js:app');
});

gulp.task('css', function () {
  gulp.start('css:lib', 'css:app', 'css:theme');
});

gulp.task('build', function () {
  gulp.start('js', 'css', 'webcomponents');
});
