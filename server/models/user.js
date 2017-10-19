const mongoose = require("mongoose"),
const Chance = require("chance");
const chance = new Chance();
const md5 = require('md5');
const bcrypt = require('bcrypt')
Schema   = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    avatars: {
        small: String,
        regular: String,
        large: String
    },
    handle: {
        type: String,
        validate: {
            validator: function(value, respond) {
                this.where({handle: value}).limit(1).count((err, count) => {
                    count === 0 ? respond(true) : respond(false)
                })
            }
        }
    },
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {collection: 'users'});

userSchema.pre('save', next => {
    if (this.isNew) {
        this.generateAvatars()
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
})

userSchema.statics.generateRandomUser = function() {
    const gender    = chance.gender()
    const firstName = chance.first({gender: gender})
    const lastName  = chance.last()
    const name  = firstName + " " + lastName

    let handle = "@"
    if (Math.random() > 0.5) {
        let prefix = chance.prefix({gender: gender})
        prefix  = prefix.replace(".", "")
        handle += prefix
    }

    handle += lastName

    if (Math.random() > 0.5) {
        const suffix = Math.round(Math.random() * 100)
        handle += suffix;
    }

    return new this({ name, handle, password: '1' })
}

userSchema.statics.comparePasswords = function(email, password, cb) {
    this.findOne({email}, (err, user) => {
        if (!err && user && bcrypt.compareSync(password, user.password)) {
            cb(user)
        } else {
            cb(false)
        }
    })
}

userSchema.methods.generateAvatars = function() {
    const avatarUrlPrefix = `https://vanillicon.com/${md5(this.handle)}`

    this.avatars = {
        small:   `${avatarUrlPrefix}_50.png`,
        regular: `${avatarUrlPrefix}.png`,
        large:   `${avatarUrlPrefix}_200.png`
    }
}

module.exports = mongoose.model('User', userSchema);