const Vacation = require("../models/Vacation");

// ==========================================
// Add Vacation
// ==========================================

exports.addVacation = async (req, res) => {

  try {

    const {
      startDate,
      endDate,
      reason,
    } = req.body;

    // ==========================
    // Required Validation
    // ==========================

    if (!startDate || !endDate) {

      return res.status(400).json({

        success: false,

        message:
          "Start Date and End Date are required.",

      });

    }

    const start = new Date(startDate);

    const end = new Date(endDate);

    const today = new Date();

    // Remove time
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    // ==========================
    // End Date Validation
    // ==========================

    if (end < start) {

      return res.status(400).json({

        success: false,

        message:
          "End date cannot be earlier than Start date.",

      });

    }

    // ==========================
    // Past Date Validation
    // ==========================

    if (start < today) {

      return res.status(400).json({

        success: false,

        message:
          "Vacation cannot start in the past.",

      });

    }

    // ==========================
    // Overlapping Vacation Check
    // ==========================

    const overlap =
      await Vacation.findOne({

        startDate: {
          $lte: end,
        },

        endDate: {
          $gte: start,
        },

      });

    if (overlap) {

      return res.status(400).json({

        success: false,

        message:
          "Vacation overlaps with an existing vacation.",

      });

    }

    // ==========================
    // Create Vacation
    // ==========================

    const vacation =
      await Vacation.create({

        startDate: start,

        endDate: end,

        reason:
          reason &&
          reason.trim() !== ""
            ? reason.trim()
            : "Vacation",

      });

    res.status(201).json({

      success: true,

      message:
        "Vacation Added Successfully",

      vacation,

    });

  }

  catch (err) {

    console.log(
      "Vacation Error:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};
// ==========================================
// Get Vacations
// ==========================================

exports.getVacations = async (req, res) => {

  try {

    const vacations = await Vacation.find()
      .sort({
        startDate: 1,
      });

    res.json({

      success: true,

      vacations,

    });

  }

  catch (err) {

    console.log(
      "Get Vacation Error:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};

// ==========================================
// Delete Vacation
// ==========================================

exports.deleteVacation = async (req, res) => {

  try {

    const vacation =
      await Vacation.findById(
        req.params.id
      );

    if (!vacation) {

      return res.status(404).json({

        success: false,

        message:
          "Vacation not found.",

      });

    }

    await Vacation.findByIdAndDelete(
      req.params.id
    );

    res.json({

      success: true,

      message:
        "Vacation Deleted Successfully",

    });

  }

  catch (err) {

    console.log(
      "Delete Vacation Error:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};