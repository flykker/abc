var patient_count=1;

app.method.patients = {
    onDeleteItem: function(){
        
        var id = $$('patients_datatable').getSelectedId().id;
        webix.confirm({
            title: "Удаление клиента",
            ok:"Да", 
            cancel:"Нет",
            type:"confirm-warning",
            text:"Хотите удалить этого клиента ?",
            callback: function(result){
                if(result){                   
                    var patient = app.patients.get(id);
                    app.models.delete("patients", patient);
                    app.patients.remove(patient.id);
                }
            }
        });
        
    },
    
    onClickAdd: function(){
        
        var item = new webix.ui( patient_config(patient_count) );
        $$("patients_tab_view").addView(item);
        $$('$tab1').addOption({value:"Пац-нт Ефимова", close:true, id:item.config.id},true)
        console.log(item.config.id)
        patient_count++;
    },

    onClickEdit: function(){
        
        var item = webix.ui( patients_form_full() );
        $$("patients_tab_view").addView(item);
        $$('$tab1').addOption({value:"Пациент", close:true, id:item.config.id},true)
    },

    toExcel: function(){
        webix.toExcel($$("patients_datatable"));
    },

    save: function() {
        var val = $$('patient_form_edit').getValues();

        if (val.id == ""){

            delete val.id;
            app.patients.add(new ModelPatients(val));
        }else{
            model = app.patients.get({id:val.id});
            model.set( val );
        }
        $$('patient_window').destructor();
    }
}

var patients_form_full = function(id){ 
    
return {
    view: "form",
    id: "main_info_"+id,
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
            label: "Адрес",
            name: "address"
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
        }
    ]
}
};



var patients_datatable = {
    id:"patients_datatable",
    headerRowHeight: 27,
    rowHeight: 27,
    scroll: "y",
    view: "datatable",
    backbone_collection: app.patients,
    select: "row",
    editable: true,
    on: {
        onItemDblClick: function(rowid) {
            new webix.ui(patients_form()).show();
            $$("patient_form_edit").load(api+"patients/" + app.patients.get(rowid).id);
        }
    },

     data: [
        { id:1, name:"The Shawshank Redemption", year:1994, votes:678790, rank:1},
        { id:2, name:"The Godfather", year:1972, votes:511495, rank:2}
    ],
    columns: [{
        id: "name",
        fillspace: true,
        header: ["Наименование"],
    }, {
        id: "phone",
        fillspace: true,
        header: "Телефон"
    }, {
        id: "email",
        fillspace: true,
        header: "Email"
    },{
        id: "comments",
        fillspace: true,
        header: "Комментарии"
    },{
        id: "dogovor",
        fillspace: true,
        header: "Договор"
    }, {
        id: "address",
        fillspace: true,
        header: "Адрес"
    }]
}

var patient_schet_view = function(id){

    return {
    id:"patient_schet_"+id,
    height:"100%",
    headerRowHeight: 27,
    rowHeight: 27,
    scroll: "y",
    view: "datatable",
    select: "row",
    editable: true,
    data: [
        { id:1, name:"The Shawshank Redemption", year:1994, votes:678790, rank:1},
        { id:2, name:"The Godfather", year:1972, votes:511495, rank:2}
    ],
    
    columns: [{
        id: "date",
        width: 80,
        header: "Дата",
    }, {
        id: "name",
        width: 400,
        header: "Наименование",
    }, {
        id: "phone",
        fillspace: true,
        header: "Количество"
    },  {
        id: "address",
        fillspace: true,
        header: "Сумма"
    }, {
        id: "comments",
        fillspace: true,
        header: "Комментарии"
    }]
}}


var patients_toolbar = {
    view: "toolbar",
    padding:0,
    height: 37,
    cols:[{ 
        id:"_123", 
        width:100, 

        cols:[{
            view: "button",
            align: "left",
            type: "icon",
            icon: "plus",
            css: "toolbar_button_datatable",
            width: "auto",
            heigt: 28,
            click: app.method.patients.onClickAdd
        },{
            view: "button",
            align: "left",
            type: "icon",
            icon: "trash-o",
            css: "toolbar_button_datatable",
            width: "auto",
            heigt: 28,
            click: app.method.patients.onDeleteItem
        },{
            view: "button",
            align: "left",
            height: 28,
            type: "icon",
            icon: "file-excel-o",
            css: "toolbar_button_datatable",
            tooltip: "Выгрузка в Excel",
            click: app.method.patients.toExcel
        }] 
    },{ 
        view:"tabbar", 
        id:"$tab1",
        bottomOffset:0, 
        tabMargin:0, 
        topOffset:0,
        optionWidth: 180, 
        minWidth:180,
        tabMinWidth:180,
        multiview:true,
        value: "patients_datatable", 
        options: [
            {value: 'Список пациентов', id: 'patients_datatable'},
        ]
    }]
}


var patient_config = function(id){


    return {
    padding:1,
    height:"100%",

    cols: [{
        view: "sidebar",
        data: [
        {
            id: "main_info_"+id,
            value: "&nbsp;&nbsp;&nbsp;Общие сведения"
        },
        {
            id: "patient_schet_"+id,
            value: "&nbsp;&nbsp;&nbsp;Счета"
        }],
        on: {
            onItemClick: function(id){
                var selected = this.getSelectedId();

                if( selected != id){
                    $$(id+"_view").show();
                }
            }
        }
    }, {
        view: "multiview",
        animate: false,
        cells: [ patients_form_full(id+"_view"), patient_schet_view(id+"_view") ]
    }]
}};

var patients_table = function(){
    return {
        id: "patients_view", rows:[ patients_toolbar, { view: "multiview", height:"100%", id:"patients_tab_view", cells:[ patients_datatable ] }  ] 
    }
};