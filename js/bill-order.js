// const url_api = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";

// Show data to client
function show_data_to_front_end(data, type_show) {
    // 

    if (data.length !== 0) {
        if (type_show === "firs_load") {
            $('#pagination').pagination({
                dataSource: data,
                pageSize: 10,
                autoHidePrevious: true,
                autoHideNext: true,
                callback: function (data, pagination) {
                    // template method of yourself
                    let tbody = $('tbody').empty();
                    data.forEach((item, index) => {

                        let tr = `
                        <tr>
                            <td>${item.row - 2}</td>
                            <td>${item.id}</td>
                            <td>${item.name_custumer}</td>
                            <td>${item.phone}</td>
                            <td>${item.address}</td>
                            <td>${item.status_order}</td>
                            <td>
                            <a data-val="${item.row}" data-toggle="modal" data-target="#modal-edit-order"><i class="far fa-edit edit-order" title="Sửa trạng thái đơn hàng"></i> </a>
                            </td>
                        </tr>
                        
                        `;
                        tbody.append(tr);
                    });
                }
            })
        }
        else {
            $('#pagination').pagination({
                dataSource: data,
                pageSize: 10,
                autoHidePrevious: true,
                autoHideNext: true,
                callback: function (data, pagination) {
                    // template method of yourself
                    let tbody = $('tbody').empty();
                    data.forEach((item, index) => {

                        let tr = `
                        <tr>
                            <td>${index + 1}</td>
                            <<td>${item.id}</td>
                            <td>${item.name_custumer}</td>
                            <td>${item.phone}</td>
                            <td>${item.address}</td>
                            <td>${item.status_order}</td>
                            <td>
                            <a data-val="${item.row}" data-toggle="modal" data-target="#modal-edit-order"><i class="far fa-edit edit-order" title="Sửa trạng thái đơn hàng"></i> </a>
                            </td>
                        </tr>
                        
                        `;
                        tbody.append(tr);
                    });
                }
            })
        }


    } else {
        let tbody = $('tbody').empty();
        let tr = `
        <tr>
          <td>Không có dữ liệu nào được tìm thấy!</td>
        </tr>
        `;
        tbody.append(tr);

    }
    // show search, filter

}

// Get data from sheet bill order
function load_data_from_server() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let dt = {
        action: "GET_BILL_ORDER",
        email: user.email
    }

    if (dt) {
        $.ajax({
            crossDomain: true,
            url: url_api,
            method: "GET",
            dataType: "json",
            data: dt,
            success: function (data) {

                if (data.status == 200) {

                    if (localStorage.getItem("data_order") === null) {
                        localStorage.setItem("data_order", JSON.stringify(data.data));
                    } else {
                        localStorage.removeItem("data_order");
                        localStorage.setItem("data_order", JSON.stringify(data.data));
                    }

                    show_data_to_front_end(data.data, "firs_load");
                    $('.filter-status').val("").change();
                }
                else {
                    // $('.alert').removeClass('hide');
                    // $('.alert').removeClass('alert-success');
                    // $('.alert').addClass('show alert-danger');
                    // $('.message').text("");
                    // $('.message').text(data.message);
                    // $('input').val(null);
                }
            }

        });

    }


}
window.onload = load_data_from_server();

// Search, filter data
// Event seach
$('#key_search').on("keyup", e => {
    e.stopImmediatePropagation();
    let type_search = $('.type-search').find(":selected").val();
    search_data(e.target.value, type_search);


})
// Event filter
$('.filter-status').on("change", e => {
    let type_filter = $('.filter-status').find(":selected").val();
    if (type_filter !== "") {
        filter_status(type_filter);
    }
})

// Event delete
$('.btn-accept-delete').on("click", function (e) {
    e.preventDefault();

    let row = $('.row-delete').val();

    if (row !== "") {
        let dt = {
            action: "DELETE_ORDER",
            row: row
        }
        do_action(dt);
    }

});

// Event update save
$('.btn-save-edit').on("click", e => {
    e.preventDefault();
    if($('.row').val() !== ""){
        const dt = {
            row: $('.row').val(),
            status: $('.status').find(":selected").val(),
            action: "EDIT_STATUS_ORDER"
        }
        do_action(dt);
    }
    else{
        alert("Lỗi, vui lòng bấm F5 để tải lại trang.");
    }
    

});


// Event modal update is open

$('#modal-edit-order').on('show.bs.modal', function (event) {
    const row = $(event.relatedTarget).data('val');
    const data = JSON.parse(localStorage.getItem("data_order"));
    let obj = data.filter(item => item.row === row);

    $('.row').val(row);
    $('.status').val(obj[0].status_order).change();

});


$("#modal-edit-order").on('hide.bs.modal', function () {
    $('input').val(null);
    $('.alert').addClass('hide');
    $('.alert').removeClass('show');
    $('.alert').removeClass('alert-success');
    $('.alert').removeClass('alert-danger');
    load_data_from_server();


});

// Event Modal show, hide
$('#modal-confirm').on('show.bs.modal', function (event) {
    const row = $(event.relatedTarget).data('val');
    $('.row-delete').val(row);

});
$("#modal-confirm").on('hide.bs.modal', function () {
    $('input').val(null);
    $('.alert').addClass('hide');
    $('.alert').removeClass('show');
    $('.alert').removeClass('alert-success');
    $('.alert').removeClass('alert-danger');

    load_data_from_server();

    // let data = JSON.parse(localStorage.getItem("data_order"));
    // show_data_to_front_end(data);

});

// Function search
function search_data(keyword, type_search) {
    let jsonArr;
    const data = JSON.parse(localStorage.getItem("data_order"));

    if (keyword == "") {
        jsonArr = data;
    }
    else {
        keyword = keyword.toLowerCase();
        if (type_search === "name") {
            jsonArr = data.filter(item => (item.name_custumer).toLowerCase() === keyword);
        }
        else if (type_search === "id") {
            jsonArr = data.filter(item => (item.id).toLowerCase() === keyword);
        }
        else {
            jsonArr = data.filter(item => (item.phone).toLowerCase() = keyword);
        }
    }

    show_data_to_front_end(jsonArr, "search_load")

}
// Function filter
function filter_status(type_filter) {
    const data = JSON.parse(localStorage.getItem("data_order"));
    let jsonArr;
    // trạng thái đã xử lý xong
    if (type_filter === "1") {
        jsonArr = data.filter(item => item.status_order === "Đã được xử lý");
    } //Không nghe lần 1
    else if (type_filter === "2") {
        jsonArr = data.filter(item => item.status_order === "Vận chuyển");
    }
    else if (type_filter === "3") {
        jsonArr = data.filter(item => item.status === "Hoàn lại");
    }
    else if (type_filter === "4") {
        jsonArr = data.filter(item => item.status === "Hoàn thành");
    }
    else if (type_filter === "5") {
        jsonArr = data.filter(item => item.status === "Bị hủy");
    }
    else {
        jsonArr = data;
    }
    show_data_to_front_end(jsonArr, "search_data");
}

// function do action : contact with api
function do_action(dt) {
    if (dt.length !== 0) {
        $.ajax({
            type: 'POST',
            url: url_api,
            dataType: 'json',
            data: dt,
            success: function (data) {

                if (data.status == 200) {
                    $('input').val(null);
                    $('.alert').removeClass('hide');
                    $('.alert').removeClass('alert-danger');
                    $('.alert').addClass('show alert-success');
                    $('.message').text("");
                    $('.message').text(data.message);
                }
                else {
                    $('.alert').removeClass('hide');
                    $('.alert').removeClass('alert-success');
                    $('.alert').addClass('show alert-danger');
                    $('.message').text("");
                    $('.message').text(data.message);
                    $('input').val(null);

                }
            }

        });

    }
}
