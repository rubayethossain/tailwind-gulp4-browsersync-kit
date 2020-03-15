var { src, dest, series, watch, parallel } = require("gulp");
// var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
var tailwindcss = require("tailwindcss");
var autoprefixer = require("autoprefixer");

function server() {
  return browserSync.init({
    server: {
      baseDir: "./app"
    }
  });
}

function tailwind() {
  return src("./app/css/tailwind/styles.css")
    .pipe(postcss([tailwindcss, autoprefixer]))
    .pipe(dest("app/css/"));
}

// function scssCompiler() {
//   return src("./app/scss/**/*.scss")
//     .pipe(sass())
//     .pipe(dest("./app/css"))
//     .pipe(browserSync.stream());
// }

function watchTasks() {
  // watch("./app/scss/**/*.scss", scssCompiler);
  watch("app/css/tailwind/styles.css", tailwind);
  watch("app/**/*.html").on("change", browserSync.reload);
  watch("app/**/*.js").on("change", browserSync.reload);
}

exports.default = series(tailwind, parallel(server, watchTasks));
