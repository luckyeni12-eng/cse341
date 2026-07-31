import mongoose from "mongoose";


const authorSchema = new mongoose.Schema(

{

firstName:{
    type:String,
    required:true,
    trim:true
},


lastName:{
    type:String,
    required:true,
    trim:true
},


birthYear:{
    type:Number,
    required:true,
    min:1000
},


country:{
    type:String,
    required:true
},


email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
}


},

{
    timestamps:true
}

);



export default mongoose.model(
    "Author",
    authorSchema
);