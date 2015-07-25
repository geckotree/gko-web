'use strict';
module.exports = {
	options: {
		map: false,
	},
	style: {
		expand: true,
		cwd: '<%= assetsBuildFolder %>/css/',
		src: 'style.css',
		dest: '<%= assetsBuildFolder %>/css/'
	}
};
