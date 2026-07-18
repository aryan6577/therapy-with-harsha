const Holiday = require("../models/Holiday");

// ==========================================
// Add Holiday
// ==========================================

exports.addHoliday = async (req, res) => {

  try {

    const {
      date,
      reason,
    } = req.body;

    // Date is compulsory
    if (!date) {

      return res.status(400).json({

        success: false,

        message: "Date is required.",

      });

    }

    // Prevent duplicate holidays
    const exists = await Holiday.findOne({
      date,
    });

    if (exists) {

      return res.status(400).json({

        success: false,

        message: "Holiday already exists.",

      });

    }

    // Save holiday
    const holiday = await Holiday.create({

      date,

      reason:
        reason && reason.trim() !== ""
          ? reason.trim()
          : "Holiday",

    });

    res.status(201).json({

      success: true,

      message: "Holiday Added Successfully",

      holiday,

    });

  } catch (err) {

    console.log("Add Holiday Error:", err);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ==========================================
// Get Holidays
// ==========================================

exports.getHolidays = async (req, res) => {

  try {

    const holidays = await Holiday.find().sort({

      date: 1,

    });

    res.json({

      success: true,

      holidays,

    });

  } catch (err) {

    console.log("Get Holiday Error:", err);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ==========================================
// Delete Holiday
// ==========================================

exports.deleteHoliday = async (req, res) => {

  try {

    const holiday = await Holiday.findById(
      req.params.id
    );

    if (!holiday) {

      return res.status(404).json({

        success: false,

        message: "Holiday not found.",

      });

    }

    await Holiday.findByIdAndDelete(
      req.params.id
    );

    res.json({

      success: true,

      message: "Holiday Deleted Successfully",

    });

  } catch (err) {

    console.log("Delete Holiday Error:", err);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};