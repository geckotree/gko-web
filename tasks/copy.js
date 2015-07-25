'use strict';
module.exports = {
	brandIcons: {
		files: [
			{
				expand: true,
				cwd: '<%= assetsFolder %>/img/brand-icons/',
				src: [ '*' ],
				dest: '<%= assetsBuildFolder %>/img/brand-icons'
			}
		]
	},
	bitmapImages: {
		files: [
			{
				expand: true,
				cwd: '<%= assetsFolder %>/img/bitmap/',
				src: [ '*' ],
				dest: '<%= assetsBuildFolder %>/img/bitmap'
			}
		]
	}
};
