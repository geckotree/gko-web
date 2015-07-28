'use strict';
module.exports = {
	options: {
		prefix: 'icon--'
	},
	icons: {
		files: {
			'<%= assetsBuildFolder %>/img/icons/icons.svg': [ '<%= assetsFolder %>/img/icons/*.svg' ]
		}
	}
};
