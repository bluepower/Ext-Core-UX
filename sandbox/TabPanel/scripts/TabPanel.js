/*
The MIT License

Copyright (c) 2009-2010 Niko Ni (bluepspower@163.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// namespace
Ext.ns('Ext.ux');

/**
 * @class Ext.ux.TabPanel
 * @extends-ext Ext.util.Observable
 * @author Niko Ni (bluepspower@163.com)
 * @demo http://cz9908.com/showcase/?item=tab-panel&p=1
 * @version v0.1
 * @create 2010-04-28
 * @update 2010-04-28
 */
Ext.ux.TabPanel = Ext.extend(Ext.util.Observable, {
    //------------------------------------------------------------
    // config options
    //------------------------------------------------------------
    /**
     * @cfg {Array} items Array of tabpanel config object items.
     */
    items : [],

    /**
     * @cfg {Mixed} renderTo The container element.
     */
    renderTo : document.body,

	/**
	 * @cfg {Number} tabWidth The default width of each tab
	 */
	tabWidth : 120,

	/**
	 * @cfg {Number} width The width of tabpanel.
	 */
	width : '100%',

	/**
	 * @cfg {Number} height The height of tabpanel.
	 */
	height : '100%',

	/**
	 * @cfg {Number} activeIndex The active tab item index.
	 */
	activeIndex : 0,

	/**
	 * @cdg {Boolean} showBorder Whether to show border of tabpanel
	 */
	showBorder : true,

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
        Ext.ux.TabPanel.superclass.constructor.call(this);

        // add custom event
        this.addEvents(
            /**
             * @event change
             * Fires when tab item is clicked
             * @param {Ext.ux.TabPanel} this
             * @param {Object} activeItem
             * @param {Number} index
             */
            //'change'
        );

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
        this.el = Ext.get(this.renderTo);
        //this.activeItem = this.items[this.displayIndex];

        // init markup
        this.initMarkup();

        // init events
        this.initEvents();
    },

    /**
     * @private
     */
    initMarkup : function() {
		this.el.setWidth(this.width);
		this.el.setHeight(this.height);

        // tabpanel container
        this.containerEl = this.el.createChild({
            tag : 'div',
            cls : 'ux-tab-panel-container',
			children : [{
				tag : 'div',
				cls : 'ux-tab-panel-header'
			}, {
				tag : 'div',
				cls : 'ux-tab-panel-content'
			}]
        });

		/*
        // inner message element
        this.innerEl = this.containerEl.createChild({
            tag : 'div',
            cls : this.msgInnerCls
        });

        // message link element
        var currItem = this.activeItem;
        this.innerEl.createChild({
            tag : 'a',
            href : currItem.url || '#',
            html : currItem.content,
            title : currItem.tip || currItem.content,
            target : currItem.target || '_blank'
        });
		*/
    },
    
    /**
     * @private
     */
    initEvents : function() {        
        // set hover action, equal to addClassOnOver
        /*this.innerEl.hover(function() {
            Ext.fly(this).addClass(hoverCls);
        }, function() {
            Ext.fly(this).removeClass(hoverCls);
        });

        this.containerEl.on('click', function(ev, t) {
            if(t.href.slice(-1) == '#') {
                ev.preventDefault();
            }
            this.fireEvent('change', this.activeItem, this.displayIndex);
        }, this, {
            delegate : 'a'
        });*/
    }

});  // end of Ext.ux.TabPanel