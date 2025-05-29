const {
  insertAntibiotic,
  getAllAntibiotics,
  updateAntibiotic,
} = require("./ams.service");
const logger = require("../../logger/logger");

module.exports = {
  insertAntibiotic: (req, res) => {
    const body = req.body;
    insertAntibiotic(body, (err, result) => {
      if (err) {
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Antibiotic inserted successfully",
      });
    });
  },

  getAllAntibiotics: (req, res) => {
    getAllAntibiotics((err, results) => {
      if (err) {
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      if (results === 0) {
        return res.status(200).json({
          success: 1,
          message: "No Records",
        });
      }
      return res.status(200).json({
        success: 2,
        data: results,
      });
    });
  },
  updateAntibiotic: (req, res) => {
    const body = req.body;
    updateAntibiotic(body, (err, results) => {
      if (err) {
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      if (results === 0) {
        return res.status(200).json({
          success: 1,
          message: "No record found",
        });
      }
      return res.status(200).json({
        success: 2,
        message: "Antibiotic Data Updated successfully",
      });
    });
  },
};
