var tryToFindMathJax = {};

tryToFindMathJax.urls = [
	'file:///home/chris/Projects/christopheremoore.net/MathJax/MathJax.js?config=TeX-MML-AM_CHTML',
	'/MathJax/MathJax.js?config=TeX-MML-AM_CHTML',
	'https://cdn.rawgit.com/mathjax/MathJax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML'];

tryToFindMathJax.loadScript = function(args) {
	console.log("loading "+args.src);
	var el = document.createElement('script');
	document.body.append(el);
	el.onload = function() {
		console.log('loaded');
		if (args.done !== undefined) args.done();
	};
	el.onerror = function() {
		console.log("failed to load "+args.src);
		if (args.fail !== undefined) args.fail();
	};
	el.src = args.src;
};

tryToFindMathJax.init = function () {
	console.log('init...');

	var i = 0;
	var loadNext = function() {
		tryToFindMathJax.loadScript({
			src : tryToFindMathJax.urls[i],
			done : function() {
				console.log("success!");
				MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
			},
			fail : function() {
				++i;
				if (i >= tryToFindMathJax.urls.length) {
					console.log("looks like all our sources have failed!");
				} else {
					loadNext();
				}
			}
		});
	}
	loadNext();
}

window.addEventListener('load', function() {
	tryToFindMathJax.init();
}, false);
