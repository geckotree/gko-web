'use strict';
module.exports = {
	main: {
		'devFile': '<%= assetsFolder %>/bower_components/modernizr/modernizr.js',
		'outputFile': '<%= assetsFolder %>/js/libs/modernizr.js',
		'extra': {
			'printshiv': false,
			'shiv': false,
			'load': false,
			'mq': false,
			'cssclasses': true
		},
		extensibility: {
			'addtest': false,
			'prefixed': false,
			'teststyles': false,
			'testprops': false,
			'testallprops': false,
			'hasevents': false,
			'prefixes': false,
			'domprefixes': false,
			'cssclassprefix': ''
		},
		'uglify': false,
		'tests': [],
		'parseFiles': true,
		'files': {
			'src': [ '<%= assetsFolder %>/js/**/*.js', '<%= assetsFolder %>/sass/**/*.scss' ]
		},
		'matchCommunityTests': false,
		'customTests': []
	}
};
