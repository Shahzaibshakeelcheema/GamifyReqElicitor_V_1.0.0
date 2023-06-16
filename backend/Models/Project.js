const mongoose = require('mongoose');
const {Schema} = mongoose;
const Projectschema = new Schema({
    Title:{
        type:String,
        required:true
    },
    Desc:{
        type:String,
        required:true
    },
    Tag:{
        type:String,
        required:true,
        
        },
    Status:{
        type:String,
        required :true,
    },
    Progress:{
        type:Number,
    },
    createdby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
                },
    enduser:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
    reqeng:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
                },
});
const Projectdb= mongoose.model('Project',Projectschema);

module.exports=Projectdb;
