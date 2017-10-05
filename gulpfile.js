const gulp = require('gulp'),
    connect = require('gulp-connect'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create(),
    
    dir = {
        src: 'app',
        dist: 'dist',
        nm: 'node_modules'
    },
    files = {
        CSS: [
            /*`${dir.nm}/animate.css/animate.min.css`,
            `${dir.nm}/font-awesome/css/font-awesome.min.css`,
            `${dir.nm}/responsimple/responsimple.min.css`,*/
            `${dir.src}/lib/css/estilos.css`
        ],
        mCSS: 'estilos.min.css',
        JS: [
            `${dir.nm}/jquery/dist/jquery.min.js`,
            `${dir.nm}/wowjs/dist/wow.min.js`,
            `${dir.dist}/js/codigos.js`
        ],
        mJS: 'codigos.min.js',
        fonts: [`${dir.nm}/font-awesome/fonts/*.*`]
    },
    opts = {
        pug: {
            pretty: true,
            locals: {
                title: 'tinyone',
                files: files
            }
        },
        sass: { outputStyle: 'uncompressed' },
        uncss: { html: [`${dir.dist}/*.html`] },
        autoprefixer: {
            browsers: ['last 5 versions'],
            cascade: false
        },
        htmlmin: { collapseWhitespace: true }
    };

    var dir_app = {
        sass: './app/scss/*.scss',
        js: './app/js/**/*.js',
        html: './app/html/**/*.html',
        lib: './app/lib/**/*.css'
      }   


gulp.task('default', ['sass', 'pug'], () => {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("./app/*.html", ['pug']);
    gulp.watch("./app/scss/*.scss", ['sass']);
});

gulp.task('pug', () => {
    gulp
        .src(`${dir.src}/*.html`)
        //.pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(dir.dist))
        .pipe(browserSync.stream());
});

gulp.task('sass', () => {
    gulp
        .src(`${dir_app.sass}`)
        .pipe(sass(opts.sass))
        .pipe(gulp.dest('./app/lib/css'))
        .pipe(browserSync.stream());
});

gulp.task('es6', () => {
    gulp
        .src(`${dir.src}/es6/*.js`)
        .pipe(babel(opts.es6))
        .pipe(gulp.dest(`${dir.dist}/js`));
});

gulp.task('watch', () => {
    gulp.watch('./app/*.index', ['pug']);
    gulp.watch('./app/scss/*.scss', ['sass', 'css']);
})

//gulp.task('default', ['server', 'watch']);




gulp.task('css', () => {
    gulp
        .src(['dir_app.lib', 'dir_app.scss'])
        .pipe(concat(files.mCSS))
        .pipe(uncss(opts.uncss))
        .pipe(autoprefixer(opts.autoprefixer))
        .pipe(cleanCSS())
        .pipe(gulp.dest(`${dir.dist}/css`));
});

gulp.task('html', () => {
    gulp
        .src(`${dir.dist}/*.html`)
        .pipe(useref())
        .pipe(htmlmin(opts.htmlmin))
        .pipe(gulp.dest(dir.dist));
});