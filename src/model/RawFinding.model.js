const mongoose = require("mongoose");

const RawFindingSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true, // e.g. "OWASP ZAP", "Nuclei", "Custom Scanner"
    },
    target: {
      type: String,
      required: true, // domain, IP, service name
    },
    findings: {
      type: Array,
      required: true, // raw scanner output
    },
    receivedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RawFinding", RawFindingSchema);
