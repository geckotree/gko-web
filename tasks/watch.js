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
	site: {
		files: [
			'<%= siteFolder %>/**/**/*.hbs',
			'<%= siteFolder %>/**/**/*.json'
		],
		tasks: [
			'assemble:site',
			'replace'
		]
	},
	email: {
		files: [
			'<%= emailFolder %>/**/**/*.hbs',
			'<%= emailFolder %>/**/**/*.json',
			'<%= emailFolder %>/assets/sass/**/**/*.scss'
		],
		tasks: [
			'assemble:email',
			'sass:email'
		]
	},
	todo: {
		files: [
			'<%= assetsFolder %>/js/**/*.js',
			'<%= assetsFolder %>/sass/**/*.scss'
		],
		tasks: [ 'todo' ]
	}
};
