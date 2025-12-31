const mongoose = require("mongoose");

const ValidatedFindingSchema = new mongoose.Schema(
  {
    rawScanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RawFinding",
    },
    validatedFindings: {
      type: Array,
      required: true,
    },
    agent: {
      type: String,
      default: "ValidationAgent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ValidatedFinding", ValidatedFindingSchema);
