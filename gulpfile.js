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
var package = require('./package.json');

var outDir = './www/';
var dev = './dev/'

var header = "/*!\n" +
  " * Chart.js\n" +
  " * http://chartjs.org/\n" +
  " * Version: {{ version }}\n" +
  " *\n" +
  " * Copyright 2017 Nick Downie\n" +
  " * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md\n" +
  " */\n";

gulp.task('bower', task);
gulp.task('chart', chart);
gulp.task('html',html);
gulp.task('css',css);
gulp.task('js',js)

gulp.task('build',['html','css','js','chart']);
gulp.task('default', ['html','css','js']);

/**
 * Generates the bower.json manifest file which will be pushed along release tags.
 * Specs: https://github.com/bower/spec/blob/master/json.md
 */
function task() {
  var json = JSON.stringify({
      name: package.name,
      description: package.description,
      homepage: package.homepage,
      license: package.license,
      version: package.version,
      main: outDir + "Chart.js",
      ignore: [
        '.github',
        '.codeclimate.yml',
        '.gitignore',
        '.npmignore',
        '.travis.yml',
        'scripts'
      ]
    }, null, 2);

  return file('bower.json', json, { src: true })
    .pipe(gulp.dest('./'));
}

function chart() {

  var bundled = browserify('./node_modules/chart.js/src/chart.js', { standalone: 'Chart' })
    .plugin(collapse)
    .bundle()
    .pipe(source('Chart.bundle.js'))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(gulp.dest(outDir+'js/'))
    .pipe(streamify(uglify()))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(streamify(concat('Chart.bundle.min.js')))
    .pipe(gulp.dest(outDir+'js/'));

  var nonBundled = browserify('./node_modules/chart.js/src/chart.js', { standalone: 'Chart' })
    .ignore('moment')
    .plugin(collapse)
    .bundle()
    .pipe(source('Chart.js'))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(gulp.dest(outDir+'js/'))
    .pipe(streamify(uglify()))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(streamify(concat('Chart.min.js')))
    .pipe(gulp.dest(outDir+'js/'));

  return merge(bundled, nonBundled);

}

function html() {
	return gulp.src(dev+"**.html")
      .pipe(gulp.dest(outDir));
}

function css() {
	return gulp.src(dev+"style/**.css")
      .pipe(gulp.dest(outDir+"style/"));
}


function js() {
  return gulp.src(dev+'js/**.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(outDir+'js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(outDir+'js'));
}
