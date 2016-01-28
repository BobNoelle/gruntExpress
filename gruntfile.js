module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/css/styles.css": "src/css/styles.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['src/less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ['src/*.html'],
                tasks: ['copy'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            },
            images: {
                files: ['src/img/**'],
                tasks: ['sync']
            },
            deleting : {
                files : ['src/img/*.*'],
                tasks : ['delete_sync']
            }
        },
        clean: {
            build: {
                src: ["dist/"]
            }
        },
        jshint: {
            files: ['dist/**/*.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        concat: {
            options: {
                separator: '// Concat separator'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/js/main.js'
            }
        },
        copy: {
            html : {
                files : [
                    {
                        expand : true,
                        dest   : 'dist',
                        cwd    : 'src',
                        src    : ['**/*.html']
                    }
                ]
            }
        },
        sync: {
            images: {
                files: [{
                    cwd: 'src',
                    src: ['img/**'],
                    dest: 'dist'}],
                //pretend: true, // For non-destructive testing
                verbose: true
            },
            all: {
                files: [{
                    cwd: 'src',
                    src: ['**'],
                    dest: 'dist'}],
                //pretend: true, // For non-destructive testing
                verbose: true
            }
        },
        delete_sync : {
            dist : {
                cwd : 'dist',
                src : ['**'],
                syncWith : 'src'
            }
        },
        express: {
            all: {
                options:{
                    port:9000,
                    hostname: 'localhost',
                    bases: ['dist'],
                    livereload: true
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:9000'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-delete-sync');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('default', ['less', 'jshint', 'concat', 'copy:html', 'sync:images']);
    grunt.registerTask('server', ['clean', 'sync:all', 'express', 'open', 'watch']);
};