/**
 * Tests FormPanel
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-05-21
 * @update 2010-05-24
 */
(function() {

    var buildForm = function(config) {
        return new Ext.form.FormPanel(config);
    };

    // TestSuite for FormPanel
    new Ext.test.TestSuite({
        name : 'Ext.form.FormPanel',

        /*setUp : function() {
            this.buildForm = function(config) {
                return new Ext.form.FormPanel(config);
            };
        },*/

        items : [{
            name : 'Initialization TestCase',

            testCreateForm : function() {
                var fm = buildForm();
                Y.Assert.isTrue(fm.form instanceof Ext.form.BasicForm);
            },

            testInitItems : function() {
                var FormPanel = Ext.form.FormPanel,
                    proto = FormPanel.prototype,
                    oldFn = proto.initItems,
                    executed = false;

                proto.initItems = function() {
                    executed = true;
                };

                buildForm();
                Y.Assert.isTrue(executed);

                proto.initItems = oldFn;
            },

            testStartMonitoring : function() {
                var FormPanel = Ext.form.FormPanel,
                    proto = FormPanel.prototype,
                    oldFn = proto.startMonitoring,
                    executed = false;

                proto.startMonitoring = function() {
                    executed = true;
                };

                var fm = buildForm({
                    monitorValid : true,
                    renderTo : Ext.getBody()
                });

                fm.render();
                Y.Assert.isTrue(executed);

                proto.startMonitoring = oldFn;
                fm.destroy();
            }
        }, {
            name : 'Destruction TestCase',

            testStopMonitoring : function() {
                var FormPanel = Ext.form.FormPanel,
                    proto = FormPanel.prototype,
                    oldFn = proto.stopMonitoring,
                    executed = false;

                proto.stopMonitoring = function() {
                    executed = true;
                };

                var fm = buildForm({
                    monitorValid : true,
                    renderTo : Ext.getBody()
                });

                fm.render();
                fm.destroy();
                Y.Assert.isTrue(executed);

                proto.stopMonitoring = oldFn;
            }
        }, {
            name : 'InitFields TestCase',

            testIsField : function() {
                var fn = Ext.emptyFn;
                var mockField = {
                    setValue     : fn,
                    getValue     : fn,
                    markInvalid  : fn,
                    clearInvalid : fn
                };

                var fm = buildForm();
                Y.Assert.isTrue(fm.isField(mockField));                
            }
        }]
    });

	//new Ext.test.TestCase({name: 'Test', autoReg: true});

})();