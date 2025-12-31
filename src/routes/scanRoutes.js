const express = require("express");
const router = express.Router();
const RawFinding = require("../model/RawFinding.model.js");
const validationAgent = require("../agents/validationAgent.js");
const ValidatedFinding = require("../model/ValidatedFinding.model.js");

router.post("/", async (req, res) => {
  try {
    const { source, target, findings } = req.body;

    if (!source || !target || !findings) {
      return res.status(400).json({
        error: "source, target, and findings are required",
      });
    }

    const rawScan = await RawFinding.create({
      source,
      target,
      findings,
    });

    res.status(201).json({
      message: "Raw scan data ingested successfully",
      scanId: rawScan._id,
    });
  } catch (error) {
    console.error("Scan ingestion error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/validate", async (req, res) => {
  try {
    const rawScan = await RawFinding.findById(req.params.id);

    if (!rawScan) {
      return res.status(404).json({ error: "Raw scan not found" });
    }

    const validationResult = await validationAgent(rawScan.findings);

    const savedResult = await ValidatedFinding.create({
      rawScanId: rawScan._id,
      validatedFindings: validationResult.validated_findings,
    });

    res.json({
      message: "Validation completed",
      validatedResultId: savedResult._id,
      data: validationResult,
    });
  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({ error: "Validation failed" });
  }
});

module.exports = router;
