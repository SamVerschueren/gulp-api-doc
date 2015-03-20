# gulp-apidocjs

Work in progress gulp plugin that can be used to generate API documentation with [apidoc](http://apidocjs.com/).

## Usage

```JavaScript
var gulp = require('gulp'),
    apidoc = require('gulp-apidocjs');

gulp.task('doc', function() {
    return gulp.src('controllers/**/*.js')
        .pipe(apidoc())
        .pipe(gulp.dest('doc'));
});
```

Make sure that the base path of all the files provided is the same. It's not yet possible to this.

```JavaScript
gulp.task('doc', function() {
    return gulp.src(['controllers/*.js', 'controllers/auth/*.js'])
        .pipe(apidoc())
        .pipe(gulp.dest('doc'));
});
```

The reason for this is that we now have two different base paths, the first begin ```controllers```, the second begin ```controllers/auth```. This is not something apidoc can handle. What is possible though, is the following source.

```JavaScript
gulp.task('doc', function() {
    return gulp.src(['controllers/**/*.js', '!controllers/auth/*.js'])
        .pipe(apidoc())
        .pipe(gulp.dest('doc'));
});
```

This means, take all the files in the controllers directory, including those in subdirectories, but exclude those files from the auth directory. This is possible because gulp handles the exclusion itself.
