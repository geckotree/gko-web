'use strict';
module.exports = {
	options: {
		base: './',
		css: [ '<%= assetsBuildFolder %>/css/style.css' ],
		height: 900,
		width: 1200
	},
	index: {
		src: 'index.html',
		dest: 'index.html'
	}
};
