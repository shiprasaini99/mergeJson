const gulp = require('gulp');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const del = require('del');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// Clean the dist folder
gulp.task('clean', () => {
  return del(['dist/**/*']);
});

// Run Webpack to build the project and combine JSON
gulp.task('webpack', (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error('Webpack Error: ', err);
    }
    console.log(stats.toString());
    done();
  });
});

// Archive the dist folder into tar.gz
gulp.task('tar', () => {
  return gulp.src('dist/**/*')  // This will include combined.json and bundle.js
    .pipe(tar('archive.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('../'));
});

// Default task: clean -> webpack -> tar
gulp.task('default', gulp.series('clean', 'webpack', 'tar'));
