const mongoose = require('mongoose');
const {Schema} = mongoose;
const reqschema = new Schema({
    requirement:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true
    },
    Comment:{
        type:String,
        
    },
    verifiedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        },

    submittedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
            },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }
   
});
const Reqdb= mongoose.model('Requirements',reqschema);

module.exports=Reqdb;