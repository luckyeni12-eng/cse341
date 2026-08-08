import mongoose from "mongoose";


const authorSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },


    email:{
        type:String,
        required:true,
        unique:true
    },


    nationality:{
        type:String,
        required:true
    },


    birthYear:{
        type:Number,
        required:true
    },


    biography:{
        type:String,
        required:true
    }

},
{
    timestamps:true
});


export default mongoose.model(
    "Author",
    authorSchema
);