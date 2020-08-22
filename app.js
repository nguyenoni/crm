// Const

const url_api = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";


$(document).ready(function () {
  // $('select').formSelect();

  // Fakes the loading setting a timeout
  setTimeout(function () {
    $('body').addClass('loaded');
  }, 3500);
  // Event load modal add new bill order
  // $('.create-bill-order').on("click", )
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
  $("#exampleModal").on('hide.bs.modal', function(){
    $('input').val(null);
    $('.alert').addClass('hide');
    $('.alert').removeClass('show');
    $('.alert').removeClass('alert-success');
    $('.alert').removeClass('alert-danger');
    location.reload();
  });

});

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
  let response;
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
