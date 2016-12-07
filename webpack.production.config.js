var path = require("path");
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');

module.exports = {
	 externals: [nodeExternals()],
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, "build"),
         filename: 'react-smooth-scroll.min.js',
		 library: 'Reactsmoothscroll',
		 libraryTarget: 'umd',
		 umdNamedDefine: true,

     },
     plugins: [
        new webpack.optimize.UglifyJsPlugin({
		    mangle : true
		})
    ],
     module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel',
	      query: {
	        presets: ['latest'],
            plugins: ['transform-decorators-legacy']
	      }
	    }
	  ]
	}
 };