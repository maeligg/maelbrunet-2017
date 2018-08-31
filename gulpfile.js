const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');
const svgSymbols = require('gulp-svg-symbols');
const concat = require('gulp-concat');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const terser = require('rollup-plugin-terser').terser;
const eslint = require('rollup-plugin-eslint').eslint;
const commonjs = require('rollup-plugin-commonjs');

gulp.task('scripts', () =>
  rollup
    .rollup({
      input: './src/scripts/main.js',
      plugins: [
        resolve(),
        eslint(),
        babel({
          exclude: 'node_modules/**',
        }),
        terser(),
        // Workaround for Rollup not liking custom named exports
        commonjs({
          include: [
            'node_modules/barba.js/**',
            'node_modules/svg4everybody/**',
            'node_modules/typed.js/**',
          ],
        }),
      ],
    })
    .then(bundle =>
      bundle.write({
        file: './site/static/scripts/main.js',
        format: 'esm',
        sourcemap: true,
      }),
    ),
);

// Compile the SCSS files
gulp.task('styles', () =>
  gulp
    .src('src/styles/main.scss')
    .pipe(plumber())
    // Get sourceMaps ready
    .pipe(sourceMaps.init())
    // Minify the CSS output
    .pipe(
      sass({
        outputStyle: 'compressed',
        errLogToConsole: true,
      }),
    )
    // Add vendor prefixes (customise for the browsers you need to support)
    .pipe(
      autoprefixer({
        browsers: ['last 2 version'],
        cascade: true,
      }),
    )
    // Catch errors
    .on('error', gutil.log)
    // Get our sources via sourceMaps
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('site/static/styles')),
);

// SVG icons
// This will generate an 'SVG sprite' which can be referenced using the <symbol> tag (see example in index.html)
gulp.task('svgSymbols', () =>
  gulp
    .src('src/images/icons/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest('site/static/images')),
);

// Minify images
gulp.task('imagemin', () =>
  gulp
    .src(['src/images/**/*', '!src/images/icons/*'])
    // Prevents pipe breaking caused by errors from gulp plugins
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('site/static/images')),
);

// Cleans our output directory of previously generated assets
gulp.task('clean', () =>
  gulp
    .src(['site/static/images', 'site/static/scripts', 'site/static/styles'], { read: false })
    .pipe(clean()),
);

gulp.task('watch', () => {
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/icons/*.svg', ['svgSymbols']);
  gulp.watch(['src/images/**/*', '!src/images/icons/*'], ['imagemin']);
});

// Development build
gulp.task(
  'default',
  gulpSequence('clean', ['svgSymbols', 'imagemin', 'scripts', 'styles'], 'watch'),
);

// Production build
gulp.task('build', gulpSequence('clean', ['svgSymbols', 'imagemin', 'scripts', 'styles']));
