const { volarPrettierPlugin } = require('@volar-plugins/prettier');

module.exports = {
	plugins: [
		volarPrettierPlugin({
			languages: ['html', 'css', 'scss', 'typescript', 'javascript'],
			html: {
				breakContentsFromTags: true,
			},
		}),
	],
};