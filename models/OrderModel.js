const mongoose = require('mongoose');

const { Types, Schema } = mongoose;

const orderSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true, index: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 1 },
    customerId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        index: true,
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
