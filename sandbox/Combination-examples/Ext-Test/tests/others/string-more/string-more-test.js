/**
 * Tests String more
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-20
 * @update 2010-05-22
 */
(function() {

	new Ext.test.TestSuite({
		name : 'String more TestSuite',
		
		items : [{
			name : 'Global String Decorators TestCase',
			
			testEscapeMore : function() {			
				Y.Assert.areEqual('', String.escapeMore(''), 'Test with an empty string');
				Y.Assert.areEqual('foo', String.escapeMore('foo'), 'Test with an non-empty string, no escape characters');
				Y.Assert.areEqual('\\\\', String.escapeMore('\\'), 'Test with a string with a single backslash');
				Y.Assert.areEqual('\\\'', String.escapeMore('\''), 'Test with a string with a single quote');
				Y.Assert.areEqual('\\\'foo\\\\', String.escapeMore('\'foo\\'), 'Test with a mix of escape and non-escape characters');
			},

			testFormatMore : function() {
				Y.Assert.areEqual('foo', String.formatMore('foo'), 'Test with no format parameters, no function parameters');
				Y.Assert.areEqual('foo', String.formatMore('foo', 'x'), 'Test with no format parameters, 1 argument parameter');
				Y.Assert.areEqual('foo', String.formatMore('{0}', 'foo'), 'Test with only a format parameter');
				Y.Assert.areEqual('xyz', String.formatMore('{0}{1}{2}', 'x', 'y', 'z'), 'Test with several format parameters');
				Y.Assert.areEqual('xy', String.formatMore('{0}{1}', 'x', 'y', 'z'), 'Test with several format parameters, extra argument parameter');
				Y.Assert.areEqual('xfooy', String.formatMore('{0}foo{1}', 'x', 'y'), 'Test with a mix of a string and format parameters');
			},

			testLeftPadMore : function() {
				Y.Assert.areEqual('     ', String.leftPadMore('', 5), 'Test with an empty string');
				Y.Assert.areEqual('  foo', String.leftPadMore('foo', 5), 'Test with string smaller than the padding size');
				Y.Assert.areEqual('foofoo', String.leftPadMore('foofoo', 5), 'Test with string bigger than the padding size');
				Y.Assert.areEqual('foo', String.leftPadMore('foo', 0), 'Test with a padding size of zero');
				Y.Assert.areEqual('foo', String.leftPadMore('foo', -5), 'Test with a padding size of less than zero');
				Y.Assert.areEqual('xxxxx', String.leftPadMore('', 5, 'x'), 'Test with empty string, different padding character');
				Y.Assert.areEqual('xxfoo', String.leftPadMore('foo', 5, 'x'), 'Test with string smaller than the padding size, different padding character');
				Y.Assert.areEqual('foofoo', String.leftPadMore('foofoo', 5, 'x'), 'Test with string bigger than the padding size, different padding character');
			},

			testToggleMore : function() {
				Y.Assert.areEqual('foo', 'baz'.toggleMore('foo', 'bar'), 'Test with a starting string that does not match either');
				Y.Assert.areEqual('bar', 'foo'.toggleMore('foo', 'bar'), 'Test with a starting string that matches one string');
			},

			testTrimMore : function() {
				Y.Assert.areEqual('', ''.trimMore(), 'Test with empty string');
				Y.Assert.areEqual('foo', 'foo'.trimMore(), 'Test with string with no whitespace');
				Y.Assert.areEqual('', '   '.trimMore(), 'Test with string with only whitespace');
				Y.Assert.areEqual('bar', '   bar  '.trimMore(), 'Test with string with leading and trailing whitespace');
				Y.Assert.areEqual('foo', '  foo'.trimMore(), 'Test with only leading whitespace');
				Y.Assert.areEqual('bar', 'bar  '.trimMore(), 'Test with only trailing whitespace');
				Y.Assert.areEqual('foo bar', 'foo bar'.trimMore(), 'Test with spaces in between words');
				Y.Assert.areEqual('foo bar baz', '  foo bar baz   '.trimMore(), 'Test with mix of different spaces');
				Y.Assert.areEqual('foo', '\tfoo'.trimMore(), 'Test with tabs as opposed to spaces');
				Y.Assert.areEqual('foo bar', ' \tfoo bar  '.trimMore(), 'Test with mix of spaces and tabs');
			}
		}, {
			name : 'LeftPad Zero TestCase',

			testLeftPadZero1 : function() {
				Y.Assert.areEqual('0000012', String.leftPadZero1(12, 7), 'Test with number smaller than the padding size');
				Y.Assert.areEqual('123456789', String.leftPadZero1(123456789, 7), 'Test with number bigger than the padding size');
			},

			testLeftPadZero2 : function() {
				Y.Assert.areEqual('0000012', String.leftPadZero2(12, 7), 'Test with number smaller than the padding size');
				Y.Assert.areEqual('123456789', String.leftPadZero2(123456789, 7), 'Test with number bigger than the padding size');
			},

			testLeftPadZero3 : function() {
				Y.Assert.areEqual('0000012', String.leftPadZero3(12, 7), 'Test with number smaller than the padding size');
				Y.Assert.areEqual('123456789', String.leftPadZero3(123456789, 7), 'Test with number bigger than the padding size');
			},

			testLeftPadZero4 : function() {
				Y.Assert.areEqual('0000012', String.leftPadZero4(12, 7), 'Test with number smaller than the padding size');
				Y.Assert.areEqual('123456789', String.leftPadZero4(123456789, 7), 'Test with number bigger than the padding size');
			},

			testLeftPadZeroMore : function() {
				Y.Assert.areEqual('0000012', String.leftPadMore('12', 7, '0'), 'Test with number smaller than the padding size');
				Y.Assert.areEqual('123456789', String.leftPadMore('123456789', 7, '0'), 'Test with number bigger than the padding size');		
			}
		}]
	});

});