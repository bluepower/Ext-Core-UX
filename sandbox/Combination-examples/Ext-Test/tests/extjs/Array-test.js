/**
 * Tests Array
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-24
 * @update 2010-07-10
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
                Y.Assert.areEqual(-1, [0, 1, 2].indexOf(3), 'Test with numbers where the item should not exist');
                Y.Assert.areEqual(1, [0, 1, 2].indexOf(1), 'Test with numbers where the item should exist');
                Y.Assert.areEqual(3, [0, 3, 2, 1, 4, 5, 6, 7, 1, 2].indexOf(1), 'Test with numbers where the item exists a number of times');
                Y.Assert.areEqual(-1, ['x', 'y', 'z'].indexOf('X'), 'Test with strings where the item should not exist');
                Y.Assert.areEqual(0, ['a', 'x', 'y', 'z'].indexOf('a'), 'Test with strings where the item should exist');
                Y.Assert.areEqual(-1, [0, 1, 2].indexOf('1'), 'Test to ensure type coercion does not occur');

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