      Ext.onReady(function(){
        Ext.QuickTips.init();

        var grid = new Ext.test.view.Logger({
            region: 'south',
            height: 200,
            split: true,
            minSize: 100
        });

        var viewer = new Ext.test.view.ColumnTree({
            region: 'center',
            title: document.title,
            height: 350,
            tbar: [{
                xtype: 'teststartbutton'
            }, '->', {
                xtype: 'testprogressbar',
                width: 500
            }]
        });

        var testViewport = new Ext.Viewport({
            layout : 'border',
            items : [viewer,grid]
        });

        testViewport.show(); 
      },this);