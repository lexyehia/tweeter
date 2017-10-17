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
                    $( this ).dialog( "close" );
                }
            }
        ],
        modal: true,
    })

    $('.login-user').dialog({
        autoOpen: false
    })

    $('#login-user-button').click(function(e) {
        e.stopPropagation();
        $('#login-user-form').dialog('open');
    }) 

    $('#register-user-button').click(function(e) {
        e.stopPropagation();
        $('#register-user-form').dialog('open');
    }) 

    $('#register-user-form').submit(function(e) {
        e.preventDefault();
        if ($('#register-user-password').val() !== $('#register-user-vpassword').val()) {
            alert("Passwords don't match");
        } else {
            $(this).dialog('close');
            $.post('/users/new', $(this).serialize());
        }
        return false;
    }) 
})

function submitUserRegistration() {

}