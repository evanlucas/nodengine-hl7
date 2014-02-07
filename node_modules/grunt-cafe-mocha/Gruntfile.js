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
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Configuration to be run (and then tested).
        cafemocha: {
            unit: {
                src: 'test/*.js',
                options: {
                    ui: 'bdd',
                    require: [
                        'should',
                    ],
                },
            },
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['cafemocha:unit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
};
