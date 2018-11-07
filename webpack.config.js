const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	externals: [nodeExternals()],
	mode: slsw.lib.webpack.isLocal ? "development" : "production",
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	}
};