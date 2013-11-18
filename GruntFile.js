module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		mochaTest: {
			tests: {
				options: {
					reporter:'nyan'
				},
				src:['tests/test.js']
			}
		},
		jshint: {
			all: {
				src: [ '*.js' ]
			}
		},
		watch: {
			files:['tests/*.js','*.js'],
			tasks:['mochaTest','jshint']
		}
	});
	
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default',['mochaTest','jshint','watch']);
};