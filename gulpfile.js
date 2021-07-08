const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// const rename = require("gulp-rename");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("./SASS/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        // .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./CSS"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("./SASS/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("./*.html").on('change', gulp.parallel('minify'));
});

gulp.task('minify', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'));
});

gulp.task('imgs', function() {
    return gulp.src('./img/*.+(png|jpg|jpeg)')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
        ]))
        .pipe(gulp.dest('./img'))
});

gulp.task('icons', function() {
    return gulp.src('./icons/*.+(png|svg|jpeg|jpg)')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
        }))
        .pipe(gulp.dest('./icons'))
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'imgs', 'icons'));