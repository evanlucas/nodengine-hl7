/*
 * grunt-cafe-mocha
 * https://github.com/jdavis/grunt-cafe-mocha
 *
 * Copyright (c) 2013 Josh Davis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Clean up lib-cov/
        clean: {
            coverage: [
                'lib-cov/',
                'coverage.html',
                'coverageTwo.html',
            ]
        },

        // Configuration for coverages
        coverage: {
            cover: {
                files: { 'lib-cov/': 'lib/'},
            }
        },

        // Configuration for grunt-cafe-mocha task
        cafemocha: {
            // Setting 'coverage' option to true, using defaults
            coverageOne: {
                src: 'test/*.js',
                options: {
                    ui: 'bdd',
                    reporter: 'html-cov',
                    coverage: true,
                    require: [
                        'should',
                    ],
                },
            },

            // Setting 'coverage' option to an object, overriding defaults
            coverageTwo: {
                src: 'test/*.js',
                options: {
                    ui: 'bdd',
                    reporter: 'html-cov',
                    coverage: {
                        output: 'coverageTwo.html',
                        env: 'ENHANCED_COVERAGE',
                    },
                    require: [
                        'should',
                    ],
                },
            }
        },

    });

    // These plugins provide necessary tasks.
    grunt.loadTasks('../tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['clean', 'coverage', 'cafemocha']);

    // Credit to @Couto
    // Source: https://github.com/Couto/johnnie/blob/dev/Gruntfile.js#L100-L117
    grunt.registerMultiTask('coverage', 'Create code coverage', function () {
        var spawn = require('child_process').spawn,
            done = this.async(),
            coverage = spawn('jscoverage', [this.files[0].src, this.files[0].dest]),
            error;

        coverage.stdout.on('data', function (data) {
            console.log(data.toString());
        });

        coverage.stderr.on('data', function (data) {
            error = new Error(data.toString());
        });

        coverage.on('close', function (code) { done(error); });
    });
};
