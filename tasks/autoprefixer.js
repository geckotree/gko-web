'use strict';
module.exports = {
	options: {
		browsers: [ 'last 2 versions', 'ie 9' ],
		sourcemap: true
	},
	prefix: {
		expand: true,
		flatten: true,
		src: '<%= assetsBuildFolder %>/css/style.css',
		dest: '<%= assetsBuildFolder %>/css'
	}
};
