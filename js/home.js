const url_api = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";

// load sale to modal in page Home
$(document).ready(function () {
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 3500);

    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "https://nguyenoni.github.io/crm/login.html";
        // window.location.href = "/login.html";
    }

});
$('.btn-logout').on("click", function () {
    sessionStorage.removeItem("user");
    window.location.href = "https://nguyenoni.github.io/crm/login.html";
    // window.location.href = "/login.html";
})


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
                            <td>${item.index}</td>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.phone}</td>
                            <td>${item.address}</td>
                            <td>${item.sale ?item.sale : "Chưa phân cho sale"}</td>
                            <td>
                            <a data-val="${item.index+1}" data-toggle="modal" data-target="#modal-edit-sale"><i class="far fa-edit edit-order" title="Phân phối cho sale xử lý"></i> </a>
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
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td>${item.address}</td>
                        <td>${item.sale ? item.sale : ""}</td>
                        <td>
                        <a data-val="${item.index+1}" data-toggle="modal" data-target="#modal-edit-sale"><i class="far fa-edit edit-order" title="Phân phối cho sale xử lý"></i> </a>
                        </td>
                            
                        </tr>
                        
                        `;
                        tbody.append(tr);
                    });
                }
            })
        }
        set_sale_to_modal(JSON.parse(localStorage.getItem("sale_home")))


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
    let dt = {
        action: "GET_DATA_HOME",
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

                    if (localStorage.getItem("data_home") === null) {
                        localStorage.setItem("data_home", JSON.stringify(data.data.data_customer_home));

                        localStorage.setItem("sale_home", JSON.stringify(data.data.sale));
                    } else {
                        localStorage.removeItem("data_home");
                        localStorage.setItem("data_home", JSON.stringify(data.data.data_customer_home));

                        localStorage.removeItem("sale_home");
                        localStorage.setItem("sale_home", JSON.stringify(data.data.sale));

                    }

                    show_data_to_front_end(data.data.data_customer_home, "firs_load");
                    set_sale_to_modal(data.data.sale);
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

function set_sale_to_modal(dt) {

    if (dt) {
        let select_sale = $('.sale').empty();
        let select_status_filter = $('.filter-status').empty();
        select_status_filter.append(`<option value = "">Lọc sale</option>`);
        dt.forEach(ele => {

            let option = `<option value = "${ele.name}">${ele.name}</option>`;
            let option_filter = `<option value="${ele.name}">${ele.name}</option>`;
            select_sale.append(option);
            select_status_filter.append(option_filter);
        })
    }
}

// Event change select filter data
$('.filter-status').on('change', e => {
    let type_filter = $('.filter-status').find(":selected").val();
    if (type_filter !== "") {
        filter_status(type_filter);

    }
})

function filter_status(kind_status) {
    const data = JSON.parse(localStorage.getItem("data_home"));
    let sale_home = JSON.parse(localStorage.getItem("sale_home"));

    let jsonArr = [];
    sale_home.forEach(ele=>{
        if(ele.name === kind_status){
            jsonArr = data.filter(item => item.sale == ele.name );
        }

    })
    // Call function show data to client
    show_data_to_front_end(jsonArr, "not");

}

// Event when search
$('#key_search').keyup(e => {
    e.stopImmediatePropagation();
    let type_search = $('.type-search').find(":selected").val();
    flter_data(e.target.value, type_search);

});

// Function filter data search
function flter_data(keyword, type) {
    const data = JSON.parse(localStorage.getItem("data_home"));
    //   console.log(data);
    let jsonArr = [];
    if (type !== "") {
        // search filter follow name customer

        if (type === "name_cus") {
            jsonArr = data.filter(item => (item.name).toLowerCase().includes(keyword));
            // jsonArr.push(obj);
        } // Search follow with Order ID
        else if (type === "order_id") {
            jsonArr = data.filter(item => (item.id).toLowerCase().includes(keyword));

        } // Search follow with Phone
        else if (type === "phone") {
            jsonArr = data.filter(item => (item.phone).toLowerCase().includes(keyword));

        }

    }
    if (keyword == "") {
        jsonArr = data;
    }

    show_data_to_front_end(jsonArr);

}

// Modal delete confirm
$('#modal-edit-sale').on('show.bs.modal', function (event) {
    let row_update = $(event.relatedTarget).data('val');
    console.log($(event.relatedTarget).data('val'));
    $('.row-update').val(row_update);

    let data_find = JSON.parse(localStorage.getItem("data_home"));
    let obj = data_find.filter(item => item.index === row_update-1);
    $('.sale').val(obj[0].sale);

});
$("#modal-edit-sale").on('hide.bs.modal', function () {
    $('input').val(null);
    $('.alert').addClass('hide');
    $('.alert').removeClass('show');
    $('.alert').removeClass('alert-success');
    $('.alert').removeClass('alert-danger');
    load_data_from_server();

});

$('.btn-save').on('click', function(e){
    e.preventDefault();
    let sale = $('.sale').find(":selected").val();
    

    let dt = {
        action: "UPDATE_SALE_PROCESS",
        sale: sale.trim(),
        row: $('.row-update').val()
    }
    do_action(dt);
    

})

function do_action(data) {

    if (data) {
        $.ajax({
            type: 'POST',
            url: url_api,
            dataType: 'json',
            data: data,
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