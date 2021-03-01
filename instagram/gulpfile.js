/**
 * 
 * +------------------------------------+
 * /                                    /
 * /    1. SCSS autocompilation         /
 * /    2. Autoprefixer                 /
 * /    3. CSS minification             /
 * /    4. Concationation files         /
 * /    5. Clean CSS                    /
 * /    6. Autoreloader                 /
 * /    7.  Minification JS             /
 * /                                    /
 * +------------------------------------+
 * 
 */




'use strict'                                                                    // строгий режим ;

const               gulp = require('gulp'),                                     // Подключаем gulp ;
                  concat = require('gulp-concat'),                              // Подключаем gulp-concat для конкатинации нескольких файлов , в один ; 
            autoprefixer = require('gulp-autoprefixer'),                        // Подключаем gulp-autoprefixer для старых версий браузеров ;
             browserSync = require('browser-sync').create(),                    // Подключаем browser-sync для автообновления страницы ;
                cleanCSS = require('gulp-clean-css'),                           // Подключаем gulp-clean-css для минификации css ; 
                  uglify = require('gulp-uglify'),                              // Подключаем gulp-uglify для минификации js ;
                     del = require('del'),                                      // Подключаем del для удаления ненужных файлов ;
                    sass = require('gulp-sass'),
                cssFiles = [                                                    // Создаем константу с массивом в котором поетапно подключаем файлы css (нужно для конкатинации) ;

    './src/scss/main.scss',
    './src/scss/media.scss',
    './src/scss/vars.scss',
    './src/scss/header.scss',
    './src/scss/preloader.scss'

],
                jsFiles = [                                                      // Создаем константу с массивом в котором поетапно подключаем файлы js (нужно для конкатинации) ;

    './src/js/main.js',
    './src/js/preloader.js'

];

function css() {                                                                // Таск для обработки css ;

    return gulp.src(cssFiles)                                                   // Указываем файлы , которые нужно соеденить ;

        .pipe(concat('style.min.css'))                                              // Объеденяем файлы в style.css ;
        .pipe(sass())       
        .pipe(autoprefixer({                                                    // добавляет префиксы , чтобы сайт работал на старых браузерах ;

            cascade: false

        }))

        .pipe(cleanCSS({

            level: 2                                                            // максимально минифицируем css файл;

        }))                         

        .pipe(gulp.dest('./build/css'))                                         // Перетаскиваем этот файл в папку build/css ;
        .pipe(browserSync.stream())                                             // Вызываем перезагрузку сервера после изменения файла ;

}

gulp.task('sass', function(){

    return gulp.src('src/scss/main.scss')

        .pipe(sass()) // Конвертируем Sass в CSS через gulp-sass
        .pipe(gulp.dest('build/css'))

});

function js() {                                                                 // Таск для обработки js ;

    return gulp.src(jsFiles)                                                    // Указываем файлы , которые нужно соеденить ;

        .pipe(concat('script.js'))                                              // Объеденяем файлы в script.js ;
        .pipe(uglify({                                                          // Минификация js ;

            toplevel: true
            
        }))

        .pipe(gulp.dest('./build/js'))                                          // Перетаскиваем этот файл в папку build/js ;
        .pipe(browserSync.stream())                                             // Вызываем перезагрузку сервера после изменения файла ;

}

function clean() {                                                              // Функция для очистки ненужных файлов ;

    return del(['build/css/style.css'])
    return del(['build/js/script.js'])

}

function watch() {                                                              // Функция для автообновления сервера ; 

    browserSync.init({

        // server: {
            
        //     baseDir: "./"

        // }

        proxy: "Site"

    });

    gulp.watch('./src/scss/**/*.scss', css)                                     // Следим за изменением scss файлов ;
    gulp.watch('./src/css/**/*.css', css)                                       // Следим за изменением css файлов ; 
    gulp.watch('./src/js/**/*.js', js)                                          // Следим за изменение js файлов ;
    gulp.watch("./*.php").on('change', browserSync.reload);                     // При изменении файлов php запускает автообновление сервера ;
    gulp.watch("./*.html").on('change', browserSync.reload);                    // При изменении файлов html запускает автообновление сервера ;            

}               
                


gulp.task('css', css);                                                          // Таск вызываем функцию по стилям (css) ;
gulp.task('js', js);                                                            // Таск вызываем функцию по скриптам (js) ;
gulp.task('del', clean);                                                        // Таск для удаления всех файлов в build ;
gulp.task('watch', watch);                                                      // Таск для отслеживания изменений ;
gulp.task('build', gulp.series(clean, gulp.parallel(css, js)));                 // Таск для запуска js , css таксков  ;
gulp.task('launch', gulp.series('build', 'watch'));                              // Таск для запуска всех тасков ;
