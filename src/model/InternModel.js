const mongoose = require("mongoose")
const Schema=mongoose.Schema

const IntrenModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { type: String, trim: true, lowercase: true, unique: true, required: 'Email address is required',
    validate: {
        validator: function (email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        }, message: 'Please fill a valid email address', isAsync: false
    }
  },

  mobile: {
    trim: true,
    type: String,
    required: 'Intern mobile is required',
    unique: true,
    validate: {
        validator: function (mobile) {
            return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile)
        }, message: 'Please fill a valid mobile number', isAsync: false
    }
},

    collegeId:{
        type: Schema.Types.ObjectId,
            ref:"College"
        },
     isDeleted: {
        type: Boolean, 
        default:false
        }
        
    }, { timestamps: true })
module.exports=mongoose.model("Intren",IntrenModel)