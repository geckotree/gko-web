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
					'pixrem'
				]
			},
			js: {
				files: [
					'<%= pkg.assetsFolder %>/js/**/*.js'
				],
				tasks: [
					'webpack',
					'jshint',
					'concat'
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
					'<%= pkg.buildFolder %>/css/print.css': '<%= pkg.assetsFolder %>/sass/print.scss',
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
		critical: {
			options: {
				base: './',
				css: [ '<%= pkg.buildFolder %>/css/style.css' ],
				height: 900,
				width: 1200
			},
			blog: {
				src: '_site/blog/index.html',
				dest: '_site/blog/index.html'
			},
			improvingFrontEndPerformance: {
				src: '_site/blog/improving-front-end-performance/index.html',
				dest: '_site/blog/improving-front-end-performance/index.html'
			},
			anIntroductionToCreatingYourOwnBoilerplate: {
				src: '_site/blog/an-introduction-to-creating-your-own-boilerplate/index.html',
				dest: '_site/blog/an-introduction-to-creating-your-own-boilerplate/index.html'
			}
		},
		cssmin: {
			main: {
				expand: true,
				cwd: '<%= pkg.buildFolder %>/css/',
				src: 'style.css',
				dest: '<%= pkg.buildFolder %>/css/',
				ext: '.css'
			},
			ie: {
				expand: true,
				cwd: '<%= pkg.buildFolder %>/css/',
				src: 'ie.css',
				dest: '<%= pkg.buildFolder %>/css/',
				ext: '.css'
			}
		},


		/*
		 * JS
		 */
		webpack: {
			config: {
				context: '<%= pkg.assetsFolder %>/js',
				entry: './index.js',
				output: {
					path: '<%= pkg.buildFolder %>/js',
					filename: 'script.js'
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
					'<%= pkg.assetsFolder %>/js/lib/modernizr.js'
				],
				dest: '<%= pkg.buildFolder %>/js/head.js'
			}
		},
		uglify: {
			head: {
				files: {
					'<%= pkg.buildFolder %>/js/head.js': '<%= pkg.buildFolder %>/js/head.js',
					'<%= pkg.buildFolder %>/js/script.js': '<%= pkg.buildFolder %>/js/script.js'
				}
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					removeOptionalTags: true,
					minifyURLs: true
				},
				files: {
					'_site/index.html': '_site/index.html',
					'_site/blog/index.html': '_site/blog/index.html',
					'_site/blog/2/index.html': '_site/2/blog/index.html',
					'_site/blog/improving-front-end-performance/index.html': '_site/blog/improving-front-end-performance/index.html',
					'_site/blog/an-introduction-to-creating-your-own-boilerplate/index.html': '_site/blog/an-introduction-to-creating-your-own-boilerplate/index.html'
				}
			}
		},

		/*
		 * IMAGES
		 */
		responsive_images: {
			options: {
				sizes: [{
					width: 320,
				}, {
					width: 640,
				}, {
					width: 1024
				}]
			},
			bitmap: {
				files: [{
					expand: true,
					src: [ '**.{jpg,gif,png}' ],
					cwd: '<%= pkg.assetsFolder %>/img/bitmap/',
					custom_dest: '<%= pkg.buildFolder %>/img/bitmap/{%= width %}/'
				}]
			}
		},
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
					'<%= pkg.buildFolder %>/img/bitmap/**/*.{png,gif,jpg}',
					'<%= pkg.buildFolder %>/img/svg/*.png'
				]
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
			}
		},
		inline: {
			dist: {
				src: '_includes/head-src.html',
				dest: '_includes/head.html'
			}
		}
	});


	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-css-mqpacker' );
	grunt.loadNpmTasks( 'grunt-stripmq' );
	grunt.loadNpmTasks( 'grunt-pixrem' );
	grunt.loadNpmTasks( 'grunt-critical' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

	grunt.loadNpmTasks( 'grunt-webpack' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-modernizr' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );

	grunt.loadNpmTasks( 'grunt-responsive-images' );
	grunt.loadNpmTasks( 'grunt-svgmin' );
	grunt.loadNpmTasks( 'grunt-svg2png' );
	grunt.loadNpmTasks( 'grunt-imageoptim' );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-humans-txt' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-inline' );


	grunt.registerTask( 'dev', [
		'css:dev',
		'js:dev',
		'images:dev',
		'watch'
	]);

	grunt.registerTask( 'build', [
		'css:build',
		'js:build',
		'htmlmin',
		'images:build',
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
		'webpack',
		'jshint',
		'concat',
		'inline'
	]);

	grunt.registerTask( 'css:build', [
		'css:dev',
		'cssmin',
		'critical'
	]);

	grunt.registerTask( 'js:build', [
		'js:dev',
		'uglify'
	]);

	grunt.registerTask( 'images:dev', [
		'responsive_images'
	]);

	grunt.registerTask( 'images:build', [
		'images:dev',
		'svgmin:svg',
		// 'svg2png',
		'copy:brand',
		'imageoptim'
	]);
};
