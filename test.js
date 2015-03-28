/* jshint expr:true */
'use strict';

/**
 * Test file for gulp-api-doc
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  28 Mar. 2015
 */

// module dependencies
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    gulp = require('gulp'),
    concatStream = require('concat-stream'),
    apidocjs = require('apidoc'),
    apidoc = require('./');

var should = chai.should();
chai.use(sinonChai);

describe('gulp-api-doc', function() {

    it('Should call the createDoc method only once', sinon.test(function(done) {
        this.spy(apidocjs, 'createDoc');

        gulp.src(['fixtures/**/*.js'])
            .pipe(apidoc({silent: true}))
            .pipe(concatStream(function() {
                apidocjs.createDoc.should.be.calledOnce;

                done();
            }));
    }));

    it('Should call the createDoc method with the correct properties', sinon.test(function(done) {
        this.spy(apidocjs, 'createDoc');

        gulp.src(['fixtures/**/*.js'])
            .pipe(apidoc({silent: true}))
            .pipe(concatStream(function() {
                var args = apidocjs.createDoc.args[0][0];

                should.not.exist(args.template);
                args.debug.should.be.false;
                args.silent.should.be.true;
                args.markdown.should.be.true;
                should.not.exist(args.marked);

                done();
            }));
    }));
});
