
const url_api = "https://script.google.com/macros/s/AKfycbwvWDwAkJu--B1sJfMS3jJSt2kKC2johynPPN9YxEtlXHuGAJl6/exec";

// Event click login
$('.btn-login').on("click", function(){

    let user_name = $('#username').val();
    let password = $('#password').val();
    let user = sessionStorage.getItem("user")

    if(user_name ===""){
        
    }
    else if(password === ""){
        
    }
    else{
        let dt = {
            action: "LOGIN",
            password: password,
            user_name: user_name
        }
        do_action(dt);
    }
});

// Function do action

function do_action(dt) {
    if (dt.length !== 0) {
        $.ajax({
            type: 'POST',
            url: url_api,
            dataType: 'json',
            data: dt,
            success: function (data) {

                if (data.status == 200) {
                    sessionStorage.removeItem("user");
                    sessionStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = "https://nguyenoni.github.io/crm/";
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