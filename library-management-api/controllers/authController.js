import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// REGISTER USER
export async function register(req, res) {

    try {

        const {
            username,
            email,
            password
        } = req.body;



        // Check if user already exists
        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({

                message: "User already exists"

            });

        }



        // Encrypt password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        // Create new user
        const user = await User.create({

            username,

            email,

            password: hashedPassword

        });



        res.status(201).json({

            message: "User registered successfully",

            user: {

                id: user._id,

                username: user.username,

                email: user.email

            }

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

}






// LOGIN USER
export async function login(req, res) {

    try {


        const {
            email,
            password
        } = req.body;



        // Find user
        const user = await User.findOne({

            email

        });



        if (!user) {


            return res.status(404).json({

                message: "User not found"

            });


        }



        // Compare password
        const passwordMatch = await bcrypt.compare(

            password,

            user.password

        );



        if (!passwordMatch) {


            return res.status(401).json({

                message: "Invalid email or password"

            });


        }




        // Generate JWT token
        const token = jwt.sign(

            {

                id: user._id,

                email: user.email

            },


            process.env.JWT_SECRET,


            {

                expiresIn: "1h"

            }

        );




        res.status(200).json({

            message: "Login successful",

            token

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

}






// LOGOUT USER
export async function logout(req, res) {


    try {


        res.status(200).json({

            message: "Logout successful"

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

}