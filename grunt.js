/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'app/js/**/*.js', 'test/unit/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
          boss: true,
          browser: true,
//          camelcase: true,
          curly: true,
          eqeqeq: true,
          eqnull: true,
          forin: true,
          immed: true,
//          indent: true,
          latedef: true,
          newcap: true,
          noarg: true,
          plusplus: true,
          sub: true,
//          strict: true,
          undef: true,
          unused: true
      },
      globals: {
          s5b: true,
          Timesheik: true,
          moment: true,
          it: true,
          expect: true,
          describe: true,
          spyOn: true,
          beforeEach: true,
          afterEach: true,
          angular: true,
          module: true,
          inject: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit');

};
