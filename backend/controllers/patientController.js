const PatientProfile = require("../models/PatientProfile");
const User = require("../models/User");

// ===============================================
// Save Patient Profile
// ===============================================

exports.saveProfile = async (req, res) => {

  try {

    const profile =
      await PatientProfile.findOneAndUpdate(

        {
          user: req.user.id,
        },

        {
          ...req.body,
          user: req.user.id,
        },

        {
          upsert: true,
          returnDocument: "after",
        }

      );

    return res.json({

      success: true,

      message: "Profile saved successfully.",

      profile: {

        _id: profile._id,

        user: profile.user,

        fullName: profile.fullName,

        email: profile.email,

        phone: profile.phone,

        dob: profile.dob,

        gender: profile.gender,

        occupation: profile.occupation,

        city: profile.city,

        state: profile.state,

        country: profile.country,

        emergencyContact:
          profile.emergencyContact,

        emergencyRelation:
          profile.emergencyRelation,

        preferredLanguage:
          profile.preferredLanguage,

        medication:
          profile.medication,

        previousTherapy:
          profile.previousTherapy,

        concerns:
          profile.concerns,

        consent:
          profile.consent,

        profileCompleted:
          profile.profileCompleted,

      },

    });

  }

  catch (err) {

    console.error(
      "Save Profile Error:",
      err
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error.",

    });

  }

};

// ===============================================
// Get Patient Profile
// ===============================================

exports.getProfile = async (req, res) => {

  try {

    const user =
      await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found.",

      });

    }

    const profile =
      await PatientProfile.findOne({

        user: req.user.id,

      });

    return res.json({

      success: true,

      user: {

        _id: user._id,

        patientId:
          user.patientId,

        fullName:
          user.fullName,

        email:
          user.email,

        phone:
          user.phone,

        role:
          user.role,

      },

      profile,

    });

  }

  catch (err) {

    console.error(
      "Get Profile Error:",
      err
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error.",

    });

  }

};