'use strict';
module.exports = {
	css: {
		files: [
			'<%= assetsFolder %>/sass/**/**/*.scss'
		],
		tasks: [
			'newer:sass',
			'newer:autoprefixer',
			'newer:stripmq',
			'newer:pixrem'
		]
	},
	js: {
		files: [
			'<%= assetsFolder %>/js/**/*.js'
		],
		tasks: [
			'newer:jshint',
			'newer:concat'
		]
	},
	html: {
		files: [
			'src/*.html.src',
		],
		tasks: [
			'replace'
		]
	},
	styleguide: {
		files: [
			'<%= styleguideFolder %>/src/**/*.hbs',
			'<%= styleguideFolder %>/**/*.json'
		],
		tasks: [ 'assemble:styleguide' ]
	},
	todo: {
		files: [
			'<%= assetsFolder %>/js/**/*.js',
			'<%= assetsFolder %>/sass/**/*.scss'
		],
		tasks: [ 'todo' ]
	}
};
