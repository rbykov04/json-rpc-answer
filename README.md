[![Build Status](https://travis-ci.org/rbykov04/json-rpc-answer.svg?branch=master)](https://travis-ci.org/rbykov04/json-rpc-answer)
[![Coverage Status](https://coveralls.io/repos/github/rbykov04/json-rpc-answer/badge.svg?branch=master)](https://coveralls.io/github/rbykov04/json-rpc-answer?branch=master)
[![License][license-image]][license-url]

# json-rpc-answer
jsonrpc middleware for browsersync


# Usage
## Gulp and browser sync

```js

const browserSync = require('browser-sync').create();
const jsonrpc = require('../../index.js');

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
```

See also examples.

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE


