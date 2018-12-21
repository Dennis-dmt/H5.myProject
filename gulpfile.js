let gulp = require("gulp");
let uglify = require("gulp-uglify"); //压缩js文件模块
let babel = require("gulp-babel"); //es6编译es5模块
let cleancss = require("gulp-clean-css"); //压缩CSS
let webserver = require("gulp-webserver"); //搭建服务器
let sass = require("gulp-sass");  //sass转css

// gulp.task("copy",()=>{
//     //读取所有文件                 //写入（复制）到dist目录
//     gulp.src("./src/**/*.*").pipe(gulp.dest("./dist"))
// })

//json-data
gulp.task("buildJSON",()=>{
    gulp.src("./src/data/**.*").pipe(gulp.dest("./dist/data"))
})

//JS
gulp.task("buildJS",()=>{
    //只复制
    gulp.src("./src/scripts/libs/*.js")
        .pipe(gulp.dest("./dist/scripts/libs"))
    //gulp.src找到需要被功能的文件路径   pipe管道（功能模块） pipe管道（文件最后目的地）
    gulp.src("./src/scripts/*.js")
        // .pipe(babel({
        //     presets: ['env']
        // }))
        // .pipe(uglify())
        .pipe(gulp.dest("./dist/scripts"))
})

//HTML
gulp.task("buildHTML",()=>{
    gulp.src("./src/**/*.html").pipe(gulp.dest("./dist"))
})

//静态资源
gulp.task("buildStaticResource",()=>{
    gulp.src("./src/static/**/*.*").pipe(gulp.dest("./dist/static"))
})

//图片
gulp.task("buildImg",()=>{
    gulp.src("./src/images/**.*").pipe(gulp.dest("./dist/images"))
})

//CSS
gulp.task("buildCSS",()=>{
    //复制css
    gulp.src("./src/styles/libs/*.css")
    .pipe(gulp.dest("./dist/styles/libs"))     
    //sass转css再压缩
    gulp.src("./src/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    // .pipe(cleancss())
    .pipe(gulp.dest("./dist"))
})

//监听
gulp.task("watching",()=>{
    gulp.watch("./src/**/*.scss",["buildCSS"]);
    gulp.watch("./src/**/*.js",["buildJS"]);
    gulp.watch("./src/**/*.html",["buildHTML"]);
    gulp.watch("./src/images/**.*",["buildImg"]);
})


//WebSever
gulp.task('webserver',["watching"],()=>{
    gulp.src('dist')     //服务器启动的根目录
        .pipe(webserver({
            livereload: true,       //热部署，改了东西，页面立马更新
            directoryListing: true, //目录列表是否要展示
            open: true,     //是否自动打开浏览器
            //https: true,    //是否要https开头
            proxies:[
                {
                source: '/abc',
                target: 'http://www.lizi.com/common/ajaxSixtySecItems'
                },
                {
                source: '/bbb',
                target:`http://www.yiguo.com/Handler/InitLayOut`
                }

            ]
        }));
});

gulp.task("build",["buildJS","buildHTML","buildCSS","buildStaticResource","buildImg","buildJSON"])