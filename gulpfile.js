const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/"
		}
	});
}

function cleanApp() {
	return del('./app/');
}

function html() {
	return src('./src/*.html')
		.pipe(fileinclude())
		.pipe(dest('./app'))
		.pipe(browserSync.stream());
}

function htmlBuild() {
	return src('./src/*.html')
		.pipe(fileinclude())
		.pipe(dest('./app'))
}

function styles() {
	return src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(scss({
			outputStyle: 'expendend'
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: true,
			grid: true
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/css/'))
		.pipe(browserSync.stream());
}

function stylesBuild() {
	return src('./src/scss/**/*.scss')
		.pipe(scss({
			outputStyle: 'expendend'
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: true,
			grid: true
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest('./app/css/'))
}

function scripts() {
	src(['./src/js/plugins/**.js', 'node_modules/swiper/swiper-bundle.min.js'])
		.pipe(concat('plugins.js'))
		.pipe(dest('./app/js/'))
	return src(
		['./src/js/functions/**.js', './src/js/components/**.js', './src/js/main.js'])
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/js'))
		.pipe(browserSync.stream());
}

function scriptsBuild() {
	src('./src/js/plugins/**.js')
		.pipe(concat('plugins.js'))
		.pipe(dest('./app/js/'))
	return src(
		['./src/js/functions/**.js', './src/js/components/**.js', './src/js/main.js'])
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(dest('./app/js'))
}

function imagesWebp() {
	return src(['./src/img/**/*.{jpg,png,jpeg}',
		'!./src/img/bg/**/*.*'
	])
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest('app/img'))
		.pipe(browserSync.stream());
}

function imagesWebpBuild() {
	return src(['./src/img/**/*.{jpg,png,jpeg}',
		'!./src/img/bg/**/*.*'
	])
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest('app/img'))
}

function images() {
	return src('./src/img/**/*.*')
		.pipe(dest('app/img'))
		.pipe(browserSync.stream());
}

function imagesBuild() {
	return src('./src/img/**/*.*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({

				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('app/img'))
}

//sprite svg
function svgSprit() {
	return src('./src/img/svg/**.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg" //sprite file name
				}
			},
		}))
		.pipe(dest('./app/img'))
		.pipe(browserSync.stream());
}

function svgSpritBuild() {
	return src('./src/img/svg/**.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg" //sprite file name
				}
			},
		}))
		.pipe(dest('./app/img'))
}

function resources() {
	return src('./src/resources/**/*.*')
		.pipe(dest('./app/resources'));
}

function fonts() {
	src('./src/fonts/**.ttf')
		.pipe(ttf2woff())
		.pipe(dest('./app/fonts/'))
	return src('./src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('./app/fonts/'));
}

function watchFiles() {
	watch('./src/index.html', html);
	watch('./src/partHTML/**/*.html', html);
	watch('./src/scss/**/*.scss', styles);
	watch('./src/js/**/*.js', scripts);
	watch('./src/img/**/*.{jpg,png,jpeg}', imagesWebp);
	watch('./src/img/*.*', images);
	watch('./src/img/svg/**/*.*', svgSprit);
	watch('./src/resources/**/*.*', resources);
	watch('./src/fonts/**/*.ttf', fonts);
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;

exports.watchFiles = watchFiles;
exports.browsersync = browsersync;
exports.default = series(cleanApp, imagesWebp, images, parallel(html, styles, scripts, svgSprit, fonts, resources, watchFiles, browsersync));
exports.build = series(cleanApp, imagesWebpBuild, imagesBuild, parallel(htmlBuild, stylesBuild, scriptsBuild, svgSpritBuild, fonts, resources));