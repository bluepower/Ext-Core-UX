Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var logger = new Ext.test.view.Logger({
		region: 'south',
		height: 200,
		split: true,
		minSize: 100
	});
		
	var viewer = new Ext.test.view.ColumnTree({
		region: 'center',
		title: document.title,
		height: 350,
		tbar: [
			{
				xtype: 'teststartbutton',
				tooltip: 'press to start to run tests'
			},
			'-',
			{
				iconCls: 'icon-expand-all',
				tooltip: 'Expand All',
				handler: function() {
					viewer.getRootNode().expand(true);
				}
			},
			'-',
			{
				iconCls: 'icon-collapse-all',
				tooltip: 'Collapse All',
				handler: function() {
					viewer.getRootNode().collapse(true);
				}
			},
			'-',
			{
				iconCls: 'icon-expand-logger',
				tooltip: 'Expand or Collapse Logger',
				enableToggle: true,
				toggleHandler: function(b, pressed) {
					logger[pressed ? 'collapse' : 'expand']();
				}
			},
			'->',
			{
				xtype: 'testprogressbar',
				width: 500
            }
		]
	});
		
	var testViewport = new Ext.Viewport({
		layout : 'border',
		items : [viewer, logger]
	});
		
	testViewport.show();
});