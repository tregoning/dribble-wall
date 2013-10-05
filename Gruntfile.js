/*global module:false*/
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
		clean: ["css/dist", "js/dist"]
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Default task.
	grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin']);

};
