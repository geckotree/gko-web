'use strict';
module.exports = {
	// site: {
	// 	options: {
	// 		data: '<%= siteFolder %>/data/**/*.{json,yml}',
	// 		flatten: true,
	// 		layoutdir: '<%= siteFolder %>/layouts',
	// 		layout: 'site.hbs',
	// 		partials: [ '<%= siteFolder %>/components/**/*.hbs' ]
	// 	},
	// 	src: '<%= siteFolder %>/pages/*.hbs',
	// 	dest: '<%= siteFolder %>/'
	// },

	email: {
		options: {
			data: '<%= emailFolder %>/data/**/*.{json,yml}',
			flatten: true,
			layoutdir: '<%= emailFolder %>/layouts',
			layout: 'email.hbs',
			partials: [ '<%= emailFolder %>/components/**/*.hbs' ]
		},
		src: '<%= emailFolder %>/pages/*.hbs',
		dest: '<%= emailFolder %>/'
	},
	styleguide: {
		options: {
			data: '<%= styleguideFolder %>/data/**/*.{json,yml}',
			flatten: true,
			layoutdir: '<%= styleguideFolder %>/layouts',
			layout: 'styleguide.hbs',
			partials: [ '<%= styleguideFolder %>/components/**/*.hbs' ]
		},
		src: '<%= styleguideFolder %>/pages/*.hbs',
		dest: '<%= styleguideFolder %>/'
	}

};
