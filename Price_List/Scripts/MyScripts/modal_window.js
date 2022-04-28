$(document).ready(function () {
    $.ajaxSetup({ cache: false });
    $(".edit_list, .add_list, .del_list").click(function (e) {
        e.preventDefault();
        $.get(this.href, function (data) {
            $('#dialogContent').html(data);
            $('#modDialog').modal('show');
        });
    });

    $('#modDialog').on('click', '[data-save="modal"]', function (e) {
        var form = $(this).parents().closest('.modal-content').find('.modal-body').find('form');

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

        if ($inputs != null && $types != null && form.attr("action") == "/PriceList/AddPriceList")
        {
            for (var i = 0; i < $inputs.length; i++) {
                jsonArg.name[i] = $inputs.eq(i).val();
                jsonArg.type[i] = $types.eq(i).val();
                jsonArg.value[i] = "";
            }

            var res_json = JSON.stringify(jsonArg);

            $inputs.eq(0).val(res_json);
        }

        if ($inputs != null && ((form.attr("action") == "/PriceListPage/AddProduct") ||
            (form.attr("action") == "/PriceListPage/EditProduct")))
        {
            for (var i = 0; i < $inputs.length; i++) {

                jsonArg.value[i] = $inputs.eq(i).val();
                jsonArg.name[i] = "";
                jsonArg.type[i] = "";
            }

            var res_json = JSON.stringify(jsonArg);

            $inputs.eq(0).val(res_json);
        }
    }

    $('#modDialog').on('click', '[data-add="modal"]', function (e) {
        var form = $(this).parents().closest('.modal-content').find('.modal-body').find('form');
        var add_body = form.find('.form-group-add').last();
        var el = add_body.clone();
        add_body.parent().append(el);
    });

    $('#modDialog').on('click', '[data-del-col="modal"]', function (e) {
        var form = $(this).parents('.modal-content').find('.modal-body').find('form');
        var add_body = form.find('.form-group-add');

        if (add_body.length > 1)
            $(this).parent().closest('.form-group-add').remove();
    });

    $('#modDialog').on('click', '[data-del-obj="modal"]', function (e) {
        var actionUrl = $(this).attr("action").toString();
        var sendData = ($(this).attr("del-obj")).toString();
        
        $('#modDialog').modal('hide');

        $.post(actionUrl, { _id: sendData }, function () { location.reload(); });
    });
});