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
			'src/*.html',
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
