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
 * @class Ext.ux.StarRating
 * @extends-ext Ext.util.Observable
 * @author Niko Ni (bluepspower@163.com)
 * @demo http://cz9908.com/showcase/?item=star-rating&p=1
 * @version v0.9
 * @create 2009-06-15
 * @update 2010-09-03
 */
Ext.ux.StarRating = Ext.extend(Ext.util.Observable, {
    //------------------------------------------------------------
    // config options
    //------------------------------------------------------------
    /**
     * @cfg {Mixed} renderTo The container element.
     */
    renderTo : document.body,
    
    /**
     * @cfg {Boolean} resetable Whether to enable the reset function.
     */
    resetable : false,

    /**
     * @cfg {Boolean} disabled Whether to set the disabled status.
     */
    disabled : false,

    /**
     * @cfg {Boolean} showTip Whether to show the tooltip.
     */
    showTip : true,

    /**
     * @cfg {Number} splitCount The split count.
     */
    splitCount : 1,

    /**
     * @cfg {Number} defaultSelectedIndex The default selected index.
     */
    defaultSelectedIndex : -1,

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
        Ext.ux.StarRating.superclass.constructor.call(this);

        // add custom event
        this.addEvents(
            /**
             * @event change
             * Fires when star rating item is clicked
             * @param {Ext.ux.StarRating} this
             * @param {Object} activeItem
             * @param {Number} value
             */
            'change',

            /**
             * @event reset
             * Fires when star rating item is reset
             */                
            'reset'
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
        this.values = [];
        this.titles = [];
        this.stars = [];
        this.radios = this.el.select('input[type=radio]');
        this.starWidth = 16;
        this.currSelectedIndex = -1;
        this.hoverState = false;

		// init markup
        this.initMarkup();

		// init events
        this.initEvents();
    },

    /**
     * @private
     */
    initMarkup : function() {        
        // rating container
        this.containerEl = this.el.createChild({
            tag : 'div',
            cls : 'ux-rating-container clearfix'
        });

        // reset element
        if(this.resetable) {
            this.resetEl = this.containerEl.createChild({
                tag : 'div',
                cls : 'ux-rating-reset',
                children : [{
                    tag : 'a',
                    title : this.showTip ? 'Reset the vote' : '',
                    html : 'Reset'
                }]
            });
        }

        // init stars
        this.radios.each(this.initStar, this);
        this.radios.remove();        

        // hidden input
        this.input = this.containerEl.createChild({
            tag : 'input',
            type : 'hidden',
            value : ''
        });
        this.input.dom.name = this.name;
    },
    
    /**
     * @private
     */
    initEvents : function() {
        // init reset elements
        if(this.resetable) {
            this.resetEl.visibilityMode = Ext.Element.DISPLAY;

            this.resetEl.hover(function() {
                Ext.fly(this).addClass('ux-rating-reset-hover');
            }, function() {
                Ext.fly(this).removeClass('ux-rating-reset-hover');
            });

            this.resetEl.on('click', function() {
                this.select(-1);
                this.fireEvent('reset');
            }, this);
        }

        // set default select
        this.select(this.defaultSelectedIndex);

        // set state enable or disable
        if(this.disabled) {
            this.setStatus(false);
        } else {
            this.setStatus(true);
        }        
    },

    /**
     * @private
     */
    initStar : function(item, all, i) {
        var itemDom, starEl, starLinkEl, unitWidth, odd;

        itemDom = item.dom;
        if(i == 0) {
            this.name = itemDom.name;
			if(!this.disabled) {
				this.disabled = itemDom.disabled;
			}
        }

        this.values.push(itemDom.value);
        this.titles.push(itemDom.title);

        if(item.dom.checked) {
            this.defaultSelectedIndex = i;
        }

        starEl = this.containerEl.createChild({
            tag : 'div',
            cls : 'ux-rating-star'
        });
        starLinkEl = starEl.createChild({
            tag : 'a',
            html : this.values[i],
            title : this.showTip ? this.titles[i] : ''
        });
        
		// unit width
        unitWidth = Math.floor(this.starWidth / this.splitCount);
        odd = (i % this.splitCount);
        starEl.setWidth(unitWidth);
        starLinkEl.setStyle({
            'margin-left' : (-1 * odd * unitWidth) + 'px'
        });

        this.stars.push(starEl.dom);
    },

    /**
     * @private
     */
    onStarClick : function(ev, t) {
        this.select(this.stars.indexOf(t));
    },

    /**
     * @private
     */
    onStarOver : function(ev, t) {
        this.hoverState = true;
        this.fill(this.stars.indexOf(t), 'hover');
    },

    /**
     * @private
     */
    onStarOut : function(ev, t) {
        this.hoverState = false;
        this.fill(this.currSelectedIndex);
    },    

    /**
     * @private
     */
    select : function(index) {
        if(index == -1) {
            this.currSelectedIndex = -1;
            this.input.dom.value = '';
            this.fill(-1);
        }
        if(index != this.currSelectedIndex) {
            this.currSelectedIndex = index;
            this.value = this.values[index];
            this.star = this.stars[index];

            this.input.dom.value = this.value;

            this.hoverState = false;
            this.fill(index);

            // fire custom event
            this.fireEvent('change', this.star, this.value);
        }
    },

    /**
     * @private
     */
    fill : function(index, flag) {
        var addCls, removeCls;

        addCls = this.hoverState ? 'ux-rating-star-hover' : 'ux-rating-star-on';
        removeCls = this.hoverState ? 'ux-rating-star-on' : 'ux-rating-star-hover';

        if(index != -1) {
            Ext.each(this.stars.slice(0, index + 1), function() {
                if(!flag) {
                    Ext.fly(this).removeClass(removeCls).addClass(addCls);
                } else {
                    Ext.fly(this).replaceClass(removeCls, addCls);
                }
            });

            Ext.each(this.stars.slice(index + 1), function() {
                if(!flag) {
                    Ext.fly(this).removeClass([removeCls, addCls]);
                } else {
                    Ext.fly(this).removeClass(addCls);
                }
            });
        } else {
            this.containerEl.select('div.ux-rating-star').removeClass([removeCls, addCls]);
        }
    },    

    /**
     * @private
     */
    setStatus : function(isEnable) {
        if(this.resetable) {
            if(isEnable) {
                this.resetEl.show();
            } else {
                this.resetEl.hide();
			}
        }

        this.input.dom.disabled = (isEnable !== true);
        this.disabled = !isEnable;

        var eventsConfig = {
            click : this.onStarClick,
            mouseover : this.onStarOver,
            mouseout : this.onStarOut,
            scope : this,
            delegate : 'div.ux-rating-star'
        };

        if(isEnable) {
            this.containerEl.removeClass('ux-rating-disabled');
            this.containerEl.on(eventsConfig);
        } else {
            this.containerEl.addClass('ux-rating-disabled');
            this.containerEl.un(eventsConfig);
        }
    }
});  // end of Ext.ux.StarRating