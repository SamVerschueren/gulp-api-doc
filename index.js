'use strict';

/**
 * This gulp plugin generates API documentation with apidocjs.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  18 Mar. 2015
 */

// module dependencies
var fs = require('fs'),
    path = require('path'),
    f = require('file'),
    del = require('del'),
    gutil = require('gulp-util'),
    through = require('through2'),
    apidoc = require('apidoc');

module.exports = function(options) {
    options = options || {};

    var include = [],
        exclude = [],
        base;

    return through.obj(function(file, enc, cb) {
        if(file.isStream()) {
            // The plugin does not support streaming
            cb(new gutil.PluginError('gulp-api-doc', 'Streaming not supported'));
            return;
        }

        if(base !== undefined && base !== file.base) {
            // It's only possible to generate documentation by staying in the same base folder
            cb(new gutil.PluginError('gulp-api-doc', 'Could not generate apidoc from different folders.'));
            return;
        }

        if(!file.isDirectory()) {
            // If the file provided is not a directory, the base is the base of the file
            base = file.base;

            // Push the relative path from the base to the file in the includes array
            include.push(path.relative(base, file.path));
        }
        else {
            // If the file is a directory, take the entire path
            base = file.path;
        }

        cb();
    }, function(cb) {
        if(base === undefined) {
            cb(new gutil.PluginError('gulp-api-doc', 'Please provide some files.'));
            return;
        }

        var self = this;

        // This is the temporary directory where the documentation will be stored
        var tempPath = path.normalize(path.join(base, '.temp'));

        if(include.length > 0) {
            // Only traverse over all the files to determine the excluded files if we have
            // included files. If we don't have include files, it probably means the user provided
            // us with a directory and he wants to include the entire directory.
            f.walkSync(base, function(dirPath, dirs, files) {
                // Iterate over every file and if it's not in the included list, it should be
                // excluded.
                files.forEach(function(file) {
                    var relPath = path.relative(base, path.join(dirPath, file));

                    if(include.indexOf(relPath) === -1) {
                        exclude.push(relPath);
                    }
                });
            });
        }

        // Generate the documentation
        var isGenerated = apidoc.createDoc({
            src: base,
            dest: tempPath,
            includeFilters: include.length > 0 ? include : undefined,
            excludeFilters: exclude.length > 0 ? exclude : undefined,

            // Set the options provided by the devleoper
            template: options.template,
            debug: options.debug === true,
            silent: options.silent === true,
            markdown: options.markdown !== false,
            marked: options.marked
        });

        if(!isGenerated) {
            // Throw an error if it failed to generate
            cb(new gutil.PluginError('gulp-api-doc', 'Could not generate the documentation'));
            return;
        }

        // Retrieve all files recursively in the temporary directory
        f.walkSync(tempPath, function(dirPath, dirs, files) {
            // Iterate over the files and create a File object
            files.forEach(function(file) {
                var content = fs.readFileSync(path.join(dirPath, file));

                self.push(new gutil.File({
                    base: tempPath,
                    cwd: tempPath,
                    path: path.join(dirPath, file),
                    contents: new Buffer(content)
                }));
            });
        });

        // Delete the temporary dirctory
        del(tempPath, function() {
            // Continue
            cb();
        });
    });
};
