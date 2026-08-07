import jwt from "jsonwebtoken";


export function authenticate(req, res, next) {


    const authHeader = req.headers.authorization;


    console.log(
        "Authorization Header:",
        authHeader
    );


    if (!authHeader) {

        return res.status(401).json({

            message: "Access denied. No token provided"

        });

    }



    const token = authHeader.split(" ")[1];


    console.log(
        "Extracted Token:",
        token
    );



    try {


        // Check JWT secret before verification
        console.log(
            "Verify secret:",
            process.env.JWT_SECRET
        );


        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        req.user = decoded;


        console.log(
            "Authenticated User:",
            req.user
        );


        next();



    } catch (error) {


        console.log(
            "JWT Error:",
            error.message
        );


        return res.status(401).json({

            message: "Invalid token"

        });

    }


}