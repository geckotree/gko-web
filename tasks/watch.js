'use strict';
module.exports = {
	css: {
		files: [
			'<%= assetsFolder %>/sass/**/**/*.scss'
		],
		tasks: [
			'sass',
			'autoprefixer',
			'stripmq',
			'pixrem'
		]
	},
	js: {
		files: [
			'<%= assetsFolder %>/js/**/*.js'
		],
		tasks: [
			'jshint',
			'concat'
		]
	},
	html: {
		files: [
			'*.html',
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
		tasks: [ 'assemble' ]
	},
	todo: {
		files: [
			'<%= assetsFolder %>/js/**/*.js',
			'<%= assetsFolder %>/sass/**/*.scss'
		],
		tasks: [ 'todo' ]
	}
};
