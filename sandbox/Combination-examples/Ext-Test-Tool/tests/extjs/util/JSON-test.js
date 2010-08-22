/**
 * Tests Ext.util.JSON
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-22
 * @update 2010-06-22
 */
(function() {

    // TestSuite for Ext.util.JSON
    new Ext.test.TestSuite({
        name : 'Ext.util.JSON',

        items : [{
            name : 'JSON',

            // Ext.encode is same as Ext.util.JSON.encode
            testEncode : function() {
                Y.Assert.areEqual('{"foo":"bar"}', Ext.encode({foo: 'bar'}), 'Test encode with a simple object');
            },

            // Ext.decode is same as Ext.util.JSON.decode
			testDecode : function() {
                Y.ObjectAssert.hasKeys({foo: 'bar'}, Ext.decode('{"foo":"bar"}'), 'Test decode with a simple object');
                Y.ObjectAssert.hasKeys({foo: ['bar', 'baz']}, Ext.decode('{"foo":["bar","baz"]}'), 'Test decode with a hash and array');
			}
        }]
    });

})();