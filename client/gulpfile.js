const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

/*
top level functions 
 gulp.task - defien tasks
 gulp.src - poit to files to use
 gulp.dest - poits folder to outpu
gulp.watch - watch files and folders for changes
*/

// logs messages
gulp.task("message", function() {
  return console.log("Gulp is running..");
});

// copy all HTML Files
gulp.task("copyHTML", function() {
  gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

//optimize images
gulp.task("imageMin", () =>
  gulp
    .src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("public/img"))
);

//minify JS
gulp.task("minify", function() {
  gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

//compile sass
gulp.task("sass", function() {
  gulp
    .src("sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("public/css"));
});

//script concat or join
gulp.task("scripts", function() {
  gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

//copy jqueryscript to public folder
gulp.task("jquery", function() {
  gulp
    .src("node_modules/jquery/dist/jquery.min.js")
    .pipe(gulp.dest("public/js"));
});

//copy bootstrap JS to public folder
gulp.task("bs-js", function() {
  gulp
    .src("node_modules/bootstrap/dist/js/bootstrap.min.js")
    .pipe(gulp.dest("public/js"));
});

//copy popper JS
gulp.task("popper-js", function() {
  gulp
    .src("node_modules/popper.js/dist/popper.min.js")
    .pipe(gulp.dest("public/js"));
});

//run all tasks as once!!
/*
gulp.task("default", ["message", "copyHTML", "imageMin", "scripts", "sass"]);
*/

gulp.task("default", ["sass", "jquery", "bs-js", "popper-js"]);

gulp.task("watch", function() {
  gulp.watch("src/js/*.js", ["scripts"]);
  gulp.watch("src/img/*", ["imageMin"]);
  gulp.watch("sass/*.scss", ["sass"]);
  gulp.watch("src/*.html", ["copyHTML"]);
});
