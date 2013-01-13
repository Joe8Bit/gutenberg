describe('Gutenberg should', function() {

	it('return the correct markup for a single property template', function() {
		expect(Gutenberg({foo: 'bar'}, '<div>{{foo}}</div>')).to.eql('<div>bar</div>');
	});

	it('return the correct markup for a multi property template', function() {
		expect(Gutenberg({foo: 'bar', blork: 'baz'}, '<div>{{foo}}, {{blork}}</div>')).to.eql('<div>bar, baz</div>');
	});

	it('return the correct markup for a longer string', function() {
		expect(Gutenberg({foo: "bar", blork: 'baz'}, '<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut <em>{{foo}}</em> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat <em>{{blork}}</em> non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>')).to.eql('<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut <em>bar</em> ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat <em>baz</em> non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>');
	});

	it('return the correct markup for indirectly assigned arguments', function() {
		var obj = {
				foo: 'bar',
				blork: 'baz'
			},
			str = '<div>{{foo}}, {{blork}}</div>';
		expect(Gutenberg(obj, str)).to.eql('<div>bar, baz</div>');
	});

	it('return the correct data type', function() {
		expect(Gutenberg({foo: 'bar'}, '<div>{{foo}}</div>')).to.be.an('string');
	});

});