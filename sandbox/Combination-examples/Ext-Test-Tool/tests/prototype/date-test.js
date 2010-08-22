/**
 * Tests Date Extensions
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-06-22
 * @update 2010-06-23
 */
(function() {

	var fnMatch = function(re, str) {
		return re.test(str);
	};

    // TestSuite for Date Extensions
    new Ext.test.TestSuite({
        name : 'Date Extensions',

        items : [{
            name : 'Date',

            testDateToJSON : function() {
                Y.Assert.isTrue(fnMatch(/^1970-01-01T00:00:00(\.000)?Z$/, new Date(Date.UTC(1970, 0, 1)).toJSON()));
            },

			testDateToISOString : function() {
				Y.Assert.isTrue(fnMatch(/^1970-01-01T00:00:00(\.000)?Z$/, new Date(Date.UTC(1970, 0, 1)).toISOString()));
			}
        }]
    });

})();