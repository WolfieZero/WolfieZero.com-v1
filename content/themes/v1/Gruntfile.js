/*global module:false*/

module.exports = function (grunt) {

    "use strict";

    var jsFiles = grunt.file.readJSON('script/main.json'),
        lrPort  = 1337;

    // ========================================================================
    // Configure Task
    // ========================================================================

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // --------------------------------------------------------------------
        // Sass [grunt-contrib-sass]
        // --------------------------------------------------------------------

        sass: {
            //banner: '<%= grunt.template.today("yyyy-mm-dd") %>',
            dev: {
                sourcemap: true,
                style: 'expanded',
                precision: 2,
                debugInfo: true,
                files: [{
                    expand: true,
                    cwd: 'style/sass/',
                    src: '*.{sass,scss}',
                    dest: 'style/css',
                    ext: '.css'
                }]
            },
            build: {
                sourcemap: true,
                style: 'compressed',
                precision: 2,
                debugInfo: false,
                files: [{
                    expand: true,
                    cwd: 'style/sass/',
                    src: '*.{sass,scss}',
                    dest: 'style/css',
                    ext: '.css'
                }]
            }
        },



        // --------------------------------------------------------------------
        // Uglify [grunt-contrib-uglify]
        // --------------------------------------------------------------------

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dev: {
                options: {
                    beautify: true,
                    preserveComments: 'all',
                    mangle: false
                },
                files: jsFiles
            },
            dist: {
                options: {
                    beautify: false,
                    preserveComments: 'some',
                    mangle: true,
                    compress: true,
                    assetCacheBuster: true,
                    report: 'gzip'
                },
                files: jsFiles
            }
        },


        // --------------------------------------------------------------------
        // Minimize images [grunt-contrib-imagemin]
        // --------------------------------------------------------------------

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },


        // --------------------------------------------------------------------
        // Run server [grunt-contrib-watch]
        // --------------------------------------------------------------------
        connect: {
            server: {
                options: {
                    port: lrPort,
                    keepalive: true
                }
            }
        },


        // --------------------------------------------------------------------
        // Watch files [grunt-contrib-connect]
        // --------------------------------------------------------------------
        watch: {
            sass: {
                files: ['style/sass/**/*.{scss,sass}'],
                tasks: 'sass:dev'
            },
            uglify: {
                files: ['script/dev/**/*.js', 'script/**/*.json'],
                tasks: 'uglify:dev'
            },
            livereload: {
                options: {
                    livereload: true,
                    port: lrPort
                },
                files: [
                    'style/css/*.css'
                ]
            }
        },


        // --------------------------------------------------------------------
        // Concurrent tasks [grunt-concurrent]
        // --------------------------------------------------------------------
        concurrent: {
            target: {
                tasks: ['watch', 'connect'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }


    });


    // ========================================================================
    // Load NPM Task
    // ========================================================================

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');


    // ========================================================================
    // Register Tasks
    // ========================================================================

    grunt.registerTask('build', [
        'sass:build',
        'imagemin'
    ]);
    grunt.registerTask('server', 'concurrent:target');


};