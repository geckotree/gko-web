'use strict';
module.exports = {
	all: {
		files: {
			'<%= assetsBuildFolder %>/js/main.js': '<%= assetsBuildFolder %>/js/main.js'
		}
	},
	inline: {
		files: {
			'<%= assetsBuildFolder %>/js/libs/loadFont.js': '<%= assetsFolder %>/js/libs/loadFont.js',
			'<%= assetsBuildFolder %>/js/libs/googleAnalytics.js': '<%= assetsFolder %>/js/libs/googleAnalytics.js'
		}
	}
};
