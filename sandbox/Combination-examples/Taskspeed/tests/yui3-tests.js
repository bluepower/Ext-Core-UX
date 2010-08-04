
window.tests = {
	
	"make" : function(){	
            for (var body = Y.one('body'), i = 0; i < 250; i++ ) {
                body.append(
                    '<ul id="setid' + i + '" class="fromcode">' +
                        '<li>one</li><li>two</li><li>three</li>' +
                    '</ul>');
            }
            return Y.all('ul.fromcode').size();
	},
	
	"indexof" : function(){
            for(var i = 0, index; i < 20; i++){
                index = Y.all('ul').indexOf(Y.one("#setid150"));
            }
            return index;
	},
	
	"bind" : function(){
            Y.one('body').delegate('click', function() {}, 'ul > li');
            return Y.all('ul > li').size();
	},
	
	"attr" : function(){
            return Y.all('ul').get('id').length;
	},
	
	"bindattr" : function(){
            var nodes = Y.all('ul > li'),
                subscriber = function() {};

            Y.one('body').delegate('mouseover', subscriber, 'ul > li');

            nodes.set('rel', 'touched');
            Y.one('body').detach('mouseover', subscriber);
            return nodes.size();
	},

	"table": function(){
            for (var i = 0, body = Y.one('body'); i < 40; i++) {
                body.appendChild(body.create('<table class="madetable"></table>'))
                    .insert('<tr><td>first</td></tr>')
                    .all('tr').prepend('<td>before</td>');
            }

            return Y.all('tr td').size();
	},
	
	"addanchor" : function(){
            return Y.all('.fromcode > li')
                .append('<a href="http://example.com">link</a>').size();
	},

	"append" : function(){
            
            for ( var i = 0, body = Y.one('body'); i < 500; i++ ) {
                    body.append('<div rel="foo"></div>');
            }
            return Y.all("div[rel^='foo']").size();
	},
	
	"addclass-odd" : function(){
            return Y.all('div').addClass('added').odd().addClass('odd').size();
	},
	
	"style": function(){
            return Y.all('.added').setStyles(
                { 'backgroundColor':'#ededed', 'color':'#fff' }).size();
	},
	
	"removeclass": function(){
            return Y.all('.added').removeClass('added').size();
	},
	
	"sethtml": function(){
            Y.all('div').setContent('<p>new content</p>');
            return Y.all('div').size();
	},
	
	"insertbefore" : function(){
            return Y.all('.fromcode a').insert('<p>A Link</p>', 'before').size();
	},
	
	"insertafter" : function(){
            return Y.all('.fromcode a').insert('<p>After Link</p>', 'after').size();
	},
	
	"destroy": function(){ 
            var nodes = Y.all('.fromcode');
            nodes.each(function(node) {
                node.destroy(); 
            });

            return nodes.size();
	},
	
	"finale": function(){
            Y.all('body *').remove();
            return Y.all('body *').size();
	}
	
};
