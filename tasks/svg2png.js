'use strict';
module.exports = {
	svgImages: {
		files: [{
			cwd: '<%= assetsBuildFolder %>/img/',
			src: [ '**/*.svg' ],
			dest: '<%= assetsBuildFolder %>/img/'
		}]
	}
};
