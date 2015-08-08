'use strict';
module.exports = {
	main: {
		options: {
			patterns: [ {
				match: 'loadFont',
				replacement: '<%= grunt.file.read( "assets/build/js/libs/loadFont.js" )%>',
				expression: false
			}, {
				match: 'icons',
				replacement: '<%= grunt.file.read( "assets/build/img/icons/icons.svg" )%>',
				expression: false
			}, {
				match: 'googleAnalytics',
				replacement: '<%= grunt.file.read( "assets/build/js/libs/googleAnalytics.js" )%>',
				expression: false
			} ]
		},
		files: [ {
			expand: true,
			flatten: true,
			src: [
				'src/index.html',
				'src/blog.html',
				'src/article.html',
				'src/post.html',
				'src/adspy.html',
				'src/search.html'
			],
			dest: ''
		} ]
	}
};
