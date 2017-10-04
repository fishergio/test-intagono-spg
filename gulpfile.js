const gulp = require('gulp'),
    connect = require('gulp-connect'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();
dir = {
    src: 'src',
    dist: 'dist',
    nm: 'node_modules'
},
    files = {
        CSS: [
            `${dir.nm}/animate.css/animate.min.css`,
            `${dir.nm}/font-awesome/css/font-awesome.min.css`,
            `${dir.nm}/responsimple/responsimple.min.css`,
            `/css/estilos.css`
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
        sass: { outputStyle: 'compressed' },
    };

gulp.task('server', ['sass', 'pug'], () => {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/scss/*.scss", ['sass']);
    gulp.watch("./src/pug/*.pug").on('change', browserSync.reload);
    gulp.watch("./src/scss/*.scss").on('change', browserSync.reload);
});

gulp.task('pug', () => {
    gulp
        .src(`${dir.src}/pug/*.pug`)
        .pipe(pug(opts.pug))
        .pipe(gulp.dest(dir.dist))
        .pipe(browserSync.stream());
});

gulp.task('sass', () => {
    gulp
        .src(`${dir.src}/scss/*.scss`)
        .pipe(sass(opts.sass))
        .pipe(gulp.dest(`${dir.dist}/css`))
        .pipe(browserSync.stream());
});

gulp.task('es6', () => {
    gulp
        .src(`${dir.src}/es6/*.js`)
        .pipe(babel(opts.es6))
        .pipe(gulp.dest(`${dir.dist}/js`));
});

gulp.task('watch', () => {
    gulp.watch('./src/pug/*.pug', ['pug']);
    gulp.watch('./src/scss/*.scss', ['sass']);
})

gulp.task('default', ['server', 'watch']);


