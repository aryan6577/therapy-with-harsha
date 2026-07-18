const Availability = require("../models/Availability");

// ======================================
// Save Availability
// ======================================

exports.saveAvailability = async (req, res) => {
  try {
    const {
      day,
      startTime,
      endTime,
      slotDuration,
      isAvailable,
    } = req.body;

    let availability = await Availability.findOne({ day });

    if (availability) {
      availability.startTime = startTime;
      availability.endTime = endTime;
      availability.slotDuration = slotDuration;
      availability.isAvailable = isAvailable;

      await availability.save();
    } else {
      availability = await Availability.create({
        day,
        startTime,
        endTime,
        slotDuration,
        isAvailable,
      });
    }

    res.json({
      success: true,
      message: "Availability Saved Successfully",
      data: availability,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Get Weekly Availability
// ======================================

exports.getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find().sort({ day: 1 });

    res.json({
      success: true,
      data: availability,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Get Single Day
// ======================================

exports.getAvailabilityByDay = async (req, res) => {
  try {
    const availability = await Availability.findOne({
      day: req.params.day,
    });

    res.json({
      success: true,
      data: availability,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};