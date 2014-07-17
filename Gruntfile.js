
module.exports = function (grunt) {

  // use load-grunt-tasks to load grunt modules
  // this will load packages that include 'grunt' in their name 
  // from the package.json
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // setup paths
    appPaths: {
      app: 'site',
      dist: 'build/production'
    },
    
    // clean - deletes previous build artifacts from director
    clean: {
      dist: '<%= appPaths.dist %>'
    },

    useminPrepare: {
      html: '<%= appPaths.app %>/**/*.html',
      options: {
        dest: '<%= appPaths.dist %>'
      }
    },

    concurrent: {
      dist: [
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appPaths.app %>/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= appPaths.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appPaths.app %>/images',
          src: '**/*.svg',
          dest: '<%= appPaths.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= appPaths.app %>',
          src: ['**/*.html'],
          dest: '<%= appPaths.dist %>'
        }]
      }
    },

    concat: {

    },

    cssmin: {

    },

    uglify: {
      options: {
        preserveComments: 'some'
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= appPaths.dist %>/scripts/**/*.js',
            '<%= appPaths.dist %>/styles/**/*.css',
            '<%= appPaths.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'          ]
        }
      }
    },

    usemin: {
      html: ['<%= appPaths.dist %>/{,*/}*.html'],
      css: ['<%= appPaths.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= appPaths.dist %>']
      }
    },

    // copy files not handled in other tasks to dist folder
    copy: {
      dist: {
        expand: true,
        cwd: '<%= appPaths.app %>',
        dest: '<%= appPaths.dist %>',
        src: [
          'fonts/**/*',
        ]
      }
    },

  });

  grunt.registerTask('default', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'copy:dist'
  ]);


};
