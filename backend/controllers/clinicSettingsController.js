const ClinicSettings = require("../models/ClinicSettings");

// ==========================================
// Get Clinic Settings
// ==========================================
exports.getSettings = async (req, res) => {
  try {

    let settings = await ClinicSettings.findOne();

    // Create default settings if none exist
    if (!settings) {

      settings = await ClinicSettings.create({});

    }

    res.json({
      success: true,
      settings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
exports.uploadQrCode = async (req, res) => {

    try {

        let settings = await ClinicSettings.findOne();

        if (!settings) {
            settings = await ClinicSettings.create({});
        }

        if (req.file) {
            settings.qrCode = req.file.path;
        }

        await settings.save();

        res.json({
            success: true,
            settings
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
// ==========================================
// Update Clinic Settings
// ==========================================
exports.updateSettings = async (req, res) => {
  try {

    let settings = await ClinicSettings.findOne();

    if (!settings) {

      settings = await ClinicSettings.create({});

    }

    Object.assign(settings, req.body);

    await settings.save();

    res.json({
      success: true,
      message: "Clinic settings updated successfully.",
      settings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};