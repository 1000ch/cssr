module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      jslib: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/fastclick/lib/fastclick.js',
          'bower_components/mustache/mustache.js',
          'bower_components/cheet.js/cheet.js'
        ],
        dest: 'public/js/lib.js'
      },
      csslib: {
        src: ['bower_components/normalize.css/normalize.css'],
        dest: 'public/css/lib.css'
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
          'public/js/app.min.js': ['src/js/app.js']
        }
      }
    },
    stylus: {
      cssapp: {
        files: {
          'public/css/app.css': 'src/stylus/app.styl'
        }
      },
      csstheme: {
        files: {
          'public/css/theme.css': 'src/stylus/theme.styl'
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
        files: ['src/css/*.styl'],
        tasks: ['build:css:app'],
        options: {
          livereload: true
        }
      },
      jsapp: {
        files: ['src/js/app.js'],
        tasks: ['build:js:app']
      },
      webcomponents: {
        files: ['src/webcomponents/*.html'],
        tasks: ['build:webcomponents']
      }
    },
    copy: {
      webcomponents: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [
            '*.html',
            'x-zangief/**',
            'polymer/**',
            'twitter-button/**',
            'facebook-button/**',
            'gplus-elements/**'
          ],
          dest: 'public/webcomponents'
        }, {
          expand: true,
          cwd: 'src/webcomponents',
          src: ['*.html'],
          dest: 'public/webcomponents'
        }]
      }
    },
    vulcanize: {
      webcomponents: {
        files: {
          'public/webcomponents/vulcanized.html': 'public/webcomponents/webcomponents.html'
        }
      }
    },
    htmlmin: {
      webcomponents: {
        options: {
          minifyCSS: true,
          minifyJS: true
        },
        files: {
          'public/webcomponents/vulcanized.min.html': 'public/webcomponents/vulcanized.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('build:css:lib', ['concat:csslib', 'csscomb:csslib', 'csso:csslib']);
  grunt.registerTask('build:css:app', ['stylus:cssapp', 'csscomb:cssapp', 'csso:cssapp']);
  grunt.registerTask('build:css:theme', ['stylus:csstheme', 'csscomb:csstheme', 'csso:csstheme']);
  grunt.registerTask('build:css', ['build:css:lib', 'build:css:app', 'build:css:theme']);

  grunt.registerTask('build:js:lib', ['concat:jslib', 'uglify:jslib']);
  grunt.registerTask('build:js:app', ['uglify:jsapp']);
  grunt.registerTask('build:js', ['build:js:lib', 'build:js:app']);

  grunt.registerTask('build:webcomponents', ['copy:webcomponents', 'vulcanize:webcomponents', 'htmlmin:webcomponents']);

  grunt.registerTask('build', ['build:webcomponents', 'build:js', 'build:css']);
};