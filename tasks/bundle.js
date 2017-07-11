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

gulp.task('lint', lint(['src/**/*.js', '!src/**/main.js'], {
  env: {
    es6: true,
  },
  ecmaFeatures: {
    'jsx': true,
  },
}));

// Build and move the HTML to the app folder
gulp.task('html', () =>
  gulp.src('resources/views/index.html').pipe(gulp.dest('./app')),
);

// Build and move the HTML to the app folder
gulp.task('libs', () =>
  gulp.src('resources/assets/js/lib/**/*.js').
    pipe(gulp.dest('./app/js/lib')),
);

// Compress and move the images to the app folder
gulp.task('images',
  () => gulp.src('resources/assets/img/**/*').
    pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{ cleanupIDs: false }],
    })).on('error', function (err) {
      this.end();
    }))).
    pipe(gulp.dest('app/img')));

// Compile all the javascript files and move them to the app folder
gulp.task('bundle', () => {
  return rollup({
    entry: 'src/app.js',
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
      pipe(gulp.dest('app/js'));
  });
});

// Remove the app folder
gulp.task('clean', del.bind(null, ['.tmp', 'app']));

// Watch for changes and execute some tasks
gulp.task('watch', ['lint', 'bundle'], () => {
  gulp.watch('src/**/*.js', ['lint', 'bundle']);
  gulp.watch('resources/views/**/*.html', ['html']);
  gulp.watch('resources/assets/sass/**/*.scss', ['sass']);
});

// Compile and compress sass files
gulp.task('sass', () =>
  gulp.src('resources/assets/sass/shorty.scss').
    pipe($.sourcemaps.init()).
    pipe($.sass().on('error', $.sass.logError)).
    pipe($.sourcemaps.write()).
    pipe(gulp.dest('app/css')),
);

// Move the bootstrap file to the app folder
gulp.task('electron', () =>
  gulp.src('src/main.js').pipe(gulp.dest('./app')),
);

// Default gulp task
gulp.task('default', ['clean'], () => {
  runSequence(
    'lint', 'bundle', ['html', 'sass', 'images', 'libs'], 'electron',
  );
});
