import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const $ = gulpLoadPlugins();

function lint(files, options) {
  return () => gulp.src(files).pipe($.eslint(options)).pipe($.eslint.format());
}

gulp.task('lint', lint('app/src/**/*.js', {
  env: {
    es6: true,
  },
  ecmaFeatures: {
    'jsx': true,
  },
}));

// Build and move the HTML to the public folder
gulp.task('html', () =>
  gulp.src('app/Resources/views/index.html').pipe(gulp.dest('./public')),
);

// Build and move the HTML to the public folder
gulp.task('libs', () =>
  gulp.src('app/Resources/assets/js/lib/**/*.js').
    pipe(gulp.dest('./public/js/lib')),
);

// Build and move the HTML to the public folder
gulp.task('electron', () =>
  gulp.src('index.js').pipe(gulp.dest('./public')),
);

// Compress and move the images to the public folder
gulp.task('images',
  () => gulp.src('app/Resources/assets/img/**/*').
    pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{ cleanupIDs: false }],
    })).on('error', function (err) {
      this.end();
    }))).
    pipe(gulp.dest('public/img')));

// Compile all the javascript files and move them to the public folder
gulp.task('bundle', () => {
  return rollup({
    entry: 'app/src/app.js',
    sourceMap: false,
    plugins: [
      resolve({
        jsnext: true,
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          './node_modules/react/react.js': [
            'cloneElement',
            'createElement',
            'PropTypes',
            'Children',
            'Component',
          ],
        },
      }),
      babel({
        exclude: 'node_modules/**',
        presets: [
          'es2015-rollup',
          'react',
        ],
        babelrc: false,
      }),
    ],
  }).then(bundle => {
    return bundle.generate({
      format: 'iife',
      moduleName: 'main',
    });
  }).then(gen => {
    return $.file('shorty.js', gen.code, { src: true }).
      pipe(gulp.dest('public/js'));
  });
});

// Remove the public folder
gulp.task('clean', del.bind(null, ['.tmp', 'public']));

// Watch for changes and execute some tasks
gulp.task('watch', ['lint', 'bundle'], () => {
  gulp.watch('app/src/**/*.js', ['lint', 'bundle']);
  gulp.watch('app/Resources/views/**/*.html', ['html']);
  gulp.watch('app/Resources/assets/sass/**/*.scss', ['sass']);
});

// Compile and compress sass files
gulp.task('sass', () =>
  gulp.src('app/Resources/assets/sass/shorty.scss').
    pipe($.sourcemaps.init()).
    pipe($.sass().on('error', $.sass.logError)).
    pipe($.sourcemaps.write()).
    pipe(gulp.dest('public/css')),
);

// ZIP the public folder
gulp.task('size',
  () => gulp.src('public/**/*').pipe($.size({ title: 'build', gzip: true })));

// Build all the project
gulp.task('build', () => {
  runSequence(
    'lint', 'bundle', ['html', 'sass', 'images', 'libs'], 'electron',
  );
});

// Default gulp task
gulp.task('default', ['clean'], () => {
  runSequence('build');
});

