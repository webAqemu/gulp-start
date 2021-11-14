import gulp from 'gulp';
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { sassBuild, sassWatch } from './gulp/tasks/styles';
import server from './gulp/tasks/server';

config.setEnv();

export const build = gulp.series(
  clean,
  gulp.parallel(
    scriptsBuild,
    pugBuild,
    sassBuild
  )
);

export const watch = gulp.series(
  //build,
  server,
  gulp.parallel(
    scriptsWatch,
    pugWatch,
    sassWatch
  )
);

exports.sass = sassBuild;
