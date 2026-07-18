const ClinicalNote = require("../models/ClinicalNote");

// Save Clinical Note
exports.saveClinicalNote = async (
  req,
  res
) => {
  try {

    const {
      patient,
      appointment,
      mood,
      sleep,
      stressLevel,
      diagnosis,
      homework,
      therapistNotes,
      nextSessionRecommendation,
      riskLevel,
    } = req.body;

    let note =
      await ClinicalNote.findOne({
        appointment,
      });

    if (note) {

      note.mood = mood;
      note.sleep = sleep;
      note.stressLevel =
        stressLevel;
      note.diagnosis =
        diagnosis;
      note.homework =
        homework;
      note.therapistNotes =
        therapistNotes;
      note.nextSessionRecommendation =
        nextSessionRecommendation;
      note.riskLevel =
        riskLevel;

      await note.save();

    } else {

      note =
        await ClinicalNote.create({
          patient,
          appointment,
          mood,
          sleep,
          stressLevel,
          diagnosis,
          homework,
          therapistNotes,
          nextSessionRecommendation,
          riskLevel,
        });

    }

    res.json({
      success: true,
      message:
        "Clinical Note Saved",
      note,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Get Note
exports.getClinicalNote =
  async (req, res) => {

    try {

      const note =
        await ClinicalNote.findOne({
          appointment:
            req.params.appointmentId,
        });

      res.json({
        success: true,
        note,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };