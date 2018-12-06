let gulp = require('gulp'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    server = require('gulp-express'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    wait = require('gulp-wait'),
    clean = require('gulp-clean'),
    traceur = require('gulp-traceur'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    argv = require("yargs").argv,
    gulpif = require("gulp-if"),
    path = require('path'),
    webpack = require('webpack-stream'),
    time = new Date().getTime();

let exec = require('child_process').exec;

const root = '.',
    location = 'public',
    dist = './' + location,
    config = {
        scss_dev: './sass/',
        style_dist: dist + '/stylesheets',
        // TODO: Fix style files = /*.css
        style_files: dist + '/stylesheets/*.css',
        css_file_name: 'stylesheet',
        js_dev: './js/',
        js_dist: dist + '/js',
        js_libs_name: 'c-libs',
        js_libs: './js/libs/**/*.js',
        js_pages: './js/pages/**/*.js',
        js_file_order: [],
        pug_base: './views/',
        pug_files: './views/*/**.pug',
        pug_dist: dist + '/views',
        pug_debug: ''
    };

config.js_libs_name += time;
config.css_file_name += time;


let file_order = [
    'libs/TweenMax.js',
    'libs/viewport-units-buggyfill.js',
    'libs/TimelineMax.js',
    'libs/jquery-3.2.1.js',
    'libs/ScrollToPlugin.min.js',
    'libs/DrawSVGPlugin.js',
    'libs/assets.js',
    'libs/media.js',
    'libs/pre_load.js',
    'libs/sound.js'
];

config.js_file_order = process_order_paths(config.js_dev);

function process_order_paths(path) {
    for (var i = 0; i < file_order.length; i++) {
        file_order[i] = path + file_order[i];
    }
    return file_order;
}

gulp.task('default', ['inject']);

gulp.task('watch', ['watch']);

gulp.task('clean-scripts', (cb)=> {
    gulp.src([config.style_dist + '/*.css', config.js_dist + '/**/*.js', config.js_dist + '/**/*.js.map'], {read: false})
        .pipe(clean());

    cb()
});

gulp.task('compile', ['sass'], (cb)=> {

    gulp.src(
        config.js_dev + '/libs/transpile/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(traceur({
            arrayComprehension: true
        }))
        .pipe(concat('transpiled' + (!argv.production ? '' : '.min') + '.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.js_dev + '/transpiled'));


    gulp.src(['js/libs/ex-libs/**/*.js', 'js/transpiled/transpiled.js'])
        .pipe(wait(500))
        .pipe(concat(config.js_libs_name + (!argv.production ? '' : '.min') + '.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest(config.js_dist));

    gulp.src(
        config.js_pages)
        .pipe(sourcemaps.init())
        .pipe(traceur({
            arrayComprehension: true
        }))
        .pipe(rename((path)=> {
            path.basename += time + (!argv.production ? '' : '.min');
        }))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.js_dist + '/pages'));

    cb()
});

gulp.task('sass', ['clean-scripts'], (cb)=> {
    gulp.src(config.scss_dev + '**/*.scss')
        .pipe(sass({outputStyle: argv.production ? "compressed" : "expanded"}).on('error', sass.logError))
        .pipe(rename((path)=> {
            path.basename = config.css_file_name;
        }))
        .pipe(gulp.dest(config.style_dist));
    cb();
});

gulp.task('css-watch', ()=> {
    return gulp.src(config.style_dist + '/**/*.css')

});
gulp.task('sass-watch', ()=> {
    return gulp.src(config.scss_dev + '**/*.scss')

});
gulp.task('pug-watch', ()=> {
    return gulp.src(config.pug_base + '**/*.pug')
        .pipe(livereload())
});

gulp.task('js-watch', ()=> {
    return gulp.src(config.js_dev + '**/*.js')
});

gulp.task('inject', ['compile'], (cb)=> {
    gulp.src(config.pug_base + 'layout.pug')
        .pipe(wait(1500))
        .pipe(inject(gulp.src((config.js_dist + '/*.js'), {read: false}), {
            name: 'scripts',
            transform: function (filepath, file) {
                /*
                 Uses transform to allow the stylesheets to defer load times.
                 This helps bring down load times and improves page speed scores.
                 ADD: defer="async"
                 */
                // return 'script(type="text/javascript", src="' + filepath.replace('/' + location, '') + '")'
                return 'script(defer="async" type="text/javascript", src="/js/' + config.js_libs_name + (!argv.production ? '' : '.min') + '.js")';
            }
        }))
        .pipe(inject(gulp.src(config.js_dist + '/*.js', {read: false}), {
            name: 'page-script',
            transform: function () {
                return 'script(defer="async" type="text/javascript", src="/js/pages/" + page +"' + time + (!argv.production ? '' : '.min') + '.js")';

            }
        }))
        .pipe(inject(gulp.src(config.style_files, {read: false}), {
            name: 'stylesheets',
            transform: function (filepath, file) {
                //let data = "link(rel='preload' href='/stylesheets/" + config.css_file_name + ".css' as='style' onload='this.onload=null;this.rel=\"stylesheet\"')" +
                //    "\n    noscript\n      link(rel='stylesheet', href='/stylesheets/" + config.css_file_name + ".css')"
                //return data;
                return 'link(media="all" rel="stylesheet", href="/stylesheets/' + config.css_file_name + '.css")'
            }
        }))
        .pipe(gulp.dest(config.pug_base))
        .pipe(gulpif(!argv.production, livereload()));

    if (argv.deploy) {
        exec('npm run deploy', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    } else {
        cb();
    }

});

gulp.task('watch', ()=> {
    let server = livereload.listen();
    gulp.watch(config.pug_files, ['pug-watch']);
    gulp.watch(config.scss_dev + '**/*.scss', ['sass-watch', 'inject']);
    gulp.watch([config.js_dev + '!(transpiled)**/*.js'], ['inject', 'js-watch']);
});


function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}
