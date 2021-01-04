const postcssPresetEnv = require('postcss-preset-env')
const px2rem = require('postcss-px2rem')

module.exports = {
	plugins:[
		px2rem({
			remUnit:100
		}),
		postcssPresetEnv()
	]
}