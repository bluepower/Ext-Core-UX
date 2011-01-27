
Ext.onReady(function(){

    Ext.QuickTips.init();

//   Define the Grid data and create the Grid
    var myData = [
        ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
        ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
        ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am'],
        ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
        ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
        ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
        ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
        ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
        ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
        ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am'],
        ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
        ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
        ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
        ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
        ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
        ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
        ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am'],
        ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am'],
        ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am'],
        ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am'],
        ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am'],
        ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am'],
        ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am'],
        ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am'],
        ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am'],
        ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am'],
        ['United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am'],
        ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00am'],
        ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am']
    ];

    var ds = new Ext.data.Store({
        reader: new Ext.data.ArrayReader({}, [
            {name: 'company'},
            {name: 'price', type: 'float'},
            {name: 'change', type: 'float'},
            {name: 'pctChange', type: 'float'},
            {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'},

//          Rating dependent upon performance 0 = best, 2 = worst
            {name: 'rating', type: 'int', convert: function(v, rec) {
                   if (rec[3] < 0) return 2;
                   if (rec[3] < 1) return 1;
                   return 0;
               }
            }
        ])
    });
    ds.loadData(myData);

    // the DefaultColumnModel expects this blob to define columns. It can be extended to provide
    // custom or reusable ColumnModels
    var colModel = new Ext.grid.ColumnModel([
        {id:'company',header: "Company", width: 160, sortable: true, locked:false, dataIndex: 'company'},
        {header: "Price", width: 55, sortable: true, dataIndex: 'price'},
        {header: "Change", width: 55, sortable: true, dataIndex: 'change'},
        {header: "% Change", width: 65, sortable: true, dataIndex: 'pctChange'},
        {header: "Last Updated", width: 80, sortable: true, dataIndex: 'lastChange'},
        {header: "Rating", width: 40, sortable: true, dataIndex: 'rating'}
    ]);

    var tab2 = new Ext.FormPanel({
        labelAlign: 'top',
        title: 'Welcome, ******',
        bodyStyle:'padding:5px',
        //width: 600,
        items: [
		{
                        xtype : 'compositefield',
                        anchor: '-20',
                        msgTarget: 'side',
                        //fieldLabel: 'Full Name',
                        items : [
                            {
                                //the width of this field in the HBox layout is set directly
                                //the other 2 items are given flex: 1, so will share the rest of the space
                                width:          120,
                                xtype:          'combo',
                                mode:           'local',
                                value:          'Ticket Type',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                //fieldLabel:     'Title',
                                name:           'title',
                                hiddenName:     'title',
                                displayField:   'name',
                                valueField:     'value',
                                store:          new Ext.data.JsonStore({
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : 'Ticket Type A',   value: 'Ticket Type A'},
                                        {name : 'Ticket Type B',  value: 'Ticket Type B'},
                                        {name : 'Ticket Type C', value: 'Ticket Type C'}
                                    ]
                                })
                            },
                            {
                                xtype: 'textfield',
								width: 160,
                                //flex : 1,
                                name : 'firstName'
                                //fieldLabel: 'First',
                                //allowBlank: false
                            },
                            {
                                xtype: 'button',
                                //flex : 1,
								text: 'Confirm',
                                name : 'lastName'
                                //fieldLabel: 'Last',
                                //allowBlank: false
                            }
                        ]
        },
		{
			xtype: 'spacer',
			height: 20
		},
		{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:360,
            /*
              By turning off deferred rendering we are guaranteeing that the
              form fields within tabs that are not activated will still be rendered.
              This is often important when creating multi-tabbed forms.
            */
            deferredRender: false,
            defaults:{bodyStyle:'padding:10px'},
            items:[{
                title:'Main Tab1',
                layout:'form',
                //defaults: {width: 230},

                items: [{
					xtype: 'grid',
					ds: ds,
					cm: colModel,
					autoExpandColumn: 'company',
					height: 350,
					title:'Company Data',
					border: true
				}]
            },{
                title:'Main Tab2',
                layout:'form',
                defaults: {width: 230},
                defaultType: 'textfield',

                items: [{
                    fieldLabel: 'Home',
                    name: 'home',
                    value: '(888) 555-1212'
                },{
                    fieldLabel: 'Business',
                    name: 'business'
                }]
            }]
        }]
    });

    tab2.render(document.body);
});