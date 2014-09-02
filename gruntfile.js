module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      jslib: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/fastclick/lib/fastclick.js',
          'bower_components/mustache/mustache.js'
        ],
        dest: 'public/js/lib.js'
      },
      jsapp: {
        src: ['public/js/index.js'],
        dest: 'public/js/app.js'
      },
      csslib: {
        src: ['bower_components/normalize.css/normalize.css'],
        dest: 'public/css/lib.css'
      },
      cssapp: {
        src: ['public/css/index.css'],
        dest: 'public/css/app.css'
      },
      csstheme: {
        src: ['public/css/theme.css'],
        dest: 'public/css/theme.css'
      }
    },
    uglify: {
      jslib: {
        files: {
          'public/js/lib.min.js': ['public/js/lib.js']
        }
      },
      jsapp: {
        files: {
          'public/js/app.min.js': ['public/js/app.js']
        }
      }
    },
    stylus: {
      cssapp: {
        files: {
          'public/css/index.css': 'public/css/index.styl'
        }
      },
      csstheme: {
        files: {
          'public/css/theme.css': 'public/css/theme.styl'
        }
      }
    },
    csscomb: {
      csslib: {
        files: {
          'public/css/lib.css': 'public/css/lib.css'
        }
      },
      cssapp: {
        files: {
          'public/css/app.css': 'public/css/app.css'
        }
      },
      csstheme: {
        files: {
          'public/css/theme.css': 'public/css/theme.css'
        }
      }
    },
    csso: {
      csslib: {
        files: {
          'public/css/lib.min.css': 'public/css/lib.css'
        }
      },
      cssapp: {
        files: {
          'public/css/app.min.css': 'public/css/app.css'
        }
      },
      csstheme: {
        files: {
          'public/css/theme.min.css': 'public/css/theme.css'
        }
      }
    },
    watch: {
      stylus: {
        files: ['public/css/*.styl'],
        tasks: ['build:css:app'],
        options: {
          livereload: true
        }
      },
      jsapp: {
        files: ['public/js/index.js'],
        tasks: ['build:js:app']
      }
    }
  });

  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build:css:lib', ['concat:csslib', 'csscomb:csslib', 'csso:csslib']);
  grunt.registerTask('build:css:app', ['stylus', 'concat:cssapp', 'csscomb:cssapp', 'csso:cssapp']);
  grunt.registerTask('build:css', ['build:css:lib', 'build:css:app']);
  grunt.registerTask('build:js:lib', ['concat:jslib', 'uglify:jslib']);
  grunt.registerTask('build:js:app', ['concat:jsapp', 'uglify:jsapp']);
  grunt.registerTask('build:js', ['build:js:lib', 'build:js:app']);
  grunt.registerTask('build', ['build:js', 'build:css']);
};