// namespace
//Ext.ns('Ext.ux');

/**
 * @class Ext.ux.FisheyeMenuExtention
 * @extend Ext.ux.FisheyeMenu
 * @author hello2008
 * @version v0.1
 * @create 2010-04-22
 * @update 2010-04-22 
 */
Ext.ux.FisheyeMenuExtention = Ext.extend(Ext.ux.FisheyeMenu, {
    //------------------------------------------------------------
    // class constructor
    //------------------------------------------------------------
    /**
     * @constructor
     * @param config
     * @private
     */
    constructor : function(config) {
        Ext.apply(this, config);
        Ext.ux.FisheyeMenuExtention.superclass.constructor.call(this);
    },

    //------------------------------------------------------------
    // public/private methods
    //------------------------------------------------------------
    /**
	 * Add menu item
     * @param item Config option
     */
	addItem : function(item) {
		var sId = this.el.getAttribute('id') || Ext.id();
		var index = this.containerEl.select('a.ux-fisheye-menu-item').getCount();

		// build fisheye menu item
		var sTitle = this.showTitle === true ? (item.tip || item.text) : '';
		var arr = [{
			tag : 'span',
			html : item.text
		}, {
			tag : 'img',
			src : item.imagePath,
			alt : sTitle
		}];
		if(this.vOrient == 'top') {
			arr = arr.reverse();
		}
		
		this.containerEl.createChild({
			tag : 'a',
			id : sId + '-' + index,
			cls : 'ux-fisheye-menu-item ' + this.vAlignCls,
			href : item.url || '#',
			title : sTitle,
			target : item.target || '_blank',
			children : arr
		});

        this.menuItems = this.containerEl.select('a.ux-fisheye-menu-item');
        this.itemCount = this.menuItems.getCount();
		
        // reset events, hover or not
        this.menuItems.on('mouseover', this.onItemHover, this);
        this.menuItems.on('mouseout', this.onItemOut, this);
	}

});  // end of Ext.ux.FisheyeMenuExtention