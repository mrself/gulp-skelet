var src = './src/';
var build = './build/';
var bourbon = require('node-bourbon');

module.exports = {
	browserify: {
		bundleConfigs: [{
			entries: src + 'js/app.js',
			dest: './js',
			outputName: 'app.min.js'
		}]
	},
	css: {
		settings: {
			style: 'compressed',
			errLogToConsole: true,
			includePaths: [
				bourbon.includePaths,
				'bower_components/bootstrap-sass/assets/stylesheets'
			]
		},
		dest: './css/',
		src: src + 'scss/**/*.scss'
	}
}