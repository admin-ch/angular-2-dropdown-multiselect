let gulp = require('gulp'),
    del = require('del'),
    gutil = require('gulp-util'),
    tslint = require('gulp-tslint'),
    exec = require('child_process').exec,
    runSequence = require('run-sequence'),
    gulpFile = require('gulp-file'),
    path = require('path')/*,
    webpack = require('webpack')*/;

let PATHS = {
    src: 'src/**/*.ts',
};

/*function webpackCallBack(taskName, gulpDone) {
    return function(err, stats) {
        if (err) throw new gutil.PluginError(taskName, err);
        gutil.log(`[${taskName}]`, stats.toString());
        gulpDone();
    }
}*/

gulp.task('lint', () => {
    return gulp.src(PATHS.src)
        .pipe(tslint(<any>{configuration: require('./tslint.json'), formatter: 'prose'}))
        .pipe(tslint.report({summarizeFailureOutput: true}));
});

/*gulp.task('test', (done) => {
    //TODO: start PhantomJS on Jenkins and Chrome locally
    exec(`"node_modules/.bin/karma" start ${__dirname}/karma.conf.js --single-run`, {maxBuffer: 1024 * 20000}, (err, stdout) => {
        gutil.log(stdout);
        if (err) {
            throw new Error('There are test failures:' + err);
        }
        else {
            done();
        }
    });
});*/

gulp.task('clean:build', () => {
    return del('dist/');
});

gulp.task('ngc', (done) => {
    exec(`./node_modules/.bin/ngc -p ./tsconfig.publish.json`, (e) => {
        if (e) console.log(e);
        del('./dist/waste');
        done();
    }).stdout.on('data', (data) => {
        console.log(data);
    });
});

gulp.task('clean:tests', function() { return del(['temp/', 'coverage/']); });

gulp.task('build:tests', ['clean:tests'], (cb) => {
    exec('./node_modules/.bin/tsc', (e) => {
        if (e) console.log(e);
        cb();
    }).stdout.on('data', (data) => { console.log(data); });
});

gulp.task('test', ['build:tests'], function() {
    var karmaServer = require('karma').Server;

    var config = {configFile: `${__dirname}/karma.conf.js`, singleRun: true, autoWatch: false};
    new karmaServer(config, () => {console.log('done')}).start();
});

/*gulp.task('umd', (done) => {
    webpack(require('./webpack.publish.js'),
        webpackCallBack('webpack', done));
});*/

gulp.task('npm', () => {
    let pkgJson = require('./package.json');
    let targetPkgJson = {};
    let fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage', 'publishConfig', 'name'];

    fieldsToCopy.forEach(field  => targetPkgJson[field] = pkgJson[field]);

    targetPkgJson['main'] = 'index.js';
    targetPkgJson['module'] = 'index.js';
    targetPkgJson['typings'] = 'index.d.ts';

    targetPkgJson['peerDependencies'] = {};
    Object.keys(pkgJson.dependencies).forEach((dependency) => {
        targetPkgJson['peerDependencies'][dependency] = pkgJson.dependencies[dependency];
    });

    return gulp.src('README.md')
        .pipe(gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', (done) => {
	//TODO: clean:build is currently disabled that webpack doesn't lose the js files
    runSequence(/*'lint', */'test', /*'clean:build',*/ 'ngc', /*'umd', */'npm', done);
});

