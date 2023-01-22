let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass')(require('sass')),
    groupCssMediaQueries = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename'),
    svgSprite = require('gulp-svg-sprite'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

const webpackConfig = require('./webpack.config.js');

let path = {
    dist: {
        html: '../',
        styles: '../css',
        js: '../js',
        svg: '../images'
    },
    src: {
        html: 'pug/*.pug',
        styles: 'scss/**/*.scss',
        js: 'js/app.js',
        svg: 'svg/**/*.svg'
    },
    watch: {
        html: 'pug/**/*.pug',
        styles: 'scss/**/*.scss',
        js: 'js/**/*.js',
        svg: 'svg/**/*.svg'
    }
};

function html() {
    return gulp.src(path.src.html)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.dist.html))
}

function styles() {
    return gulp.src(path.src.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dist.styles))
}

function scripts() {
    return gulp.src(path.src.js)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dist.js))
}

function svg() {
    return gulp.src(path.src.svg)
      .pipe(svgSprite({
          mode: {
              symbol: {
                  dest: '',
                  sprite: 'sprite.svg'
              }
          }
      }))
      .pipe(gulp.dest(path.dist.svg))
}

function watch() {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.styles, styles)
    gulp.watch(path.watch.js, scripts)
    gulp.watch(path.watch.svg, svg)
}

exports.build = gulp.parallel(html, styles, scripts, svg);
exports.watch = gulp.parallel(html, styles, scripts, svg, watch);