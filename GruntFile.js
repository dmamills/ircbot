module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        mochaTest: {
            BotTests: {
                options: {
                    reporter:'nyan'
                },
                src:['tests/bot_test.js','tests/messagetemplate_tests.js','tests/command_tests.js','tests/parser_tests.js']
            }
        },
        coffee: {
            compile: {
                files: {
                    'lib/IrcBot.js': 'src/IrcBot.coffee',
                    'lib/Command.js': 'src/Command.coffee',
                    'lib/Parser.js': 'src/Parser.coffee',
                    'lib/MessageTemplates.js':'src/MessageTemplates.coffee',
                    'lib/Commander.js': 'src/Commander.coffee',
                    'lib/Pigeon.js':'src/Pigeon.coffee'
                }
            }
        },
        watch: {
            files:['tests/*.js','src/*.coffee'],
            tasks:['coffee','mochaTest']
        }
    });
    
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default',['coffee','mochaTest','watch']);
};