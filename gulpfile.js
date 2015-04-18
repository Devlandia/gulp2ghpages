/*globals require, console*/
var gulp        = require('gulp'),
    sass 	= require('gulp-sass'),
    jade   	= require('gulp-jade'),
    order       = require('gulp-order'),
    gutil       = require('gulp-util'),
    gulpif      = require('gulp-if'),
    coffee      = require('gulp-coffee'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    ghPages     = require('gulp-gh-pages'),
    minify_css	= require('gulp-minify-css'),
    browserSync = require('browser-sync');

paths = {
  sass:             './src/css/**/*.scss',
  html:             './src/*.html',
  jade:             './src/*.jade',
  images:           './src/img/*',
  coffee:           './src/js/**/*.coffee',
  jquery:           './node_modules/jquery/dist/jquery.min.js',
  bootstrap_js:     './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
  bootstrap_css:    './node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
  bootstrap_font:   './node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
  fontawesome_css:  './node_modules/font-awesome/scss/font-awesome.scss',
  fontawesome_font: './node_modules/font-awesome/fonts/*'
}

gulp.task('default', ['compile', 'server', 'watch']);
gulp.task('compile', ['css', 'scripts', 'jade', 'copy']);

gulp.task('server', function () {
  browserSync({
    files: ['./build/js/*.js', './build/css/*.css', './build/img/*', './build/*.html'],
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.html,    ['html']);
  gulp.watch(paths.jade,    ['jade']);
  gulp.watch(paths.sass,    ['css']);
  gulp.watch(paths.coffee,  ['scripts']);
  gulp.watch(paths.images,  ['images']);
});

gulp.task('css', function(){
	gulp.src([
      paths.sass,
      paths.bootstrap_css,
      paths.fontawesome_css
    ])
    .pipe(gulpif(/\.scss$/, sass({ style: 'compressed' })))
    .pipe(gulpif(/\.css$/, minify_css()))
    .pipe(order([
      '_bootstrap.scss',
      'font-awesome.scss',
      'src/css/**/*.scss'
    ]))
		.pipe(concat('./main.css'))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function(){
	gulp.src([
      paths.coffee,
      paths.jquery,
      paths.bootstrap_js
    ])
		.pipe(gulpif(/\.coffee$/, coffee({bare: true}).on('error', gutil.log)))
		.pipe(order([
      'jquery.min.js',
      'bootstrap.min.js',
      'js/**/*.coffee'
    ]))
    .pipe(uglify())
		.pipe(concat('./main.js'))
		.pipe(gulp.dest('./build/js'));

  // Modernizr
  gulp.src('./src/js/vendor/modernizr.min.js')
    .pipe(gulp.dest('./build/js'));
});

gulp.task('jade', function () {
 gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./build'))
});

gulp.task('copy', ['html', 'images', 'fonts', 'root']);

gulp.task('html', function () {
  gulp.src(paths.html)
    .pipe(gulp.dest('./build'));
});

gulp.task('images', function () {
  gulp.src(paths.images)
    .pipe(gulp.dest('./build/img'));
});

gulp.task('fonts', function () {
  // Font-Awesome
  gulp.src(paths.fontawesome_font)
    .pipe(gulp.dest('./build/fonts'));
  // Bootstrap
  gulp.src(paths.bootstrap_font)
    .pipe(gulp.dest('./build/fonts/bootstrap'));
});

gulp.task('root', function () {
  gulp.src(['./src/*.xml', './src/*.png', './src/*.ico', './src/*.txt'])
    .pipe(gulp.dest('./build'));
});

// Deploy
gulp.task('deploy', ['compile'], function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
