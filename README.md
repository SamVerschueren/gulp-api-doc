# gulp-apidocjs

Work in progress gulp plugin that can be used to generate API documentation with [apidoc](http://apidocjs.com/).

## Usage

```JavaScript
var gulp = require('gulp'),
    apidoc = require('gulp-apidocjs');

gulp.task('doc', function() {
    return gulp.src('controllers')
        .pipe(apidoc())
        .pipe(gulp.dest('doc'));
});
```

Notice that the path provided to ```.src()``` should be a directory. If this is not a directory, an error will be thrown.
