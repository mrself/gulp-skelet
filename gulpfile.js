require('require-dir')('./gulp/tasks', {recurse: true});

require('gulp').task('default', ['browserify', 'css:watch']);