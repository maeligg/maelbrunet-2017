const gulp = require('gulp');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');
const svgSymbols = require('gulp-svg-symbols');
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

// Local server
gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: "dist/"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});

// Lint, transpile and minify authored scripts
gulp.task('scripts', () => {
    return gulp.src(['src/scripts/main.js'])
        .pipe(plumber())
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // Transpile into JS te browsers can understand
        .pipe(babel({
          presets: ['es2015']
        }))
        // Minify the scripts
        .pipe(uglify())
        // Catch errors
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/scripts'))
});

// Concat vendor scripts
gulp.task('vendor', function() {
  return gulp.src('src/scripts/vendor/**/*.js')
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('dist/scripts'))
});

// Compile the SCSS files
gulp.task('styles', () => {
    return gulp.src('src/styles/main.scss')
        .pipe(plumber())
        // Get sourceMaps ready
        .pipe(sourceMaps.init())
        // Minify the CSS output
        .pipe(sass({
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        // Add vendor prefixes (customise for the browsers you need to support)
        .pipe(autoprefixer({
           browsers: ['last 2 version'],
           cascade:  true
        }))
        // Catch errors
        .on('error', gutil.log)
        // Get our sources via sourceMaps
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/styles'))
});

// SVG icons
// This will generate an 'SVG sprite' which can be referenced using the <symbol> tag (see example in index.html)
gulp.task('svgSymbols', () => {
    return gulp
        .src('src/images/icons/*.svg')
        .pipe(svgSymbols())
        .pipe(gulp.dest('dist/images'));
});

// Minify images
gulp.task('imagemin', function() {
    gulp.src(['src/images/**/*', '!src/images/icons/*'])
    // Prevents pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

// Build our final HTML from the templates (note this works even if there are no references to HTML partials included
// on a page, in which case it will simply copy it to dist/
gulp.task('fileinclude', () => {
    return gulp.src(['src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/html-partials'
        }))
        .pipe(gulp.dest('dist'))
});

// Copy all other files we need into dist/
gulp.task('copy', () => {
  const files = ['src/*.png', 'src/browserconfig.xml', 'src/favicon.ico', 'src/manifest.json', 'src/safari-pinned-tab.svg'];
  return gulp.src(files)
      .pipe(plumber())
      .pipe(gulp.dest('dist'));
});

// Cleans our dist/ directory to make sure it only includes the generated files
gulp.task('clean', () => {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

// Watches
gulp.watch('src/styles/**/*.scss', ['styles']);
gulp.watch('src/**/*.html', ['fileinclude']);
gulp.watch('src/scripts/main.js', ['scripts']);
gulp.watch('src/scripts/vendor/**/*.js', ['vendor']);
gulp.watch('src/images/icons/*.svg', ['svgSymbols']);
gulp.watch(['src/images/**/*', '!src/images/icons/*'], ['imagemin']);

// Development build
gulp.task('default', gulpSequence('clean', ['fileinclude', 'svgSymbols', 'imagemin', 'scripts', 'vendor', 'styles'], 'copy', 'browserSync'));

// Production build
gulp.task('build', gulpSequence('clean', ['fileinclude', 'svgSymbols', 'imagemin', 'scripts', 'vendor', 'styles'], 'copy'));