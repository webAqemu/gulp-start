import gulp from "gulp";
import config from "./gulp/config";
import clean from "./gulp/tasks/clean";
import { scriptsBuild, scriptsWatch } from "./gulp/tasks/scripts";
import { pugBuild, pugWatch } from "./gulp/tasks/pug";
import server from "./gulp/tasks/server";

config.setEnv();

export const build = gulp.series(
  clean,
  gulp.parallel(
    scriptsBuild,
    pugBuild
  )
);

export const watch = gulp.series(
  //build,
  server,
  gulp.parallel(
    scriptsWatch,
    pugWatch
  )
);
