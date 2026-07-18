const TherapyNote = require("../models/TherapyNote");

exports.addNote = async (req, res) => {
  try {
    const note = await TherapyNote.create(req.body);

    res.json({
      success: true,
      message: "Note Saved",
      note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getPatientNotes = async (req, res) => {
  try {
    const notes = await TherapyNote.find({
      patient: req.params.patientId,
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};