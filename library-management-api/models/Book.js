import mongoose from "mongoose";


const bookSchema = mongoose.Schema({

title:{
    type:String,
    required:true
},

author:{
    type:String,
    required:true
},

isbn:{
    type:String,
    required:true
},

genre:{
    type:String,
    required:true
},

publisher:{
    type:String,
    required:true
},

yearPublished:{
    type:Number,
    required:true
},

pages:{
    type:Number,
    required:true
},

language:{
    type:String,
    required:true
},

available:{
    type:Boolean,
    default:true
},

description:{
    type:String,
    required:true
}


});


export default mongoose.model("Book",bookSchema);