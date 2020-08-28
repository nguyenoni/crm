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
    window.location.href = "https://nguyenoni.github.io/crm/login.html";
    // window.location.href = "/login.html";
  }
  else{
    // $('.user_name').html(user.user);
    $('.title-customer').text("Danh sách khách hàng của "+user.full_name);
    $('.title-order').text("Danh sách vận đơn của "+user.full_name);
  }
});

$('.btn-logout').on("click", function(){
  sessionStorage.removeItem("user");
  window.location.href = "https://nguyenoni.github.io/crm/login.html";
  // window.location.href = "/login.html";
})


