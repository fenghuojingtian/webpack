const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')

const devConfig = (debug) => ({
	entry:{
		base:['core-js/stable','regenerator-runtime/runtime'],
		main:[path.resolve(__dirname,'./src/index.js')]
	},
	output:{
		filename:'js/[name]_[hash:6].js',
		path:path.resolve(__dirname,'./dist')
	},
	mode:'development',
	module:{
		rules:[
			{
				test:/\.(png|jpe?g|gif)$/,
				include:path.resolve(__dirname,'./src'),
				use:{
					loader:'url-loader',
					options:{
						name:'[name]_[hash].[ext]',
						outputPath:'images/',
						limit:10000
					}
				}
			},
			{
				test:/\.jsx?$/,
				include:path.resolve(__dirname,'./src'),
				use:{
					loader:'babel-loader'
				}
			},
			{
				test:/\.{css|scss}$/,
				include:path.resolve(__dirname,'./src'),
				use:[
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test:/\.(eot|tff|woff|woff2|svg)$/,
				include:path.resolve(__dirname,'./src'),
				use:'file-loader'
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			title:'My App',
			filename:'index.html',
			templete:'./src/index.html'
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns:[
				path.resolve(__dirname,'./dist'),
				path.resolve(__dirname,'./build')
			]
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HardSourceWebpackPlugin(),
		new vConsolePlugin({
			enable:true,
			filter:['base']
		})
	],
	devServer:{
		contentBase:'./dist',
		open:true,
		port:8081,
		proxy:{
			'/api':{
				target:'http://localhost:9092',
				changeOrigin:true
			}
		},
		hot:true,
		hotOnly:true,
	},
	resolve:{
		modules:[path.resolve(__dirname,'./node_modules')],
		alias:{
			react:path.resolve(
				__dirname,'./node_modules/react/umd/react.production.min.js'
			),
			'react-dom':path.resolve(
				__dirname,'./node_modules/react-dom/umd/react-dom.production.min.js'
			)
		},
		extensions:['.js','.json','.jsx','.ts']
	},
	watchOptions:{
		ignored:/node_modules/,
	},
	devtool:'cheap-module-eval-source-map'

})


module.exports = (env) => {
	let debug = null
	if (env && env.debug) debug = env.debug
		return devConfig(debug)
}