module.exports = function(grunt) {
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      dist: './dist',
      public: './public',
      client: './app'
    },

    jshint: {
      options: {
        jshintrc: true
      },
      all: {
        src: [
          'modules/**/*.js'
        ]
      }
    },

    jscs: {
      src: [
        '<%= jshint.all.src %>'
      ],
      options: {
        config: '.jscsrc'
      }
    },

    connect: {
      server: {
        options: {
          port: 5000,
          hostname: 'localhost',
          base: '<%= dirs.dist %>',
          keepalive: true,
          debug: process.env.NODE_ENV === 'development'
        }
      }
    },

    browserify: {
      client: {
        files: [{
          src: '<%= dirs.client %>/app.js',
          dest: '<%= dirs.public %>/js/app.min.js'
        }],
        options: {
          browserifyOptions: {
            // must enable debug mode to gernerate source map
            // minifyify can externalize the map itself
            debug: process.env.NODE_ENV === 'development'
          }
        }
      }
    },

    metalsmith: {
      'dist': {
        options: {
          metadata: require('./config'),
          plugins: {
            'metalsmith-drafts': {},
            'metalsmith-filemetadata': [{
              pattern: 'posts/*',
              metadata: {
                isPost: true,
                layout: 'post.mustache'
              }
            }],
            'metalsmith-collections': {
              recentPosts: {
                pattern: 'posts/*.md',
                limit: 10
              }
            },
            'metalsmith-markdown': {
              gfm: true,
              smartypants: true,
              tables: true
            },
            'metalsmith-permalinks': {
              'pattern': ':date/:title',
              'relative': false,
              'date': 'YYYY',
            },
            'metalsmith-static': {
              'src': '<%= dirs.public %>',
              'dest': './'
            },
            'metalsmith-in-place': {
              'engine': 'mustache'
            },
            'metalsmith-layouts': {
              'engine': 'mustache',
              'directory': './layouts',
              'partials': {
                footer: './_footer',
                header: './_header'
              }
            },
          }
        },
        'src': './content',
        'dest': '<%= dirs.dist %>'
      }
    },

    stylus: {
      options: {
        // directories to scan for @import directives when parsing
        paths: [
          'stylus'
        ]
      },
      dist: {
        options: {
          compress: (process.env.NODE_ENV !== 'development'),
          linenos: (process.env.NODE_ENV === 'development')
        },
        files: [{
          expand: true,
          cwd: './stylus',
          src: [
            'main.styl'
          ],
          dest: '<%= dirs.public %>/css/',
          ext: '.css'
        }]
      }
    },

    'gh-pages': {
      src: ['**/*'],
      options: {
        base: '<%= dirs.dist %>',
        branch: 'gh-pages'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      all: {
        files: [
          '<%= stylus.dist.files[0].cwd %>/**/*',
          '<%= dirs.client %>/**/*.js',
          './config.js',
          './layouts/**/*',
          './content/**/*',
          './public/**/*',
          '!./public/**/*.css'
        ],
        tasks: ['build']
      }
    },

    concurrent: {
      dev: {
        tasks: ['watch', 'connect'],
        options: {
          logConcurrentOutput: true
        }
      },
      compile: {
        tasks: ['stylus', 'jshint', 'browserify']
      }
    },

    env : {
      dev : {
        NODE_ENV : 'development'
      },
      dist : {
        NODE_ENV : 'production'
      }
    },

    surge: {
      'sensical.co': {
        options: {
          project: '<%= dirs.dist %>',
          domain: 'sensical.co'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  require('matchdep').filterAll(['grunt-*']).forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', [
    'env:dev',
    'build',
    'concurrent:dev'
  ]);

  // build task
  grunt.registerTask('build', [
    'concurrent:compile',
    'metalsmith'
  ]);

  // publish to gh-pages
  grunt.registerTask('deploy', 'build and deploy for production', function () {
    grunt.task.run(['env:dist', 'build', 'surge']);
  });
};
