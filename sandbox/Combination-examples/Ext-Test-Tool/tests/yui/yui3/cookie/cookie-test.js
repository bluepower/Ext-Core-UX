/**
 * Tests Y.Cookie
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-25
 * @update 2010-06-25
 */
(function() {

	// utility function
	var deleteCookie = function(name, detail) {
		document.cookie = name + "=blah; " + (detail || "") + " expires=Thu, 01 Jan 1970 00:00:00 GMT";
	};
	
	var setCookie = function(name, value) {
		document.cookie = (name) + "=" + (value);
	};

    // TestSuite for Y.Cookie
    new Ext.test.TestSuite({
        name : 'Cookie Tests',

        items : [{
            name : 'Cookie Parsing Tests',

            testParseCookieStringSimple : function() {
                var cookieString = 'a=b';
				var cookies = Y.Cookie._parseCookieString(cookieString);
				Y.ObjectAssert.hasKey('a', cookies, 'Cookie "a" is missing');
				Y.Assert.areEqual('b', cookies.a, 'Cookie "a" should have value "b"');
            }
        }]
    });

})();