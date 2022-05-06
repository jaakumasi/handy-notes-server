const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [
        {
            noteTitle: {
                type: String,
            },
            note: {
                type: String,
            },
            createdAt: {
                type: String,
                immutable: true,
                default: () => new Date().toLocaleString()
            }
        }
    ]
})

UserSchema.statics.isEmailRegistered = async function (email) {
    try {
        const result = await this.findOne({ email: email })
        if (result) return true;
        else false;
    } catch (error) {
        console.log(error.message);
        return true;
    }
}

module.exports = mongoose.model('Users', UserSchema);