'use strict';
module.exports = {
	options: {
		file: 'todo.md',
		marks: [{
			name: 'todo',
			pattern: /@(todo)/,
			color: 'blue'
		}],
		title: 'TODO list:',
		usePackage: true
	},
	src: [
		'<%= assetsFolder %>/js/**/*.js',
		'<%= assetsFolder %>/sass/**/**/*.scss'
	]
};

