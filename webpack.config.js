const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const path = require('path');

let entries = slsw.lib.entries;
entries.server = './src/server.js';

module.exports = {
	entry: entries,
	target: 'node',
	externals: [nodeExternals(), 'redash_restyle_dashboard.js', 'redash_restyle_query.js'],
	mode: slsw.lib.webpack.isLocal ? "development" : "production",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
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