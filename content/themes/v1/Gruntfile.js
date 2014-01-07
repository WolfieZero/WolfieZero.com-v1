/*global module:false*/

module.exports = function (grunt) {

    "use strict";

    var jsFiles = grunt.file.readJSON('script/main.json');

    // ========================================================================
    // Configure Task
    // ========================================================================

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        // --------------------------------------------------------------------
        // Sass [grunt-contrib-sass]
        // --------------------------------------------------------------------

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    precision: 7,
                    debugInfo: true
                },
                files: {
                    'style/css-dev/main.css': 'style/sass/main.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed',
                    precision: 7,
                    noCache: true,
                    banner:
                        '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'style/css-build/<%= grunt.template.today("yyyymmdd") %>.css': 'style/sass/main.scss'
                }
            },
            wp: {
                options: {
                    noCache: true,
                    banner:
                        '/*\n' +
                        'Theme Name: <%= pkg.name %>\n' +
                        'Version: <%= pkg.version %>\n' +
                        'Author: <%= pkg.author %>\n' +
                        'Author URI: http://wolfiezero.com\n' +
                        'License: GPLv2 or later\n' +
                        'License URI: http://www.gnu.org/licenses/gpl-2.0.html\n' +
                        '*/'
                },
                files: {
                    'style.css': 'style.css'
                }
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


    // ========================================================================
    // Register Tasks
    // ========================================================================

    grunt.registerTask('build', [
        'sass:build',
        'sass:wp',
        'imagemin'
    ]);


};