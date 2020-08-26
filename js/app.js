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
  let user = sessionStorage.getItem("user");
  if(!user){
    window.location.href = "https://nguyenoni.github.io/crm/login.html";
  }
  else{
    $('.user_name').html(user.user);
  }
});

$('.btn-logout').on("click", function(){
  sessionStorage.removeItem("user");
  window.location.href = "https://nguyenoni.github.io/crm/login.html";
})

