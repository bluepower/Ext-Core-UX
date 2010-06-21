/**
 * Tests Y.Slider
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-26
 * @update 2010-05-27
 */
(function() {
    // TestSuite for Y.Slider
    new Ext.test.TestSuite({
        name : 'Y.Slider',

        items : [{
            name : 'Lifecycle',

            setUp : function() {
				//console.log(Y);
                Y.one('body').append('<div id="testbed"></div>');
            },

            tearDown : function() {
                Y.one('#testbed').remove(true);
            },

            'test default construction' : function() {
                Y.Assert.isInstanceOf(Y.Slider, new Y.Slider());
            },

            'test SliderBase construction': function () {
                Y.Assert.isInstanceOf(Y.SliderBase, new Y.SliderBase());
            },

            'test render(selector)' : function() {
                Y.one("#testbed").setContent(
                    '<div></div>' +   // block element
                    '<div class="floated" style="float:left"></div>' + // float
                    '<p></p>' +       // limited block element
                    '<span></span>'); // inline element

                //Y.Assert.fail();
            }
        }]
    });
})();