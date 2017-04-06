import path from 'path';
import fs from 'fs';
import test from 'ava';
import globby from 'globby';
import gutil from 'gulp-util';
import pathExists from 'path-exists';
import fn from './';

function run(patterns, opts) {
	return globby(patterns).then(paths => {
		return new Promise((resolve, reject) => {
			const stream = fn(opts);
			let dest;

			stream.on('data', d => {
				dest = d.base;
			});

			stream.on('error', reject);

			stream.on('end', () => {
				resolve(dest);
			});

			paths.forEach(file => {
				const options = {
					cwd: __dirname,
					base: file.split(path.sep).shift(),
					path: file,
					stat: fs.statSync(file)
				};

				if (!options.stat.isDirectory()) {
					options.contents = fs.readFileSync(file);
				}

				stream.write(new gutil.File(options));
			});

			stream.end();
		});
	});
}

test('files are passed in', async t => {
	const dest = await run(['fixtures/**/*.js']);

	t.true(pathExists.sync(path.join(dest, 'index.html')));
});

test('directory is passed in', async t => {
	const dest = await run('fixtures');

	t.true(pathExists.sync(path.join(dest, 'index.html')));
});

test('no documentation found', async t => {
	const dest = await run('fixtures/nodoc');

	t.falsy(dest);
});
