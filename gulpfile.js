let gulp           = require('gulp'),
    less           = require('gulp-less'),
    minifyCss      = require('gulp-minify-css'),
    rename         = require('gulp-rename'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify-es').default,
    browserSync    = require('browser-sync'),
    lessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix     = new lessAutoprefix({ browsers: ['last 10 versions'] });


gulp.task('less', function(){
  return gulp.src('src/less/main.less')
      .pipe(less({
         plugins: [autoprefix],
      }))

      .pipe(minifyCss())
      .pipe(rename('style.min.css'))

      .pipe(gulp.dest('src/css/'))

      .pipe(browserSync.reload({
         stream: true
      }))
});



gulp.task('html', function(){
   return gulp.src('src/index.html')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function(){
   return gulp.src('src/js/script.js')

    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false,
  });
});


// Компиляция 
  gulp.task('fonts-build', function(){
     return gulp.src('src/fonts/**/*.*')
     .pipe(gulp.dest('dist/fonts/'))
  });
  gulp.task('img-build', function(){
     return gulp.src('src/img/**/*.*')
     .pipe(gulp.dest('dist/img/'))
  });

  gulp.task('js-build', function(){
     return gulp.src('src/js/script.min.js')
     .pipe(gulp.dest('dist/js/'))
  });

  gulp.task('css-build', function(){
     return gulp.src('src/css/style.min.css')
     .pipe(gulp.dest('dist/css/'))
  });

  gulp.task('html-build', function(){
     return gulp.src('src/*.html')
     .pipe(gulp.dest('dist/'))
  });

  gulp.task('build', gulp.series(
    'fonts-build',
    'img-build',
    'html-build',
    'js-build',
    'css-build'
  ));
// ==============

gulp.task('watch', function(){
  gulp.watch('src/less/**/*.less', gulp.parallel('less'))
  gulp.watch('src/*.html', gulp.parallel('html'))
  gulp.watch('src/js/script.js', gulp.parallel('js'))
});


gulp.task('default', gulp.parallel('browser-sync', 'watch'));