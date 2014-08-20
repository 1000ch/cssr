module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      jslib: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/fastclick/lib/fastclick.js'
        ],
        dest: 'public/js/lib.js'
      },
      jsapp: {
        src: ['public/js/index.js'],
        dest: 'public/js/app.js'
      },
      csslib: {
        src: ['node_modules/normalize.css/normalize.css'],
        dest: 'public/css/lib.css'
      },
      cssapp: {
        src: ['public/css/index.css'],
        dest: 'public/css/app.css'
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
      }
    },
    watch: {
      stylus: {
        files: ['public/css/*.styl'],
        tasks: ['build:css'],
        options: {
          livereload: true
        }
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
  grunt.registerTask('build:css', ['stylus', 'concat:csslib', 'concat:cssapp', 'csscomb', 'csso']);
  grunt.registerTask('build:js', ['concat:jslib', 'concat:jsapp', 'uglify']);
  grunt.registerTask('build', ['build:js', 'build:css']);
};