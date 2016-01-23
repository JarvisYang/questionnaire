/**
 * Created by jarvis on 9/23/15.
 */
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var webpackBaseConfig = require('./webpack.config');
webpackBaseConfig.watch = false;
webpackBaseConfig.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		  mangle: {
			  except: ['$','window.Zepto']
		  },
		  compress: {
			  warnings: false
		  }
	  }));
module.exports = webpackBaseConfig;
