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
                            <td>${index + 1}</td>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.phone}</td>
                            <td>${item.address}</td>
                            <td>${item.sale}</td>
                            <td>
                            <a data-val="${item.row}" data-toggle="modal" data-target="#modal-edit-sale"><i class="far fa-edit edit-order" title="Phân phối cho sale xử lý"></i> </a>
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
                        <a data-val="${item.row}" data-toggle="modal" data-target="#modal-edit-sale"><i class="far fa-edit edit-order" title="Phân phối cho sale xử lý"></i> </a>
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
                    } else {
                        localStorage.removeItem("data_home");
                        localStorage.setItem("data_home", JSON.stringify(data.data.data_customer_home));
                    }
                    localStorage.removeItem("sale_home");
                    localStorage.setItem("sale_home", JSON.stringify(data.data.sale));

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

function set_sale_to_modal(dt){
    if (dt) {
        let select_sale = $('.sale').empty();
        dt.forEach(ele => {
     
            let option = `<option value = "${ele.name}">${ele.name}</option>`;
            select_sale.append(option);
        })
    }
}