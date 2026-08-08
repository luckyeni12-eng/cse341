import User from "../models/User.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";





// REGISTER USER


export async function register(req,res){


try{


const existingUser =
await User.findOne({

email:req.body.email

});



if(existingUser){


return res.status(400).json({

message:"User already exists"

});


}




const hashedPassword =

await bcrypt.hash(

req.body.password,

10

);




const user =
new User({

email:req.body.email,

password:hashedPassword

});




await user.save();




res.status(201).json({

message:"User registered successfully"

});




}



catch(error){


res.status(500).json({

message:error.message

});


}



}









// LOGIN USER



export async function login(req,res){


try{


const user =

await User.findOne({

email:req.body.email

});





if(!user){


return res.status(404).json({

message:"User not found"

});


}







const validPassword =

await bcrypt.compare(

req.body.password,

user.password

);






if(!validPassword){


return res.status(401).json({

message:"Invalid password"

});


}







const token =

jwt.sign(

{

id:user._id,

email:user.email

},

process.env.JWT_SECRET,

{

expiresIn:"1h"

}

);






res.status(200).json({

message:"Login successful",

token

});





}

catch(error){



res.status(500).json({

message:error.message

});


}



}









// LOGOUT


export async function logout(req,res){



try{


res.status(200).json({

message:"Logout successful. Remove token from client."

});


}

catch(error){


res.status(500).json({

message:error.message

});


}


}