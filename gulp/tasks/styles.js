import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import jcmq from 'gulp-group-css-media-queries';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import config from '../config';

const sass = gulpSass(dartSass)

export const sassBuild = () => (
  gulp.src(`${config.src.sass}/main.sass`)
    .pipe(plumber())
    .pipe(gulpif(config.isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(config.isProd,jcmq()))
    .pipe(gulpif(config.isProd,autoprefixer()))
    .pipe(gulpif(config.isProd,cleanCss({level: 2})))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulpif(config.isDev, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.css))
);

export const sassWatch = () => gulp.watch(`${config.src.sass}/**/*.sass`, sassBuild);
