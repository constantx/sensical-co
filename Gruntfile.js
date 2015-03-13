module.exports = function(grunt) {
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      dist: './dist',
      public: './public'
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
          port: 5001,
          hostname: 'localhost',
          base: '<%= dirs.dist %>',
          keepalive: true,
          debug: process.env.NODE_ENV === 'development'
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

    'watch': {
      all: {
        files: [
          '<%= stylus.dist.files[0].cwd %>/**/*',
          './config.js',
          './layouts/**/*',
          './content/**/*',
          './public/**/*',
          '!./public/**/*.css'
        ],
        tasks: ['build']
      }
    },

    'concurrent': {
      dev: {
        tasks: ['watch', 'connect'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  require('matchdep').filterAll(['grunt-*']).forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', [
    'build',
    'concurrent:dev'
  ]);

  // build task
  grunt.registerTask('build', [
    'jshint',
    'stylus',
    'metalsmith'
  ]);

  // publish to gh-pages
  grunt.registerTask('travis', 'build and push to gh-pages', [
    'build',
    'gh-pages'
  ]);
};
