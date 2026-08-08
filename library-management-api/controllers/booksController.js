import Book from "../models/Book.js";



// GET ALL BOOKS

export async function getBooks(req,res){

try{


const books = await Book.find();



res.status(200).json(books);



}

catch(error){


res.status(500).json({

message:"Error retrieving books",
error:error.message

});


}

}




// GET SINGLE BOOK


export async function getBook(req,res){


try{


const book = await Book.findById(
req.params.id
);



if(!book){


return res.status(404).json({

message:"Book not found"

});


}



res.status(200).json(book);



}

catch(error){


res.status(500).json({

message:"Error retrieving book",
error:error.message

});


}



}






// CREATE BOOK


export async function createBook(req,res){


try{


const book = new Book({

title:req.body.title,

isbn:req.body.isbn,

author:req.body.author,

category:req.body.category,

publisher:req.body.publisher,

publicationYear:req.body.publicationYear,

pages:req.body.pages,

language:req.body.language,

available:req.body.available

});



const savedBook =
await book.save();



res.status(201).json(savedBook);



}

catch(error){



res.status(400).json({

message:"Unable to create book",

error:error.message

});


}



}






// UPDATE BOOK


export async function updateBook(req,res){


try{


const updatedBook =
await Book.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true,
runValidators:true
}

);



if(!updatedBook){


return res.status(404).json({

message:"Book not found"

});


}



res.status(200).json(updatedBook);



}

catch(error){


res.status(400).json({

message:"Unable to update book",

error:error.message

});


}


}






// DELETE BOOK


export async function deleteBook(req,res){


try{


const deletedBook =
await Book.findByIdAndDelete(
req.params.id
);



if(!deletedBook){


return res.status(404).json({

message:"Book not found"

});


}



res.status(200).json({

message:"Book deleted successfully"

});



}

catch(error){



res.status(500).json({

message:"Unable to delete book",

error:error.message

});


}



}