var app = {
    clients: {},
    orders: {},
    models: {},
    patients:{},
    method: {}
};

webix.Date.startOnMonday=true;
webix.i18n.setLocale("ru-RU");

app.models.delete = function(name,data){
    var model = new ModelDelete({ model: name, data: data});
    model.save();
}

var api = "/api/";

var orders_status = [
    {id:"1", value:"В работе"},
    {id:"2", value:"Сдана"}
]

app.menu = [
    {
        id: "zapis",
        model: null,
        icon: "calendar",
        value: "Расписание"
    },
    {
        id: "patients",
        model: app.patients,
        icon: "book",
        value: "Пациенты"
    }, 
    {
        id: "clients",
        model: app.clients,
        icon: "table",
        value: "Контрагенты"
    }, {
        id: "orders",
        model: app.orders,
        icon: "book",
        value: "ЗТЛ Заказы"
    }
];