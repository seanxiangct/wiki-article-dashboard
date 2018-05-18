$(function() {

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    

});

// check password and password-repeat are the same
let psw = document.getElementById('password');
let repeat = document.getElementById('confirm-password');

function validate_password()
{
    if (psw.value != repeat.value) {
        repeat.setCustomValidity("Passwords Don't Match");
    } else {
        repeat.setCustomValidity('');
    }
}


psw.onchange = validate_password;
repeat.onkeyup = validate_password;
