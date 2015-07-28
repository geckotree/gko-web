'use strict';
module.exports = {
	images: {
		files: [ {
			flatten: false,
			expand: true,
			cwd: '<%= assetsFolder %>/img',
			src: '**/*',
			dest: '<%= assetsBuildFolder %>/img/'
		} ]
	}
};
