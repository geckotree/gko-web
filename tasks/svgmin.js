'use strict';
module.exports = {
	options: {
		plugins: [ {
			removeViewBox: false
		}, {
			removeUselessStrokeAndFill: true
		}, {
			removeEmptyAttrs: true
		} ]
	},
	//@todo this doesnt seem to be working?
	svgImages: {
		files: [ {
			expand: true,
			cwd: '<%= assetsBuildFolder %>/img/**/**',
			src: '*.svg',
			dest: '<%= assetsBuildFolder %>/img',
			ext: '.svg'
		} ]
	}
};
