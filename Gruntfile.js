module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8080,
          hostname: '*',
        }
      }
    },
    watch: {
      options: {
        livereload: 35729,
      },
      files: ['src/sass/**/*', '**/*.html', 'src/js/**/*'],
      tasks: ['sass', 'requirejs', 'uglify']
    },
    sass: {
      dist: {
        options: {
          loadPath: [require('bourbon-neat').includePaths]
        },
        files: {
          'dist/style.css': 'src/sass/style.scss'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/main.js',
        dest: 'dist/main.min.js'
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          mainConfigFile: 'src/js/config.js',
          name: '../../node_modules/almond/almond', 
          include: [ 'main.js' ],
          out: 'dist/main.js'
        }
      }
    }
  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['connect','watch']);
  grunt.registerTask('build', ['sass', 'requirejs', 'uglify']);

};