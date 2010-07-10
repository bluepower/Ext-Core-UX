/**
 * Tests Number
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-24
 * @update 2010-07-10
 */
(function() {

    // TestSuite for Array
    new Ext.test.TestSuite({
        name : 'Number TestSuite',

        items : [{
            name : 'Global Number Decorators',

            testConstrain : function() {
                Y.Assert.areEqual(1, (1).constrain(1, 1), 'Test where the number being constrained is equal to the min and max');

                //@TODO
            }
        }]
    });

})();