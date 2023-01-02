//сохранение формы
$('#modDialog').on('click', '[data-save="modal"]', function (e) {
    var form = $(this).parents().closest('.modal-content').find('.modal-body').find('form');
    //объединение данных в json формат (доп-ые колонки, добавленные пользователем)
    merge_values_forms(form);

    var actionUrl = form.attr("action");
    var sendData = form.serialize();

    $('#modDialog').modal('hide');

    $.post(actionUrl, sendData).done(function (data) {
        location.reload();
    })
});

function merge_values_forms(form) {
    var $inputs = form.find('.form-group-body').find('.input-data');
    var $types = form.find('.form-group-body').find('.select-data');

    var jsonArg = new Object();
    jsonArg.name = [];
    jsonArg.type = [];
    jsonArg.value = [];

    //обработка имени и типа доп-ой колонки
    if ($inputs != null && $types != null && form.attr("action") == "/PriceList/AddPriceList") {
        for (var i = 0; i < $inputs.length; i++) {
            jsonArg.name[i] = $inputs.eq(i).val();
            jsonArg.type[i] = $types.eq(i).val();
            jsonArg.value[i] = "";
        }

        var res_json = JSON.stringify(jsonArg);

        $inputs.eq(0).val(res_json);
    }

    //обработка значений из доп-ых колонок
    if ($inputs != null && ((form.attr("action") == "/PriceListPage/AddProduct") ||
        (form.attr("action") == "/PriceListPage/EditProduct"))) {
        for (var i = 0; i < $inputs.length; i++) {

            jsonArg.value[i] = $inputs.eq(i).val();
            jsonArg.name[i] = "";
            jsonArg.type[i] = "";
        }

        var res_json = JSON.stringify(jsonArg);

        $inputs.eq(0).val(res_json);
    }
}