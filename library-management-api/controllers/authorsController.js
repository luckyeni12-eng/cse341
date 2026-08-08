import Author from "../models/Author.js";





// GET ALL AUTHORS


export async function getAuthors(req,res){


try{


const authors =
await Author.find();



res.status(200).json(authors);



}

catch(error){


res.status(500).json({

message:"Error retrieving authors",

error:error.message

});


}



}






// GET ONE AUTHOR



export async function getAuthor(req,res){


try{


const author =
await Author.findById(
req.params.id
);



if(!author){


return res.status(404).json({

message:"Author not found"

});


}



res.status(200).json(author);



}

catch(error){


res.status(500).json({

message:"Error retrieving author",

error:error.message

});


}



}







// CREATE AUTHOR



export async function createAuthor(req,res){



try{


const author =
new Author({


name:req.body.name,


email:req.body.email,


nationality:req.body.nationality,


birthYear:req.body.birthYear,


biography:req.body.biography


});



const savedAuthor =
await author.save();



res.status(201).json(savedAuthor);



}


catch(error){



res.status(400).json({

message:"Unable to create author",

error:error.message

});


}


}









// UPDATE AUTHOR



export async function updateAuthor(req,res){


try{


const updatedAuthor =

await Author.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true,

runValidators:true

}

);




if(!updatedAuthor){


return res.status(404).json({

message:"Author not found"

});


}



res.status(200).json(updatedAuthor);



}


catch(error){


res.status(400).json({

message:"Unable to update author",

error:error.message

});


}


}









// DELETE AUTHOR



export async function deleteAuthor(req,res){


try{


const deletedAuthor =

await Author.findByIdAndDelete(

req.params.id

);





if(!deletedAuthor){


return res.status(404).json({

message:"Author not found"

});


}



res.status(200).json({

message:"Author deleted successfully"

});



}



catch(error){



res.status(500).json({

message:"Unable to delete author",

error:error.message

});


}



}