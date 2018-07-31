"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const debug = require("gulp-debug");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const changed = require("gulp-changed");
const postcss = require("gulp-postcss");
const mqpacker = require("css-mqpacker");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const csso = require("gulp-csso");
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const pug = require("gulp-pug");
const prettify = require('gulp-html-prettify')

// Разработка или продакшн
// [gulp task_name] - разработка
// [NODE_ENV=build gulp task_name] - продакш (без sourcemaps)
const isDev = !process.env.NODE_ENV || process.NODE_ENV == "dev";

gulp.task("styles", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: "Styles",
          message: err.message
        };
      })
    })
    )
    .pipe(gulpIf(isDev, sourcemaps.init(".")))
    .pipe(debug({
      title: "src"
    })
    )
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: ["last 4 version"]
      }),
      mqpacker({
        sort: function (a, b) {
          return a.localeCompare(b);
        } 
      })
    ])
    )
    .pipe(debug({
      title: "sass"
    })
    )
    .pipe(gulp.dest("src/css/"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulpIf(isDev, sourcemaps.write(".")))
    .pipe(gulp.dest("src/css"))
    .pipe(gulp.dest("build/css"));
});
gulp.task("pug", function () {
  return gulp.src("src/pug/pages/*.pug")
    .pipe(plumber())
    .pipe(pug())
    .pipe(prettify({indent_char: " ", indent_size: 2}))
    .pipe(gulp.dest("src/html"))
});
gulp.task("html", function () {
  return gulp.src("src/html/*.html")
    .pipe(plumber())
    .pipe(gulpIf(!isDev, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest("build"));
});
gulp.task("scripts", function () {
  return gulp.src("src/js/script.js")
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: "JavaScript",
          message: err.message
        };
      })
    })
    )
    .pipe(gulpIf(isDev, sourcemaps.init(".")))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(gulpIf(isDev, sourcemaps.write(".")))
    .pipe(gulp.dest("build/js"));
});
gulp.task("images", function () {
  return gulp.src("src/images/**/*.*")
    .pipe(changed("build/images"))
    .pipe(gulp.dest("build/images"));
});
gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*.*")
    .pipe(changed("build/fonts"))
    .pipe(gulp.dest("build/fonts"));
});
gulp.task("libs", function () {
  return gulp.src("src/libs/**/*.*")
    .pipe(changed("build/libs"))
    .pipe(gulp.dest("build/libs"));
});
gulp.task("data", function () {
  return gulp.src("src/data/**/*.json")
    .pipe(gulp.dest("build/data"));
});
gulp.task("favicon", function () {
  return gulp.src("src/favicon/**/*.{png,ico,svg}")
    .pipe(gulp.dest("build/favicon"))
});
gulp.task("favicon:data", function () {
  return gulp.src("src/favicon/**/*.{xml,webmanifest}")
    .pipe(gulp.dest("build/"))
});
gulp.task("clean", function () {
  return del("build");
});
gulp.task("build", gulp.series("clean", "pug", "html", "styles", "scripts", "images", "fonts", "favicon", "favicon:data", "libs", "data")
);
gulp.task("watch", function () {
  gulp.watch("src/**/*.scss", gulp.series("styles"));
  gulp.watch("src/html/*.html", gulp.series("html"));
  gulp.watch("src/**/*.pug", gulp.series("pug"));
  gulp.watch("src/js/**/*.js", gulp.series("scripts"));
  gulp.watch("src/images/**/*.*", gulp.series("images"));
  gulp.watch("src/fonts/**/*.*", gulp.series("fonts"));
  gulp.watch("src/libs/**/*.*", gulp.series("libs"));
  gulp.watch("src/data/**/*.*", gulp.series("data"));
  gulp.watch("src/favicon/**/*.*", gulp.series("favicon", "favicon:data"));
});
gulp.task("serve", function () {
  browserSync.init({
    server: {
      port: 8080,
      tunnel: true,
      baseDir: "build",
      directory: true,
      open: "tunnel"
    }
  });
  browserSync.watch("build/**/*.*").on("change", browserSync.reload);
});
gulp.task("live", gulp.series("build", gulp.parallel("watch", "serve")));
