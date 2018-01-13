var gulp = require('gulp');
var csso = require('gulp-csso');
var csscomb = require('gulp-csscomb');

gulp.task('js', () => {
  return gulp.src(['src/js/app.js'])
    .pipe(gulp.dest('public/js/'));
});

gulp.task('css', () => {
  return gulp.src([
    'src/css/app.css',
    'src/css/theme.css'
  ]).pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('public/css/'));
});

gulp.task('webcomponents', () => {
  return gulp.src([
    'src/webcomponents/css-loading.js',
    'src/webcomponents/result-list.js',
    'src/webcomponents/result-item.js',
    'src/webcomponents/x-zangief.js',
    'src/webcomponents/img/*'
  ], {
    base: 'src/webcomponents'
  }).pipe(gulp.dest('public/webcomponents'));
});

gulp.task('build', () => {
  gulp.start('js', 'css', 'webcomponents');
});
