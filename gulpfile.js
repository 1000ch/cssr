var gulp = require('gulp');

var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var stylus  = require('gulp-stylus');
var csso    = require('gulp-csso');
var csscomb = require('gulp-csscomb');

var JS_LIB_FILES = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/cheet.js/cheet.js'
];
var JS_APP_FILES    = ['src/js/app.js'];
var CSS_LIB_FILES   = ['bower_components/normalize.css/normalize.css'];
var CSS_APP_FILES   = ['src/stylus/app.styl'];
var CSS_THEME_FILES = ['src/stylus/theme.styl'];
var WC_LIB_FILES    = [
  'bower_components/x-zangief/**/*',
  'bower_components/polymer/**/*',
  'bower_components/twitter-button/**/*',
  'bower_components/facebook-button/**/*',
  'bower_components/gplus-elements/**/*'
];
var WC_APP_FILES    = [
  'src/webcomponents/css-loading.html',
  'src/webcomponents/result-list.html',
  'src/webcomponents/result-list-item.html'
];

gulp.task('js:lib', function () {
  return gulp.src(JS_LIB_FILES)
    .pipe(concat('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('js:app', function () {
  return gulp.src(JS_APP_FILES)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
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

gulp.task('webcomponents:lib', function () {
  gulp.src(WC_LIB_FILES, {base: 'bower_components'})
    .pipe(gulp.dest('public/webcomponents/'));
});

gulp.task('webcomponents:app', function () {
  return gulp.src(WC_APP_FILES)
    .pipe(gulp.dest('public/webcomponents'));
});

gulp.task('js', function () {
  gulp.start('js:lib', 'js:app');
});

gulp.task('css', function () {
  gulp.start('css:lib', 'css:app', 'css:theme');
});

gulp.task('webcomponents', function () {
  gulp.start('webcomponents:lib', 'webcomponents:app');
});

gulp.task('build', function () {
  gulp.start('js', 'css', 'webcomponents');
});
