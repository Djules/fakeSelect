module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                // preserveComments: 'some',
                // compress: false,
                // mangle: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.author %> */\n'
            },
            fakeSelect: {
                files: {
                    'js/min/jquery.fakeSelect.min.js': 'js/jquery.fakeSelect.js'
                }
            }
        }
    });
    
    grunt.registerTask('default', ['uglify']);
};
