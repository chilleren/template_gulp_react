var gulp = require("gulp");
var path = require("path");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var livereload = require("gulp-livereload");

var sassPath = "./src/stylesheets/";
var htmlPath = "./src/index.html";

gulp.task("html", function () {
  gulp.src(htmlPath)
  .pipe(gulp.dest("./dist"))
  .pipe(livereload());
});

gulp.task("sass", function () {
  return gulp.src(path.join(sassPath, "style.scss"))
    .pipe(sass({
      //includePaths: ["styles"].concat(neat)
    }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(livereload());
});

gulp.task("connect", function () {
  connect.server({
    port: 8080,
    root: [path.join(__dirname, "dist")]
  });
});

gulp.task("watch", function () {
  livereload.listen();
  gulp.watch(path.join(sassPath, "**/*"), ["sass"]);
  gulp.watch(htmlPath, ["html"]);
});

gulp.task("default", ["html", "sass", "connect", "watch"]);