const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint-new');
const webpackConfig = require('./webpack.config.js');

//Gulp can be used as a pipeline builder for various files

const sassTask = (done) => {
    //loads contents, converts to css, then places converted file in ./hosted
    gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./hosted'));
    done();
};

const jsTask = (done) => {
    webpack(webpackConfig)
        .pipe(gulp.dest('./hosted'));
    done();
}

const lintTask = (done) => {
    //** - tells code to read inside each folder in server folder as well
    gulp.src('./server/**/*.js')
        .pipe(eslint({ fix: true }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    done();
}

const watch = (done) => {
    //gulp.watch('./scss', sassTask);
    gulp.watch(['./client/**/*.js', './client/**/*.jsx'], jsTask);

    nodemon({
        script: './server/app.js',
        watch: ['./server'],
        tasks: ['lintTask'],
        done: done,
    });
}

module.exports = {
    build: gulp.parallel(/*sassTask,*/ jsTask, lintTask),
    watch,
    sassTask,
    jsTask,
    lintTask
}