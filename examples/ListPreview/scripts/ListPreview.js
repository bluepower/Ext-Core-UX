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
 * @class Ext.ux.ListPreview
 * @extends-ext Ext.util.Observable
 * @author Niko Ni (bluepspower@163.com)
 * @demo http://cz9908.com/showcase/?item=listpreview&p=1
 * @thumbnail http://cz9908.com/thumb/?item=listpreview
 * @version v0.3
 * @create 2010-02-21
 * @update 2010-02-27
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
        this.elId = this.el.id || Ext.id();
        this.displayIndex = [0, 0];

		// init markup
        this.initMarkup();

		// init events
        this.initEvents();
    },

    /**
     * @private
     */
    initMarkup : function() {
		var arr = [];
        
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

        this.previewWrapEl = this.bodyEl.createChild({
            tag : 'div',
            cls : 'ux-list-preview-wrap'
        });

        this.previewMaskEl = this.previewWrapEl.createChild({
            tag : 'div',
            cls : 'ux-list-preview-mask'
        });
        this.previewMaskStyle = {
            left : this.previewMaskEl.getLeft(),
            top : this.previewMaskEl.getTop(),
            width : this.previewMaskEl.getWidth(),
            height: this.previewMaskEl.getHeight()
        };
        this.previewMaskEl.hide();

        this.previewBoxWrapEl = this.previewWrapEl.createChild({
            tag : 'div',
            cls : 'ux-list-preview-box-wrap'
        }).hide();
        this.previewBoxEl = this.previewBoxWrapEl.createChild({
            tag : 'div',
            cls : 'ux-list-preview-box'
        });

        this.previewBtnEl = this.previewWrapEl.createChild({
            tag : 'div',
            cls : 'ux-list-preview-btn'
        }).hide();
        this.prevBtnEl = this.previewBtnEl.createChild({
            tag : 'a',
            cls : 'ux-list-preview-btn-prev',
            href : '#',
            html : '&lt;'
        });
        this.nextBtnEl = this.previewBtnEl.createChild({
            tag : 'a',
            cls : 'ux-list-preview-btn-next',
            href : '#',
            html : '&gt;'
        });        

        // build listpreview menu items
        Ext.each(this.items, function(item, index) {
			Ext.each(item.children, function(subItem, subIndex) {
                var activeCls = '';
                if(subItem.cls && subItem.cls.toLowerCase() == 'current') {
                    this.displayIndex = [index, subIndex];
                    activeCls = ' ux-list-preview-active';
                }

				arr.push({
					tag: 'li',
					children: [{
						tag : 'a',
						id : this.elId + '-' + index + '-' + subIndex,
						cls : 'ux-list-preview-item' + activeCls,
						href : subItem.url || '#',
						title : subItem.tip || subItem.title,
						html : subItem.title
					}]
				});
			}, this);

            this.footerEl.createChild({
                tag : 'div',
                cls : 'ux-list-preview-category',
                children : [{
                    tag : 'h3',
                    html : item.title
                }, {
					tag : 'ul',
					children : arr
				}]
            });

			arr = [];
        }, this);

        this.menuItems = this.footerEl.select('a.ux-list-preview-item');

        // preview box content template
        this.contentTemplate = new Ext.Template([
            '<div class="ux-list-preview-box-content">',
                '<h3>{title}</h3>',
                '<div class="hd"><a href="{url}" target="{target}"><img src="{imageUrl}" alt="{title}" title="{title}" /></a></div>',
                '<div class="bd">{description}</div>',
                '<div class="ft"><a href="{url}" title="Learn More" target="{target}"><span>Learn More</span></a></div>',
            '</div>'
        ]);
    },
    
    /**
     * @private
     */
    initEvents : function() {
        this.showZoomIn();
        this.previewBtnEl.fadeIn({
            duration: 1.5
        });

        this.menuItems.on('click', function(ev, t) {
            ev.preventDefault();
            this.menuItems.removeClass('ux-list-preview-active');
            Ext.fly(t).addClass('ux-list-preview-active').blur();

            this.previewMaskEl.hide();
            this.previewBoxWrapEl.hide();

            // set current item index
            var a = t.id.split('-');
            this.displayIndex = [a[a.length - 2], a[a.length - 1]];

            this.showZoomIn();
        }, this);

        this.prevBtnEl.on('click', function(ev, t) {
            ev.preventDefault();
            this.showSlide(-1);
            this.prevBtnEl.blur();
        }, this);

        this.nextBtnEl.on('click', function(ev, t) {
            ev.preventDefault();
            this.showSlide(1);
            this.nextBtnEl.blur();
        }, this);

        this.previewBoxEl.on('click', function(ev, t) {
            if(t.href.slice(-1) == '#') {
                ev.preventDefault();
            }
            var groupIndex = this.displayIndex.join('-');            
            this.fireEvent('change', t, groupIndex);
        }, this, {
            delegate: 'a'
        });
    },

    /**
     * @private
     */
    showZoomIn : function() {
        this.previewMaskEl.show();
        this.previewMaskEl.setStyle({
            left : '7px',
            top : '285px',
            width: '1px',
            height: '1px'
        });
        this.previewMaskEl.shift({
            x : this.previewMaskStyle.left,
            y : this.previewMaskStyle.top,
            width : this.previewMaskStyle.width,
            height : this.previewMaskStyle.height,
            duration : 0.5,
            callback : this.showCurrItem,
            scope : this
        });
    },

    /**
     * @private
     */
    showSlide : function(step) {
        var a = this.displayIndex,
            index = a[0],
            subIndex = a[1];
        
        if(step == 1) {
            subIndex++;
            if(this.items[index]) {
                if(subIndex > this.items[index].children.length - 1) {
                    index++;
                    if(index > this.items.length - 1) {
                        index = 0;
                    }
                    subIndex = 0;
                }
            } else {
                index = 0;
                subIndex = 0;
            }
        } else {
            subIndex--;
            if(subIndex < 0) {
                index--;
                if(index < 0) {
                    index = this.items.length - 1;
                }
                subIndex = this.items[index].children.length - 1;
            }
        }

        this.displayIndex = [index, subIndex];
        
        this.previewMaskEl.hide();
        this.previewBoxWrapEl.hide();

        this.showZoomIn();

        this.menuItems.removeClass('ux-list-preview-active');
        Ext.fly(this.elId + '-' + index + '-' + subIndex).addClass('ux-list-preview-active');
    },

    /**
     * @private
     */
    showCurrItem : function() {
        var arr = this.displayIndex,
            index = arr[0],
            subIndex = arr[1],
            item = this.items[index].children[subIndex];

        if(!this.footerEl.child('a.ux-list-preview-active')) {
            Ext.fly(this.elId + '-' + index + '-' + subIndex).addClass('ux-list-preview-active');
        }        
        
        if(item) {
            this.previewBoxEl.update('');
            this.contentTemplate.append(this.previewBoxEl, {
                title: item.title,
                imageUrl: item.imageUrl,
                description: item.content,
                url: item.url || '#',
                target: item.target || '_blank'
            });

            this.previewBoxWrapEl.fadeIn();
        }
    }

});  // end of Ext.ux.ListPreview