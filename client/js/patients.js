var patient_count=1;
var p_self;
app.method.patients = {
    onDeleteItem: function(){
        
        var id = $$('patients_datatable').getSelectedId().id;
        webix.confirm({
            title: "Удаление пациента",
            ok:"Да", 
            cancel:"Нет",
            type:"confirm-warning",
            text:"Хотите удалить этого пациента ?",
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
        $$('$tab1').addOption({value:"Новый пац-нт", close:true, id:item.config.id},true)
        console.log(item.config.id)
        patient_count++;
    },

    onClickEdit: function(rowid){
        var item = new webix.ui( patient_config(patient_count) );
        $$("patients_tab_view").addView(item);
        $$('$tab1').addOption({value:"Пациент", close:true, id:item.config.id},true)
        
        $$("main_info_" + patient_count + "_view").load(api+"patients/" + app.patients.get(rowid).id);
        patient_count++;
     
    },

    toExcel: function(){
        webix.toExcel($$("patients_datatable"));
    },

    saveInfo: function() {
        var val = this.getFormView().getValues();

        if (val.id == ""){

            delete val.id;
            app.patients.add(new ModelPatients(val));
        }else{
            model = app.patients.get({id:val.id});
            model.set( val );
        }
        //p_self=this;
        
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
        },{height:30},{
                cols: [{
                    view: "button",
                    align:"right",
                    value: "Сохранить",
                    type: "form",
                    click: app.method.patients.saveInfo
                }]
            }
    ]
}
};



app.patients_datatable = function(){

    return {
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
            app.method.patients.onClickEdit(rowid);
        }
    },

    columns: [{
        id: "name",
        fillspace: true,
        header: ["Наименование", {content:"textFilter"}],
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
}};

var patient_schet_view = function(id){

    return {
    id:"patient_schet_"+id,
    rows:[ patients_schet_toolbar(),
    {    
        
        height:"100%",
        headerRowHeight: 27,
        rowHeight: 27,
        scroll: "y",
        view: "datatable",
        select: "row",
        editable: true,
        
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
    }]
}}

var patients_schet_toolbar = function(){

    return {
    view: "toolbar",
    padding:0,
    height: 37,
    width:100, 

    cols:[{
        view: "button",
        align: "left",
        type: "icon",
        icon: "plus",
        css: "toolbar_button_datatable",
        width: "auto",
        heigt: 28,
        //click: app.method.patients.onClickAdd
    },{
        view: "button",
        align: "left",
        type: "icon",
        icon: "trash-o",
        css: "toolbar_button_datatable",
        width: "auto",
        heigt: 28,
        //click: app.method.patients.onDeleteItem
    },{
        view: "button",
        align: "left",
        height: 28,
        type: "icon",
        icon: "file-excel-o",
        css: "toolbar_button_datatable",
        tooltip: "Выгрузка в Excel",
        //click: app.method.patients.toExcel
    }] 
}}

var patients_toolbar = {
    view: "toolbar",
    padding:0,
    height: 37,
    cols:[{ 
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
        animate:false,
        value: "patients_datatable",

        on: {
            onAfterRender: function(){
                if(this.config.options.length > 1){
                    this.showOption("patients_datatable");
                }else{
                    this.hideOption("patients_datatable");
                }
                
            },
            onOptionRemove: function(id, value){
                $$(id).destructor();
            }

        } ,
        options: [
            {value: 'Список пациентов', hidden:true, id: 'patients_datatable'},
        ]
    }]
}


var patient_config = function(id){


    return {
    padding:1,
    height:"100%",

    cols: [{
        view: "sidebar",
        id:"patient_sidebar_"+id,
        ready: function() {
            this.select("main_info_"+id);      
        },
        data: [
        {
            id: "main_info_"+id,
            value: "&nbsp;&nbsp;&nbsp;Общие сведения"
        },
        
        // {
        //     id: "patient_medkarta_"+id,
        //     value: "&nbsp;&nbsp;&nbsp;Мед. карта"
        // },
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
        id: "patients_view",  rows:[ patients_toolbar, { animate:false, id:"patients_tab_view", cells:[ app.patients_datatable() ] }  ] 
    }
};