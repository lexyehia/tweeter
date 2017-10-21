import * as Cookies from '../vendor/js-cookie'

/**
 * Toggles whether to display on the Nav bar the 'logout' button or 
 * the 'login' and 'register' buttons, depending on the presence of a 
 * user_id cookie.
 * 
 * @export
 */
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

/**
 * Opens the Registration form dialog box when button clicked
 */
export function openRegisterDialog(e) {
    e.stopPropagation();
    $('#register-user-form').dialog('open');
    $('#login-user-form').dialog('close');    
}

/**
 * Opens Login dialog form when button clicked
 */
export function openLoginDialog(e) {
    e.stopPropagation();
    $('#login-user-form').dialog('open');
    $('#register-user-form').dialog('close');    
}

/**
 * Verifies that passwords match, then sends an Ajax POST request to the server
 * to persist the new User to the database. The response to a successful request
 * will include a user_id cookie. This then callsback checkSession().
 * 
 * @export 
 */
export function registerUser(e) {
    e.preventDefault();
    if ($('#register-user-password').val() !== $('#register-user-vpassword').val()) {
        alert("Passwords don't match");
    } else {
        $(this).dialog('close');
        $.post('/users/new', $(this).serialize(), checkSession);
    }
}

/**
 * Sends login form data to server for authentication. If successful, 
 * server sends back a set-cookie response. Callsback checkSession().
 * 
 * @export
 */
export function loginUser(e) {
    e.preventDefault();

    $.post('/users/login', $(this).serialize(), function() {
        $('#login-user-form').dialog('close');
        checkSession();
    }).fail(function() {
        alert('Handle or password are incorrect. Please try again');
    })
}

/**
 * Logs out user by deleting the user_id cookie and 
 * calls checkSession()
 * 
 * @export
 */
export function logoutUser(e) {
    e.stopPropagation();
    Cookies.remove('user_id');
    alert('Successfully logged out');
    checkSession();
}

/**
 * Object definition of the Registration Dialog Form
 * per jQuery UI specs
 */
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

/**
 * Object definition of the Login Dialog Form
 * per jQuery UI specs
 */
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