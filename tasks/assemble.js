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
		src: '<%= styleguideFolder %>/src/pages/index.hbs',
		dest: '<%= styleguideBuildFolder %>/'
	}
};
