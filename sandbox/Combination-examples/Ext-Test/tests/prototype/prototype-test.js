/**
 * Tests Prototype Browser Detection
 * @author Niko Ni (bluepspower@163.com)
 * @create 2010-06-22
 * @update 2010-06-23
 */
(function() {

    // TestSuite for Prototype Browser Detection
    new Ext.test.TestSuite({
        name : 'Prototype',

        items : [{
            name : 'Browser Detection',

            testBrowserDetection : function() {
                var results = $H(Prototype.Browser).map(function(engine) {
                    return engine;
                }).partition(function(engine) {
                    return engine[1] === true
                });
                var trues = results[0], falses = results[1];

                //console.info('User agent string is: ' + navigator.userAgent);

                Y.assert(trues.size() == 0 || trues.size() == 1, 'There should be only one or no browser detected.');

                // we should have definite trues or falses here
                trues.each(function(result) {
                    Y.assert(result[1] === true);
                }, this);
                falses.each(function(result) {
                    Y.assert(result[1] === false);
                }, this);

                if(navigator.userAgent.indexOf('AppleWebKit/') > -1) {
                    //console.info('Running on WebKit');
                    Y.assert(Prototype.Browser.WebKit, 'Running on WebKit');
                }

                if(!!window.opera) {
                    //console.info('Running on Opera');
                    Y.assert(Prototype.Browser.Opera, 'Running on Opera');
                }

                if(!!(window.attachEvent && !window.opera)) {
                    //console.info('Running on IE');
                    Y.assert(Prototype.Browser.IE, 'Running on IE');
                }

                if(navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1) {
                    //console.info('Running on Gecko');
                    Y.assert(Prototype.Browser.Gecko, 'Running on Gecko');
                }
            }
        }]
    });

})();