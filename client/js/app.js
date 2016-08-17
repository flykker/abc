function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

var client_address = function(){

    var onClickAdd = function(){
        var count = $$('clients_address_edit').data.count()+1; 
        var id=$$('clients_address_edit').add({id:count});
        $$('clients_address_edit').editCell(id);
    }

    var onClickDelete = function(){
        var id=$$('clients_address_edit').getSelectedId(); 
        $$('clients_address_edit').remove(id);
    }

    return {
    header:"Адреса",
    body:{
        id: 'addressView',
        rows:[{
            view: "toolbar",
            padding: 0,
            elements:[{
                view: "button",
                align: "left",
                type: "icon",
                icon: "plus",
                css: "toolbar_button_datatable",
                width: "auto",
                heigt: 28,
                click: onClickAdd
            },{
                view: "button",
                align: "left",
                type: "icon",
                icon: "trash-o",
                css: "toolbar_button_datatable",
                width: "auto",
                heigt: 28,
                click: onClickDelete
            }] }, {
            view:"datatable",
            id: "clients_address_edit",
            editable:true,
            editaction:"dblclick",
            headerRowHeight: 27,
            rowHeight: 27,
            autoheight: true,
            scroll: false,
            select:"row",
            editor:"text",
            columns:[{
                id: "id",
                editor: "text",
                width: 30,
                header: "№"
            },{
                id: "address",
                editor: "text",
                fillspace: true,
                header: "Адрес"
            }]
        }]
    }
}};

var client_address_show = function(){

    return {
    header:"Адреса",
    body:{
        rows:[{
            view:"datatable",
            id: "clients_address_show",
            editable:true,
            editaction:"dblclick",
            headerRowHeight: 27,
            rowHeight: 27,
            autoheight: true,
            scroll: false,
            select:"row",
            editor:"text",
            columns:[{
                id: "id",
                editor: "text",
                width: 30,
                header: "№"
            },{
                id: "address",
                editor: "text",
                fillspace: true,
                header: "Адрес"
            }]
        }]
    }
}};

var clientform = {
    view: "form",
    height:"100%",
    width: 400,
    hidden: true,
    margin:0,
    id: "client_form_show",
    elements: [
        {
                view: "text",
                labelWidth: "150",
                label: "Наименование",
                name: "name"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Организация",
                name: "organization",
            }, {
                view: "text",
                labelWidth: "150",
                label: "Договор",
                name: "dogovor"
            },{
                view: "text",
                labelWidth: "150",
                label: "Email",
                name: "email"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Телефон",
                name: "phone"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Юр. Адрес",
                name: "client_address"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Факт. Адрес",
                name: "fact_address"
            },{
                view: "text",
                labelWidth: "150",
                label: "Комментарии",
                name: "comments"
            }, {
            view:"tabview",
            cells:[{
                header:"Контакты",
                body:{
                    rows:[{
                        view:"datatable",
                        id: "clients_contact_show",
                        headerRowHeight: 27,
                        rowHeight: 27,
                        scroll: false,
                        columns:[{
                            id: "name",
                            fillspace: true,
                            header: "ФИО контакта"
                        },{
                            id: "dolznost",
                            fillspace: true,
                            header: "Должность"
                        },{
                            id: "phone",
                            fillspace: true,
                            header: "Телефон"
                        },{
                            id: "email",
                            fillspace: true,
                            header: "Email"
                        }]
                    }]
                }
            },client_address_show()]
        }
    ]
}

app.client_table = function(){

    var onClickInfo = function(){
        
        var show = $$('client_form_show').isVisible();
        if ( !show){
            $$('client_form_show').show();
        }else{
            $$('client_form_show').hide();
        }
    }

    var onDeleteItem = function(){
        
        var id = $$('clients_datatable').getSelectedId().id;
        webix.confirm({
            title: "Удаление клиента",
            ok:"Да", 
            cancel:"Нет",
            type:"confirm-warning",
            text:"Хотите удалить этого клиента ?",
            callback: function(result){
                if(result){                   
                    var client = app.clients.get(id);
                    app.models.delete("clients", client);
                    app.clients.remove(client.id);
                }
            }
        });

        
        
        
    }

    var onClickAdd = function(){
        var win = new webix.ui(app.FormWindow());
        win.show();
    }

    var  toExcel = function(){
        webix.toExcel($$("clients_datatable"));
    }

    return {
        id: "clients_view",
        cols:[{
            rows:[{
            view: "toolbar",
            padding: 0,
            elements:[{
                view: "button",
                align: "left",
                type: "icon",
                icon: "plus",
                css: "toolbar_button_datatable",
                width: "auto",
                heigt: 28,
                click: onClickAdd
            },{
                view: "button",
                align: "left",
                type: "icon",
                icon: "trash-o",
                css: "toolbar_button_datatable",
                width: "auto",
                heigt: 28,
                click: onDeleteItem
            },{
                view: "toggle",
                align: "right",
                type: "icon",
                icon: "info-circle",
                css: "toolbar_button_datatable",
                width: "auto",
                heigt: 28,
                tooltip: "Быстрый просмотр",
                click: onClickInfo

            },{
                view: "button",
                align: "left",
                view: "button",
                align: "left",
                height: 28,
                type: "icon",
                icon: "file-excel-o",
                tooltip:"Выгрузка в Excel",
                css: "toolbar_button_datatable",
                click: toExcel
            }]
        },{
            id:"clients_datatable",

            headerRowHeight: 27,
            rowHeight: 27,
            scroll: "y",
            view: "datatable",
            select: "row",
            editable: true,
            on: {
                onItemDblClick: function(rowid) {
                    new webix.ui(app.FormWindow()).show();
                    $$("client_form_edit").load(api+"clients/" + app.clients.get(rowid).id);
                    $$("clients_contact_edit").load(api+"clients/" + app.clients.get(rowid).id+"/contacts");
                    $$("clients_address_edit").load(api+"clients/" + app.clients.get(rowid).id+"/address");

                },
                onAfterSelect: function(data){
                    
                    var visible = $$('client_form_show').isVisible();
                    
                    if (visible){

                        $$("clients_address_show").clearAll();
                        $$("clients_contact_show").clearAll();


                        var json = app.clients.get(data.id).toJSON();

                        $$('client_form_show').parse( json );
                        $$("clients_contact_show").parse(json._contacts);
                        $$("clients_address_show").parse(json._address);
                    }
                }
            },
            columns: [{
                id: "name",
                fillspace: true,
                header: ["Наименование", {content:"textFilter"}],
            }, {
                id: "organization",
                fillspace: true,
                header: "Организация"
            }, {
                id: "phone",
                fillspace: true,
                header: "Телефон"
            }, {
                id: "email",
                fillspace: true,
                header: "Email"
            }, {
                id: "dogovor",
                fillspace: true,
                header: ["Договор", {content:"textFilter"}]
            },{
                id: "comments",
                fillspace: true,
                header: "Комментарии"
            }, {
                id: "fact_address",
                fillspace: true,
                header: "Факт. Адрес"
            }]
        }] },{ 
            view: "resizer" 
        }, clientform
        ]
    }
};

app.order_table = function(){

    var onClickAdd = function(){
        var win = new webix.ui(order_form());
        win.show();
    }

    var onDeleteItem = function(){
        var id = $$('orders_datatable').getSelectedItem().id;
        webix.confirm({
            title: "Удаление заказа",
            ok:"Да", 
            cancel:"Нет",
            type:"confirm-warning",
            text:"Хотите удалить этот заказ ?",
            callback: function(result){
                if(result){                   
                    var order = app.orders.get(id);

                    app.models.delete("orders", order);
                    app.orders.remove(order.id);
                    console.log(result)
                }
            }
        });
        
    }

    var getClient = function(obj){

        var client = app.clients.get(obj.clientsId)

        if (client){
            return client.attributes["name"];
        }

        return "";
    }

    var getStatus = function(obj){
        var res = "";
        var status = obj.status;
        _.each(orders_status, function(e){
            if (e.id == status){
                res = e.value;
            }

        })

        return res;
    }

    var getDateCreate = function(obj){
        if (obj.date_create){
            return webix.i18n.dateFormatStr(new Date(obj.date_create))
        }

        return "";
    }

    var getDateEnd = function(obj){
        if (obj.date_end){
            return webix.i18n.dateFormatStr(new Date(obj.date_end))
        }

        return "";
    }
     

    return {
    id: "orders_view",
    rows:[{
            view: "toolbar",
            padding: 0,
            elements:[{
                view: "button",
                align: "left",
                type: "icon",
                icon: "plus",
                css: "toolbar_button_datatable",
                width: "auto",
                heigt: 28,
                click: onClickAdd
            },{
                view: "button",
                align: "left",
                type: "icon",
                icon: "trash-o",
                css: "toolbar_button_datatable",
                width: "auto",
                heigt: 28,
                click: onDeleteItem
            }]
        },{
    id: "orders_datatable",
    view: "datatable",
    headerRowHeight: 27,
    backbone_collection: app.orders,
    select: "row",
    rowHeight: 27,
    headerRowHeight:27,
    scroll:"y",
    scheme:{
        $change:function(item){
            
            var date = new Date(item.date_end);
            var d = new Date();
            d = new Date(d.setDate(d.getDate() + 2));
            
            if ( d >= date ){
                item.$css = "highlight";
            }
        }
    },
    on: {
        onItemDblClick: function(rowid) {
            new webix.ui( order_form() ).show();

            $$("order_form_edit").load(api+"orders/" + app.orders.get(rowid).id, function(t,d){
                var data = d.json();
                
                if (data.date_create){
                    data.date_create = new Date(data.date_create)
                }

                if (data.date_end){
                    data.date_end = new Date(data.date_end)
                }
                $$("order_form_edit").setValues(data);
            });

            var list = $$("$suggest_clientsId").getList();
            list.load(api+"orders/" + app.orders.get(rowid).id+ "/clients" );

        }
    },
    select: "row",
    
    columns: [{
            id: "numorder",
            fillspace: true,
            header: "№ Заказа"
        }, {
            id: "date_create",
            fillspace: true,
            header: "Дата создания",
            template: getDateCreate
        }, {
            id: "date_end",
            fillspace: true,
            header: "Дата сдачи",
            template: getDateEnd
        },{
            id: "clientsId",
            fillspace: true,
            header: "Организация",
            template: getClient        
        }, {
            id: "address_send",
            fillspace: true,
            header: "Адрес доставки"
        }, {
            id: "infodoctor",
            fillspace: true,
            header: "Ф.И.О. Доктора"
        }, {
            id: "patientname",
            fillspace: true,
            header: "Пациент"
        }, {
            id: "status",
            fillspace: true,
            header: ["Статус", {content:"selectFilter", id:"$filter1"} ],
            options:orders_status,
            template: getStatus
        }, {
            id: "num_account",
            fillspace: true,
            header: "Номер счета"
        }, {
            id: "summa",
            fillspace: true,
            header: "Сумма заказа"
        }, {
            id: "comment",
            fillspace: true,
            header: "Комментарии"
        },

    ]
}] 
}
};

function client_put() {
    var val = $$('client_form_edit').getValues();
    var contact = $$('clients_contact_edit').serialize();

    var address = $$('clients_address_edit').serialize();
    
    val["_contacts"] = contact;
    val["_address"] = address;

    if (val.id == ""){

        delete val.id;
        app.clients.add(new ModelClients(val));
    }else{
        model = app.clients.get({id:val.id});
        model.set( val );
    }
    //console.log(val)
    $$('client_window').destructor();
    
}

function order_put() {
    var val = $$('order_form_edit').getValues();

    if (val.id == ""){
        delete val.id;
        app.orders.add(new ModelOrders(val));
    }else{
        model = app.orders.get({id:val.id});
        model.set( val );
    }
    $$('order_window').hide();
    $$('order_form_edit').clear();
}

var zapis = function() {
    return { id:"zapis_view", rows:[
        //{ id:"zapis_toolbar", height:40 },
            { id:"zapis_table", cols:[{ id:"zapis_data", view: "datatable",
                adjust:true,
                height: "100%",
                rowHeight: 27,
                headerRowHeight: 27,
                select:"cell",
                columns:[
                    { id: "time", header: "Время" , width:60},
                    { id: "col_1", header: "Врач №1", fillspace: true, },
                    { id: "col_2", header: "Врач №2", fillspace: true, },
                    { id: "col_3", header: "Врач №3", fillspace: true, },
                    { id: "col_4", header: "Врач №4", fillspace: true, },
                    { id: "col_5", header: "Врач №5", fillspace: true, },
                    { id: "col_6", header: "Врач №5", fillspace: true, },
                    { id: "col_7", header: "Врач №5", fillspace: true, },
                    { id: "col_8", header: "Врач №5", fillspace: true, },
                ],
                data: [
                    {time:"9:00"},
                    {time:"9:30"},
                    {time:"10:00", col_4:"Пац-нт Ефимова Е.В."},
                    {time:"10:30"},
                    {time:"11:00"},
                    {time:"11:30"},
                    {time:"12:00"},
                    {time:"12:30"},
                    {time:"13:00", col_1:"Пац-нт Ефимова Е.В."},
                    {time:"13:30"},
                    {time:"14:00"},
                    {time:"14:30"},
                    {time:"15:00"},
                    {time:"15:30"},
                    {time:"16:00"},
                    {time:"16:30"},
                    {time:"17:00"},
                    {time:"17:30"},
                    {time:"18:00"},
                    {time:"18:30"},
                    {time:"19:00"},
                    {time:"19:30"},
                    {time:"20:00"},
                    {time:"20:30"}
                ]
            }, {height: "100%", view:"accordion", cols:[{header: "Выбор врача и даты", headerHeight:30, headerAltHeight:30, collapsed:true, body:{ rows:[{view:"calendar"}] } }] } ] }
        ] }
}

ui_config = {
    rows: [{
        view: "toolbar",
        padding: 0,
        elements: [{
                view: "button",
                type: "icon",
                icon: "bars",
                width: 37,
                align: "left",
                css: "app_button",
                click: function() {
                    $$("$sidebar1").toggle()
                }
            }, {
                view: "label",
                align: "left",
                width: "auto",
                label: "ABC+ Platform: Медицина+"
            }
        ]
    }, {

        cols: [{
            view: "sidebar",
            data: app.menu,
            on: {
                onItemClick: function(id){
                    var selected = this.getSelectedId();

                    if( selected != id){
                        $$(id+"_view").show();
                        
                        if(app.config[id].model) {
                            collection = app.config[id].model;
                            collection.fetch({reset:true});

                            $$(id+"_datatable").sync(collection);
                        }
                    }
                }
            }
        }, {
            view: "resizer"
        }, {
            view: "multiview",
            animate: false,
            cells: [ zapis(), patients_table(), app.client_table() , app.order_table() ]
        }]
    }]
};

ModelClients = Backbone.Model.extend({ idAttribute: "id" });
Clients = Backbone.Collection.extend({
    model: ModelClients,
    url: api+"clients/"
});
app.clients = new Clients();

app.clients.on("add change", function(model) {
    model.save();
    webix.message("Контрагент сохранен");
});
app.clients.on("remove", function(model) {
    model.destroy();
});

ModelOrders = Backbone.Model.extend({ idAttribute: "id" });
Orders = Backbone.Collection.extend({
    model: ModelOrders,
    url: api+"orders/"
});
app.orders = new Orders();

app.orders.on("add change", function(model) {
    model.save();
    webix.message("Заказ создан");
});
app.orders.on("remove", function(model) {
    model.destroy();
});

ModelPatients = Backbone.Model.extend({ idAttribute: "id" });
Patients = Backbone.Collection.extend({
    model: ModelPatients,
    url: api+"patients/"
});
app.patients = new Patients();

app.patients.on("add change", function(model) {
    model.save();
    webix.message("Пациент создан");
});
app.patients.on("remove", function(model) {
    model.destroy();
});

ModelDelete = Backbone.Model.extend({ urlRoot: "/api/deleteds"});

MyView = WebixView.extend({
    config:ui_config
});


new MyView({ el: "body" }).render();

app.FormWindow = function(){

    var onClickAdd = function(){
        var count = $$('clients_contact_edit').data.count()+1; 
        var id=$$('clients_contact_edit').add({id:count});
        $$('clients_contact_edit').editCell(id);
    }

    var onClickDelete = function(){
        var id=$$('clients_contact_edit').getSelectedId(); 
        $$('clients_contact_edit').remove(id);
    }

    return { 
    view: "window",
    id: "client_window",
    resize: true,
    modal:true,
    position: "center",
    width: 600,
    //height: 600,
    move: "true",
    //sizeToContent:true,
    head: {
        view: "toolbar",
        cols: [{
            view: "label",
            label: "Форма редактирования контрагента"
        }, ]
    },
    body: {
        view: "form",
        id: "client_form_edit",
        margin:0,
        elements: [

            {
                view: "text",
                labelWidth: "150",
                label: "Наименование",
                name: "name"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Организация",
                name: "organization",
            }, {
                view: "text",
                labelWidth: "150",
                label: "Договор",
                name: "dogovor"
            },{
                view: "text",
                labelWidth: "150",
                label: "Email",
                name: "email"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Телефон",
                name: "phone"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Юр. Адрес",
                name: "client_address"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Факт. Адрес",
                name: "fact_address"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Комментарии",
                name: "comments"
            }, {
                view: "text",
                type: "hidden",
                name: "id",
                height: 10
            }, {
                view:"tabview",
                autoheight: true,
                paddingY: 20,

                cells:[{
                    header:"Контакты",
                    
                    body:{
                        id: "contactView",
                        rows:[{
                            view: "toolbar",
                            padding: 0,
                            elements:[{
                                view: "button",
                                align: "left",
                                type: "icon",
                                icon: "plus",
                                css: "toolbar_button_datatable",
                                width: "auto",
                                heigt: 28,
                                click: onClickAdd
                            },{
                                view: "button",
                                align: "left",
                                type: "icon",
                                icon: "trash-o",
                                css: "toolbar_button_datatable",
                                width: "auto",
                                heigt: 28,
                                click: onClickDelete
                            }] }, {
                            view:"datatable",
                            id: "clients_contact_edit",
                            editable:true,
                            editaction:"dblclick",
                            headerRowHeight: 27,
                            rowHeight: 27,
                            autoheight: true,
                            scroll: false,
                            select:"row",
                            editor:"text",
                            columns:[{
                                id: "id",
                                width: 30,
                                editor: "text",
                                header: "№"
                            },{
                                id: "name",
                                editor: "text",
                                fillspace: true,
                                header: ["ФИО контакта"]
                            },{
                                id: "dolznost",
                                editor: "text",
                                fillspace: true,
                                header: ["Должность"]
                            },{
                                id: "phone",
                                editor: "text",
                                fillspace: true,
                                header: ["Телефон"]
                            },{
                                id: "email",
                                editor: "text",
                                fillspace: true,
                                header: ["Email"]
                            }]
                        }]
                    }
                }, client_address() ]
            },{height:30},{
                cols: [{
                    view: "button",
                    value: "Сохранить",
                    type: "form",
                    click: "client_put()"
                }, {
                    view: "button",
                    value: "Отмена",
                    click: "$$('client_window').destructor();"
                }]
            }
        ]
    }
}};

var order_form = function(){
    
    var getDateCreate = function(obj){
        if (obj.date_create){
            return webix.i18n.dateFormatStr(new Date(obj.date_create))
        }

        return "";
    }

    var getDateEnd = function(obj){
        if (obj.date_end){
            return webix.i18n.dateFormatStr(new Date(obj.date_end))
        }

        return "";
    }


    return{
    view: "window",
    id: "order_window",
    position: "center",
    resize: true,
    width: 400,
    autoheight: true,
    modal: true,
    move: "true",
    head: {
        view: "toolbar",
        cols: [{
            view: "label",
            label: "Форма редактирования заказа"
        }]
    },
    body: {
        view: "form",
        id: "order_form_edit",
        margin:0,
        elements: [
            {
                view: "text",
                labelWidth: "150",
                label: "№ Заказа",
                name: "numorder"
            }, {
                labelWidth: "150",
                label: "Организация",
                name: "clientsId",
                view:"combo",
                
                on: {
                    // onItemClick: function(){
                    //     var list = $$("$c_f_infodoctor").getList();
                    //     $$("input_infodoctor").setValue("");

                    //     var list = $$("$c_f_address").getList();
                    //     $$("input_address").setValue("");
                    // },
                    "onChange": function(id){
                        
                        if(id){

                            webix.ajax().get("/api/clients/"+id+"/contacts", function(text, data){

                                var list = $$("$c_f_infodoctor").getList();
                                list.clearAll();
                                //$$("input_infodoctor").setValue("");
                                list.parse(data.json());
                            })

                            webix.ajax().get("/api/clients/"+id, function(text, data){
                                var e = data.json();

                                e._address.push({"address":e.fact_address});
                                //console.log(e._address);
                                var list = $$("$c_f_address").getList();
                                list.clearAll();
                                //$$("input_address").setValue("");
                                list.parse(e._address);
                            })

                        }
                    }
                },
                options:{
                    view:"suggest",
                    id:"$suggest_clientsId",
                    keyPressTimeout:500,
                    filter:function(item, value){
                        if(item.name.toString().toLowerCase().indexOf(value.toLowerCase())===0)
                            return true;
                        return false;
                    },
                    body:{ 
                        view:"list", 
                        //url:"/api/clients?filter[limit]=10",
                        template:"#name#",
                        yCount:10,
                        dataFeed: function (text) {
                            this.clearAll();
                            this.load("/api/clients?filter[where][name][like]=" + text+"&filter[limit]=10");
                        }

                    }
                }
            }, {
                view: "text",
                labelWidth: "150",
                label: "Номер счета",
                name: "num_account"
            },{
                view: "datepicker",
                labelWidth: "150",
                name: "date_create",
                label: "Дата создания"

            }, {
                view: "datepicker",
                labelWidth: "150",
                name: "date_end",
                label: "Дата сдачи"
            }, {
                labelWidth: "150",
                name: "status",
                label: "Статус",
                view:"combo",
                options:{
                    view:"suggest",
                    data:orders_status
                }
            }, {

                labelWidth: "150",
                label: "Ф.И.О. Доктора",
                name: "infodoctor",
                id:"input_infodoctor",
                view:"text",
                on:{
                    onItemClick:function(){
                        $$(this.config.suggest).show(this.getInputNode());
                    }
                },
                suggest: {
                    filter:function(item, value){
                        if(item.name.toString().toLowerCase().indexOf(value.toLowerCase())===0)
                            return true;
                        return false;
                    },
                    id: "$c_f_infodoctor",
                    body:{
                        view: "list",
                        template:"#name#"
                    }
                }

            }, {

                labelWidth: "150",
                label: "Адрес доставки",
                name: "address_send",
                id:"input_address",
                view:"text",
                on:{
                    onItemClick:function(){
                        $$(this.config.suggest).show(this.getInputNode());
                    }
                },
                suggest: {
                    filter:function(item, value){
                        if(item.address.toString().toLowerCase().indexOf(value.toLowerCase())===0)
                            return true;
                        return false;
                    },
                    id: "$c_f_address",
                    body:{
                        view: "list",
                        template:"#address#"
                    }
                }

            }, {
                view: "text",
                labelWidth: "150",
                label: "Пациент",
                name: "patientname"
            }, {
                view: "text",
                labelWidth: "150",
                label: "Сумма заказа",
                name: "summa"
            },{
                view: "text",
                labelWidth: "150",
                label: "Комментарий",
                name: "comment"
            },{
                view: "text",
                type: "hidden",
                name: "id"
            },{
                cols: [{
                    view: "button",
                    value: "Сохранить",
                    type: "form",
                    click: "order_put()"
                }, {
                    view: "button",
                    value: "Отмена",
                    click: "$$('order_window').destructor()"
                }]
            }
        ]
    }
}
}; 
    
app.config = {
    clients: {
        model: app.clients
    },
    orders: {
        model: app.orders
    },
    zapis: {
        model: null
    },
    patients: {
        model: app.patients
    },
}

webix.i18n.setLocale("ru-RU");
$$('$sidebar1').select('zapis');

function modelCopyFields(){

    var data = app.clients.toJSON();
    //console.log(data[0])
    var i=0;
    _.each(data, function(e,i){ 
        //if(i > 5){ console.log("STOP"); return false; };
        //console.log(i)
        var m = new ModelClients(e);
        m.set({fact_address:e.client_address});
        m.url = "/api/clients/";        
        m.save();
    });
}

function modelFieldCapitalize(){

    var data = app.clients.toJSON();
    //console.log(data[0])
    var i=0;
    _.each(data, function(e,i){ 
        //if(i > 5){ console.log("STOP"); return false; };
        //console.log(i)
        var m = new ModelClients(e);
        var name = e.name.toLowerCase();
        name = capitalize(name);
        console.log(name);
        // m.set({fact_address:e.client_address});
        // m.url = "/api/clients/";        
        // m.save();
    });
}