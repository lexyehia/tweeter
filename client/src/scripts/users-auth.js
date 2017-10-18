var Cookies = require('../vendor/js-cookie')

$(document).ready(function() {
    checkSession()
    $('#register-user-form').dialog(registerUserForm)
    $('#login-user-form').dialog(loginUserForm)
    $('#login-user-button').click(openLoginDialog)
    $('#register-user-button').click(openRegisterDialog)
    $('#logout-user-button').click(logoutUser)
    $('#register-user-form').submit(registerUser)
    $('#login-user-form').submit(loginUser)
})

function checkSession() {
    if(Cookies.get('user_id')) {
        $('#register-user-button').hide()
        $('#login-user-button').hide()
        $('#logout-user-button').show()
    } else {
        $('#register-user-button').show()
        $('#login-user-button').show()
        $('#logout-user-button').hide()
    }
}

function registerUser(e) {
    e.preventDefault();
    if ($('#register-user-password').val() !== $('#register-user-vpassword').val()) {
        alert("Passwords don't match");
    } else {
        $(this).dialog('close');
        $.post('/users/new', $(this).serialize(), checkSession);
    }
    return false;
}

function openRegisterDialog(e) {
    e.stopPropagation();
    $('#register-user-form').dialog('open');
}

function openLoginDialog(e) {
    e.stopPropagation();
    $('#login-user-form').dialog('open');
}

function loginUser(e) {
    e.preventDefault();

    $.post('/users/login', $(this).serialize(), function() {
        $('#login-user-form').dialog('close');
        checkSession();
    }).fail(function() {
        alert('Handle or password are incorrect. Please try again');
    })
}

function logoutUser(e) {
    e.stopPropagation();
    Cookies.remove('user_id');
    alert('Successfully logged out');
    checkSession();
}

var registerUserForm = {
    autoOpen: false,
    buttons: [
        {
            text: "Register",
            click: function() {
                $('#register-user-form').submit();
            },
            type: "submit"
        },
        {
            text: "Close",
            click: function() {
                $(this).dialog( "close" );
            }
        }
    ],
    modal: true,
}

var loginUserForm = {
    autoOpen: false,
    buttons: [
        {
            text: "Login",
            click: function() {
                $('#login-user-form').submit();
            },
            type: "submit"
        },
        {
            text: "Close",
            click: function() {
                $(this).dialog( "close" );
            }
        }
    ],
    modal: true
}