$(document).ready(function () {
    // Function show data to client
    function show_data_to_client(data) {
        if (data) {
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
                            <td>${index}</td>
                            <td>${item.id_customer}</td>
                            <td>${item.name}</td>
                            <td>${item.phone}</td>
                            <td><i class="far fa-check-circle ${ item.status ? 'status-checked' : 'status-check'}" title="${item.status ? 'Đã tạo vận đơn' : 'Chưa tạo vận đơn'}"></i></td>
                            
                            <td value="${item.id_customer}"><a data-val="${item.id_customer}" data-toggle="modal" data-target="#exampleModal">${item.status ? '' : '<i class="fas fa-plus-circle create-new-bill-order left" title="Tạo vận đơn"></i></a>'} 
                            <i class="fas fa-cog edit-order" title="Chỉnh sửa đơn hàng"></i>
                            <i class="far fa-trash-alt delete-order " title="Xóa đơn hàng">delete</i> </td>
                        </tr>
                        
                        `;
                        tbody.append(tr);
                    });
                }
            })
        }

    }

    $('#exampleModal').on('show.bs.modal', function (event) {
        const order_id = $(event.relatedTarget).data('val');
        // set value to input form
        let data_find = JSON.parse(localStorage.getItem("data"));
        let obj = data_find.filter(item => item.id_customer === order_id);
        $('.customer-id').val(obj[0].id_customer);
        $('.customer-name').val(obj[0].name);
        $('.phone-number').val(obj[0].phone);
        $('.name-sale').val(obj[0].name_sale_process);
        $('.row').val(obj[0].row);
    });

    // Clear all value in modal when modal hide
    $("#exampleModal").on('hide.bs.modal', function () {
        $('input').val(null);
        $('.alert').addClass('hide');
        $('.alert').removeClass('show');
        $('.alert').removeClass('alert-success');
        $('.alert').removeClass('alert-danger');
        get_data();
        let data = JSON.parse(localStorage.getItem("data"));
        first_load_data_to_front_end(data);

    });

    // Function filter data search
    function flter_data(keyword, type) {
        const data = JSON.parse(localStorage.getItem("data"));
        //   console.log(data);
        let jsonArr;
        if (type !== "") {
            // search filter follow name customer
            if (type === "name_cus") {
                jsonArr = data.filter(item => item.name === keyword)
                // jsonArr.push(obj);
            } // Search follow with Order ID
            else if (type === "order_id") {
                jsonArr = data.filter(item => item.id_customer === keyword)

            } // Search follow with Phone
            else if (type === "phone") {
                jsonArr = data.filter(item => item.phone === keyword)

            }

        }
        if (keyword == "") {
            jsonArr = data;
        }


        // Call function show data to client
        // console.log(typeof keyword);
        show_data_to_client(jsonArr);
        // data.filter(x => x.name === "Blofeld");
    }
    // Event when search
    $('#key_search').keyup(e => {
        e.stopImmediatePropagation();
        let type_search = $('.type-search').find(":selected").val();
        flter_data(e.target.value, type_search);

    });


});
// Base url
const url = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";

// Function get data from API
async function get_data() {
    await fetch(url, {})
        .then(d => d.json())
        .then(d => {
            // load_data_to_front_end(d[0].data);
            if (localStorage.getItem("data") === null) {
                localStorage.setItem("data", JSON.stringify(d[0].data));
            } else {
                localStorage.removeItem("data");
                localStorage.setItem("data", JSON.stringify(d[0].data));
            }

            first_load_data_to_front_end(d[0].data);

        });


}
// Load data to show in client
window.onload = get_data();

function load_data_to_front_end() {
    // 

    if (localStorage.getItem("data")) {
        const data = JSON.parse(localStorage.getItem("data"));
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
                        <td>${item.row}</td>
                        <td>${item.id_customer}</td>
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td><i class="far fa-check-circle ${ item.status ? 'status-checked' : 'status-check'}" title="${item.status ? 'Đã tạo vận đơn' : 'Chưa tạo vận đơn'}"></i></td>  
                        <td value="${item.id_customer}"> <a data-val="${item.id_customer}" data-toggle="modal" data-target="#exampleModal">${item.status ? '' : '<i class="fas fa-plus-circle create-new-bill-order left" title="Tạo vận đơn"></i></a>'}  
                        <i class="fas fa-cog edit-order" title="Chỉnh sửa đơn hàng"></i>
                        <i class="far fa-trash-alt delete-order " title="Xóa đơn hàng">delete</i> </td>
                        
                    </tr>
                    
                    `;
                    tbody.append(tr);
                });
            }
        })
    }

}
function first_load_data_to_front_end(data) {
    // 

    if (data) {
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
                        <td>${item.row}</td>
                        <td>${item.id_customer}</td>
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td><i class="far fa-check-circle ${ item.status ? 'status-checked' : 'status-check'}" title="${item.status ? 'Đã tạo vận đơn' : 'Chưa tạo vận đơn'}"></i></td>
                        <td value="${item.id_customer}"><a data-val="${item.id_customer}" data-toggle="modal" data-target="#exampleModal">${item.status ? '' : '<i  class="fas fa-plus-circle create-new-bill-order left" title="Tạo vận đơn"></i></a>'}  
                        <i class="fas fa-cog edit-order " title="Chỉnh sửa đơn hàng"></i>
                        <i class="far fa-trash-alt delete-order " title="Xóa đơn hàng"></i> </td>
                    </tr>
                    
                    `;
                    tbody.append(tr);
                });
            }
        })
    }

}
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
        email_user_edit: "anonymos@gmail.com",
        row: $('.row').val()
    }

    save_data(dt)

})

function save_data(data) {

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


                }
            }

        });

    }
}
//Chức năng lọc trên table data
function filter_status(kind_status) {
    const data = JSON.parse(localStorage.getItem("data"));
    //   console.log(data);
    let jsonArr;
    if (kind_status === "1") {
        jsonArr = data.filter(item => item.status === true)
        // jsonArr.push(obj);
    } // Search follow with Order ID
    else if (kind_status === "2") {
        jsonArr = data.filter(item => item.status === false)

    } 
    else{
        jsonArr = data;
    }
  
    // Call function show data to client
    first_load_data_to_front_end(jsonArr);

}
// Event change select filter data
$('.filter-status').on('change', e => {
    let type_filter = $('.filter-status').find(":selected").val();
    if (filter_status !== "") {
        filter_status(type_filter);
    }
})
