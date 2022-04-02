const mongoose = require("mongoose");
const validator = require("validator");

const tradeSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 10,  
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isAlphanumeric(value);
            }
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: (value) => {
                return validator.isNumeric(value.toString());
            }
        }
        
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: (value) => {
                return validator.isNumeric(value.toString());
            }
        }
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

tradeSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Trade", tradeSchema);

