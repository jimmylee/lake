module.exports = function(grunt) {
    "use strict";

    grunt.file.defaultEncoding = 'utf8';

    var moduleConfiguration = {};

    var developmentRegister = [
        "clean:"        + "delete_all_build_files",
        "mkdir:"        + "make_all_preprocessing_folders",
        "html2js",
        "concat:"       + "join_all_angular_modules",
        "concat:"       + "join_with_templates_no_min",
        "copy:"         + "move_less_for_preprocessing",
        "file-creator:" + "create_all_imports_less_file",
        "less:"         + "build_css_file_for_development",
        "includeSource:"+ "make_client_base_template",
        "copy:"         + "development",
        "clean:"        + "delete_all_preprocessing",
        "watch"
    ];

    var productionRegister = [
        "clean:"        + "delete_all_build_files",
        "mkdir:"        + "make_all_preprocessing_folders",
        "html2js",
        "concat:"       + "join_all_angular_modules",
        "concat:"       + "join_all_templates_for_minify",
        "copy:"         + "move_less_for_preprocessing",
        "file-creator:" + "create_all_imports_less_file",
        "less:"         + "build_css_file_for_production",
        "md5",
        "uglify:"       + "minify_js_for_production",
        "copy:"         + "move_js_after_md5",
        "clean:"        + "delete_all_preprocessing_md5",
        "includeSource:"+ "make_client_base_template",
        "copy:"         + "development",
        "clean:"        + "delete_all_preprocessing"
    ];

    var watchRegister = [
        "clean:"        + "delete_all_build_files",
        "mkdir:"        + "make_all_preprocessing_folders",
        "html2js",
        "concat:"       + "join_all_angular_modules",
        "concat:"       + "join_with_templates_no_min",
        "copy:"         + "move_less_for_preprocessing",
        "file-creator:" + "create_all_imports_less_file",
        "less:"         + "build_css_file_for_development",
        "includeSource:"+ "make_client_base_template",
        "copy:"         + "development",
        "clean:"        + "delete_all_preprocessing"
    ];

    moduleConfiguration['file-creator'] = {
        "create_all_imports_less_file": {
            '_preprocess/css/all-imports.less': function(fs, fd, done) {
                grunt
                    .file
                    .expand("_preprocess/css/preprocess/*")
                    .forEach(function(file){
                        var lessFile = file.split('/').pop();

                        fs.writeSync(fd, '@import "preprocess/' + lessFile + '";\n');
                });

                done();
            }
        }
    };

    moduleConfiguration.mkdir = {
        make_all_preprocessing_folders: {
            options: {
                create: [
                    '_preprocess',
                    '_preprocess/css',
                    '_preprocess/js',
                    '_preprocess/static',
                    '_preprocess/css/preprocess',
                    '_preprocess/js/preprocess'
                ]
            }
        }
    };

    moduleConfiguration.watch = {
        css: {
            files: 'client/**/*.less',
            tasks: watchRegister,
            options: {
                spawn: false
            }
        },
        angular: {
            files: 'client/**/*.js',
            tasks: watchRegister,
            options: {
                interrupt: true
            }
        },
        partials: {
            files: 'client/**/*.html',
            tasks: watchRegister,
            options: {
                interrupt: true
            }
        }
    };

    moduleConfiguration.clean = {
        delete_all_build_files: [
            "_preprocess",
            "build"
        ],
        delete_all_preprocessing: [
            "_preprocess"
        ],
        delete_all_preprocessing_md5: [
            "_preprocess/js/premd5",
            "_preprocess/css/premd5",
            "_preprocess/js/preuglify"
        ]
    };

    moduleConfiguration.less = {
        build_css_file_for_development: {
            options: {
                sourceMap: false
            },
            files: [
                {
                    src: [
                        "_preprocess/css/all-imports.less"
                    ],
                    dest: "_preprocess/css/styles.css"
                }
            ]
        },
        build_css_file_for_production: {
            options: {
                sourceMap: false,
                cleancss: true,
                cleancssOptions: {
                    keepSpecialComments: 0
                },
                compress: true
            },
            files: [
                {
                    src: [
                        "_preprocess/css/all-imports.less"
                    ],
                    dest: "_preprocess/css/premd5/styles.css"
                }
            ]
        }
    };

    moduleConfiguration.html2js = {
        options: {
            useStrict : true,
            module: 'generatedTemplatesModule',
            base: 'Client',
            singleModule: true,
            rename: function(path) {
                var newString = path.split("/html/").pop();

                return "partials/" + newString;
            }
        },
        main: {
            src: [
                'client/**/*.partial.html'
            ],
            dest: '_preprocess/js/preprocess/generated-templates.js'
        }
    };

    moduleConfiguration.md5 = {
        compile: {
            files: [
                { "_preprocess/css/" : "_preprocess/css/premd5/styles.css" },
                { "_preprocess/js/preuglify/" : "_preprocess/js/premd5/*.js" }
            ]
        },
        options: {
            encoding: null,
            keepBasename: true,
            keepExtension: true
        }
    };

    moduleConfiguration.uglify = {
        minify_js_for_production: {
            options: {
                sourceMap: true,
                sourceMapName: '_preprocess/js/preuglify/client.map'
            },
            files: [
                {
                    expand: true,
                    src: [
                        '_preprocess/js/preuglify/*.js'
                    ],
                    dest: ''
                }
            ]
        }
    };

    moduleConfiguration.concat = {
        join_all_angular_modules: {
            src: 'client/**/*.js',
            dest: '_preprocess/js/preprocess/concat-angular.js',
            nonull: true
        },
        join_with_templates_no_min: {
            src: '_preprocess/js/preprocess/**/*.js',
            dest: '_preprocess/js/client.js',
            nonull: true
        },
        join_all_templates_for_minify: {
            src: '_preprocess/js/preprocess/**/*.js',
            dest: '_preprocess/js/premd5/client.js',
            nonull: true
        }
    };

    moduleConfiguration.includeSource = {
        make_client_base_template: {
            files: [
                {
                    src: [
                        "client/base/html/base.template.html"
                    ],
                    dest: '_preprocess/index.html'
                }
            ]
        }
    };

    moduleConfiguration.copy = {
        move_less_for_preprocessing: {
            files: [
                {
                    flatten: true,
                    expand: true,
                    src: [
                        'client/**/*.less'
                    ],
                    dest: '_preprocess/css/preprocess',
                    filter: 'isFile'
                }
            ]
        },
        move_js_after_md5: {
            files: [
                {
                    flatten: true,
                    expand: true,
                    src: [
                        '_preprocess/js/preuglify/*'
                    ],
                    dest: '_preprocess/js',
                    filter: 'isFile'
                }
            ]
        },
        development: {
            files: [
                {
                    flatten: true,
                    expand: true,
                    src: '_preprocess/css/*.css',
                    dest: 'build/css/',
                    filter: 'isFile'
                },
                {
                    flatten: true,
                    expand: true,
                    src: '_preprocess/js/*.js',
                    dest: 'build/js/',
                    filter: 'isFile'
                },
                {
                    flatten: true,
                    expand: true,
                    src: '_preprocess/js/*.map',
                    dest: 'build/js/',
                    filter: 'isFile'
                },
                {
                    flatten: true,
                    expand: true,
                    src: '_preprocess/index.html',
                    dest: 'build/',
                    filter: 'isFile'
                }
            ]
        }
    };

    grunt.initConfig(moduleConfiguration);

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-md5');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask("default", developmentRegister);
    grunt.registerTask("production", productionRegister);

};
