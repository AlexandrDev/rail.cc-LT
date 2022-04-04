let gulp = require('gulp'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    terserPlugin = require("terser-webpack-plugin"),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass')(require('sass')),
    gcmq = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename');

let path = {
    dist: {
        html: '../',
        styles: '../css',
        js: '../js'
    },
    src: {
        html: 'pug/*.pug',
        styles: 'scss/**/*.scss',
        js: 'js/**/*.js'
    },
    watch: {
        html: 'pug/**/*.pug',
        styles: 'scss/**/*.scss',
        js: 'js/**/*.js'
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
        .pipe(gcmq())
        .pipe(gulp.dest(path.dist.styles))
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dist.styles))
}

function scripts() {
    /*return gulp.src(path.src.js)
        .pipe(webpackStream({
            mode: "production",
            output: {
                filename: 'app.js'
            },
            /!*optimization: {
                minimize: true,
                minimizer: [new terserPlugin()],
            }*!/
        }, webpack))
        .pipe(gulp.dest(path.dist.js))*/
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.dist.js))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.dist.js))
}

function watch() {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.styles, styles)
    gulp.watch(path.watch.js, scripts)
}

exports.all = gulp.parallel(html, styles, scripts, watch);
exports.js_css = gulp.parallel(styles, scripts, watch);