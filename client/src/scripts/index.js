/* Importing CSS */
import 'webpack-jquery-ui/css'
import '../styles/layout.scss'

/* Importing JS */
import 'webpack-jquery-ui'
import * as auth from './users-auth'
import { updateCharCounter, postNewTweet, slideNewTweetBox } from './compose-tweet'
import { loadTweets } from './tweets-list'
import { increaseLikes, toggleLikesCount } from './tweet-likes'

/**
 * Functions invoked when page is done loading, including event listeners
 */
$(document).ready(function() {
    auth.checkSession()    
    loadTweets()

    $('#compose-tweet').click(slideNewTweetBox)    
    $('.new-tweet').find('textarea').on('keyup counter-change', updateCharCounter)
    $('.new-tweet').find('form').submit(postNewTweet)

    $('#tweets').on('click', '.tweet-like', increaseLikes)
    $('#tweets').on('likes-change', '.tweet-likes-count', toggleLikesCount)

    $('#register-user-form').dialog(auth.registerUserForm)
    $('#login-user-form').dialog(auth.loginUserForm)

    $('#login-user-button').click(auth.openLoginDialog)
    $('#register-user-button').click(auth.openRegisterDialog)
    $('#logout-user-button').click(auth.logoutUser)

    $('#register-user-form').submit(auth.registerUser)
    $('#login-user-form').submit(auth.loginUser)
})
