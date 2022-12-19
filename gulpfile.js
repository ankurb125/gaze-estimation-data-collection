const eslint = require("gulp-eslint");
const gulp = require("gulp");
const htmlhint = require("gulp-htmlhint");
const scsslint = require("gulp-scss-lint");
const paths = {
    root: "./src",
    html: {
        src: "./src/html/**/*.html",
        dest: "./dist/"
    },
    styles: {
        src: "./src/sass/**/*.scss",
        dest: "./dist/css"
    },
    scripts: {
        src: "./src/js/**/*.js",
        jsx: "./src/js/**/*.jsx",
        dest: "./dist/js"
    }
};

//===Lint Tasks===
//HTML Lint
function htmlLint() {
    return gulp
        .src(paths.html.src)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
}
//SASS Lint
function sassLint() {
    return gulp.src(paths.styles.src).pipe(
        scsslint({
            config: "scss-lint.yml"
        })
    );
}
//ESLint
function esLint() {
    return gulp
        .src([paths.scripts.src, paths.scripts.jsx, "!./src/js/core/**/*.js"])
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

gulp.task("eslint", esLint);
gulp.task("html-lint", htmlLint);
gulp.task("sass-lint", sassLint);
gulp.task("lint", gulp.series(sassLint, esLint, htmlLint));

