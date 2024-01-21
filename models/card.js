const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    authCode: {
        type: String,
        required: true
    },
    cardType: {
        type: String,
        required: true
    },
    last4: {
        type: String,
        required: true
    },
    expMonth: {
        type: String,
        required: true
    },
    expYear: {
        type: String,
        required: true
    },
    bin: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    reusable: {
        type: Boolean,
        default: false
    },
    countryCode: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: false
    },
    isReversed: {
        type: Boolean,
        default: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

cardSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cardSchema.set('toJSON', {
    virtuals: true,
});

exports.Card = mongoose.model('Card', cardSchema);
exports.cardSchema = cardSchema;