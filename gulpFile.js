var gulp = require("gulp");
var gutil = require("gulp-util");
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var gulpExpress = require('gulp-express');
//var babel = require( 'gulp-babel' );
var uglify = require( 'gulp-uglify' );
var clean = require( 'gulp-clean' );
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodemon = require('gulp-nodemon');
var webpackConfig = require('./webpack.config');
var webpackBuildConfig = require( './webpack.config.build' );
var livereloadPort = 35728;

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
        }));
    });
});
gulp.task("webpack-build", function(callback) {
    // run webpack
    webpack(webpackBuildConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack-build", err);
        gutil.log("[webpack-build]", stats.toString({
        }));
    });
});

gulp.task( 'clean-build', function() {
    return gulp.src( 'build', {read: true} )
      .pipe( clean() );
});

//gulp.task( 'babel-server', function() {
//    return gulp.src( ['bin/www','routes/*.js', 'lib/**/*.js', 'config.js', 'app.js'],{ "base" : "." })
//        .pipe( babel({ optional: ['runtime'] }) )
//        .pipe( gulp.dest( 'build' ) );
//        //.pipe( gulpExpress.run(['build/bin/www.js']) );
//} );

gulp.task('css', function() {
    return gulp.src('public/stylesheets/**/*.css', {'base': '.'})
        .pipe(livereload());
});


gulp.task('js', function() {
    return gulp.src('public/javascripts/**/*.js', {'base': '.'})
        .pipe(livereload());
});
gulp.task('ejs', function() {
    return gulp.src('views/*.ejs', {'base': '.'})
      .pipe(livereload());
      //.pipe( gulp.dest( 'build' ) );
});

gulp.task('server', function () {
    try{
        livereload.listen( livereloadPort );
        //gulpExpress.run(['build/bin/www']);
    }
    catch(e){
        console.log(e);
    }
});

gulp.task( 'watch',[ 'js', 'css' ], function() {
    gulpExpress.run(['bin/www']);

    gulp.watch(['views/*.ejs'],function(event) {
        gulp.run( 'ejs' );
        gulpExpress.notify( event );
    } );
    gulp.watch(['public/stylesheets/**/*.css'], function(event){
        gulp.run('css');
        gulpExpress.notify(event);
    });

    gulp.watch(['public/javascripts/**/*.js'], function(event){
        gulp.run('js');
        gulpExpress.notify(event);
    });
    //gulp.watch(['public/javascripts/**/*.js'], ['js']);
    gulp.watch(['public/images/**/*'], gulpExpress.notify);
    gulp.watch(['app.js','config.js', 'bin/**/*.js','bin/www', 'routes/**/*.js'],  function(e) {
        //gulp.run( 'babel-server' );
        gulpExpress.run(['bin/www']);
        gulpExpress.notify(e);
    } );
});

gulp.task( 'build', ['webpack-build', 'ejs'] );
gulp.task( 'default', ['server', 'watch'] );