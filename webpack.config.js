var path = require("path");

 module.exports = {
     entry: ['./example/index.js','./example/index.html','./example/style.css'],
     devServer: { 
     	inline: true,
        contentBase: path.resolve(__dirname, "example")
     },
     output: {
         path: path.resolve(__dirname, "example"),
         filename: 'bundle.js',
     },
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
	    },
	    {
	      test: /\.(html|css)/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'file?emitFile=false'
	    }
	  ]
	}
 };