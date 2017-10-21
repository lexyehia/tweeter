const mongoose = require('mongoose')
const Chance   = require('chance')
const chance   = new Chance()
const md5      = require('md5')
const bcrypt   = require('bcrypt')

/**
 * User Model Schema
 */
let userSchema = new mongoose.Schema({
    name: String,
    avatars: {
        small: String,
        regular: String,
        large: String
    },
    handle: {
        type: String,
        validate: {
            isAsync: true,
            validator: validateUniqueHandle
        }
    },
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {collection: 'users'})

/**
 * If user object is new, adds '@' to handle, generates random avatars,
 * and encrypts the password before persisting to database
 */
userSchema.pre('save', function(next) {
    if (this.isNew) {
        this.handle = '@' + this.handle
        this.generateAvatars()
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
})

/**
 * This looks up a user on the basis of their handle, then
 * compares their password. Returns the user if successful, 
 * otherwise false
 */
userSchema.statics.comparePasswords = function(handle, password, cb) {
    User.findOne({handle: `@${handle}`}, (err, user) => {
        if (err) throw err

        if (user && bcrypt.compareSync(password, user.password)) {
            cb(user)
        } else {
            cb(false)
        }
    })
}

/**
 * Generates random avatars using vanillicon
 */
userSchema.methods.generateAvatars = function() {
    const avatarUrlPrefix = `https://vanillicon.com/${md5(this.handle)}`

    this.avatars = {
        small:   `${avatarUrlPrefix}_50.png`,
        regular: `${avatarUrlPrefix}.png`,
        large:   `${avatarUrlPrefix}_200.png`
    }
}

/**
 * Validates that a user's handle is unique
 */
function validateUniqueHandle(value, respond) {
    User.find().where({handle: value}).limit(1).count((err, count) => {
        count === 0 ? respond(true) : respond(false)
    })
}

const User = module.exports = mongoose.model('User', userSchema)