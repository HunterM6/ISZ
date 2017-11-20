var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];


gulp.task('style', function () {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs());
});


gulp.task('serve', function () {
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT': 3000
		},
		watch: jsFiles
	};

	return nodemon(options)
		.on('restart', function (ev) {
			console.log('restarting...');
		});
});