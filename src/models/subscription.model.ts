import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  subscriptionName: {
    type: String,
    required: [true, "Subscription name is required"],
    trim: true,
    minlength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "Subscription price is required"],
    min: [0, "Price must be greater than 0"],
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP", "JPY", "INR", "CNY"],
    default: "USD",
  },
  frequency: {
    type: String,
    enum: ["weekly", "monthly", "yearly", "daily"],
  },
  category: {
    type: String,
    enum: [
      "news",
      "sports",
      "entertainment",
      "music",
      "lifestyle",
      "business",
      "technology",
      "health",
    ],
  },
  paymentMethod: {
    type: String,
    enum: ["credit card", "paypal", "bank transfer", "bitcoin"],
  },
  status: {
    type: String,
    enum: ["active", "canceled", "expired"],
    default: "active",
  },

  startDate: {
    type: Date,
    required: [true, "Start date is required"],
    validate: (value: Date) => value <= new Date(),
  },
  renewalDate: {
    type: Date,
    required: [true, "Renewal date is required"],
    validate: {
      validator: function (
        this: mongoose.Document & { startDate: Date },
        value: Date
      ) {
        return value > this.startDate;
      },
      message: "Renewal date must be greater than start date",
    },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    index: true,
  },
});

// Auto calculate renewal date if missing

subscriptionSchema.pre("save",function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,

        }

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency!])
    }
    if(this.renewalDate < new Date()) {
        this.status = "expired"

    }
    next()
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
