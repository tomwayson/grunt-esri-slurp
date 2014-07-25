/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';

var version = '3.10';

module.exports = function(grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },
    clean: {
      tests: ['tmp', 'src']
    },
    esri_slurp: {
      options: {
        version: version,
        beautify: true
      },
      travis: {
        options: {
          beautify: false,
          version: version
        }
      }
    },
    nodeunit: {
      tests: ['test/*_test.js']
    },
    bump: {
      options: {
        pushTo: 'origin',
        commit: true
      }
    },
    esri_slurp_modules: {
      options: {
        version: version
      }
    }
  });

  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    console.log(key);
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'jshint', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'esri_slurp']);

  grunt.registerTask('generate_list', ['esri_slurp_modules']);

  grunt.registerTask('travis', ['jshint', 'esri_slurp:travis', 'nodeunit']);
};