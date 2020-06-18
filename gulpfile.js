//一定要在專案根目錄底下，名稱不能修改
//concept: 來源_加工轉換_目的地

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var fileinclude = require('gulp-file-include');
var reload = browserSync.reload;
const imagemin = require('gulp-imagemin');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var connect = require('gulp-connect-php');

//gulp.task('functionName', function(){});
gulp.task('hello', function(){
    //do
    console.log('hello world');
});

gulp.task('move', function(){
    //do
    return gulp.src('./dev/*.html')//來源打包
    .pipe(gulp.dest('dest/'))//目的地
});

gulp.task('moveCss', function(){
    //do
    return gulp.src('./dev/css/*.css')//來源打包
    .pipe(gulp.dest('dest/css'))//目的地
});


//壓縮+移動css,
gulp.task('minicss', () => {
    return gulp.src('./dev/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dest/minicss'));

});

//concat css
gulp.task('concat', function() {
    return gulp.src('./dev/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dest/css'));
});

//合併 + 壓縮
gulp.task('miniconcat', function() {
    return gulp.src('./dev/css/*.css')//src
    .pipe(concat('all.css'))//concat
    .pipe(cleanCSS({compatibility: 'ie8'}))//min
    .pipe(gulp.dest('dest/miniConcatCss'))//destination
});

//sass
gulp.task('sass', function () {
    return gulp.src('./dev/sass/*.scss')
    .pipe(sass().on('error', sass.logError))//轉譯
    .pipe(concat('main.css'))//concat
    .pipe(cleanCSS({compatibility: 'ie8'}))//min

    
    .pipe(gulp.dest('dest/css'));
});

//browser sync
gulp.task('sync',function(){
    browserSync.init({
        server:{
            baseDir:'./dest',
            index:'index.html'
        }
    })
})


//@@include('path')
gulp.task('fileinclude', function () {
    gulp.src(['./dev/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
    .pipe(gulp.dest('./dest'));
});

gulp.task('default',function(){
    browserSync.init({
        server:{
            baseDir:'./dest',
            index:'index.html'
        }
    });
    gulp.watch('./dev/sass/*.scss',['sass']).on('change',reload);
    gulp.watch(['./dev/*.html' ,'./dev/**/*.html'], ['fileinclude']).on('change',reload);
})


//壓圖
gulp.task('miniIMG',function(){
    gulp.src('./dev/image/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/image'))
})


//ftp
gulp.task( 'ftp',['miniIMG'], function () {

    var conn = ftp.create( {
        host:     '主機',
        user:     '使用者帳號',
        password: '密碼',
        parallel: 10,
    } );

    var globs = [
        'dest/**',
        'dest/css/**',
        'dest/image/**',
        'dest/js/**',
        //'dest/fonts/**',
        'index.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/04.個人作品/works/T2000279' ) ) // only upload newer files
        .pipe( conn.dest( '/04.個人作品/works/T2000279' ) );

} );


//gulp newVersion
gulp.task('go', function () {
    //html move + include
    gulp.src(['./dev/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
    .pipe(gulp.dest('./dest'));

    //css/sass move + translate + concat
    return gulp.src(['./dev/sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))//轉譯
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dest/css'));
    

});

gulp.task('gojs', function () {
    //js move
    return gulp.src('./dev/js/*.js')//來源打包
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dest/js'));//目的地
});

//壓圖
gulp.task('goimg',function(){
    gulp.src('./dev/image/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/image'))
})
////壓下層塗
gulp.task('goimg2',function(){
    gulp.src('./dev/image/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/image'))
})

gulp.task('live',function(){
    browserSync.init({
        server:{
            baseDir:'./dest',
            index:'index.html'
        }
    });
    gulp.watch(['./dev/*.html' ,'./dev/**/*.html','./dev/css/*.css'], ['go']).on('change',reload);
    gulp.watch('./dev/js/*.js',['gojs']).on('change',reload);
    gulp.watch('./dev/sass/**/*.scss',['go']).on('change',reload);
    
})

gulp.task('watch',function(){
    gulp.watch(['./dev/*.html' ,'./dev/**/*.html','./dev/css/*.css'], ['go']).on('change',reload);
    gulp.watch('./dev/js/*.js',['gojs']).on('change',reload);
    gulp.watch('./dev/sass/**/*.scss',['go']).on('change',reload);
    
})
