var browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	config = require('../config').browserify,
	bundleLogger = require('../utils/bundleLogger');
	notify = require('gulp-notify');

gulp.task('browserify', function() {
	function browserifyThis (bundleConfig) {
		var bundler = browserify({
			cache: {}, packageCache: {}, fullPaths: false,
			entries: bundleConfig.entries
		});
		var watcher = watchify(bundler);
		function bundle () {
			bundleLogger.start(bundleConfig.outputName);
			return watcher
				.bundle()
				.on('error', handleErrors)
				.pipe(source(bundleConfig.outputName))
				.pipe(gulp.dest(bundleConfig.dest))
				.on('end', function() {
					bundleLogger.end(bundleConfig.outputName)
				});
		}
		watcher.on('update', bundle);
		bundleLogger.watch(bundleConfig.outputName);
		return bundle();
	}
	config.bundleConfigs.forEach(browserifyThis);
});

function handleErrors (error) {
	var args = Array.prototype.slice.call(arguments);
	// gutil.log(error.stack);
	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}