/**
 * Array Assert Tests
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-30
 * @update 2010-05-30
 */
(function() {
    // TestSuite for Array Assert Tests
    new Ext.test.TestSuite({
        name : 'Array Assert Tests',

        items : [{
            name : 'Contains Assert Tests',

            _should : {
                fail : {
                    'contains() should fail when a similar item exists' : new Y.Assert.Error('Value 1 (number) not found in test array'),
                    'contains() should fail when the item does not exist' : new Y.Assert.Error('Value true (boolean) not found in test array'),
                    'contains() should throw a custom error message during failure' : new Y.Assert.Error('true should not be there: Value true (boolean) not found in test array')
                }
            },

            setUp : function() {
                this.testArray = ['1', 0, false, 'text'];
            },

            tearDown : function() {
                delete this.testArray;
            },

            'contains() should pass when the given item exists' : function() {
                Y.ArrayAssert.contains('1', this.testArray);
            },

            'contains() should fail when a similar item exists' : function() {
                Y.ArrayAssert.contains(1, this.testArray);
            },

            'contains() should fail when the item does not exist' : function() {
                Y.ArrayAssert.contains(true, this.testArray);
            },

            'contains() should throw a custom error message during failure' : function() {
                Y.ArrayAssert.contains(true, this.testArray, 'true should not be there: {message}');
            }
        }, {
            name : 'ContainsItems Assert Tests',

            _should : {
                fail : {
                    testSimilarItems : new Y.Assert.Error('Value 1 (number) not found in test array'),
                    testNonExistingItems : new Y.Assert.Error('Value true (boolean) not found in test array')
                }
            },

            setUp : function() {
                this.testArray = ['1', 0, false, 'text'];
            },

            tearDown : function() {
                delete this.testArray;
            },            

            testExistingItems : function() {
                Y.ArrayAssert.containsItems(['1', 0], this.testArray);
            },

            testSimilarItems : function() {
                Y.ArrayAssert.containsItems([1, 0], this.testArray);
            },

            testNonExistingItems : function() {
                Y.ArrayAssert.containsItems([true], this.testArray);
            }
        }]
    });
})();