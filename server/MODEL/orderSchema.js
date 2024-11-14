const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const orderSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,  // Referencing Category model
                ref: 'Category',  // Refer to the Category model
                required: true
            },
            subCategory: {  // Shirt or Pant
                type: String,
                enum: ['Shirt', 'Pant'],
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            size: {  // Sizes like Small, Medium, Large
                type: [String],  // Array of sizes
                enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],  // Valid sizes
                required: true
            },
            images: [
                {
                  url: {
                    type: String,
                    required: true,  
                      
                  },
                  altText: {
                    type: String,
                  },
                  caption: {
                    type: String,
                  },
                },
              ],
            stock: {
                type: Number,
                required: true,
                default: 0
            },
    }
    ],
    address:  {
            firstName: String,
            lastName: String,
            landmark: String,
            addressDetail: String,
            state: String,
            zip: Number,
            phone: Number
        }
    ,
    totalprice:{
       type: Number
    },
    totalAmount:{
       type: Number
    },
    totalPaid: {
       type: Number
    },
    
    paymentStatus: {
        type: String
    },
    PaymentMethod: {
        type: String
    },
    deliveryStatus:{
        type: String,
        default: 'pending'
    },
    orderStatus:{
        type: String,
        default: 'pending'
        
    },
    canceled: {
        type: Boolean,
        default: false
    },
    returned: {
        type: Boolean,
        default: false
    },
    returnApprovel:{
      type: Boolean,
      default: false
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    verify: {
        type: Boolean,
        default: false
    }
});

const order = mongoose.model("order",orderSchema)

module.exports = order;