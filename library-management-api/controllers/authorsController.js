import Author from "../models/Author.js";



// GET ALL AUTHORS

export async function getAuthors(req, res) {

    try {

        const authors = await Author.find();

        res.status(200).json(authors);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}




// GET SINGLE AUTHOR

export async function getAuthor(req, res) {

    try {

        const author = await Author.findById(req.params.id);


        if (!author) {

            return res.status(404).json({
                message: "Author not found"
            });

        }


        res.status(200).json(author);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}




// CREATE AUTHOR

export async function createAuthor(req, res) {

    try {


        const author = new Author(req.body);


        await author.save();


        res.status(201).json(author);



    } catch (error) {


        res.status(400).json({
            message: error.message
        });


    }

}




// UPDATE AUTHOR

export async function updateAuthor(req, res) {

    try {


        const author = await Author.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );


        if (!author) {

            return res.status(404).json({
                message: "Author not found"
            });

        }



        res.status(200).json(author);



    } catch (error) {


        res.status(400).json({
            message: error.message
        });


    }

}




// DELETE AUTHOR

export async function deleteAuthor(req, res) {

    try {


        const author = await Author.findByIdAndDelete(req.params.id);



        if (!author) {

            return res.status(404).json({
                message: "Author not found"
            });

        }



        res.status(200).json({

            message: "Author deleted"

        });



    } catch (error) {


        res.status(500).json({
            message: error.message
        });


    }

}