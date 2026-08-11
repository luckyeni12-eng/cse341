import Author from "../models/Author.js";

// ==========================================
// GET ALL AUTHORS
// GET /authors
// Public route
// ==========================================

export async function getAuthors(req, res) {
    try {
        const authors = await Author.find();

        return res.status(200).json(authors);
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving authors",
            error: error.message
        });
    }
}

// ==========================================
// GET SINGLE AUTHOR
// GET /authors/:id
// Public route
// ==========================================

export async function getAuthor(req, res) {
    try {
        const author = await Author.findById(req.params.id);

        if (!author) {
            return res.status(404).json({
                message: "Author not found"
            });
        }

        return res.status(200).json(author);
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving author",
            error: error.message
        });
    }
}

// ==========================================
// CREATE AUTHOR
// POST /authors
// Protected + validated
// ==========================================

export async function createAuthor(req, res) {
    try {
        const author = new Author(req.body);

        const savedAuthor = await author.save();

        return res.status(201).json(savedAuthor);
    } catch (error) {
        return res.status(500).json({
            message: "Error creating author",
            error: error.message
        });
    }
}

// ==========================================
// UPDATE AUTHOR
// PUT /authors/:id
// Protected + validated
// ==========================================

export async function updateAuthor(req, res) {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            });
        }

        return res.status(200).json(updatedAuthor);
    } catch (error) {
        return res.status(500).json({
            message: "Error updating author",
            error: error.message
        });
    }
}

// ==========================================
// DELETE AUTHOR
// DELETE /authors/:id
// Protected
// ==========================================

export async function deleteAuthor(req, res) {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(
            req.params.id
        );

        if (!deletedAuthor) {
            return res.status(404).json({
                message: "Author not found"
            });
        }

        return res.status(200).json({
            message: "Author deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Author deleted successfully"
        });
    }
}