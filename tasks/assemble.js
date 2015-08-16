'use strict';
module.exports = {
	styleguide: {
		options: {
			flatten: true,
			data: '<%= styleguideFolder %>/**/*.{json,yml}',
			layoutdir: '<%= styleguideFolder %>/layouts',
			partials: [ '<%= styleguideFolder %>/components/**/*.hbs' ],
			layout: 'styleguide.hbs',
		},
		src: '<%= styleguideFolder %>/styleguide/*.hbs',
		dest: '<%= styleguideBuildFolder %>/'
	},
	site: {
		options: {
			flatten: true,
			data: '<%= styleguideFolder %>/**/*.{json,yml}',
			layoutdir: '<%= styleguideFolder %>/layouts',
			partials: [ '<%= styleguideFolder %>/components/**/*.hbs' ],
			layout: 'site.hbs',
		},
		src: '<%= styleguideFolder %>/site/*.hbs',
		dest: '.'
	}
};
