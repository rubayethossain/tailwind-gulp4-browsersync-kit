var { src, dest, series, watch, parallel } = require("gulp");
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

function watchTasks() {
  watch("app/css/tailwind/styles.css", tailwind);
  watch("app/**/*.html").on("change", browserSync.reload);
  watch("app/**/*.js").on("change", browserSync.reload);
}

exports.default = series(tailwind, parallel(server, watchTasks));
