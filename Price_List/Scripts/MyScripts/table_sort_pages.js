$(document).ready(function () {
    $('.sortable').click(function () {
        var table = $(this).parents('table').eq(0);
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
        this.asc = !this.asc;
        if (!this.asc) { rows = rows.reverse(); }
        for (var i = 0; i < rows.length; i++) { table.append(rows[i]); }
    });

    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index);
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
        }
    }

    function getCellValue(row, index) { return $(row).children('td').eq(index).text(); }

    getPagination('#prices_table');
    getPagination('#product_table');
    function getPagination(table) {
        var lastPage = 1;

        $('#maxRows').on('change', function (evt) {
            lastPage = 1;
            $('.pagination').find('li').slice(1, -1).remove();
            var trnum = 0;
            var maxRows = parseInt($(this).val());
            var totalRows = $(table + ' tbody tr').length;

            if (maxRows == 5000)
                $('.pagination').hide();
            else 
                $('.pagination').show();

            var totalRows = $(table + ' tbody tr').length;

            $(table + ' tr:gt(0)').each(function () {
                trnum++;
                if (trnum > maxRows)
                    $(this).hide();
                if (trnum <= maxRows)
                    $(this).show();
            });

            if (totalRows > maxRows) {
                var pagenum = Math.ceil(totalRows / maxRows);

                for (var i = 1; i <= pagenum;)
                {
                    $('.pagination #prev')
                        .before(
                            '<li data-page="' +
                            i +
                            '">\
								  <span>' +
                            i++ +
                            '<span class="sr-only">(current)</span></span>\
								</li>'
                        )
                        .show();
                }
                
            }

            $('.pagination [data-page="1"]').addClass('active');

            $('.pagination li').on('click', function (evt) {
                evt.stopImmediatePropagation();
                evt.preventDefault();
                var pageNum = $(this).attr('data-page');
                var totalRows = $(table + ' tbody tr').length;
                var maxRows = parseInt($('#maxRows').val());

                if (pageNum == 'prev') {
                    if (lastPage == 1)
                        return;

                    pageNum = --lastPage;
                }

                if (pageNum == 'next') {
                    if (lastPage == $('.pagination li').length - 2 || (totalRows <= maxRows * lastPage))
                        return;

                    pageNum = ++lastPage;
                }

                lastPage = pageNum;
                var trIndex = 0;
                $('.pagination li').removeClass('active');
                $('.pagination [data-page="' + lastPage + '"]').addClass('active');
                limitPagging();
                $(table + ' tr:gt(0)').each(function () {
                    trIndex++;
                    if (trIndex > maxRows * pageNum || trIndex <= maxRows * pageNum - maxRows)
                        $(this).hide();
                    else
                        $(this).show();

                });
            });
            limitPagging();
        }).val(5).change();
    }

    function limitPagging() {
        if ($('.pagination li').length > 7) {
            if ($('.pagination li.active').attr('data-page') <= 3) {
                $('.pagination li:gt(5)').hide();
                $('.pagination li:lt(5)').show();
                $('.pagination [data-page="next"]').show();
            } if ($('.pagination li.active').attr('data-page') > 3) {
                $('.pagination li:gt(0)').hide();
                $('.pagination [data-page="next"]').show();
                for (let i = (parseInt($('.pagination li.active').attr('data-page')) - 2); i <= (parseInt($('.pagination li.active').attr('data-page')) + 2); i++) {
                    $('.pagination [data-page="' + i + '"]').show();

                }
            }
        }
    }

    /*$(function () {
        $('table tr:eq(0)').prepend('<th>Номер</th>');

        var id = 0;

        $('table tr:gt(0)').each(function () {
            id++;
            $(this).prepend('<td>' + id + '</td>');
        });
    });*/
});