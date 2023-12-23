const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paidSubscriptionSchema = Schema({
    subscription: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Subscription'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    expiryDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    isFirstSubscription: {
        type: Boolean,
        default: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

paidSubscriptionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

paidSubscriptionSchema.set('toJSON', {
    virtuals: true,
});

exports.PaidSubscription = mongoose.model('PaidSubscription', paidSubscriptionSchema);
exports.paidSubscriptionSchema = paidSubscriptionSchema;