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
                            <td>${item.status}</td>
                            <td>${item.address}</td>
                    
                    <td><a  data-val="${item.id}" data-toggle="modal" data-target="#modal-edit-order"><i class="fas fa-cog edit-order " title="Chỉnh sửa đơn hàng"></i></a>
                    <a  data-val="${item.row}" data-toggle="modal" data-target="#modal-confirm"><i class="far fa-trash-alt delete-order " title="Xóa đơn hàng"></i> </a></td>
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
                            <td>${item.id}</td>
                            <td>${item.name_custumer}</td>
                            <td>${item.phone}</td>
                            <td>${item.status}</td>
                            <td>${item.address}</td>
                    
                    <td><a  data-val="${item.id}" data-toggle="modal" data-target="#modal-edit-order"><i class="fas fa-cog edit-order " title="Chỉnh sửa đơn hàng"></i></a>
                    <a  data-val="${item.row}" data-toggle="modal" data-target="#modal-confirm"><i class="far fa-trash-alt delete-order " title="Xóa đơn hàng"></i> </a></td>
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
    let dt = {
        action: "GET_BILL_ORDER"
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
$('.btn-accept-delete').on("click", function(e) {
    e.preventDefault();

    let row = $('.row-delete').val();

    if(row !== ""){
        let dt = {
            action: "DELETE_ORDER",
            row: row
        }
        do_action(dt);
    }

});

// Event update

$('#modal-edit-order').on('show.bs.modal', function (event) {
    const id = $(event.relatedTarget).data('val');
    // set value to input form

    let data_find = JSON.parse(localStorage.getItem("data_order"));
    let obj = data_find.filter(item => item.id === id);
  
    $('.customer-id-edit').val(obj[0].id);
    $('.customer-name-edit').val(obj[0].name_custumer);
    $('.phone-number-edit').val(obj[0].phone);
    $('.quantity').val(obj[0].quantity);
    $('.channel').val(obj[0].channel).change();
    $('.status').val(obj[0].status).change();
    $('.fee-ship').val(obj[0].fee_ship);
    $('.require').val()
    $('.row').val(obj[0].row);

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
        jsonArr = data.filter(item => item.status === "Đã xử lý xong");
    } //Không nghe lần 1
    else if (type_filter === "2") {
        jsonArr = data.filter(item => item.status === "Không nghe lần 1");
    }
    else if (type_filter === "3") {
        jsonArr = data.filter(item => item.status === "Không nghe lần 2");
    }
    else if (type_filter === "4") {
        jsonArr = data.filter(item => item.status === "Không nghe lần 3");
    }
    else if (type_filter === "5") {
        jsonArr = data.filter(item => item.status === "Sai số");
    }
    else if (type_filter === "6") {
        jsonArr = data.filter(item => item.status === "Hủy đơn hàng");
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
