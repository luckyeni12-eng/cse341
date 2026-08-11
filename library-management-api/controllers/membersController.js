import Member from "../models/Member.js";


// GET ALL MEMBERS

export async function getMembers(req, res) {
  try {
    const members = await Member.find();

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving members",
      error: error.message
    });
  }
}


// GET ONE MEMBER

export async function getMember(req, res) {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving member",
      error: error.message
    });
  }
}


// CREATE MEMBER

export async function createMember(req, res) {
  try {
    const member = new Member(req.body);

    const savedMember = await member.save();

    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create member",
      error: error.message
    });
  }
}


// UPDATE MEMBER

export async function updateMember(req, res) {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedMember) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({
      message: "Unable to update member",
      error: error.message
    });
  }
}


// DELETE MEMBER

export async function deleteMember(req, res) {
  try {
    const deletedMember = await Member.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMember) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.status(200).json({
      message: "Member deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete member",
      error: error.message
    });
  }
}