const {
  complaintRegistInsert,
  complaintRegistUpdate,
  getcomplaintRegistByID,
  getcomplaintListbylogin,
  getcomplaintListbydept,
  insertAssetArray,
  assetinactive,
  getcomplaintAll,
  getapptokenbydept,
  updateserialnum,
  getAssetinComplaint,
  UpdateAssetinComplaint,
  getRoomsNameNdTypeList,
  getAssetsInRoom,
  getDeptSecWiseTicket,
  SpareDetailsUndercomplaint,
  viewAllPendingTicket,
  deleteTicket,
  getVerificationPending,
} = require("../complaint_master/complaintRegist.service");
const {
  validateComplaintRegist,
} = require("../../validation/validation_schema");
const logger = require("../../logger/logger");
const { default: Expo } = require("expo-server-sdk");
const { getCompSerialno } = require("../commoncode/common.service");
const expo = new Expo();

module.exports = {
  complaintRegistInsert: (req, res) => {
    const body = req.body;
    //validate complaintdept Insert function
    const body_result = validateComplaintRegist.validate(body);
    if (body_result.error) {
      return res.status(200).json({
        success: 2,
        message: body_result.error.details[0].message,
      });
    }
    const slno = body.complaint_slno;

    getCompSerialno((err, results) => {
      if (err) {
        logger.errorLogger(err);
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      if (!results) {
        logger.infoLogger("No Records Found");
        return res.status(200).json({
          success: 2,
          message: "No Result Found",
        });
      }
      if (slno === results[0].serial_current) {
        // console.log("insert one by one");
        complaintRegistInsert(body, (err, results) => {
          if (err) {
            logger.logwindow(err);
            return res.status(200).json({
              success: 0,
              message: err,
            });
          }
          if (results) {
            getapptokenbydept(body.complaint_deptslno, (err, result) => {
              if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                  success: 0,
                  message: err,
                });
              }
              const data = JSON.parse(JSON.stringify(result));
              if (data.length > 0) {

                let emppushTokens = data?.map((val) => val.app_token);

                // let somePushTokens = ['ExponentPushToken[9JbCJvDTrQ1DggVszGG6zk]'];

                if (Object.keys(emppushTokens).length > 0) {
                  let messages = [];
                  for (let pushToken of emppushTokens) {
                    if (!Expo.isExpoPushToken(pushToken)) {
                      console.error(
                        `Push token ${pushToken} is not a valid Expo push token`
                      );
                      continue;
                    }

                    messages.push({
                      to: pushToken,
                      title: `NEW TICKET :${body.complaint_slno} / Location: ${body.locationName} `,
                      subtitle: `New Ticket Registerd`,
                      body: `${body.priority} | ${body.complaint_desc}`,
                      data: { withSome: body.complaint_desc },
                      color: "#d5fc5c",
                      sound: "default",
                      channelId: "custom-sound-channel-warning", // if using notification channels
                      android: {
                        imageUrl: "https://yourdomain.com/path/to/image.jpg", // must be HTTPS
                        priority: "high",
                      },
                    });
                  }

                  //   let chunks = expo.chunkPushNotifications(messages);

                  //   let tickets = [];
                  //   (async () => {
                  //     // Send the chunks to the Expo push notification service. There are
                  //     // different strategies you could use. A simple one is to send one chunk at a
                  //     // time, which nicely spreads the load out over time:
                  //     for (let chunk of chunks) {
                  //       try {
                  //         let ticketChunk = await expo.sendPushNotificationsAsync(
                  //           chunk
                  //         );
                  //         //console.log(ticketChunk);
                  //         tickets.push(...ticketChunk);
                  //         // NOTE: If a ticket contains an error code in ticket.details.error, you
                  //         // must handle it appropriately. The error codes are listed in the Expo
                  //         // documentation:
                  //         // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                  //       } catch (error) {
                  //         console.error(error);
                  //       }
                  //     }
                  //   })();

                  const chunks = expo.chunkPushNotifications(messages);

                  const sendNotifications = async () => {
                    let tickets = [];

                    for (let chunk of chunks) {
                      try {
                        const ticketChunk =
                          await expo.sendPushNotificationsAsync(chunk);
                        // console.log("Ticket Chunk:", ticketChunk);
                        tickets.push(...ticketChunk);

                        ticketChunk.forEach((ticket) => {
                          if (ticket.status === "error") {
                            console.error(
                              "Expo Push Error:",
                              ticket.message,
                              ticket.details
                            );
                          }
                        });
                      } catch (error) {
                        console.error(
                          "Error sending push notification:",
                          error
                        );
                      }
                    }

                    return tickets;
                  };

                  sendNotifications();
                }
              }
            });

            // let pushTicket = expo.sendPushNotificationsAsync()
            // updateserialnum((err, results) => {
            //   if (err) {
            //     //logger.errorLogger(err)
            //     return res.status(400).json({
            //       success: 0,
            //       message: res.err,
            //     });
            //   }
            //   if (!results) {
            //     return res.status(400).json({
            //       success: 2,
            //       message: "Record Not Found",
            //     });
            //   }
            //   req.io.emit("message", `New Complaint Registed ! Please Check`);
            //   return res.status(200).json({
            //     success: 1,
            //     insertId: slno,
            //     message: "Complaint Registered Successfully",
            //   });
            // });


            updateserialnum((err, results) => {
              if (err) {
                return res.status(400).json({ success: 0, message: err });
              }
              if (!results) {
                return res.status(400).json({
                  success: 2,
                  message: "Record Not Found",
                });
              }

              // Step 5: Emit WebSocket event to all connected systems
              req.io.emit("new_complaint_submitted", {
                complaint_slno: body.complaint_slno,
                department: body.complaint_deptslno,
                createdAt: new Date(),
              });
              // Optional older broadcast (you can remove if not used)
              req.io.emit("message", "New Complaint Registered! Please Check");
              // Final Response
              return res.status(200).json({
                success: 1,
                insertId: body.complaint_slno,
                message: "Complaint Registered Successfully",
              });
            });


          }
        });
      } else if (slno < results[0].serial_current) {
        // console.log("insert second ");
        const newSlno = results[0].serial_current;
        body.complaint_slno = newSlno;
        complaintRegistInsert(body, (err, results) => {
          if (err) {
            logger.logwindow(err);
            return res.status(200).json({
              success: 0,
              message: err,
            });
          }
          if (results) {
            getapptokenbydept(body.complaint_deptslno, (err, result) => {
              if (err) {
                logger.logwindow(err);
                return res.status(200).json({
                  success: 0,
                  message: err,
                });
              }

              const data = JSON.parse(JSON.stringify(result));
              if (data.length > 0) {

                let emppushTokens = data?.map((val) => val.app_token);
                if (Object.keys(emppushTokens).length > 0) {
                  let messages = [];
                  for (let pushToken of emppushTokens) {
                    if (!Expo.isExpoPushToken(pushToken)) {
                      console.error(
                        `Push token ${pushToken} is not a valid Expo push token`
                      );
                      continue;
                    }

                    messages.push({
                      to: pushToken,
                      title: `NEW TICKET :${body.complaint_slno
                        } / Location: ${body?.locationName?.toLowerCase()} `,
                      subtitle: `New Ticket Registerd`,
                      body: `${body.priority} | ${body.complaint_desc}`,
                      data: { withSome: body.complaint_desc },
                      color: "#d5fc5c",
                      sound: "default",
                      channelId: "custom-sound-channel-warning", // if using notification channels
                      android: {
                        imageUrl: "https://yourdomain.com/path/to/image.jpg", // must be HTTPS
                        priority: "high",
                      },
                    });
                  }

                  //   let chunks = expo.chunkPushNotifications(messages);
                  //   let tickets = [];
                  //   (async () => {
                  //     // Send the chunks to the Expo push notification service. There are
                  //     // different strategies you could use. A simple one is to send one chunk at a
                  //     // time, which nicely spreads the load out over time:
                  //     for (let chunk of chunks) {
                  //       try {
                  //         let ticketChunk = await expo.sendPushNotificationsAsync(
                  //           chunk
                  //         );
                  //         console.log(ticketChunk);
                  //         tickets.push(...ticketChunk);
                  //         // NOTE: If a ticket contains an error code in ticket.details.error, you
                  //         // must handle it appropriately. The error codes are listed in the Expo
                  //         // documentation:
                  //         // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                  //       } catch (error) {
                  //         console.error(error);
                  //       }
                  //     }
                  //   })();

                  const chunks = expo.chunkPushNotifications(messages);

                  const sendNotifications = async () => {
                    let tickets = [];

                    for (let chunk of chunks) {
                      try {
                        const ticketChunk =
                          await expo.sendPushNotificationsAsync(chunk);
                        // console.log("Ticket Chunk:", ticketChunk);
                        tickets.push(...ticketChunk);

                        ticketChunk.forEach((ticket) => {
                          if (ticket.status === "error") {
                            console.error(
                              "Expo Push Error:",
                              ticket.message,
                              ticket.details
                            );
                          }
                        });
                      } catch (error) {
                        console.error(
                          "Error sending push notification:",
                          error
                        );
                      }
                    }

                    return tickets;
                  };

                  sendNotifications();
                }
              }
            });
            // let pushTicket = expo.sendPushNotificationsAsync()
            // updateserialnum((err, results) => {
            //   if (err) {
            //     //logger.errorLogger(err)
            //     return res.status(400).json({
            //       success: 0,
            //       message: res.err,
            //     });
            //   }
            //   if (!results) {
            //     return res.status(400).json({
            //       success: 2,
            //       message: "Record Not Found",
            //     });
            //   }
            //   req.io.emit("message", `New Complaint Registed ! Please Check`);
            //   return res.status(200).json({
            //     success: 1,
            //     insertId: body.complaint_slno,
            //     message: "Complaint Registered Successfully",
            //   });
            // });

            // Step 4: Update serial number
            updateserialnum((err, results) => {
              if (err) {
                return res.status(400).json({ success: 0, message: err });
              }
              if (!results) {
                return res.status(400).json({
                  success: 2,
                  message: "Record Not Found",
                });
              }
              // Step 5: Emit WebSocket event to all connected systems
              req.io.emit("new_complaint_submitted", {
                complaint_slno: body.complaint_slno,
                department: body.complaint_deptslno,
                createdAt: new Date(),
              });

              // Optional older broadcast (you can remove if not used)
              req.io.emit("message", "New Complaint Registered! Please Check");

              // Final Response
              return res.status(200).json({
                success: 1,
                insertId: body.complaint_slno,
                message: "Complaint Registered Successfully",
              });
            });


          }
        });
      }
    });
  },



  complaintRegistUpdate: (req, res) => {
    const body = req.body;
    const body_result = validateComplaintRegist.validate(body);
    if (body_result.error) {
      logger.logwindow(body_result.error.details[0].message);
      return res.status(200).json({
        success: 3,
        message: body_result.error.details[0].message,
      });
    }
    complaintRegistUpdate(body, (err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      if (!results) {
        logger.infologwindow("Record Not Found");
        return res.status(200).json({
          success: 1,
          message: "Record Not Found",
        });
      }
      return res.status(200).json({
        success: 2,
        Complt_id: body.complaint_slno,
        message: "Complaint Department Updated Successfully",
      });
    });
  },

  getcomplaintRegistByID: (req, res) => {
    const body = req.body;
    getcomplaintRegistByID(body, (err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(400).json({
          success: 0,
          message: err,
        });
      }
      if (!results) {
        logger.infologwindow("No Record Found");
        return res.status(400).json({
          success: 0,
          message: "No Record Found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getcomplaintListbylogin: (req, res) => {
    const id = req.params.id;
    getcomplaintListbylogin(id, (err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(400).json({
          success: 0,
          message: err,
        });
      }
      if (!results) {
        logger.infologwindow("No Record Found");
        return res.status(400).json({
          success: 0,
          message: "No Record Found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getcomplaintListbydept: (req, res) => {
    const id = req.params.id;
    getcomplaintListbydept(id, (err, results) => {
      if (err) {
        // logger.logwindow(err)
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      if (results.length == 0) {
        // logger.infologwindow("No Record Found")
        return res.status(200).json({
          success: 2,
          message: "their is no complaint under this department",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getcomplaintAll: (req, res) => {
    getcomplaintAll((err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(200).json({
          success: 2,
          message: err,
        });
      }
      if (results.length === 0) {
        logger.infologwindow("No Results Found");
        return res.status(200).json({
          success: 0,
          message: "No Results Found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getapptokenbydept: (req, res) => {
    const id = req.params.id;
    getapptokenbydept(id, (err, results) => {
      if (err) {
        // logger.logwindow(err)
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      if (results.length == 0) {
        // logger.infologwindow("No Record Found")
        return res.status(200).json({
          success: 2,
          message: "their is no complaint under this department",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getAssetinComplaint: (req, res) => {
    const id = req.params.id;
    getAssetinComplaint(id, (err, results) => {
      if (err) {
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      if (!results) {
        return res.status(200).json({
          success: 1,
          message: "No Data",
        });
      }
      return res.status(200).json({
        success: 2,
        data: results,
      });
    });
  },

  UpdateAssetinComplaint: (req, res) => {
    const body = req.body;
    UpdateAssetinComplaint(body, (err, results) => {
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
      });
    });
  },

  getRoomsNameNdTypeList: (req, res) => {
    const id = req.params.id;
    getRoomsNameNdTypeList(id, (err, results) => {
      if (err) {
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      if (!results) {
        return res.status(200).json({
          success: 1,
          message: "No Data",
        });
      }
      return res.status(200).json({
        success: 2,
        data: results,
      });
    });
  },

  getAssetsInRoom: (req, res) => {
    const id = req.params.id;
    getAssetsInRoom(id, (err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(400).json({
          success: 2,
          message: err,
        });
      }
      if (!results) {
        logger.infologwindow("No Results Found");
        return res.status(200).json({
          success: 0,
          message: "No Results Found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  insertAssetArray: (req, res) => {
    const body = req.body;
    const data =
      body &&
      body.map((val) => {
        return [
          val.cm_complait_slno,
          val.am_item_map_slno,
          val.cm_am_assetmap_slno,
          val.cm_asset_dept,
          val.asset_status,
          val.create_user,
        ];
      });
    insertAssetArray(data, (err, result) => {
      if (err) {
        return res.status(200).json({
          success: 0,
          message: err,
        });
      }
      return res.status(200).json({
        success: 1,
        insertId: body.complaint_slno,
      });
    });
  },

  assetinactive: (req, res) => {
    const body = req.body;

    const result = assetinactive(body)
      .then((r) => {
        return res.status(200).json({
          success: 1,
          message: r,
        });
      })
      .catch((e) => {
        return res.status(200).json({
          success: 0,
          message: e.sqlMessage,
        });
      });
  },
  getDeptSecWiseTicket: (req, res) => {
    const id = req.params.id;
    getDeptSecWiseTicket(id, (err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(400).json({
          success: 0,
          message: err,
        });
      }
      if (!results) {
        logger.infologwindow("No Record Found");
        return res.status(400).json({
          success: 0,
          message: "No Record Found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  SpareDetailsUndercomplaint: (req, res) => {
    const id = req.params.id;
    SpareDetailsUndercomplaint(id, (err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(400).json({
          success: 0,
          message: err,
        });
      }
      if (results.length === 0) {
        return res.status(200).json({
          success: 2,
          message: "No Record Found",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  viewAllPendingTicket: (req, res) => {
    viewAllPendingTicket((err, results) => {
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

  deleteTicket: (req, res) => {
    const { id } = req.params;
    deleteTicket({ id }, (err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(400).json({
          success: 0,
          message: "An error occurred while deleting the ticket",
        });
      }
      if (!results || results.affectedRows === 0) {
        logger.infologwindow("Ticket Not Found");
        return res.status(400).json({
          success: 1,
          message: "Ticket Not Found",
        });
      }
      return res.status(200).json({
        success: 2,
        message: "Ticket deleted successfully",
      });
    });
  },

  getVerificationPending: (req, res) => {
    const id = req.params.id;
    getVerificationPending(id, (err, results) => {
      if (err) {
        logger.logwindow(err);
        return res.status(400).json({
          success: 2,
          message: err,
        });
      }
      if (results.length === 0) {
        logger.infologwindow("No Results Found");
        return res.status(200).json({
          success: 0,
          message: "No Pending Request",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
