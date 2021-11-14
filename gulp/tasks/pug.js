import gulp from "gulp";
import config from "../config";
import pug from "gulp-pug"
import gulpif from "gulp-if";
import plumber from "gulp-plumber";
import {setup as emittySetup} from "@zoxon/emitty"

const emittyPug = emittySetup(config.src.pug, "pug", {
  makeVinylFile: true,
})

global.watch = false;
global.emittyChangedFile = {
  path: "",
  stats: null,
}

export const pugBuild = () => (
  gulp.src(`${config.src.pug}/*.pug`)
    .pipe(plumber())
    .pipe(
      gulpif(
        global.watch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats,
        )
      )
    )
    .pipe(pug({pretty: false}))
    .pipe(gulp.dest(config.dest.html))
);

export const pugWatch = () => {
  global.watch = true;

  gulp.watch(`${config.src.pug}/**/*.pug`, pugBuild)
    .on("all", (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats,
      }
    })
}
