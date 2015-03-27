# gulp-apidocjs

> Generates a RESTful web API Documentation with [apiDoc](https://github.com/apidoc/apidoc).


## Installation

```bash
npm install --save-dev gulp-apidocjs
```

## Usage

```JavaScript
var gulp = require('gulp'),
    apidoc = require('gulp-apidocjs');

gulp.task('doc', function() {
    return gulp.src('controllers/**/*.js')
        .pipe(apidoc())
        .pipe(gulp.dest('documentation'));
});
```

### Options

- **template**: Directory with the template files.
- **debug (false)**: Show debug output.
- **silent (false)**: Hide log output.
- **markdown (true)**: Parse markdown statements in the documentation.
- **marked**
    - **gfm (true)**: [Github flavored markdown](https://help.github.com/articles/github-flavored-markdown/).
    - **tables (true)**: Enables Github flavored markdown [tables](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#wiki-tables). This option requires ```gfm``` to be true.
    - **breakes (false)**: Enabled Github flavored markdown [line breaks](https://help.github.com/articles/github-flavored-markdown#newlines).
    - **pedantic (false)**: Conform to obscure parts of [markdown.pl](http://markdown.pl) as much as possible. Don't fix any of the original markdown bugs or poor behavior.
    - **sanitize (false)**: Sanitize the output. Ignore any HTML that has been input.
    - **smartLists (true)**: Use smarter list behaviour than the original markdown.
    - **smartypants (false)**: Use "smart" typographic punctuation for things like quotes and dashes.

## Base path

> TODO rewrite this

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

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License (MIT)

```
Copyright (c) 2015 Sam Verschueren <sam.verschueren@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
