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
 * @class Ext.ux.MorphList
 * @extends-ext Ext.util.Observable
 * @author Niko Ni (bluepspower@163.com)
 * @demo http://cz9908.com/showcase/?item=morphlist&p=1
 * @thumbnail http://cz9908.com/thumb/?item=morphlist
 * @version v0.3
 * @create 2010-01-06
 * @update 2010-02-14
 */
Ext.ux.MorphList = Ext.extend(Ext.util.Observable, {
    //------------------------------------------------------------
    // config options
    //------------------------------------------------------------
    /**
     * @cfg {Array} items Array of morphlist config object items.
     */
    items : [],

	/**
	 * @cfg {Mixed} renderTo The container element.
	 */
	renderTo : document.body,

    /**
     * @cfg {String} easing A valid Ext.lib.Easing value for the effect.
     */
    easing : 'backOut',

    /**
     * @cfg {Number} duration The length of time (in seconds) that the effect should last
     */
    duration : 1,

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
        Ext.ux.MorphList.superclass.constructor.call(this);

        // add custom event
        this.addEvents(
			/**
		     * @event change
			 * Fires when morphlist item is clicked
			 * @param {Ext.ux.MorphList} this
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
            cls : 'ux-morphlist-container'
        });

        this.listEl = this.containerEl.createChild({
            tag : 'ul'
        });

        var sId = this.el.id || Ext.id();

        // build morphlist menu items
        Ext.each(this.items, function(item, index) {
            this.listEl.createChild({
                tag : 'li',
                cls : item.cls || '',
                children : [{
                    tag : 'a',
                    id : sId + '-' + index,
                    cls : 'ux-morphlist-item',
                    href : item.url || '#',
                    title : item.tip || item.text,
                    target : item.target || '_blank',
                    html : item.text
                }]
            });
        }, this);

        this.morphEl = this.listEl.createChild({
            tag : 'li',
            cls : 'ux-morphlist-background',
            children : [{
                tag : 'div',
                cls : 'ux-morphlist-inner'
            }]
        });

        this.menuItems = this.containerEl.select('a.ux-morphlist-item');
    },
    
    /**
     * @private
     */
    initEvents : function() {
        this.menuItems.on('mouseenter', function(ev, t) {
            this.setMorphTo(Ext.fly(t));
        }, this);
        
        this.menuItems.on('mouseleave', function(ev, t) {
            this.setMorphTo(this.currentEl);
        }, this);

        this.menuItems.on('click', function(ev, t) {
			t.blur();
            if(t.href.slice(-1) == '#') {
                ev.preventDefault();
            }
            this.setCurrItem(Ext.get(t), true);
            var index = parseInt(t.id.split('-').pop(), 10);
            this.fireEvent('change', t, index);
        }, this);

        this.setCurrItem(this.containerEl.child('.current a.ux-morphlist-item'), true);
    },

    /**
     * @private
     */
    setCurrItem : function(el, effect) {
        if(el && !this.currentEl) {
            var wrapEl = el.up('li');
            this.morphEl.setStyle({
                left: wrapEl.dom.offsetLeft + 'px',
                top: wrapEl.dom.offsetTop + 'px',
                width: wrapEl.getWidth() + 'px',
                height: wrapEl.getHeight() + 'px'
            });
            
			effect ? this.morphEl.fadeIn() : this.morphEl.fadeOut();
        }

        this.containerEl.select('li').removeClass('current');

        if(el) {
            this.currentEl = el;
            this.currentEl.up('li').addClass('current');
        }
    },

    /**
     * @private
     */
    setMorphTo : function(target) {
        if(!this.currentEl) {
            return false;
        }

        var targetEl = Ext.fly(target).up('li');
        this.morphEl.syncFx();
        this.morphEl.shift({
            x: targetEl.getX(),
            y: targetEl.getY(),
            width: targetEl.getWidth(),
            height: targetEl.getHeight(),
            easing: this.easing,
            duration: this.duration
        });
    }

});  // end of Ext.ux.MorphList