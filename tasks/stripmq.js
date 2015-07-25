'use strict';
module.exports = {
	options: {
		width: '62.5em',
		type: 'screen'
	},
	ie: {
		files: {
			'<%= assetsBuildFolder %>/css/ie.css': [ '<%= assetsBuildFolder %>/css/ie.css' ]
		}
	}
};
