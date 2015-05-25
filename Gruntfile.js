module.exports = function ( grunt ) {

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		/*
		 * WATCH
		 */
		watch: {
			css: {
				files: [
					'<%= pkg.assetsFolder %>/sass/**/**/*.scss'
				],
				tasks: [
					'sass:dist',
					'autoprefixer',
					'css_mqpacker',
					'stripmq',
					'pixrem',
					'cssmin'
				]
			},
			js: {
				files: [
					'<%= pkg.assetsFolder %>/js/**/*.js'
				],
				tasks: [
					'requirejs',
					'jshint',
					'concat',
					'uglify'
				]
			},
			icons: {
				files: [
					'<%= pkg.assetsFolder %>/img/icons/*.svg'
				],
				tasks: [
					'svgmin:icons',
					'grunticon'
				]
			}
		},


		/*
		 * CSS
		 */
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: true
				},
				files: {
					'<%= pkg.assetsFolder %>/_build/css/style.css': '<%= pkg.assetsFolder %>/sass/style.scss',
					'<%= pkg.assetsFolder %>/_build/css/ie.css': '<%= pkg.assetsFolder %>/sass/ie.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: [ 'last 3 version' ]
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: '<%= pkg.assetsFolder %>/_build/css/style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css'
			}
		},
		css_mqpacker: {
			options: {
				map: false,
			},
			main: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/'
			}
		},
		stripmq: {
			options: {
				width: '62.5em',
				type: 'screen'
			},
			all: {
				files: {
					'<%= pkg.assetsFolder %>/_build/css/ie.css': [ '<%= pkg.assetsFolder %>/_build/css/ie.css' ]
				}
			}
		},
		pixrem: {
			options: {
				rootvalue: '62.5%',
				replace: true
			},
			dist: {
				src: '<%= pkg.assetsFolder %>/_build/css/ie.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/ie.css'
			}
		},
		cssmin: {
			main: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'style.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/',
				ext: '.min.css'
			},
			ie: {
				expand: true,
				cwd: '<%= pkg.assetsFolder %>/_build/css/',
				src: 'ie.css',
				dest: '<%= pkg.assetsFolder %>/_build/css/',
				ext: '.min.css'
			}
		},


		/*
		 * JS
		 */
		requirejs: {
			compile: {
				options: {
					mainConfigFile: '<%= pkg.assetsFolder %>/js/main.js',
					baseUrl: '<%= pkg.assetsFolder %>/js',
					dir: '<%= pkg.assetsFolder %>/_build/js',
					preserveLicenseComments: false,
					removeCombined: true,
					optimize: 'uglify2'
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				ignores: [
					'<%= pkg.assetsFolder %>/js/lib/*.js'
				]
			},
			all: {
				files: {
					src: [
						'Gruntfile.js',
						'<%= pkg.assetsFolder %>/js/**/*.js'
					]
				}
			}
		},
		modernizr: {
			dist: {
				'devFile': '<%= pkg.assetsFolder %>/_components/modernizr/modernizr.js',
				'outputFile': '<%= pkg.assetsFolder %>/_build/js/lib/modernizr.js',
				'extra': {
					'shiv': true,
					'printshiv': false,
					'load': true,
					'mq': false,
					'cssclasses': true
				}
			}
		},
		concat: {
			head: {
				src: [
					'<%= pkg.assetsFolder %>/_components/lazysizes/lazysizes.js',
					'<%= pkg.assetsFolder %>/js/lib/modernizr.js',
					'<%= pkg.assetsFolder %>/_build/img/icons/grunticon.js',
					'<%= pkg.assetsFolder %>/js/lib/grunticon.js'
				],
				dest: '<%= pkg.assetsFolder %>/_build/js/head.js'
			}
		},
		uglify: {
			head: {
				files: {
					'<%= pkg.assetsFolder %>/_build/js/head.js': '<%= pkg.assetsFolder %>/_build/js/head.js',
					'<%= pkg.assetsFolder %>/_build/js/require.js': '<%= pkg.assetsFolder %>/_components/requirejs/require.js'
				}
			}
		},


		/*
		 * IMAGES
		 */
		svgmin: {
			options: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: true },
					{ removeEmptyAttrs: true }
				]
			},
			svg: {
				files: [{
					expand: true,
					cwd: '<%= pkg.assetsFolder %>/img/svg',
					src: '*.svg',
					dest: '<%= pkg.assetsFolder %>/_build/img/svg',
					ext: '.svg'
				}]
			},
			icons: {
				files: [{
					expand: true,
					cwd: '<%= pkg.assetsFolder %>/img/icons',
					src: '*.svg',
					dest: '<%= pkg.assetsFolder %>/_build/img/icons/svg',
					ext: '.svg'
				}]
			}
		},
		svg2png: {
			all: {
				files: [{
					cwd: '<%= pkg.assetsFolder %>/_build/img/svg',
					src: [ '*.svg' ],
					dest: '<%= pkg.assetsFolder %>/_build/img/png'
				}]
			}
		},
		imageoptim: {
			all: {
				options: {
					jpegMini: false,
					imageAlpha: false,
					quitAfter: false
				},
				src: [
					'<%= pkg.assetsFolder %>/_build/img/brand-icons/*.{png,gif,jpg}',
					'<%= pkg.assetsFolder %>/_build/img/bitmap/*.{png,gif,jpg}',
					'<%= pkg.assetsFolder %>/_build/img/svg/*.png',
					'<%= pkg.assetsFolder %>/_build/img/icons/png/*.png'
				]
			}
		},
		grunticon: {
			icons: {
				files: [{
					expand: true,
					cwd: '<%= pkg.assetsFolder %>/_build/img/icons/svg',
					src: [ '*.svg' ],
					dest: '<%= pkg.assetsFolder %>/_build/img/icons'
				}],
				options: {
					cssprefix: '.icon--',
					datasvgcss: 'icons-svg.css',
					datapngcss: 'icons-png.css',
					urlpngcss: 'icons-fallback.css',
					loadersnippet: 'grunticon.js',
					enhanceSVG: true,
					compressPNG: true
				}
			}
		},

		/*
		 * MISC
		 */
		humans_txt: {
			options: {
				commentStyle: 'u',
				content: {
					'team': [{
						'Web designer & developer': '<%= pkg.contributors[ 0 ].name %>',
						'Site': '<%= pkg.contributors[ 1 ].url %>',
						'Twitter': '@robcsimps',
						'Dribbble': 'https://dribbble.com/robsimpson',
						'Location': 'Oxfordshire, UK'
					},
					{
						'Web designer & developer': '<%= pkg.contributors[ 1 ].name %>',
						'Site': '<%= pkg.contributors[ 1 ].url %>',
						'Twitter': '@kevsimps',
						'Dribbble': 'https://dribbble.com/kevsimpson',
						'Location': 'Portsmouth, UK'
					}],
					'site': [{
						'Version': '<%= pkg.version %>',
						'Site Url': '<%= pkg.homepage %>',
						'Language': 'English',
						'Technology': 'Bower, Grunt, JavaScript, SASS'
					}]
				}
			},
			site: {
				dest: 'humans.txt'
			}
		},
		copy: {
			brand: {
				files: [
					{
						expand: true,
						cwd: '<%= pkg.assetsFolder %>/img/brand-icons/',
						src: [ '*' ],
						dest: '<%= pkg.assetsFolder %>/_build/img/brand-icons'
					}
				]
			},
			bitmap: {
				files: [
					{
						expand: true,
						cwd: '<%= pkg.assetsFolder %>/img/bitmap/',
						src: [ '*' ],
						dest: '<%= pkg.assetsFolder %>/_build/img/bitmap'
					}
				]
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'<%= pkg.assetsFolder %>/_build/css/*.css',
						'<%= pkg.assetsFolder %>/_build/js/*.js',
						'*.html'
					]
				},
				options: {
					watchTask: true
				}
			}
		}
	});


	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-css-mqpacker' );
	grunt.loadNpmTasks( 'grunt-stripmq' );
	grunt.loadNpmTasks( 'grunt-pixrem' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

	grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-modernizr' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.loadNpmTasks( 'grunt-svgmin' );
	grunt.loadNpmTasks( 'grunt-svg2png' );
	grunt.loadNpmTasks( 'grunt-imageoptim' );
	grunt.loadNpmTasks( 'grunt-grunticon' );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-humans-txt' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-browser-sync' );


	grunt.registerTask( 'dev', [
		'css:dev',
		'icons',
		'js:dev',
		'browserSync',
		'watch'
	]);

	grunt.registerTask( 'build', [
		'css:build',
		'icons',
		'js:build',
		'images',
		'humans_txt'
	]);


	grunt.registerTask( 'css:dev', [
		'sass',
		'autoprefixer',
		'css_mqpacker',
		'stripmq',
		'pixrem'
	]);

	grunt.registerTask( 'js:dev', [
		'requirejs',
		'jshint',
		'concat'
	]);

	grunt.registerTask( 'css:build', [
		'css:dev',
		'cssmin'
	]);

	grunt.registerTask( 'js:build', [
		'js:dev',
		'uglify'
	]);

	grunt.registerTask( 'icons', [
		'svgmin:icons',
		'grunticon'
	]);

	grunt.registerTask( 'images', [
		'svgmin:svg',
		'svg2png',
		'copy:brand',
		'copy:bitmap',
		'imageoptim'
	]);
};
