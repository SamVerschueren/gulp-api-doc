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
    return through.obj(function(file, enc, cb) {
        var self = this;

        if(file.isStream()) {
            cb(new gutil.PluginError('gulp-apidocjs', 'Streaming not supported'));
            return;
        }

        if(!file.isDirectory()) {
            cb(new gutil.PluginError('gulp-apidocjs', 'Please provide a directory'));
            return;
        }

        // This is the temporary directory where the documentation will be stored
        var tempPath = path.normalize(path.join(file.path, '.documentation'));

        // Generate the documentation
        var isGenerated = apidoc.createDoc({
            src: file.path,
            dest: tempPath
        });

        if(!isGenerated) {
            cb(new gutil.PluginError('gulp-apidocjs', 'Could not generate the documentation'));
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
