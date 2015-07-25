'use strict';
module.exports = {
	options: {
		jshintrc: '.jshintrc',
		ignores: [
			'<%= assetsFolder %>/js/libs/*.js'
		]
	},
	all: {
		files: {
			src: [
				'Gruntfile.js',
				'<%= assetsFolder %>/js/**/*.js'
			]
		}
	}
};

