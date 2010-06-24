/**
 * Tests Array
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-24
 * @update 2010-06-24
 */
(function() {

    // TestSuite for Array
    new Ext.test.TestSuite({
        name : 'Array TestSuite',

        setUp : function() {
            this.Cls = Ext.extend(Object, {});
        },

        items : [{
            name : 'Global Array Decorators',

            testIndexOf : function() {
                Y.Assert.areEqual(-1, [].indexOf(1), 'Test with an empty array');
                
                //@TODO
            },

            testRemove : function() {
                var arr = [];

                arr.remove(1);
                Y.ArrayAssert.isEmpty(arr, 'Test to remove item with an empty array');

                arr = [1, 2, 3];
                arr.remove(1);
                Y.ArrayAssert.itemsAreEqual([2, 3], arr, 'Test with a simple removal');

                //@TODO
            }
        }]
    });

})();