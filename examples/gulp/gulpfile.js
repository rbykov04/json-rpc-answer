const { src, dest, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const jsonrpc = require('../../index.js');
function html() {
	return src('src/*.html')
		.pipe(dest('./public'))
}

function js() {
	return src('src/index.js')
		.pipe(browserify({
			  insertGlobals : true,
			  debug : true
			}))
		.pipe(dest('./public'))
}

function browser_sync() {
	browserSync.init({
		server: {
			baseDir: "./public"
		},
		middleware: [
			jsonrpc.browser_sync_middleware('/jsonrpc', {
				test: function(params){
					return 10;
				},
				echo: function(params){
					return params;
				},
			})
		]
	});
};




exports.js = js;
exports.html = html;
exports.browser_sync = browser_sync;

exports.default = series(parallel(html, js),  browser_sync);
