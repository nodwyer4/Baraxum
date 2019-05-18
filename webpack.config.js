const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const ClosurePlugin = require("closure-webpack-plugin");


module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve("build"),
		filename: "bundled.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					"babel-loader"
				]
			},
			{
				test: /\.html$/,
				use: "html-loader",
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: true,
							localIdentName: "[name]__[local]__[hash:base64:5]"
						}
					},
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {},
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};