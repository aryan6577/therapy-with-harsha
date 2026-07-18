const BlockedSlot = require("../models/BlockedSlot");

// ======================================
// Add Blocked Slot
// ======================================

exports.addBlockedSlot = async (req, res) => {

  try {

    const {
      date,
      startTime,
      endTime,
      reason,
    } = req.body;

    // ==========================
    // Required Fields
    // ==========================

    if (
      !date ||
      !startTime ||
      !endTime
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Date, Start Time and End Time are required.",

      });

    }

    // ==========================
    // Past Date Check
    // ==========================

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);

    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {

      return res.status(400).json({

        success: false,

        message:
          "Cannot block a past date.",

      });

    }

    // ==========================
    // Time Validation
    // ==========================

    if (endTime <= startTime) {

      return res.status(400).json({

        success: false,

        message:
          "End Time must be later than Start Time.",

      });

    }

    // ==========================
    // Duplicate Check
    // ==========================

    const exists =
      await BlockedSlot.findOne({

        date,

        startTime,

        endTime,

      });

    if (exists) {

      return res.status(400).json({

        success: false,

        message:
          "This blocked slot already exists.",

      });

    }

    // ==========================
    // Overlapping Slot Check
    // ==========================

    const overlapping =
      await BlockedSlot.findOne({

        date,

        startTime: {

          $lt: endTime,

        },

        endTime: {

          $gt: startTime,

        },

      });

    if (overlapping) {

      return res.status(400).json({

        success: false,

        message:
          "This time overlaps with an existing blocked slot.",

      });

    }

    // ==========================
    // Create Slot
    // ==========================

    const blockedSlot =
      await BlockedSlot.create({

        date,

        startTime,

        endTime,

        reason:
          reason || "Blocked Time",

      });

    res.status(201).json({

      success: true,

      message:
        "Blocked Time Slot Added Successfully",

      blockedSlot,

    });

  }

  catch (err) {

    console.log(
      "Blocked Slot Error:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};

// ======================================
// Get Blocked Slots
// ======================================

exports.getBlockedSlots = async (
  req,
  res
) => {

  try {

    const blockedSlots =
      await BlockedSlot.find().sort({

        date: 1,

        startTime: 1,

      });

    res.json({

      success: true,

      blockedSlots,

    });

  }

  catch (err) {

    console.log(
      "Get Blocked Slot Error:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};

// ======================================
// Delete Blocked Slot
// ======================================

exports.deleteBlockedSlot =
  async (req, res) => {

    try {

      const blockedSlot =
        await BlockedSlot.findById(
          req.params.id
        );

      if (!blockedSlot) {

        return res.status(404).json({

          success: false,

          message:
            "Blocked Slot not found.",

        });

      }

      await BlockedSlot.findByIdAndDelete(
        req.params.id
      );

      res.json({

        success: true,

        message:
          "Blocked Slot Deleted Successfully",

      });

    }

    catch (err) {

      console.log(
        "Delete Blocked Slot Error:",
        err
      );

      res.status(500).json({

        success: false,

        message:
          "Server Error",

      });

    }

  };