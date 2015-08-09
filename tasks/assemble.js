'use strict';
module.exports = {
	styleguide: {
		options: {
			flatten: true,
			data: '<%= styleguideFolder %>/**/*.{json,yml}',
			layoutdir: '<%= styleguideFolder %>/src/layouts',
			partials: [ '<%= styleguideFolder %>/src/components/**/*.hbs' ],
			layout: 'default.hbs',
		},
		src: '<%= styleguideFolder %>/src/pages/*.hbs',
		dest: '<%= styleguideBuildFolder %>/'
	},
	site: {
		options: {
			flatten: true,
			data: '<%= styleguideFolder %>/**/*.{json,yml}',
			layoutdir: '<%= styleguideFolder %>/src/layouts',
			partials: [ '<%= styleguideFolder %>/src/components/**/*.hbs' ],
			layout: 'site.hbs',
		},
		src: '<%= styleguideFolder %>/src/pages/*.hbs',
		dest: '.'
	}
};
