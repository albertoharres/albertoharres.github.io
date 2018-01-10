var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'compact'
};

gulp.task('html', function() {
	return gulp.src(['src/index.html'])
		.pipe(gulp.dest('./build'));
});


gulp.task('scripts', function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		//'vendor/bootstrap/js/bootstrap.min.js',
		'src/js/components/*.js',
		'src/js/app.js'
	])
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(concat('main.js'))		
		.pipe(gulp.dest('./build/js'));
});


gulp.task('styles', function() {
	return gulp.src(['src/scss/style.scss'])
		.pipe(sourcemaps.init())
			.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/css'));
});

gulp.task('json', function() {
	return gulp.src(['src/json/data.json'])
		.pipe(gulp.dest('./build/js'));
});

//Watch task
gulp.task('default',function() {
	gulp.start('html');
	gulp.start('scripts');
	gulp.start('styles');
	gulp.start('json');
});

gulp.task('watch', function () {
	// Endless stream mode
	gulp.start('default');
	gulp.watch('src/**/*.html', ['html']); 
	gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('src/**/*.scss', ['styles']);
	gulp.watch('src/**/*.json', ['json']);
});