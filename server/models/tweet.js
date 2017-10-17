const mongoose = require("mongoose"),
      Schema   = mongoose.Schema;

let tweetSchema = new Schema({
    user: {
        name: 'Newton',
        avatars: {
            small: '',
            regular: '',
            large: ''
        },
        handle: ''
   },
   content: {
       text: ''
   },
   created_at: ''
})