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
					'<%= pkg.buildFolder %>/css/style.css': '<%= pkg.assetsFolder %>/sass/style.scss',
					'<%= pkg.buildFolder %>/css/ie.css': '<%= pkg.assetsFolder %>/sass/ie.scss'
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
				src: '<%= pkg.buildFolder %>/css/style.css',
				dest: '<%= pkg.buildFolder %>/css'
			}
		},
		css_mqpacker: {
			options: {
				map: false,
			},
			main: {
				expand: true,
				cwd: '<%= pkg.buildFolder %>/css/',
				src: 'style.css',
				dest: '<%= pkg.buildFolder %>/css/'
			}
		},
		stripmq: {
			options: {
				width: '62.5em',
				type: 'screen'
			},
			all: {
				files: {
					'<%= pkg.buildFolder %>/css/ie.css': [ '<%= pkg.buildFolder %>/css/ie.css' ]
				}
			}
		},
		pixrem: {
			options: {
				rootvalue: '62.5%',
				replace: true
			},
			dist: {
				src: '<%= pkg.buildFolder %>/css/ie.css',
				dest: '<%= pkg.buildFolder %>/css/ie.css'
			}
		},
		cssmin: {
			main: {
				expand: true,
				cwd: '<%= pkg.buildFolder %>/css/',
				src: 'style.css',
				dest: '<%= pkg.buildFolder %>/css/',
				ext: '.min.css'
			},
			ie: {
				expand: true,
				cwd: '<%= pkg.buildFolder %>/css/',
				src: 'ie.css',
				dest: '<%= pkg.buildFolder %>/css/',
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
					dir: '<%= pkg.buildFolder %>/js',
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
		concat: {
			head: {
				src: [
					'<%= pkg.assetsFolder %>/_components/lazysizes/lazysizes.js',
					'<%= pkg.assetsFolder %>/js/lib/modernizr.js'
					// '<%= pkg.buildFolder %>/img/icons/grunticon.js',
					// '<%= pkg.assetsFolder %>/js/lib/grunticon.js'
				],
				dest: '<%= pkg.buildFolder %>/js/head.js'
			}
		},
		uglify: {
			head: {
				files: {
					'<%= pkg.buildFolder %>/js/head.js': '<%= pkg.buildFolder %>/js/head.js',
					'<%= pkg.buildFolder %>/js/require.js': '<%= pkg.assetsFolder %>/_components/requirejs/require.js'
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
					{ removeUselessStrokeAndFill: false },
					{ removeEmptyAttrs: false }
				]
			},
			svg: {
				files: [{
					expand: true,
					cwd: '<%= pkg.assetsFolder %>/img/svg',
					src: '*.svg',
					dest: '<%= pkg.buildFolder %>/img/svg',
					ext: '.svg'
				}]
			},
			icons: {
				files: [{
					expand: true,
					cwd: '<%= pkg.assetsFolder %>/img/icons',
					src: '*.svg',
					dest: '<%= pkg.buildFolder %>/img/icons/svg',
					ext: '.svg'
				}]
			}
		},
		svg2png: {
			all: {
				files: [{
					cwd: '<%= pkg.buildFolder %>/img/svg',
					src: [ '*.svg' ],
					dest: '<%= pkg.buildFolder %>/img/png'
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
					'<%= pkg.buildFolder %>/img/brand-icons/*.{png,gif,jpg}',
					'<%= pkg.buildFolder %>/img/bitmap/*.{png,gif,jpg}',
					'<%= pkg.buildFolder %>/img/svg/*.png',
					'<%= pkg.buildFolder %>/img/icons/png/*.png'
				]
			}
		},
		grunticon: {
			icons: {
				files: [{
					expand: true,
					cwd: '<%= pkg.buildFolder %>/img/icons/svg',
					src: [ '*.svg' ],
					dest: '<%= pkg.buildFolder %>/img/icons'
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
						dest: '<%= pkg.buildFolder %>/img/brand-icons'
					}
				]
			},
			bitmap: {
				files: [
					{
						expand: true,
						cwd: '<%= pkg.assetsFolder %>/img/bitmap/',
						src: [ '*' ],
						dest: '<%= pkg.buildFolder %>/img/bitmap'
					}
				]
			}
		},
		inline: {
			dist: {
				src: '_includes/head-src.html',
				dest: '_includes/head.html'
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'<%= pkg.buildFolder %>/css/*.css',
						'<%= pkg.buildFolder %>/js/*.js',
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
	grunt.loadNpmTasks( 'grunt-inline' );
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
		'concat',
		'inline'
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
		// 'svg2png',
		'copy:brand',
		'copy:bitmap',
		'imageoptim'
	]);
};
