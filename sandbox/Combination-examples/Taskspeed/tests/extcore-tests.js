window.tests = {
	
	"make" : function(){	
			for(var i = 0, body = Ext.getBody(); i < 250; i++) {
				body.createChild(
					'<ul id="setid' + i + '" class="fromcode">' +
						'<li>one</li><li>two</li><li>three</li>' +
					'</ul>'
				);
			}
			return Ext.select('ul.fromcode').getCount();
	},
	
	"indexof" : function(){
            for(var i = 0, index; i < 20; i++) {
                index = Ext.select('ul').indexOf('setid150');
            }
            return index;
	},
	
	"bind" : function(){
            Ext.getBody().on('click', function() {}, null, {delegate: 'ul > li'});
            return Ext.select('ul > li').getCount();
	},
	
	"attr" : function(){
		    var arr = [];
            Ext.select('ul').each(function(item) {
			    arr.push(item.getAttribute('id'));
			});
			return arr.length;
	},
	
	"bindattr" : function(){
            var body = Ext.getBody(),
				nodes = Ext.select('ul > li'),
                subscriber = function() {};
            body.on('mouseover', subscriber, null, {delegate: 'ul > li'});
			nodes.each(function(node) {
				node.dom.setAttribute('rel', 'touched');
			});
            body.un('mouseover', subscriber);
            return nodes.getCount();
	},

	"table": function(){
            for(var i = 0, body = Ext.getBody(); i < 40; i++) {
				body.createChild('<table class="madetable"></table>').createChild('<tr><td>first</td></tr>').child('tr').insertHtml('afterBegin', '<td>before</td>');
            }
            return Ext.select('tr td').getCount();
	},
	
	"addanchor" : function(){
            return Ext.select('.fromcode > li')
                .insertHtml('beforeEnd', '<a href="http://example.com">link</a>').getCount();
	},

	"append" : function(){            
            for ( var i = 0, body = Ext.getBody(); i < 500; i++ ) {
					body.insertHtml('beforeEnd', '<div rel="foo"></div>');
            }
            return Ext.select("div[rel^='foo']").getCount();
	},
	
	"addclass-odd" : function(){
			Ext.select('div').addClass('added');
			return Ext.select('div:odd').addClass('odd').getCount();
	},
	
	"style": function(){
            return Ext.select('.added').setStyle({ 'backgroundColor':'#ededed', 'color':'#fff' }).getCount();
	},
	
	"removeclass": function(){
            return Ext.select('.added').removeClass('added').getCount();
	},
	
	"sethtml": function(){
            Ext.select('div').update('<p>new content</p>');
            return Ext.select('div').getCount();
	},
	
	"insertbefore" : function(){
            return Ext.select('.fromcode a').insertHtml('beforeBegin', '<p>A Link</p>').getCount();
	},
	
	"insertafter" : function(){
            return Ext.select('.fromcode a').insertHtml('afterEnd', '<p>After Link</p>').getCount();
	},
	
	"destroy": function(){ 
			return Ext.select('.fromcode').remove().getCount();
	},
	
	"finale": function(){
            Ext.select('body *').remove();
			return Ext.query('body *').length;
	}
	
};
