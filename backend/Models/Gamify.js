const mongoose = require('mongoose');
const {Schema} = mongoose;
const Gamifyschema = new Schema({
    point:{
        type:Number,
        
    },
    Level:{
        type:String,
        
    },
    Ranks:{
        type:Number,
        
    },
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'},

    
});
const Gamifydb= mongoose.model('Gamify',Gamifyschema);

module.exports=Gamifydb;
