import Loan from "../models/Loan.js";


// GET ALL LOANS

export async function getLoans(req, res) {
  try {
    const loans = await Loan.find()
      .populate("member")
      .populate("book");

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving loans",
      error: error.message
    });
  }
}


// GET ONE LOAN

export async function getLoan(req, res) {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate("member")
      .populate("book");

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found"
      });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving loan",
      error: error.message
    });
  }
}


// CREATE LOAN

export async function createLoan(req, res) {
  try {
    const loan = new Loan(req.body);

    const savedLoan = await loan.save();

    const populatedLoan = await Loan.findById(savedLoan._id)
      .populate("member")
      .populate("book");

    res.status(201).json(populatedLoan);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create loan",
      error: error.message
    });
  }
}


// UPDATE LOAN

export async function updateLoan(req, res) {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("member")
      .populate("book");

    if (!updatedLoan) {
      return res.status(404).json({
        message: "Loan not found"
      });
    }

    res.status(200).json(updatedLoan);
  } catch (error) {
    res.status(400).json({
      message: "Unable to update loan",
      error: error.message
    });
  }
}


// DELETE LOAN

export async function deleteLoan(req, res) {
  try {
    const deletedLoan = await Loan.findByIdAndDelete(
      req.params.id
    );

    if (!deletedLoan) {
      return res.status(404).json({
        message: "Loan not found"
      });
    }

    res.status(200).json({
      message: "Loan deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete loan",
      error: error.message
    });
  }
}