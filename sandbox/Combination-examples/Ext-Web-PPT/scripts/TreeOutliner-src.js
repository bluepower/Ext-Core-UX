// namespace
Ext.ns('Ext.ux');

/**
 * Tree Outline Formatting functions
 * Typical tree outlining functions will be called with this
 * signature myFormatFn(idx, depth). These can be overloaded
 * to support any type of formatting.
 * @singleton
 */
Ext.ux.TreeOutlineFormats = function() {
	var romanOnes = ['','i','ii','iii','iv','v','vi','vii','viii', 'ix'],
		romanTens = ['','x','xx','xxx','xl','l','lx','lxx','lxxx','xc'],
		romanHundreds = ['', 'c', 'cc', 'ccc', 'cd', 'd', 'dc', 'dcc', 'dcc', 'cm'],
		romanNumerals = [romanOnes, romanTens, romanHundreds];	

	return {
		/**
		 * Converts indexes to a roman numeral
		 * Limitation: 999 items
		 */
		roman : function(idx) {
			var buf = [];
			var strArr = new String(++idx).split('');
			strArr.reverse();
			for (var i = 0; i < strArr.length; i++) {
				buf.unshift(romanNumerals[i][strArr[i]]);
			}
			return buf.join('');	
		},
		/**
		 * Converts 0-based index to 1-based index
		 */
		numeric : function(idx) {
			return ++idx;
		},
		/**
		 * Converts indexes to an uppercase letter, after reaching Z
		 * it will cycle and append the next letter.
		 * Limitation: None
		 * Ex:
		 * 	0 -> A
		 *  12 -> M
		 *  28 -> AC
		 */
		alphaUC : function(idx) {
			var buf = [];
			var ln = Math.ceil((idx + 1) / 26);
			for (var i = 0; i < ln; i++) {
				var digit = (idx % 26);
				idx -= digit;
				buf.unshift(String.fromCharCode(digit + 65));
			}
			return buf.join('');
		},
		/**
		 * Converts indexes to a lowercase letter, after reaching z
		 * it will cycle and append the next letter.
		 * Limitation: None
		 * Ex:
		 * 	0 -> a
		 *  12 -> m
		 *  28 -> ac
		 */
		alpha : function(idx) {
			var buf = [];
			var ln = Math.ceil((idx + 1) / 26);
			for (var i = 0; i < ln; i++) {
				var digit = (idx % 26);
				idx -= digit;
				buf.unshift(String.fromCharCode(digit + 97));
			}
			return buf.join('');
		},		
		/**
		 * Retrieves value of a user-defined array to generate
		 * custom outlining. If there are not enough elements
		 * it will cycle and append.
		 */
		indexed : function(idx, arr) {
			var buf = [];
			var arrLn = arr.length;
			var ln = Math.ceil((idx + 1) / arrLn);
			for (var i = 0; i < ln; i++) {
				var modIdx = (idx % arrLn);
				idx -= modIdx;
				buf.unshift(arr[modIdx]);
			}
			return buf.join('');			
		}
	};
}();

/**
 * Plugin to provide Word-style outlines for trees.
 * Also allows for custom arrays and functions to define
 * the formatting of the outlines.
 * @param {cfg} config
 * @cfg {Array} Array of TreeOutlineFormats to use; ordered by depth. Also supports passing an array to use @link Ext.ux.TreeOutlineFormats#indexed
 * @cfg {String} delimiter to use between outline and text, '' for no delimiter. Defaults to :
 * @see Ext.ux.TreeOutlineFormats
 */
Ext.ux.TreeOutliner = function(config) {
	var defConfig = {delimiter: ':', 
					 outlineStyle: [Ext.ux.TreeOutlineFormats.alphaUC,
								    Ext.ux.TreeOutlineFormats.numeric,
								    Ext.ux.TreeOutlineFormats.roman],
					 ellipsis: false};
	Ext.apply(this, config, defConfig);
};


Ext.ux.TreeOutliner.prototype = {
	init : function(tree) {
		tree.on('movenode', this.onMove, this);	
		tree.on('load', this.onLoad, this);
		tree.on('append', this.onAppend, this, {buffer: 200});
		tree.outliner = this;		
	},
	/**
	 * @private
	 */
	onMove : function (t, n, oldP, newP, idx) {
		this.updateText(oldP);
		if (newP !== oldP) {
			this.updateText(newP, true);
		}                   			
	},
	/**
	 * @private
	 */
	onLoad : function(n) {
		this.updateText(n);
	},
	onAppend : function(t, p, n, idx) {
		this.updateText(p);
	},
	/**
	 * Stores the original text in an attribute "origText"
	 * @private
	 */
	storeOrigText : function(n, override) {
		var override = override || false;
		if (!n.attributes.origText || override) {
			n.attributes.origText = n.text;			
		}		
	},
	/**
	 * Updates the tree outline for all child nodes 
	 * @private
	 */
	updateText : function(parent, recurse) {
		if (parent) {
			parent.eachChild(function(n) {
				this.storeOrigText(n);
				var depth = n.getDepth();
				var idx = recurse ? n.parentNode.indexOf(n) : parent.indexOf(n);
				var style = this.outlineStyle[(depth - 1) % this.outlineStyle.length];
				var prefix = typeof style === 'function' ? style(idx, depth)
														 : Ext.ux.TreeOutlineFormats.indexed(idx, style);
				var txt = n.attributes.origText;
				if (this.ellipsis) {
					txt = Ext.util.Format.ellipsis(txt, this.ellipsis);
				}
		    	n.setText(prefix + this.delimiter + txt);
		    	if (recurse) {
					n.eachChild(arguments.callee, this);	    		
		    	}
		    }, this); 
		}
	}
};