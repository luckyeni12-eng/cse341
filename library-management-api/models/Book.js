import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    isbn:{
        type:String,
        required:true,
        unique:true
    },


    author:{
        type:String,
        required:true
    },


    category:{
        type:String,
        required:true
    },


    publisher:{
        type:String,
        required:true
    },


    publicationYear:{
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
        required:true
    }

},
{
    timestamps:true
});


export default mongoose.model(
    "Book",
    bookSchema
);