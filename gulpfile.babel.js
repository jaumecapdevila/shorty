import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import { stream as wiredep } from 'wiredep';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const $ = gulpLoadPlugins();

function lint(files, options) {
  return () => gulp.src(files)
    .pipe($.eslint(options))
    .pipe($.eslint.format());
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  env: {
    es6: true,
  },
}));

gulp.task('images', () => gulp.src('app/images/**/*')
  .pipe($.if($.if.isFile, $.cache($.imagemin({
    progressive: true,
    interlaced: true,
    svgoPlugins: [{ cleanupIDs: false }],
  }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
  .pipe(gulp.dest('dist/images')));


gulp.task('bundle', () => {
  return rollup({
    entry: 'app/scripts.babel/index.js',
    sourceMap : false,
    plugins: [
      babel({
        presets: [
          [
            "es2015", {
              "modules": false
            }
          ]
        ],
        babelrc: false,
        exclude: 'node_modules/**'
      }),
      resolve(
        { 
          jsnext: true,
          main: true
        }
      )
    ]
  })
  .then(bundle => {
    return bundle.generate({
      format: 'iife',
      moduleName: 'main'
    })
  })
  .then(gen => {
    return $.file('index.min.js', gen.code, {src: true})
      .pipe(gulp.dest('dist'))
  });
})

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['lint', 'bundle'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/bundle/**/*.js',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json',
  ]).on('change', $.livereload.reload);

  gulp.watch('app/scripts.babel/**/*.js', ['lint', 'bundle']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('size', () => gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true })));

gulp.task('build', () => {
    runSequence(
      'lint', 'bundle',
      ['images'],
      'size'
    );
});

gulp.task('default', ['clean'], () => {
  runSequence('build');
});
