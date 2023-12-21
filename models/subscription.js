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
        required: false
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