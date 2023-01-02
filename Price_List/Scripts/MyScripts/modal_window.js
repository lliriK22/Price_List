$(document).ready(function () {
    //работа с модальным окном
    $.ajaxSetup({ cache: false });
    $(".edit_list, .add_list, .del_list").click(function (e) {
        e.preventDefault();
        $.get(this.href, function (data) {
            $('#dialogContent').html(data);
            $('#modDialog').modal('show');
        });
    });
});