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
 * @class Ext.ux.ErrorList
 * @singleton
 * @author Niko Ni (bluepspower@163.com)
 * @demo http://cz9908.com/showcase/?item=errorlist&p=1
 * @version v0.2
 * @create 2010-02-06
 * @update 2010-02-09
 */
Ext.ux.ErrorList = (function() {
    //----------------------------------------------------------------
    // private properties/methods
    //----------------------------------------------------------------
    var errInputCls, errLabelCls,
		errMsg, errHeader,
		containerEl, topInsertEl, bottomInsertEl,
		highlightEl, highlightLabelEl,
        /**
         * @private
         */
        init = function(config) {
            containerEl = config['container'] || Ext.getBody();
            errMsg = config['errorMessage'] || 'error field';
            errInputCls = config['errorInputClass'] || 'ux-errorlist-error-input';
            errLabelCls = config['errorLabelClass'] || 'ux-errorlist-error-label';
            errHeader = config['headerInfo'] || 'One or more fields below may contain errors. Please review.';

            // markup
            topInsertEl = Ext.get(config['topInsert']);
            bottomInsertEl = Ext.get(config['bottomInsert']);
            highlightEl = Ext.get(config['highlight']) || bottomInsertEl;  // optional
            highlightLabelEl = Ext.get(config['highlightLabel']);  // optional
        },

        /**
         * @private
         */
        hightlight = function(el, cls) {
            if(Ext.isArray(el)) {
                Ext.each(el, function(item) {
                    Ext.fly(item).addClass(cls);
                });
            } else {
                Ext.fly(el).addClass(cls);
            }
        };    

    return {
        //------------------------------------------------------------
        // public methods
        //------------------------------------------------------------
        /**
         * Show error messaging for error container
         * @param {Object} config Config options
         */
        show : function(config) {
            init(config);

            // top error container
            if(topInsertEl && containerEl.select('div.ux-errorlist-error-container').getCount() == 0) {
                Ext.DomHelper.insertAfter(topInsertEl, {
                    tag : 'div',
                    cls : 'ux-errorlist-error-container',
                    html : '<img align="absmiddle" class="ux-errorlist-big-warning" src="images/s.gif" alt="' + errHeader + '" title="' + errHeader + '" />' + errHeader
                });				
            }

            // bottom error messaging
            if(bottomInsertEl) {
                var bottomEl = Ext.DomHelper.insertAfter(bottomInsertEl, {
                    tag : 'div',
                    cls : 'ux-errorlist-error-field',
                    html : '<img align="absmiddle" class="ux-errorlist-tiny-warning" src="images/s.gif" alt="' + errMsg + '" title="' + errMsg + '" />' + errMsg
                });
				Ext.fly(bottomEl).slideIn('l');

                // highlight elements
                hightlight(highlightEl, errInputCls);

                // highlight label elements
                if(highlightLabelEl) {
                    hightlight(highlightLabelEl, errLabelCls);
                }
            }
        },

        /**
         * Clear error messaging
         * @param {Mixed} el (Optional) The container element to clear error messaging
         */
        clear : function(el) {
            var container = Ext.get(el) || Ext.getBody(),
                removeItems = function(selector, flag) {
                    Ext.each(container.select(selector), flag ? function(item) {
                        item.removeClass(selector.split('.').pop());
                    } : function(item) {
                        item.remove();
                    });
                };

            // remove top error container and error fields
            removeItems('div.ux-errorlist-error-container', null);
            removeItems('div.ux-errorlist-error-field', null);
            
            // remove highlight classNames
            removeItems('.ux-errorlist-error-input', 'CSS');
            removeItems('.ux-errorlist-error-label', 'CSS');
        }
    };

})();  // end of Ext.ux.ErrorList