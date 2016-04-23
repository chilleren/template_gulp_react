var gulp = require("gulp");
var path = require("path");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var livereload = require("gulp-livereload");
var babel = require("gulp-babel");

var sassPath = "./src/stylesheets/";
var htmlPath = "./src/index.html";
var jsPath = "./src/scripts";

gulp.task("html", function () {
  gulp.src(htmlPath)
  .pipe(gulp.dest("./dist"))
  .pipe(livereload());
});

gulp.task("sass", function () {
  return gulp.src(path.join(sassPath, "style.scss"))
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"))
    .pipe(livereload());
});

gulp.task("connect", function () {
  connect.server({
    port: 8080,
    root: [path.join(__dirname, "dist")]
  });
});

gulp.task("js", function () {
  return gulp.src(path.join(jsPath, "app.js"))
    .pipe(babel())
    .pipe(gulp.dest("./dist/scripts"))
});

gulp.task("watch", function () {
  livereload.listen();
  gulp.watch(path.join(sassPath, "**/*"), ["sass"]);
  gulp.watch(htmlPath, ["html"]);
  gulp.watch(path.join(jsPath, "**/*"), ["js"]);
});

gulp.task("default", ["html", "sass", "js", "connect", "watch"]);