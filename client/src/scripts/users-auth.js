var Cookies = require('../vendor/js-cookie')

$(document).ready(function() {
    $('#register-user-form').dialog({
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
    })

    $('#login-user-form').dialog({
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
        modal: true,
    })

    $('#login-user-button').click(function(e) {
        e.stopPropagation();
        $('#login-user-form').dialog('open');
    })

    $('#register-user-button').click(function(e) {
        e.stopPropagation();
        $('#register-user-form').dialog('open');
    })

    $('#logout-user-button').click(function(e) {
        e.stopPropagation();
        Cookies.remove('user_id');
        alert('Successfully logged out');
        checkSession();
    })

    $('#register-user-form').submit(function(e) {
        e.preventDefault();
        if ($('#register-user-password').val() !== $('#register-user-vpassword').val()) {
            alert("Passwords don't match");
        } else {
            $(this).dialog('close');
            $.post('/users/new', $(this).serialize(), checkSession);
        }
        return false;
    })

    $('#login-user-form').submit(function(e) {
        e.preventDefault();

        $.post('/users/login', $(this).serialize(), function() {
            $('#login-user-form').dialog('close');
            checkSession();
        }).fail(function() {
            alert('Handle or password are incorrect. Please try again');
        })
    })

    checkSession()
})

function checkSession() {
    if(Cookies.get('user_id')) {
        $('#register-user-button').hide();
        $('#login-user-button').hide();
        $('#logout-user-button').show()
    } else {
        $('#register-user-button').show()
        $('#login-user-button').show()
        $('#logout-user-button').hide()
    }
}