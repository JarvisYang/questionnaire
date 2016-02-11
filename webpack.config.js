/**
 * Created by jarvis on 9/23/15.
 */
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var baseDir = './assets/javascripts/';
module.exports = {
  watch: true,
  'optimize-minimize': true,
  entry: {
    index: baseDir + 'index/index',
    login: baseDir + 'login/index',
    admin: baseDir + 'admin/index',
    'admin.movie': baseDir + 'admin/movieOption',
    mBase: baseDir + 'commons/m-base'
  },
  output: {
    path: './public',
    publicPath: '/public/',
    filename: 'javascripts/[name].js',
	  chunkFileName: 'javascripts/[id].js'
  },
  module: {
    loaders: [
      {
        test: /zepto(\.min)?\.js$/,
        loader: "exports?Zepto;"
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('',  "css-loader!less-loader")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('',  "css-loader")
      },
      {
        test: /\.(png|jpe?g|ico|eot|svg|ttf|woff2?)$/,
        loader: "file?name=images/[name].[ext]"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
	        presets: ['es2015']
	        //plugins: ['transform-runtime']
	        //optional: ['babel-runtime']
        }
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: "commons",// (the commons chunk name)
      filename: "javascripts/commons.js",// (the filename of the commons chunk)
      minChunks: 2,// (Modules must be shared between 3 entries)
      chunks: [// (Only use these entries)
        'index',
        'login'
      ]
    }),
    new CommonsChunkPlugin({
      name: "admin.commons",// (the commons chunk name)
      filename: "javascripts/admin.commons.js",// (the filename of the commons chunk)
      minChunks: 2,// (Modules must be shared between 3 entries)
      chunks: [// (Only use these entries)
        'admin',
        'admin.movie'
      ]
    }),
    new CommonsChunkPlugin({
      name: "mBase",// (the commons chunk name)
      filename: "javascripts/mBase.js",// (the filename of the commons chunk)
      minChunks: 1,// (Modules must be shared between 3 entries)
      chunks: [// (Only use these entries)
        'mBase'
      ]
    }),
    new ExtractTextPlugin( "stylesheets/[name].css" ,  {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      "$": path.resolve(
        __dirname,
        "node_modules/zepto/zepto.min"
      ),
      "window.Zepto": path.resolve(
        __dirname,
        "node_modules/zepto/zepto.min"
      )
    })
  ]
};
