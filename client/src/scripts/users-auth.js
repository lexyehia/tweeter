import * as Cookies from '../vendor/js-cookie'

export function checkSession() {
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

export function registerUser(e) {
    e.preventDefault();
    if ($('#register-user-password').val() !== $('#register-user-vpassword').val()) {
        alert("Passwords don't match");
    } else {
        $(this).dialog('close');
        $.post('/users/new', $(this).serialize(), checkSession);
    }
    return false;
}

export function openRegisterDialog(e) {
    e.stopPropagation();
    $('#register-user-form').dialog('open');
    $('#login-user-form').dialog('close');    
}

export function openLoginDialog(e) {
    e.stopPropagation();
    $('#login-user-form').dialog('open');
    $('#register-user-form').dialog('close');    
}

export function loginUser(e) {
    e.preventDefault();

    $.post('/users/login', $(this).serialize(), function() {
        $('#login-user-form').dialog('close');
        checkSession();
    }).fail(function() {
        alert('Handle or password are incorrect. Please try again');
    })
}

export function logoutUser(e) {
    e.stopPropagation();
    Cookies.remove('user_id');
    alert('Successfully logged out');
    checkSession();
}

export const registerUserForm = {
    autoOpen: false,
    width: 350,
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
}

export const loginUserForm = {
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
}