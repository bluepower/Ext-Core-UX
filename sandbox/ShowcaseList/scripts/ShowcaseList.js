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
 * @class Ext.ux.ShowcaseList
 * @extends-ext Ext.util.Observable
 * @author Niko Ni (bluepspower@163.com)
 * @demo http://cz9908.com/showcase/?item=showcase-list&p=1
 * @version v0.2
 * @create 2010-03-26
 * @update 2010-03-26
 */
Ext.ux.ShowcaseList = Ext.extend(Ext.util.Observable, {
    //------------------------------------------------------------
    // config options
    //------------------------------------------------------------
    /**
     * @cfg {Array} items Array of showcase list config object items.
     */
    items : [],

    /**
     * @cfg {Mixed} renderTo The container element.
     */
    renderTo : document.body,

    /**
     * @cfg {String} title The title of showcase.
     */
	title : 'Showcase List',

    /**
     * @cfg {String} menuEl The menu container element.
     */
	menuEl : 'sample-menu-inner',

    /**
     * @cfg {String} contentEl The content container element.
     */
	contentEl : 'sample-box-inner',

    /**
     * @cfg {String} controlBarEl The controlBar container element.
     */
	controlBarEl : 'samples-cb',
	
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
		Ext.ux.ShowcaseList.superclass.constructor.call(this);

        // add custom event
        this.addEvents(
            /**
             * @event change
             * Fires when showcase list item is clicked
             * @param {Ext.ux.ShowcaseList} this
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
        this.bound = false;

        // init markup
        this.initMarkup();

        // init events
        this.initEvents();
    },

    /**
     * @private
     */
	initMarkup : function() {
		this.initTemplates();

		this.containerEl = this.el.createChild({
			tag: 'div',
			cls: 'ux-showcase-list-container',
			id: 'bd',
			children: [{
				tag: 'h3',
				cls: 'samples-title',
				html: this.title
			}, {
				tag: 'div',
				id: 'samples',
				children: [{
					tag: 'div',
					id: this.controlBarEl,
					children: [{
						tag: 'img',
						cls: 'normal-view',
						src: 'images/s.gif',
						title: 'Full view with descriptions'
					}, {
						tag: 'img',
						cls: 'condensed-view',
						src: 'images/s.gif',
						title: 'Condensed view'
					}, {
						tag: 'img',
						cls: 'mini-view',
						src: 'images/s.gif',
						title: 'Mini view'
					}]
				}, {
					tag: 'div',
					id: 'sample-menu'
				}, {
					tag: 'div',
					id: 'sample-box'
				}]
			}]
		});

		Ext.fly('sample-menu').createChild({
			tag: 'div',
			id: this.menuEl
		});

		Ext.fly('sample-box').createChild({
			tag: 'div',
			id: this.contentEl,
			children: [{
				tag: 'div',
				id: 'sample-ct'
			}]
		});
		
		this.menu = Ext.get(this.menuEl);
		this.ct = Ext.get(this.contentEl);
		this.cb = Ext.get(this.controlBarEl);

		Ext.each(this.items, function(item, index) {
			item.id = 'sample-' + index;

			var cfg = {
				id: item.id,
				title: item.title			
			};
			this.ctTemplate.append('sample-ct', cfg);
			this.menuTemplate.append(this.menu, cfg);

			var itemContainer = Ext.get('sample-ct-' + item.id);
			if(itemContainer) {
				Ext.each(item.samples, function(sample) {
					this.ctItemTemplate.append(itemContainer, {
						text: sample.text,
						url: sample.url,
						icon: sample.icon,
						desc: sample.desc					
					});
				}, this);

				itemContainer.insertHtml('beforeEnd', '<div class="x-clear"></div>');
			}
		}, this);
	},

	initEvents : function() {
		this.ct.on('mouseover', function(ev, t) {
			var target = Ext.fly(ev.getTarget('dd'));
			if(target) {
				target.addClass('over');
			}
		});

		this.ct.on('mouseout', function(ev, t) {
			var target = Ext.fly(ev.getTarget('dd'));
			if(target) {
				target.removeClass('over');
			}
		});

		this.ct.on('click', function(ev, t) {
			var item = ev.getTarget('dd'),
				title = ev.getTarget('h2');
			if(item) {
				var url = Ext.fly(item).getAttributeNS('ext', 'url');
				if(url) {
					window.open(url.indexOf('http') == -1 ? '../' + url : url);
					// @TODO - custom event
				}
			}

			if(title) {
				Ext.fly(title).up('div').toggleClass('collapsed');
			}
		}, this);

		this.menu.on('click', function(ev, t) {
			ev.preventDefault();
			
			var item = ev.getTarget('a');
			if(item && this.bound) {
				Ext.get(item).radioClass('active');
				this.bindScroll(false);

				var ctItem = Ext.getDom('sample-' + item.id.split('-').pop());
				if(ctItem) {
					this.ct.animate(
						{
							scroll: {
								to : [0, ctItem.offsetTop]
							}
						},
						0.3,
						this.bindScroll.createDelegate(this, [true]),
						'easeOut',
						'scroll'
					)
				}
			}
			
		}, this);

		this.cb.on('click', function(ev, t) {
			var img = ev.getTarget('img');
			if(img) {
				Ext.getDom('samples').className = img.className;
				this.calcScrollPosition.defer(10, this);
			}
		}, this);

		this.bindScroll(true);

		this.activate(this.items[0].id);
	},

	initTemplates : function() {		
		this.ctTemplate = new Ext.Template([
			'<div>',
			  '<a name="{id}" id="{id}"></a><h2><div unselectable="on">{title}</div></h2>',
			  '<dl id="sample-ct-{id}"></dl>',
			'</div>'
		]);

		this.ctItemTemplate = new Ext.Template([
			'<dd ext:url="{url}">',
			  '<img title="{text}" src="images/{icon}" />',
			  '<div><h4>{text}</h4><p>{desc}</p></div>',
			'</dd>'
		]);

		this.menuTemplate = new Ext.Template([
			'<a href="#" hidefocus="on" id="menu-{id}">{title}</a>'
		]);
	},

	calcScrollPosition : function() {
		var last, found = false;

		this.ct.select('a', true).each(function(item) {
			last = item;

			if(item.getOffsetsTo(this.ct)[1] >= -10) {
				this.activate(item.dom.id);
				found = true;
				return false;
			}
		}, this);

		if(!found) {
			this.activate(last.dom.id);
		}
	},

	bindScroll : function(flag) {
		if(flag) {
			this.ct.on('scroll', this.calcScrollPosition, this, { buffer: 250 });
			this.bound = true;
		} else {
			this.ct.un('scroll', this.calcScrollPosition, this);
			this.bound = false;
		}
	},

	activate : function(id) {
		Ext.get('menu-' + id).radioClass('active');
	}

});  // end of Ext.ux.ShowcaseList