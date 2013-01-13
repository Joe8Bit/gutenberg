##Gutenberg
Gutenberg is an ECMAScript 5 dependent mini-templating library (by mini I mean the script is 10 lines long) that I wrote for a mobile web app and thought might be useful for others to use too. 

As is implied by the use of ES5 dependent JavaScript (in this instance combining `Object.keys()` and `Array.prototype.forEach()`) there are limitations to which browsers this library will function in without a an ES5 shim.

####Usage
Using the library is super simple, it exposes a global function `Gutenberg()` which will return the final comiled template. It takes two arguments: an object of key/value pairs representing the anchor and value for the template to replace; a string representing the template.

The syntax for the template uses that of the Moustache templating library, for example `{{foo}}`. For example:

	Gutenberg({foo: "bar"}, '<div>{{foo}}</div>);
	// returns '<div>bar</div>'
	
This example is a very simple one, and the advantage to such a simple templating system is pure speed. As you will see if you use it yourself, as it scales to very large templates with little effort.

####Examples
The `app/` directory contains several examples. This simple project is built using the [Yeoman](http://yeoman.io) toolchain, so getting the example up and running is a matter of installing Yeoman and the running the `yeoman server` command.

####Tests
Testing is done in Mocha and the specs are contained within the root `tests/` directory. Running them is as simple as running the `yeoman test` command.