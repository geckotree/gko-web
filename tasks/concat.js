'use strict';
module.exports = {
	main: {
		src: [
			'<%= assetsFolder %>/js/libs/modernizr.js',
			'<%= assetsFolder %>/js/libs/Prism.js',
			'<%= assetsFolder %>/bower_components/fastclick/lib/fastclick.js',
			'<%= assetsFolder %>/bower_components/scrollMonitor/scrollMonitor.js',
			'<%= assetsFolder %>/js/utils/*.js',
			'<%= assetsFolder %>/js/components/**/*.js',
			'<%= assetsFolder %>/js/main.js'
		],
		dest: '<%= assetsBuildFolder %>/js/main.js'
	},
	head: {
		src: [
			// '<%= assetsFolder %>/js/lib/*.js'
			// add priority JS like picturefill/lazysizes
			// keep this file smaller so it parses and runs sooner than main
		],
		dest: '<%= assetsBuildFolder %>/js/head.js'
	}
};
