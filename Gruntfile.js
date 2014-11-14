/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 */
'use strict'

var ngrok = require('ngrok');

module.exports = function (grunt) {

    // Load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pagespeed: {
            options: {
                nokey: true,
                locale: "en_GB",
                threshold: 40
            },
            local: {
                options: {
                    strategy: "desktop"
                }
            },
            mobile: {
                options: {
                    strategy: "mobile"
                }
            }
        },
        concat: {
            css: {
                src: [
                    'views/css/*'
                ],
                dest: 'views/build/combined.css'
            },
            js: {
                src: [
          'js/*'
        ],
                dest: 'build/combined.js'
            },
            js_views: {
                src: [
                    'views/js/*'
                ],
                dest: 'views/build/combined.js'
            }
        },
        cssmin: {
            css: {
                files: {
                    'build/style.min.css': ['css/style.css'],
                    'build/print.min.css': ['css/print.css'],
                    'views/build/combined.min.css': ['views/build/combined.css']
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'build/combined.min.js': ['build/combined.js'],
                    'views/build/combined.min.js': ['views/build/combined.js']
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/'
                },
                    {
                        expand: true,
                        cwd: 'views/images/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'views/build/'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    // Register customer task for ngrok
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function () {
        var done = this.async();
        var port = 9292;

        ngrok.connect(port, function (err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });

    // Register default tasks
    grunt.registerTask('default', ['newer:concat', 'newer:uglify:js', 'newer:cssmin', 'newer:imagemin', 'psi-ngrok']);
}