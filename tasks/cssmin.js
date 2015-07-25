'use strict';
module.exports = {
	style: {
		expand: true,
		cwd: '<%= assetsBuildFolder %>/css/',
		src: 'style.css',
		dest: '<%= assetsBuildFolder %>/css/',
		ext: '.css'
	},
	ie: {
		expand: true,
		cwd: '<%= assetsBuildFolder %>/css/',
		src: 'ie.css',
		dest: '<%= assetsBuildFolder %>/css/',
		ext: '.css'
	}
};
