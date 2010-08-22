/**
 * Code rewrite for study and exercise
 * The MIT License
 */

// namespace
Ext.ns('Ext.ux');

/**
 * @class Ext.ux.FingerMenu
 *
 * @author Niko Ni (bluepspower@163.com)
 * @version v0.4
 * @create 2009-06-18
 * @update 2009-06-26
 */
Ext.ux.FingerMenu = Ext.extend(Ext.util.Observable, {
    //------------------------------------------------------------
    // config options
    //------------------------------------------------------------
    /**
     * @config {Array}
     */
    items : [],

    /**
     * @config {Int}
     */
    selectedIndex : 0,

    /**
     * @config {Int}
     */
    expandedX : 0,

    /**
     * @config {Int}
     */
    collapsedX : -150,    

    //------------------------------------------------------------
    // class constructor
    //------------------------------------------------------------
    /**
     * @constructor
     * @param config
     */
    constructor : function(config) {
        Ext.apply(this, config);
        Ext.ux.FingerMenu.superclass.constructor.call(this);

        // add custom event
        this.addEvents('change');

        // initialize
        this.init();
    },

    //------------------------------------------------------------
    // public/private methods
    //------------------------------------------------------------
    /**
     * @private
     */
    init : function() {
		// properties
        //this.items = cfg.items;
        this.hoverX = this.collapsedX + 3;

		// init markup
        this.initMarkup();

		// init events
        this.initEvents();
    },

    /**
     * @private
     */
    initMarkup : function() {
        this.containerEl = Ext.getBody().createChild({
            tag : 'div',
            cls : 'fingermenu-panel menu-example'
        });

        Ext.each(this.items, function(item, index) {
            var isSelected = (index == this.selectedIndex);
            var cfg = {
                tag : 'div',                
                id : 'menuitem-' + index,
                cls : isSelected ? 'fingermenu-show menuitem' : 'menuitem',
                style : {
                    position: 'absolute',
                    width: '190px',
                    top: index * 42 + 'px',
                    left: (isSelected ? this.expandedX : this.collapsedX) + 'px'
                },
                children : [{
                    tag : 'span',
                    cls : item.iconCls ? ('fingermenu-icon ' + item.iconCls) : '',
                    html : item.text,
                    title : item.tip || item.text
                }]
            };
            this.containerEl.createChild(cfg);
        }, this);
    },
    
    /**
     * @private
     */
    initEvents : function() {
        /*
        var eventsConfig = {
            click : this.onItemClick,
            mouseenter : this.onItemHover,
            mouseleave : this.onItemLeave,
            scope : this,
            delegate : 'div.menuitem'
        };
        this.containerEl.on(eventsConfig);
        */
        
        this.containerEl.on('click', this.onItemClick, this, {
            delegate : 'div.menuitem'
        });

        var menuItems = this.containerEl.select('div.menuitem');
        menuItems.on('mouseenter', this.onItemHover, this);
        menuItems.on('mouseleave', this.onItemLeave, this);
    },

    /**
     * @private
     */
    onItemClick : function(ev, t) {
        var target = Ext.get(t);
        if(!target.hasClass('fingermenu-show')) {
            var currExpand = this.containerEl.child('div.fingermenu-show');
            currExpand.setX(this.collapsedX, {
                duration: 0.3
            });

            // NOTE: should collapse first and then radio class
            target.radioClass('fingermenu-show');            
            target.setX(this.expandedX, {
                duration : 0.3,
                callback : function() {
                    this.selectedIndex = parseInt(t.id.split('-').pop(), 10);
                    this.fireEvent.defer(10, this, ['change', this, this.selectedIndex]);
                },
                scope : this
            });
        }
    },

    /**
     * @private
     */
    onItemHover : function(ev, t) {
        var target = Ext.get(t);
        target = target.is('div') ? target : target.up('div');
        if(target.getX() == this.collapsedX) {
            target.setX(this.hoverX, {
                duration : 0.1
            });
        }
    },

    /**
     * @private
     */
    onItemLeave : function(ev, t) {
        var target = Ext.get(t);
        target = target.is('div') ? target : target.up('div');
        if(!target.hasClass('fingermenu-show')) {
            target.setX(this.collapsedX, {
                duration : 0.2
            });            
        }
    }    

});  // end of Ext.ux.FingerMenu