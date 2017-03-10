var gulp = require('gulp');
var concat = require('gulp-concat');
var file = require('gulp-file');
var insert = require('gulp-insert');
var replace = require('gulp-replace');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var collapse = require('bundle-collapser/plugin');
var watch = require('gulp-watch');
var removeFiles = require('gulp-remove-files');
var deleteEmpty = require('delete-empty');
var runSequence = require('run-sequence');
var w3cjs = require('gulp-w3cjs');
var package = require('./package.json');

var outDir = './www/';
var dev = './dev/';

var header = "/*!\n" +
	" * Chart.js\n" +
	" * http://chartjs.org/\n" +
	" * Version: {{ version }}\n" +
	" *\n" +
	" * Copyright 2017 Nick Downie\n" +
	" * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md\n" +
	" */\n";


//Build chart.js
gulp.task('chart', function() {

	var bundled = browserify('./node_modules/chart.js/src/chart.js', {
			standalone: 'Chart'
		})
		.plugin(collapse)
		.bundle()
		.pipe(source('Chart.bundle.js'))
		.pipe(insert.prepend(header))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(gulp.dest(outDir + 'js/'))
		.pipe(streamify(uglify()))
		.pipe(insert.prepend(header))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(streamify(concat('Chart.bundle.min.js')))
		.pipe(gulp.dest(outDir + 'js/'));

	var nonBundled = browserify('./node_modules/chart.js/src/chart.js', {
			standalone: 'Chart'
		})
		.ignore('moment')
		.plugin(collapse)
		.bundle()
		.pipe(source('Chart.js'))
		.pipe(insert.prepend(header))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(gulp.dest(outDir + 'js/'))
		.pipe(streamify(uglify()))
		.pipe(insert.prepend(header))
		.pipe(streamify(replace('{{ version }}', package.version)))
		.pipe(streamify(concat('Chart.min.js')))
		.pipe(gulp.dest(outDir + 'js/'));

	return merge(bundled, nonBundled);

});


//Build html
gulp.task('html', function() {

	return gulp.src(dev + '/**/*.html')
		.pipe(w3cjs())
        .pipe(gulp.dest(outDir));

});

//Build css
gulp.task('css', function() {

	return gulp.src(dev + 'style/**/*.css')
		.pipe(gulp.dest(outDir + 'style/'));


});

//Build javascript
gulp.task('js', function() {
	return gulp.src(dev + 'js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest(outDir + 'js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(outDir + 'js'));
});






//Clear html files
gulp.task('clear-html', function() {
	return gulp.src(outDir + '/**/*.html')
		.pipe(removeFiles());
});

//Clear css files
gulp.task('clear-css', function() {
	return gulp.src(outDir + '/style/**/*.css')
		.pipe(removeFiles());
});

//Clear empty folders
gulp.task('delete-empty-directories', function() {
	return deleteEmpty.sync('www/');
});





gulp.task('watch', function() {
// Watch .js files
	watch(dev+'js/**/*.js', function() { gulp.start('js');});
// Watch .css files
	watch(dev + 'style/**/*.css', function() {runSequence('clear-css','delete-empty-directories','css');});
// Watch .html files
	watch(dev + '**/*.html', function() {runSequence('clear-html','delete-empty-directories','html');});

});

gulp.task('clear', function(callback) {
  runSequence(['clear-html', 'clear-css'],'delete-empty-directories',callback);
});

gulp.task('setup', function(callback) {
  runSequence('clear',
              ['html', 'css', 'js', 'chart'],callback);
});

gulp.task('build', function(callback) {
  runSequence('clear',
              ['html', 'css', 'js'],callback);
});
