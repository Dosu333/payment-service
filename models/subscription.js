const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    durationInDays: {
        type: Number,
        required: true
    },
    firstTimeUserDiscount: {
        type: Number,
        required: false,
        default: 0
    },
    currency: {
        type: String,
        default: "NGN"
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

subscriptionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

subscriptionSchema.set('toJSON', {
    virtuals: true,
});

exports.Subscription = mongoose.model('Subscription', subscriptionSchema);
exports.subscriptionSchema = subscriptionSchema;