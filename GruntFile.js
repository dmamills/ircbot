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
        coffee: {
            compile: {
                files: {
                    'lib/IrcBot.js': 'src/IrcBot.coffee',
                    'lib/Command.js': 'src/Command.coffee'
                }
            }
        },
        watch: {
            files:['tests/*.js','src/*.coffee'],
            tasks:['mochaTest','coffee']
        }
    });
    
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default',['mochaTest','coffee','watch']);
};