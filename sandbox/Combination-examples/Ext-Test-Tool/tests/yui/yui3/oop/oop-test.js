/**
 * Tests OOP tests
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-25
 * @update 2010-06-25
 */
(function() {

    // TestSuite for OOP tests
    new Ext.test.TestSuite({
        name : 'OOP TestSuite',

        items : [{
            name : 'OOP Tests',

            testExtend : function() {
				var firedbase = false;
				var firedextended = false;

				var Base = function() {
					//console.log('Base Constructor executed');
					arguments.callee.superclass.constructor.apply(this, arguments);

					// bind by string in order to allow the subclass
					this.on('testStringFn', Y.bind('base', this));
				};
				Y.extend(Base, Y.EventTarget, {
					base: function() {
						//console.log('base function');
						firedbase = true;
					}
				});

				var Extended = function() {
					//console.log('Extended Constructor executed');
					arguments.callee.superclass.constructor.apply(this, arguments);
				};
				Y.extend(Extended, Base, {
					base: function() {
						//console.log('extended function');
						firedextended = true;
					}
				});

				var b = new Extended();
				b.fire('testStringFn', 1, 2);

				Y.Assert.isFalse(firedbase);
				Y.Assert.isTrue(firedextended);
            },

			testMerge : function() {
				Object.prototype.foo = 'hello';

				var o1 = {one: 'one'},
					o2 = {two: 'two'},
					o3 = {two: 'twofromthree', three: 'three'},
					o4 = {one: 'one', two: 'twofromthree', three: 'three'};

				var o123 = Y.merge(o1, o2, o3);
				Y.ObjectAssert.areEqual(o123, o4);
				Y.Assert.areEqual(o123.two, o4.two);

				Y.Assert.isFalse(o123.hasOwnProperty(foo), 'prototype properties added to Object should not be iterable');
			}
        }]
    });

})();