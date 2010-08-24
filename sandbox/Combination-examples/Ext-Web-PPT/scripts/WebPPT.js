Ext.ns('App');

App.arrItems = [];

App.WebPPT = function(config) {
	var rootPath = config.rootPath,
		slideTreeData = rootPath + '/' + config.dataUrl,
		defaultSlide = rootPath + '/' + config.rootSlide;

	Ext.BLANK_IMAGE_URL = 'images/s.gif';
    Ext.QuickTips.init();

	App.WebPPT.superclass.constructor.call(this, {
		layout: 'border',
		items: [{
			region: 'north',
			id: 'web-ppt-header',
			height: 40,
			border: false,
			html: '<a href="#" id="ext-logo">Ext Web PPT</a>'
		},{
			region: 'west',
			autoScroll: true,
			id: 'moduleTree',
			xtype: 'treepanel',
			useArrows: true,
			plugins: [
                new Ext.ux.TreeOutliner({
				    outlineStyle: [
                        Ext.ux.TreeOutlineFormats.roman, 
                        Ext.ux.TreeOutlineFormats.numeric
                    ],
				    delimiter: '. '
			    })
            ],
			split: true,			
			width: 250,
			rootVisible: false,
			root: new Ext.tree.AsyncTreeNode(),
			loader: new Ext.tree.TreeLoader({
				url: slideTreeData
			}),
			bbar: [{
                tooltip: 'Expand all folders',
                iconCls: 'tree-expand',
                handler: function() {
                    Ext.getCmp('moduleTree').expandAll()
                }
            }, '-', {
                tooltip: 'Collapse all folders',
                iconCls: 'tree-collapse',
                handler: function() {
                    Ext.getCmp('moduleTree').collapseAll()
                }
            }]
		},{
			region: 'center',
			id: 'content',
			autoScroll: true,
			autoLoad: defaultSlide,
			bbar: [{
                tooltip: 'Display options',
                iconCls: 'options',
                menu: {
                    id: 'options-menu',
                    items: [{
                        text: 'Increase font size',
                        iconCls: 'font-inc',
                        handler: this.changeSize.createDelegate(this, [2]),
                        hideOnClick: false
                    }, {
                        text: 'Decrease font size',
                        iconCls: 'font-dec',
                        handler: this.changeSize.createDelegate(this, [-2]),
                        hideOnClick: false
                    }, {
                        text: 'Reset font size',
                        iconCls: 'font-reset',
                        handler: this.resetSize.createDelegate(this)
                    }, '-', {
                        id: 'toggle',
                        text: 'Maximize slide area',
                        iconCls: 'screen-maximize',
                        handler: this.toggleFullScreen
                    }]
                }
            }, {
				id: 'launchExampleBtn',
				text: 'Launch Example',
				icon: 'images/eye.png',
				cls: 'x-btn-text-icon',
				disabled: true,
				handler: this.launchExample,
				scope: this
			}, '->', {
                iconCls: 'nav-prev',
                disabled: true,
                id: 'prevBtn', 
                handler: this.navigate.createDelegate(this, [-1])
            }, {
                iconCls: 'nav-next',
                disabled: true,
                id: 'nextBtn',
                handler: this.navigate.createDelegate(this, [1])
            }]
		}]
	});

    var tp = Ext.getCmp('moduleTree'),
        moduleSm = tp.getSelectionModel(),
        fnCallback = config.callback;

    if(typeof fnCallback == 'function') {
        tp.getLoader().on('load', function() {
            App.arrItems = tp.root.item(0).attributes.children;
            fnCallback();
        });
    }
    
    moduleSm.on('selectionchange', this.onSelectionChange, this, {buffer: 100});

	tp.expandAll();
};

Ext.extend(App.WebPPT, Ext.Viewport, {
	onSelectionChange : function(sm, node) {
		var content = Ext.getCmp('content');
		var depth = node.getDepth();
		if (depth === 1) {
			if (!node.expanded) {
				node.expand(null, null, function(){
					sm.selectNext();
				});
			}else{
				sm.selectNext();
			}
		} else if (depth === 2) {
			var idx = node.parentNode.indexOf(node);
			var folderName = node.parentNode.attributes.folder;
			var page = String.format('{0}/{1}', folderName, node.attributes.filename);
			content.load(page);

			var mth = node.attributes.exampleUrl ? 'enable' : 'disable';
			Ext.getCmp('launchExampleBtn')[mth]();
			var prevStatus = idx ? 'enable' : 'disable';
			Ext.getCmp('prevBtn')[prevStatus]();
			Ext.getCmp('nextBtn').enable();
		}
	},
    
	navigate : function(delta) {
		var moduleSm = Ext.getCmp('moduleTree').getSelectionModel();
		if (delta > 0) {
			moduleSm.selectNext();
		}else{
			moduleSm.selectPrevious();
		}
	},
    
    toggleFullScreen: function() {
        var method = this.fullScreen ? 'show' : 'hide';
        Ext.getCmp('moduleTree')[method]();
        Ext.getCmp('ext-training-header')[method]();
        Ext.getCmp('moduleTree').ownerCt.doLayout();
        var t = Ext.getCmp('toggle');
        t.setIconClass(this.fullScreen ? 'screen-maximize' : 'screen-restore');
        t.setText(this.fullScreen ? 'Maximize slide area' : 'Restore default layout');
        this.fullScreen = !this.fullScreen;
    },
    
    changeSize : function(val) {
        var rule = Ext.util.CSS.getRule('#content', true);
        var size = parseInt(rule.style.getPropertyValue('font-size'));
        if(!this.fontSize){
            this.fontSize = size;
        }
        Ext.util.CSS.updateRule('#content', 'fontSize', size + val + 'px');
    },
    
    resetSize : function(){
        Ext.util.CSS.updateRule('#content', 'fontSize', (this.fontSize || 14) + 'px');
    },
	
	launchExample: function() {
		var sm = Ext.getCmp('moduleTree').getSelectionModel();
		var n = sm.getSelectedNode();
		window.open(n.attributes.exampleUrl);
	}
});