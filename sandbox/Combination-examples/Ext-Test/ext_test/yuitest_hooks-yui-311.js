var Y = {};
Y.ObjectAssert = {};

YUI().use('test', function(A) {
	// Some hooks
	Y = A;
	Y.ObjectAssert.hasProperty = Y.ObjectAssert.hasKey;
});