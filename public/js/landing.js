
// check password and password-repeat are the same
let psw = document.getElementById('inputPasswordReg');
let repeat = document.getElementById('inputRepeat');

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


