const gulp = require('gulp'),
			concat = require('gulp-concat'),
			autoprefixer = require('gulp-autoprefixer'),
			cleanCSS = require('gulp-clean-css'),
			browserSync = require('browser-sync').create(),
			rename = require('gulp-rename'),
			clean = require('gulp-clean'),
			gcmq = require('gulp-group-css-media-queries'),
			less = require('gulp-less'),
			minify = require('gulp-minify'),
			cache = require('gulp-cache'),
			rigger = require('gulp-rigger'),
			imagemin = require('gulp-imagemin'),
			notify = require('gulp-notify');

const config = {
	src: './src',
	build: './build',
	css: {
		watch: '/less/**/*.less',
		src: '/less/*.less',
		build: '/css'
	},
	js: {
		watch: '/js/**/*.js',
		src: '/js/*.js',
		libs: '',
		build: '/js'
	},
	img: {
		watch: '/img/**/*',
		build: '/img'
	},
	libs: {
		watch: '/libs/**/*',
		build: '/libs'
	},
	html: {
		watch: '/html/**/*.html',
		src: '/*.html'
	},
	php: {
		src: '/*.php'
	}
};


//Styles
gulp.task('styles', function() {
	return gulp
			.src(config.src + config.css.src)
			.pipe(less())
			.pipe(gcmq())
			.pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
			.pipe(gulp.dest(config.build + config.css.build))
			.pipe(rename({ suffix: '.min' }))
			.pipe(cleanCSS({ level: 2 }))
			.pipe(browserSync.stream())
			// .pipe(browserSync.reload)
			.pipe(gulp.dest(config.build + config.css.build))
			.pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
	return gulp
			.src(config.src + config.js.src)
			.pipe(rigger())
			.pipe(concat('main.js'))
			.pipe(gulp.dest(config.build + config.js.build))
			.pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        }
    	}))
    	// .pipe(browserSync.reload)
    	.pipe(browserSync.stream())
			.pipe(gulp.dest(config.build + config.js.build))
			.pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp
  	.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('build/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Libs
gulp.task('components', function() {
  return gulp
  	.src('src/libs/**/*')
  	.pipe(browserSync.stream())
    .pipe(gulp.dest('build/libs'))
    .pipe(notify({ message: 'Libs task complete' }));
});

// Html
gulp.task('html', function() {
  return gulp
  	.src('src/index.html')
  	.pipe(rigger())
  	.pipe(browserSync.stream())
    .pipe(gulp.dest('build/'))
    .pipe(notify({ message: 'Html task complete' }));
});

// Php
gulp.task('php', function() {
  return gulp
  	.src('src/*.php')
  	.pipe(rigger())
  	.pipe(browserSync.stream())
    .pipe(gulp.dest('build/'))
    .pipe(notify({ message: 'Php task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp
  	.src(['build'], {read: false})
    .pipe(clean());
});

// Build task
gulp.task('build', ['clean'], function() {
  return gulp
  	.run('styles', 'scripts', 'images', 'components', 'html', 'php');
});

// Default task
gulp.task('default', ['clean', 'build' ], function() {
	return gulp
		.run('watch');
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch(config.src + config.css.watch, ['styles']);
	gulp.watch(config.src + config.js.watch, ['scripts']);
    gulp.watch(config.src + config.img.watch, ['images']);
	gulp.watch(config.src + config.libs.watch, ['libs']);
	gulp.watch(config.src + config.php.src, ['php']);
    gulp.watch(config.src + config.html.src, ['html']);
	gulp.watch(config.src + config.html.watch, ['html']);
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.build
        }
    });
});
////Local
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "yourlocal.dev"
//     });
// });
