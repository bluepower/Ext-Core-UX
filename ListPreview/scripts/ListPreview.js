/*
The MIT License

Copyright (c) 2009 Niko Ni (bluepspower@163.com)

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
 * @class Ext.ux.ListPreview
 * @extends-ext Ext.util.Observable
 * @author Niko Ni (bluepspower@163.com)
 * @demo http://cz9908.com/showcase/?item=listpreview&p=1
 * @version v0.1
 * @create 2010-02-21
 * @update 2010-02-22
 */
Ext.ux.ListPreview = Ext.extend(Ext.util.Observable, {
    //------------------------------------------------------------
    // config options
    //------------------------------------------------------------
    /**
     * @cfg {Array} items Array of listpreview config object items.
     */
    items : [],

	/**
	 * @cfg {Mixed} renderTo The container element.
	 */
	renderTo : document.body,

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
        Ext.ux.ListPreview.superclass.constructor.call(this);

        // add custom event
        this.addEvents(
			/**
		     * @event change
			 * Fires when listpreview item is clicked
			 * @param {Ext.ux.ListPreview} this
			 * @param {Object} activeItem
			 * @param {Number} index
			 */
			'change'
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

		// init markup
        this.initMarkup();

		// init events
        this.initEvents();
    },

    /**
     * @private
     */
    initMarkup : function() {
        this.containerEl = this.el.createChild({
            tag : 'div',
            cls : 'ux-list-preview-container',
			children : [{
				tag : 'div',
				cls : 'ux-list-preview-hd'
			}, {
				tag : 'div',
				cls : 'ux-list-preview-bd'			
			}, {
				tag : 'div',
				cls : 'ux-list-preview-ft'				
			}]
        });

		this.bodyEl = this.containerEl.child('.ux-list-preview-bd');
		this.footerEl = this.containerEl.child('.ux-list-preview-ft');

        var sId = this.el.id || Ext.id();
		var arr = [];

        // build listpreview menu items
        Ext.each(this.items, function(item, index) {
			Ext.each(item.children, function(subItem, subIndex) {
				arr.push({
					tag: 'li',
					children: [{
						tag : 'a',
						id : sId + '-' + index + '-' + subIndex,
						cls : 'ux-list-preview-item',
						href : subItem.url || '#',
						title : subItem.tip || subItem.title,
						html : subItem.title
					}]
				});				
			});

            this.footerEl.createChild({
                tag : 'div',
                cls : 'ux-list-preview-category',
                children : [{
                    tag : 'h3',
                    //id : sId + '-' + index,
                    //cls : 'ux-list-preview-item',
                    //href : item.url || '#',
                    //title : item.tip || item.title,
                    html : item.title
					//children : arr
                }, {
					tag : 'ul',
					children : arr
				}]
            });

			arr = [];
        }, this);

        this.menuItems = this.containerEl.select('a.ux-list-preview-item');
    },
    
    /**
     * @private
     */
    initEvents : function() {
        //this.menuItems.on('click', function(ev, t) {
            //if(t.href.slice(-1) == '#') {
                //ev.preventDefault();
            //}
            //this.setCurrItem(Ext.get(t), true);
            //var index = parseInt(t.id.split('-').pop(), 10);
            //this.fireEvent('change', t, index);
        //}, this);
    }

});  // end of Ext.ux.ListPreview