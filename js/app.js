// Const

const url_api = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";


$(document).ready(function () {
  // function show data



  // Fakes the loading setting a timeout
  setTimeout(function () {
    $('body').addClass('loaded');
  }, 3500);
  // Event load modal add new bill order
  // $('.create-bill-order').on("click", )


});

$().ready(function(){
  let user = JSON.parse(sessionStorage.getItem("user"));
  if(!user){
    // window.location.href = "https://nguyenoni.github.io/crm/login.html";
    window.location.href = "/login.html";
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

    status_order.forEach(el=>{
      let option = `<option value="${el.value}">${el.key}</option>`;
      select_modal_edit.append(option);
    })
  }
});

$('.btn-logout').on("click", function(){
  sessionStorage.removeItem("user");
  // window.location.href = "https://nguyenoni.github.io/crm/login.html";
  window.location.href = "/login.html";
})


