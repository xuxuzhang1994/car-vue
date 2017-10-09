'use strict';

var gulp= require('gulp');
var path= require('path');
var rename= require('gulp-rename');
var template= require('gulp-template');
var yargs= require('yargs');
// import path     from 'path';
// import rename   from 'gulp-rename';
// import template from 'gulp-template';
// import yargs    from 'yargs';

let root = 'src';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
    return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
    return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
let paths = {
    js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
    styl: resolveToApp('**/*.styl'), // stylesheets
    html: [
        resolveToApp('**/*.html'),
        path.join(root, 'index.html')
    ],
    entry: path.join(__dirname, root, 'app/app.js'),
    output: root,
    blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
    blankLazyTemplates: path.join(__dirname, 'generator', 'lazy-component/**/*.**')
};


gulp.task('component', () => {
    const cap = (val) => {
        return val.charAt(0).toUpperCase() + val.slice(1);
    };
    const calModulePath = (path) => {
        path = path.replace(/\./g, "/");
        path = path.replace(/\/+/g, "/");
        path = path.charAt(0) === '/' ? path.substring(1) : path;
        path = path.charAt(path.length - 1) === '/' ? path.substring(0, path.length - 1) : path;
        return path === '' ? path : '/' + path;
    };

    const componentInfo = yargs.argv.component.split(':');
    const name = componentInfo[0];
    const parentPath = (componentInfo.length > 1 && componentInfo[1]) || '';
    const fileName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
    const destPath = path.join(resolveToComponents(), parentPath, fileName);

    const nameOk = name.replace(/-(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });

    return gulp.src(paths.blankTemplates)
        .pipe(template({
            name: nameOk,
            fileName: fileName,
            upCaseName: cap(nameOk),
            parentPath: parentPath,
            modulePath: calModulePath(parentPath)
        }))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('temp', fileName);
        }))
        .pipe(gulp.dest(destPath));
});

gulp.task('component:lazy', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const calModulePath = (path) => {
    path = path.replace(/\./g, "/");
    path = path.replace(/\/+/g, "/");
    path = path.charAt(0) === '/' ? path.substring(1) : path;
    path = path.charAt(path.length - 1) === '/' ? path.substring(0, path.length - 1) : path;
    return path === '' ? path : '/' + path;
  };

  const componentInfo = yargs.argv.component.split(':');
  const name = componentInfo[0];
  const parentPath = (componentInfo.length > 1 && componentInfo[1]) || '';
  const fileName = name.replace(/([A-Z])/g, "-$1").toLowerCase();
  const destPath = path.join(resolveToComponents(), parentPath, fileName);

  const nameOk = name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });

  return gulp.src(paths.blankLazyTemplates)
    .pipe(template({
                     name: nameOk,
                     fileName: fileName,
                     upCaseName: cap(nameOk),
                     parentPath: parentPath,
                     modulePath: calModulePath(parentPath)
                   }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', fileName);
    }))
    .pipe(gulp.dest(destPath));
});



gulp.task('default');
