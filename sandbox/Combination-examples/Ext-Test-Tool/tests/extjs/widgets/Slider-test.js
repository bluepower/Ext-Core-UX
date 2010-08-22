/**
 * Tests Slider
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-24
 * @update 2010-05-25
 */
(function() {

    // TestSuite for Slider
    new Ext.test.TestSuite({
        name : 'Ext.Slider',

        items : [{
            name : 'Constructor and initComponent',

			setUp : function() {
				this.slider = new Ext.Slider();
			},

			tearDown : function() {
				this.slider.destroy();
			},

            testDefaultValues : function() {
                Y.Assert.areEqual(0, this.slider.minValue);
				Y.Assert.areEqual(100, this.slider.maxValue);
				Y.Assert.areEqual(0, this.slider.value);
            },

			testDefaultValueSet : function() {
				var slider = new Ext.Slider({minValue: 50});
				Y.Assert.areEqual(50, slider.value);
			}
        }, {
			name : 'Changing value',

			setUp : function() {
				this.slider = new Ext.Slider({
					minValue: 30,
					maxValue: 90,
					values  : [50, 70],
					renderTo: Ext.getBody()
				});
				this.slider.render();
			},

			tearDown : function() {
				this.slider.destroy();
			},

			testValueChanged : function() {
				this.slider.setValue(0, 60);
				Y.Assert.areEqual(60, this.slider.getValues()[0]);
			},

			testEventFired : function() {
				var executed = false, value, thumb;
                this.slider.on('change', function(slider, v, t) {
                    executed = true;
                    value = v;
                    thumb = t;
                }, this);

                this.slider.setValue(0, 60);
                
				Y.Assert.isTrue(executed);
                Y.Assert.areEqual(60, value);
                Y.Assert.areEqual(this.slider.thumbs[0], thumb);
			}

            //@TODO
		}]
    });

})();