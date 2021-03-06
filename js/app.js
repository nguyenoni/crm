// Const

const url_api = "https://script.google.com/macros/s/AKfycbwx_qBAyGwSa3Q6rhC6X55kXMsfZcgDUK0newb2pQ/exec";

$(document).ready(function () {

  // Fakes the loading setting a timeout


});

$().ready(function(){
  let user = JSON.parse(sessionStorage.getItem("user"));
  if(!user){
    window.location.href = "https://nguyenoni.github.io/crm/login.html";
    // window.location.href = "/login.html";
  }
  else{
    // $('.user_name').html(user.user);
    $('.title-customer').text("Danh sách khách hàng của "+user.full_name);
    $('.title-order').text("Danh sách vận đơn của "+user.full_name);
  }
  // add status option in to the modal form
  let status_sale = JSON.parse(localStorage.getItem("status_customer"));
  if(status_sale){
    let select = $('.sale-status').empty();
    let select_edit = $('.sale-status-edit').empty();

    status_sale.forEach(el => {
      let option = `<option value="${el.value}">${el.key}</option>`;
      select.append(option);
      select_edit.append(option);
    });

  }
  // add status option in to the modal form page order-list
  let status_order = JSON.parse(localStorage.getItem("status_order"));
  if (status_order){
    let select_modal_edit = $('.status').empty();
    let filter_status = $('.filter-status-order').empty();
    filter_status.append(`<option value="" disabled selected>Chọn trạng thái</option>`);
    status_order.forEach((el, index)=>{
      let option = `<option value="${el.value}">${el.key}</option>`;
      let option_filter = `<option value="${el.value}">${el.key}</option>`
  
      select_modal_edit.append(option);
      filter_status.append(option_filter);
    })
  }

 
});

$('.btn-logout').on("click", function(){
  sessionStorage.removeItem("user");
  window.location.href = "https://nguyenoni.github.io/crm/login.html";
  // window.location.href = "/login.html";
})


