var gulp = require('gulp');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');

gulp.task('js:app', function () {
  return gulp.src(['src/js/app.js'])
    .pipe(gulp.dest('public/js/'));
});

gulp.task('css:app', function () {
  return gulp.src([
    'src/css/app.css',
    'src/css/theme.css'
  ]).pipe(csscomb())
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
  gulp.start('css:app');
});

gulp.task('build', function () {
  gulp.start('js', 'css', 'webcomponents');
});
