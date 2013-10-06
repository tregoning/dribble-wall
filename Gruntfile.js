"use strict";

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			js: {
				options:{
					separator: ';' //better safe than sorry
				},
				src: ['js/libs/jquery/jquery.min.js', 'js/app.js'],
				dest: 'js/dist/app.js'
			},
			css: {
				src: ['css/style.css'],
				dest: 'css/dist/style.css'
			}
		},

		uglify: {
			options: {},
			dist: {
				src: 'js/dist/app.js',
				dest: 'js/dist/app.min.js'
			}
		},

		cssmin: {
			//DO NOT RUN BY ITSELF AS IT DUPLICATES, RUN CLEAN 1ST
			minify: {
				options:{
					keepSpecialComments: 0,
					removeEmpty: true
				},
				expand: true,
				cwd: 'css/dist',
				src: ['*.css'],
				dest: 'css/dist',
				ext: '.min.css'
			}
		},

		clean: ["css/dist", "js/dist", "css/*.css"],

		compass: {
			options:{
				sassDir: 'css/sass',
				cssDir: 'css',
				imagesDir: 'img',
				relativeAssets: true,
				force: true,
				require:['animation'] //will not need this in after Compass 0.13 is released
			},
			dev: {
				options: {
					environment: 'development',
					outputStyle: 'expanded',
					noLineComments: false,
					trace: true,
					debugInfo: true,
					//httpImagesPath: '/img',
					//httpGeneratedImagesPath: '/images'
				}
			},
			prod: {
				options: {
					environment: 'production',
					outputStyle: 'compressed',
					noLineComments: true,
					//httpImagesPath: 'https://s.yimg.com/uy/build/images',
					//httpGeneratedImagesPath: 'https://s.yimg.com/uy/build/images'
				}
			},
			clean: {
				options:{
					clean: true
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			html: {
				files: ['index_dev.html']
			},
			js: {
				files: ['js/*.js'],
				tasks: ['jshint']
			},
			sass: {
				files: ['css/sass/*.scss'],
				tasks: ['compass:dev'],
				options: {
					livereload: false, //need this to not kick a full page reload for css changes
				}
			},
			css: {
				files: ['css/*.css']
			}
		},

		jshint: {
			all: [
				'js/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		}

	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Tasks
	grunt.registerTask('reset', ['compass:clean', 'clean']);
	grunt.registerTask('prod', ['jshint', 'reset', 'compass:prod','concat', 'uglify', 'cssmin']);
	grunt.registerTask('dev', ['jshint', 'reset', 'compass:dev']);
	grunt.registerTask('default', ['watch']);

};
