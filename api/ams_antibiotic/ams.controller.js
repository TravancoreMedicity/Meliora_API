const { insertAntibiotic,getAllAntibiotics,updateAntibiotic,getAntibioticPatientDetails,updatePatientDetails, getReportAntibioticPatients, getRestrictedAntibiotics,
   getAllAntibioticCount, getRestrictedAntibioticCount, gettotUnRestrictedAntibioticCount, gettotRestrictedAntibioticCount, getTotAntibiotics,
   getPatientAntibioticList,
   updatePatientAntibioticsPriority} = require("./ams.service");
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

    getAntibioticPatientDetails: (req, res) => {
    getAntibioticPatientDetails((err, results) => {
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

  updatePatientDetails: (req, res) => {
    const body = req.body;
    updatePatientDetails(body, (err, results) => {     
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

      getReportAntibioticPatients: (req, res) => {
          const body = req.body       
          getReportAntibioticPatients(body, (err, results) => {
              if (err) {
                  return res.status(200).json({
                      success: 0,
                      message: err
                  })
              }
              if (results.length === 0) {
                  return res.status(200).json({
                      success: 1,
                      message: "No Records"
                  })
              }
              return res.status(200).json({
                  success: 2,
                  data: results
              })
          })
      },
      
    getRestrictedAntibiotics: (req, res) => {
    getRestrictedAntibiotics((err, results) => {
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

      getAllAntibioticCount: (req, res) => {
          const body = req.body
          getAllAntibioticCount(body, (err, results) => {
              if (err) {
                  return res.status(200).json({
                      success: 0,
                      message: err
                  })
              }
              if (results.length === 0) {
                  return res.status(200).json({
                      success: 1,
                      message: "No Records"
                  })
              }
              return res.status(200).json({
                  success: 2,
                  data: results
              })
          })
      },

            getRestrictedAntibioticCount: (req, res) => {
          const body = req.body
          getRestrictedAntibioticCount(body, (err, results) => {
              if (err) {
                  return res.status(200).json({
                      success: 0,
                      message: err
                  })
              }
              if (results.length === 0) {
                  return res.status(200).json({
                      success: 1,
                      message: "No Records"
                  })
              }
              return res.status(200).json({
                  success: 2,
                  data: results
              })
          })
      },
          gettotUnRestrictedAntibioticCount: (req, res) => {
          const body = req.body
          gettotUnRestrictedAntibioticCount(body, (err, results) => {
              if (err) {
                  return res.status(200).json({
                      success: 0,
                      message: err
                  })
              }
              if (results.length === 0) {
                  return res.status(200).json({
                      success: 1,
                      message: "No Records"
                  })
              }
              return res.status(200).json({
                  success: 2,
                  data: results
              })
          })
      },
      
          gettotRestrictedAntibioticCount: (req, res) => {
          const body = req.body
          gettotRestrictedAntibioticCount(body, (err, results) => {
              if (err) {
                  return res.status(200).json({
                      success: 0,
                      message: err
                  })
              }
              if (results.length === 0) {
                  return res.status(200).json({
                      success: 1,
                      message: "No Records"
                  })
              }
              return res.status(200).json({
                  success: 2,
                  data: results
              })
          })
      },
      
        getTotAntibiotics: (req, res) => {
          const body = req.body
          getTotAntibiotics(body, (err, results) => {
              if (err) {
                  return res.status(200).json({
                      success: 0,
                      message: err
                  })
              }
              if (results.length === 0) {
                  return res.status(200).json({
                      success: 1,
                      message: "No Records"
                  })
              }
              return res.status(200).json({
                  success: 2,
                  data: results
              })
          })
      },
      
          getPatientAntibioticList: (req, res) => {
              const body = req.body;
              getPatientAntibioticList(body, (err, results) => {
                  if (err) {
                      return res.status(200).json({
                          success: 0,
                          message: err
                      })
                  }
                  if (results.length === 0) {
                      return res.status(200).json({
                          success: 1,
                          message: "No Records"
                      })
                  }
                  return res.status(200).json({
                      success: 2,
                      data: results
                  })
              })
          },
          
  updatePatientAntibioticsPriority: (req, res) => {
    const body = req.body;    
    updatePatientAntibioticsPriority(body, (err, results) => {     
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
