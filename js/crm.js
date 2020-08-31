
// Function show data to client
function show_data_to_client(data, type_show = "aaa") {

    if (data.length !== 0) {
        $('#pagination').pagination({
            dataSource: data,
            pageSize: 10,
            autoHidePrevious: true,
            autoHideNext: true,
            callback: function (data, pagination) {
                // template method of yourself
                var tbody = $('tbody').empty();
                data.forEach((item, index) => {

                    let tr = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.id_customer}</td>
                            <td>${item.name}</td>
                            <td>${item.phone}</td>
                            <td><i class="far fa-check-circle ${ item.status ? 'status-checked' : 'status-check'}" 
                                title="${item.status ? 'Đã tạo vận đơn' : 'Chưa tạo vận đơn'}"></i>
                            </td>
                            <td>
                                <a data-val="${item.id_customer}" data-toggle="modal" data-target="#exampleModal">${item.status ? '' :
                                '<i  class="fas fa-plus-circle create-new-bill-order left" title="Tạo vận đơn"></i></a>'}

                                <a data-val="${item.row}" data-toggle="modal" data-target="#modal-confirm"><i class="far fa-trash-alt delete-order "
                                 title="Xóa đơn hàng"></i> </a>
                            </td>
                        </tr>
                        
                        `;
                    tbody.append(tr);
                });
            }
        })
        // if (type_show == "first"){
        //     $('.filter-status').val("").change();
        // }

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

}
// Modal delete confirm
$('#modal-confirm').on('show.bs.modal', function (event) {
    const order_id = $(event.relatedTarget).data('val');
    $('.row-delete').val(order_id);

});
$("#modal-confirm").on('hide.bs.modal', function () {
    $('input').val(null);
    $('.alert').addClass('hide');
    $('.alert').removeClass('show');
    $('.alert').removeClass('alert-success');
    $('.alert').removeClass('alert-danger');
    get_data();

});

$('#exampleModal').on('show.bs.modal', function (event) {
    const order_id = $(event.relatedTarget).data('val');
    // set value to input form

    let data_find = JSON.parse(localStorage.getItem("data_customer"));
    let obj = data_find.filter(item => item.id_customer === order_id);
    $('.customer-id').val(obj[0].id_customer);
    $('.customer-name').val(obj[0].name);
    $('.phone-number').val(obj[0].phone);
    $('.name-sale').val(obj[0].name_sale_process);
    $('.row').val(obj[0].row);
    $('.name-product').val(obj[0].name_product);
});

// Clear all value in modal when modal hide
$("#exampleModal").on('hide.bs.modal', function () {
    $('input').val(null);
    $('.alert').addClass('hide');
    $('.alert').removeClass('show');
    $('.alert').removeClass('alert-success');
    $('.alert').removeClass('alert-danger');
    get_data();


});

// modal edit order
// $('#modal-edit-order').on('show.bs.modal', function (event) {
//     let order_id = $(event.relatedTarget).data('val');
//     // set value to input form
//     let data_find = JSON.parse(localStorage.getItem("data_customer"));
//     let obj = data_find.filter(item => item.id_customer === order_id.trim());
//     $('.customer-id-edit').val(obj[0].id_customer);
//     $('.customer-name-edit').val(obj[0].name);
//     $('.phone-number-edit').val(obj[0].phone);
//     $('.name-sale-edit').val(obj[0].name_sale_process);
//     $('.row').val(obj[0].row);
//     $('.require-edit').val(obj[0].require);
//     $('.note-edit').val(obj[0].note);
//     $('.quantity').val(obj[0].quantity);
//     $('name-product').val(obj[0].name_product);

// });


// $("#modal-edit-order").on('hide.bs.modal', function () {
//     $('input').val(null);
//     $('.alert').addClass('hide');
//     $('.alert').removeClass('show');
//     $('.alert').removeClass('alert-success');
//     $('.alert').removeClass('alert-danger');
//     get_data();
// });

// Function filter data search
function flter_data(keyword, type) {
    const data = JSON.parse(localStorage.getItem("data_customer"));
    //   console.log(data);
    let jsonArr;
    if (type !== "") {
        // search filter follow name customer

        if (type === "name_cus") {
            jsonArr = data.filter(item => (item.name).toLowerCase().includes(keyword));
            // jsonArr.push(obj);
        } // Search follow with Order ID
        else if (type === "order_id") {
            jsonArr = data.filter(item => (item.id_customer).toLowerCase().includes(keyword));

        } // Search follow with Phone
        else if (type === "phone") {
            jsonArr = data.filter(item => (item.phone).toLowerCase().includes(keyword));

        }

    }
    if (keyword == "") {
        jsonArr = data;
    }

    show_data_to_client(jsonArr);

}
// Event when search
$('#key_search').keyup(e => {
    e.stopImmediatePropagation();
    let type_search = $('.type-search').find(":selected").val();
    flter_data(e.target.value, type_search);

});


// Base url
const url = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";

// Function get data from API
function get_data() {
    let user = JSON.parse(sessionStorage.getItem("user"))
    let dt = {
        action: "GET_CUSTOMER",
        full_name: user.full_name
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

                    if (localStorage.getItem("data_customer") === null) {

                        localStorage.setItem("data_customer", JSON.stringify(data.data.data_customer));
                        localStorage.setItem("status_customer", JSON.stringify(data.data.status_customer));

                    } else {
                        localStorage.removeItem("data_customer");
                        localStorage.setItem("data_customer", JSON.stringify(data.data.data_customer));

                        localStorage.removeItem("status_customer");
                        localStorage.setItem("status_customer", JSON.stringify(data.data.status_customer));
                    }

                    show_data_to_client(data.data.data_customer);

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
// Load data to show in client
window.onload = get_data();

// function
$('.btn-save').on("click", (e) => {
    // [data.customer_id, data.customer_name, data.kind_contact, data.sale_status, data.quantity,
    // data.fee_ship, data.money_box, data.sum_money_order, data.create_at, data.phone_number, data.address, data.note, data.email_user_edit]
    e.preventDefault();
    let quantity = $('.quantity').find(":selected").val();
    let fee_ship = parseInt($('.fee-ship').find(":selected").val());
    let price = parseInt($('.price').val() === "" ? 0 : $('.price').val())
    let money_box = parseInt(price) * parseInt(quantity);
    let sum_money_order = money_box + fee_ship;
    let user = JSON.parse(sessionStorage.getItem("user"));
    const dt = {
        customer_id: $('.customer-id').val(),
        customer_name: $('.customer-name').val(),
        kind_contact: $('.kind-contact').find(":selected").val(),
        sale_status: $('.sale-status').val(),
        quantity: quantity,
        fee_ship: fee_ship,
        money_box: money_box,
        sum_money_order: sum_money_order,
        create_at: new Date().toLocaleString(),
        phone_number: $('.phone-number').val(),
        address: $(".address").val(),
        note: $('.note').val(),
        email_user_edit: user.email,
        row: $('.row').val(),
        action: "ADD",
        price: price,
        name_product: $('.name-product').val(),
        status_order: "Đã được xử lý",

    }

    do_action(dt)


})

function hide_alert() {
    setTimeout(function () {
        $('.alert').addClass('hide');
        $('.alert').removeClass('show');
        $('.alert').removeClass('alert-success');
        $('.alert').removeClass('alert-danger');

    }, 3000);

}

function do_action(data) {

    if (data) {
        $.ajax({
            type: 'POST',
            url: url,
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
//Chức năng lọc trên table data
function filter_status(kind_status) {
    const data = JSON.parse(localStorage.getItem("data_customer"));
    console.log(kind_status);
    let jsonArr;
    if (kind_status === "1") {
        jsonArr = data.filter(item => item.status === true)
        // jsonArr.push(obj);
    } // Search follow with Order ID
    else if (kind_status === "2") {
        jsonArr = data.filter(item => item.status === false)

    }
    else {
        jsonArr = data;
    }

    // Call function show data to client
    show_data_to_client(jsonArr, "not");

}
// Event change select filter data
$('.filter-status').on('change', e => {
    let type_filter = $('.filter-status').find(":selected").val();
    if (type_filter !== "") {
        filter_status(type_filter);

    }
})

// Event acept delete order

$('.btn-accept-delelte').on('click', function (e) {
    e.preventDefault();
    let row = $('.row-delete').val();
    let dt = {
        action: "DELETE",
        row: row
    }
    do_action(dt);
})

// Event acept edit order (save)
// $('.btn-save-edit').on('click', function (e) {
//     e.preventDefault();
//     let dt = {
//         action: "EDIT",
//         customer_id: $('.customer-id-edit').val(),
//         custumer_name: $('.customer-name-edit').val(),
//         order_quantity: $('.quantity').val(),
//         phone_number: $('.phone-number-edit').val(),
//         name_sale: $('.name-sale-edit').val(),
//         sale_status: $('.sale-status-edit').find(":selected").val(),
//         require: $('.require-edit').val(),
//         note: $('.note-edit').val(),
//         row: parseInt($('.row').val()) + 2,
//         create_at: new Date().toLocaleString(),
//         name_product: $('.name-product').val()

//     }
//     if (dt.customer_id !== "") {
//         do_action(dt);
//     }
//     else {
//         $('.alert').removeClass('hide');
//         $('.alert').removeClass('alert-success');
//         $('.alert').addClass('show alert-danger');
//         $('.message').text("");
//         $('.message').text("Vui lòng kiểm tra lại các trường dữ liệu!");
//         hide_alert();
//     }



// })