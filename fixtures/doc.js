'use strict';

/**
 * @apiDescription This is a test method.
 *
 * @api {GET} /test/method Test method
 * @apiName TestMethod
 * @apiGroup Test
 * @apiVersion 1.0.0
 *
 * @apiSuccess (Success) {Object} 200 If the user was successfully signed in
 * @apiSuccessExample Response
 * {
 *     "foo": "bar"
 * }
 *
 * @apiError (Errors) {Object[]} 400 If the parameters provided are invalid.
 * @apiError (Errors) 401 If the credentials provided are invalid.
 * @apiError (Errors) {Object} 500 If a database error occurred.
 */
exports.docmethod = function() {
    // Do nothing
};
