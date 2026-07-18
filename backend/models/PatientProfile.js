const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    dob: String,
    gender: String,
    occupation: String,
    employmentType: String,
    maritalStatus: String,
    city: String,
    state: String,

country: {
  type: String,
  default: "India",
},

address: String,

pincode: String,

preferredLanguage: {
  type: String,
  default: "English",
},

phone: String,

fullName: String,

email: String,

bloodGroup: String,

height: String,

weight: String,

allergies: String,

medicalConditions: String,

    emergencyContact: String,

emergencyContactName: String,

emergencyContactNumber: String,

emergencyRelation: String,

    reasonForTherapy: String,
    therapyDuration: String,
    therapyGoal: String,

    concerns: [String],

    sleepQuality: Number,
    stressLevel: Number,
    energyLevel: Number,
    moodLevel: Number,
    workSatisfaction: Number,

    exercise: String,
    smoking: String,
    alcohol: String,

    previousTherapy: String,
    psychiatristVisited: String,
    medication: String,
    medicationDetails: String,

    additionalNotes: String,

    consent: Boolean,

    profileCompleted: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PatientProfile",
  patientProfileSchema
);