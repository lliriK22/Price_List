//ввод только цифр при типе данных Number в доп-ой колонке
$('body').on('input', '.input-number', function () {
	this.value = this.value.replace(/[^0-9]/g, '');
});

//добавление блока для создания доп-ой колонки
$('#modDialog').on('click', '[data-add="modal"]', function (e) {
    var form = $(this).parents().closest('.modal-content').find('.modal-body').find('form');
    //var add_body = form.find('.form-group-add').last();
    var add_body = `<div class="form-group form-group-add">
                    <div class="form-col row">
                        <div class="name-col col-md-4">
                            <label for="ColAdd">Имя доп. колонки</label>
                            <input type="text" name="ColAdd" class="form-control input-data" />
                        </div>
                        <div class="type-col col-md-4">
                            <label for="exampleFormControlSelect2">Тип данных</label>
                            <select class="form-control form-control-lg select-data">
                                <option>Число</option>
                                <option>Однострочный текст</option>
                                <option>Многострочный текст</option>
                            </select>
                        </div>
                        <div class="del-col col-md-4">
                            <label for="exampleFormControlSelect2"></label>
                            <button type="button" class="btn btn-primary" data-del-col="modal">Удалить</button>
                        </div>
                    </div>
                </div>`;
    //var el = add_body.clone();
    form.find('.form-group-body').append(add_body);
    //add_body.parent().append(el);
});

//удаление блока для создания доп-ой колонки
$('#modDialog').on('click', '[data-del-col="modal"]', function (e) {
    var form = $(this).parents('.modal-content').find('.modal-body').find('form');
    $(this).parent().closest('.form-group-add').remove();
});

//Всплывающее окно об удалении объекта
$('#modDialog').on('click', '[data-del-obj="modal"]', function (e) {
    var actionUrl = $(this).attr("action").toString();
    var sendData = ($(this).attr("del-obj")).toString();

    $('#modDialog').modal('hide');

    $.post(actionUrl, { _id: sendData }, function () { location.reload(); });
});