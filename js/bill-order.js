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
                            <td>${index+1}</td>
                            <td>${item.ship_code == "" ? "Chưa có mã vận đơn" : item.ship_code}</td>
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
                            <td>${item.ship_code == "" ? "Chưa có mã vận đơn" : item.ship_code}</td>
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
        $('.filter-status').val("").change();
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
                        localStorage.setItem("data_order", JSON.stringify(data.data.data_order));
                    } else {
                        localStorage.removeItem("data_order");
                        localStorage.setItem("data_order", JSON.stringify(data.data.data_order));
                    }
                    localStorage.removeItem("status_order");
                    localStorage.setItem("status_order", JSON.stringify(data.data.status_order));

                    show_data_to_front_end(data.data.data_order, "firs_load");
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
        // let obj_date = new Date($('.shiping-date').val());
        // console.log($('.shiping-date').val("2020-07-29"));
        const dt = {
            row: $('.row').val(),
            status: $('.status').find(":selected").val(),
            id_order: $('.id-order').val(),
            shiping_date: $('.shiping-date').val(),
            note: $('.note').val(),
            action: "EDIT_STATUS_ORDER"
        }
        do_action(dt);
        // console.log(dt);
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
    $('.id-order').val(obj[0].ship_code);
    $('.shiping-date').val(obj[0].date_ship);
    $('.note').val(obj[0].note);

    if(obj[0].ship_code !==""){
        $('.id-order').attr('disabled', true);
    }

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
            jsonArr = data.filter(item => (item.name_custumer).toLowerCase().includes(keyword));
        }
        else if (type_search === "id") {
            jsonArr = data.filter(item => (item.id).toLowerCase().includes(keyword));
        }
        else {
            jsonArr = data.filter(item => (item.phone).toLowerCase().includes(keyword));
        }
    }

    show_data_to_front_end(jsonArr, "search_load")

}
// Function filter
function filter_status(type_filter) {
    const data = JSON.parse(localStorage.getItem("data_order"));
    let jsonArr;
    // trạng thái đã xác nhận đơn hàng
    let ls_status_order = JSON.parse(localStorage.getItem("status_order"));

    ls_status_order.forEach((ele, index)=>{
        if (type_filter === String(index+1)) {
            jsonArr = data.filter(item => (item.status_order).trim() === (ele.value).trim());
        }
        else if(type_filter === "") {
            jsonArr = data;
        }

    })
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
                console.log(data);
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
