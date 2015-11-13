var gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	minifyCss = require('gulp-minify-css'),
	config = require('../config').css;

gulp.task('css', function() {
	return gulp.src(config.src)
		.pipe(sass(config.settings))
		.pipe(minifyCss())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest(config.dest));
});

gulp.task('css:watch', function() {
	watch(config.src, function() {
		gulp.start('css');
	})
})