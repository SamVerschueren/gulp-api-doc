# gulp-apidocjs

> Generates a RESTful web API Documentation with [apiDoc](https://github.com/apidoc/apidoc).


## Installation

```bash
npm install --save-dev gulp-apidocjs
```

## Usage

Generate documentation for the entire ```controllers``` directory.

```JavaScript
var gulp = require('gulp'),
    apidoc = require('gulp-apidocjs');

gulp.task('doc', function() {
    return gulp.src('controllers')
        .pipe(apidoc())
        .pipe(gulp.dest('documentation'));
});
```

Generate documentation for all the ```controllers```, except for the ones in the ```auth``` folder and don't parse markdown statements.

```JavaScript
gulp.task('doc', function() {
    return gulp.src(['controllers/**/*.js', '!controllers/auth/*.js'])
        .pipe(apidoc({markdown: false}))
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
