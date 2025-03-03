const { complaintRegistInsert, complaintRegistUpdate,
    getcomplaintRegistByID, getcomplaintListbylogin, getcomplaintListbydept,
    getcomplaintAll, getapptokenbydept, updateserialnum, getAssetinComplaint, UpdateAssetinComplaint, getRoomsNameNdTypeList, getAssetsInRoom
} = require('../complaint_master/complaintRegist.service');
const { validateComplaintRegist } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { default: Expo } = require('expo-server-sdk');
const { getCompSerialno } = require('../commoncode/common.service');
const expo = new Expo()

module.exports = {
    // complaintRegistInsert: (req, res) => {

    //     // console.log(req.io)

    //     const body = req.body;
    //     //validate complaintdept Insert function
    //     const body_result = validateComplaintRegist.validate(body);
    //     if (body_result.error) {
    //         return res.status(200).json({
    //             success: 2,
    //             message: body_result.error.details[0].message
    //         });
    //     }

    //     const slno = body.complaint_slno

    //     getCompSerialno((err, results) => {
    //         if (err) {
    //             logger.errorLogger(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         if (!results) {
    //             logger.infoLogger("No Records Found")
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No Result Found"
    //             });
    //         }
    //         if (slno === results[0].serial_current) {

    //             complaintRegistInsert(body, (err, results) => {
    //                 if (err) {
    //                     logger.logwindow(err)
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err
    //                     })
    //                 }
    //                 if (results) {

    //                     getapptokenbydept(body.complaint_deptslno, (err, result) => {
    //                         if (err) {
    //                             logger.logwindow(err)
    //                             return res.status(200).json({
    //                                 success: 0,
    //                                 message: err
    //                             })
    //                         }
    //                         const data = JSON.parse(JSON.stringify(result));
    //                         if (data.length > 0) {

    //                             let emppushTokens = data?.map(val => val.app_token)

    //                             // let somePushTokens = ['ExponentPushToken[9JbCJvDTrQ1DggVszGG6zk]'];

    //                             if (Object.keys(emppushTokens).length > 0) {

    //                                 let messages = [];
    //                                 for (let pushToken of emppushTokens) {

    //                                     if (!Expo.isExpoPushToken(pushToken)) {
    //                                         console.error(`Push token ${pushToken} is not a valid Expo push token`);
    //                                         continue;
    //                                     }

    //                                     messages.push({
    //                                         to: pushToken,
    //                                         title: `New ticket :${body.complaint_slno} / Location: ${body.locationName} `,
    //                                         subtitle: `New Ticket Registerd`,
    //                                         body: `Priority : ${body.priority} | ${body.complaint_desc}`,
    //                                         data: { withSome: body.complaint_desc },
    //                                         color: '#d5fc5c'
    //                                     })
    //                                 }

    //                                 let chunks = expo.chunkPushNotifications(messages);

    //                                 let tickets = [];
    //                                 (async () => {
    //                                     // Send the chunks to the Expo push notification service. There are
    //                                     // different strategies you could use. A simple one is to send one chunk at a
    //                                     // time, which nicely spreads the load out over time:
    //                                     for (let chunk of chunks) {
    //                                         try {
    //                                             let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    //                                             console.log(ticketChunk);
    //                                             tickets.push(...ticketChunk);
    //                                             // NOTE: If a ticket contains an error code in ticket.details.error, you
    //                                             // must handle it appropriately. The error codes are listed in the Expo
    //                                             // documentation:
    //                                             // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    //                                         } catch (error) {
    //                                             console.error(error);
    //                                         }
    //                                     }
    //                                 })()
    //                             }

    //                         }
    //                     })

    //                     // let pushTicket = expo.sendPushNotificationsAsync()

    //                     updateserialnum((err, results) => {
    //                         if (err) {
    //                             //logger.errorLogger(err)
    //                             return res.status(400).json({
    //                                 success: 0,
    //                                 message: res.err
    //                             });
    //                         }
    //                         if (!results) {
    //                             return res.status(400).json({
    //                                 success: 2,
    //                                 message: "Record Not Found"
    //                             });
    //                         }
    //                         req.io.emit("message", `New Complaint Registed ! Please Check`)
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: "Complaint Registered Successfully"
    //                         });
    //                     });
    //                 }
    //             });
    //         }
    //         else if (slno < results[0].serial_current) {
    //             const newSlno = results[0].serial_current
    //             body.complaint_slno = newSlno;
    //             complaintRegistInsert(body, (err, results) => {
    //                 if (err) {
    //                     logger.logwindow(err)
    //                     return res.status(200).json({
    //                         success: 0,
    //                         message: err
    //                     })
    //                 }
    //                 if (results) {

    //                     getapptokenbydept(body.complaint_deptslno, (err, result) => {
    //                         if (err) {
    //                             logger.logwindow(err)
    //                             return res.status(200).json({
    //                                 success: 0,
    //                                 message: err
    //                             })
    //                         }
    //                         const data = JSON.parse(JSON.stringify(result));
    //                         if (data.length > 0) {

    //                             let emppushTokens = data?.map(val => val.app_token)

    //                             // let somePushTokens = ['ExponentPushToken[9JbCJvDTrQ1DggVszGG6zk]'];

    //                             if (Object.keys(emppushTokens).length > 0) {

    //                                 let messages = [];
    //                                 for (let pushToken of emppushTokens) {

    //                                     if (!Expo.isExpoPushToken(pushToken)) {
    //                                         console.error(`Push token ${pushToken} is not a valid Expo push token`);
    //                                         continue;
    //                                     }

    //                                     messages.push({
    //                                         to: pushToken,
    //                                         title: `New ticket :${body.complaint_slno} / Location: ${body.locationName} `,
    //                                         subtitle: `New Ticket Registerd`,
    //                                         body: `Priority : ${body.priority} | ${body.complaint_desc}`,
    //                                         data: { withSome: body.complaint_desc },
    //                                         color: '#d5fc5c'
    //                                     })
    //                                 }

    //                                 let chunks = expo.chunkPushNotifications(messages);

    //                                 let tickets = [];
    //                                 (async () => {
    //                                     // Send the chunks to the Expo push notification service. There are
    //                                     // different strategies you could use. A simple one is to send one chunk at a
    //                                     // time, which nicely spreads the load out over time:
    //                                     for (let chunk of chunks) {
    //                                         try {
    //                                             let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    //                                             console.log(ticketChunk);
    //                                             tickets.push(...ticketChunk);
    //                                             // NOTE: If a ticket contains an error code in ticket.details.error, you
    //                                             // must handle it appropriately. The error codes are listed in the Expo
    //                                             // documentation:
    //                                             // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    //                                         } catch (error) {
    //                                             console.error(error);
    //                                         }
    //                                     }
    //                                 })()
    //                             }

    //                         }
    //                     })

    //                     // let pushTicket = expo.sendPushNotificationsAsync()

    //                     updateserialnum((err, results) => {
    //                         if (err) {
    //                             //logger.errorLogger(err)
    //                             return res.status(400).json({
    //                                 success: 0,
    //                                 message: res.err
    //                             });
    //                         }
    //                         if (!results) {
    //                             return res.status(400).json({
    //                                 success: 2,
    //                                 message: "Record Not Found"
    //                             });
    //                         }
    //                         req.io.emit("message", `New Complaint Registed ! Please Check`)
    //                         return res.status(200).json({
    //                             success: 1,
    //                             message: "Complaint Registered Successfully"
    //                         });
    //                     });
    //                 }
    //             });


    //         }
    //     });
    // },


    complaintRegistInsert: (req, res) => {

        // console.log(req.io)
        // const body = req.body;
        //validate complaintdept Insert function
        const body_result = validateComplaintRegist.validate(body);

        // console.log("body_result", body_result);

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        const slno = body.complaint_slno

        getCompSerialno((err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                logger.infoLogger("No Records Found")
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }
            if (slno === results[0].serial_current) {

                complaintRegistInsert(body, (err, results) => {




                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    if (results) {

                        getapptokenbydept(body.complaint_deptslno, (err, result) => {
                            if (err) {
                                logger.logwindow(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                })
                            }
                            const data = JSON.parse(JSON.stringify(result));
                            if (data.length > 0) {

                                let emppushTokens = data?.map(val => val.app_token)

                                // let somePushTokens = ['ExponentPushToken[9JbCJvDTrQ1DggVszGG6zk]'];

                                if (Object.keys(emppushTokens).length > 0) {

                                    let messages = [];
                                    for (let pushToken of emppushTokens) {

                                        if (!Expo.isExpoPushToken(pushToken)) {
                                            console.error(`Push token ${pushToken} is not a valid Expo push token`);
                                            continue;
                                        }

                                        messages.push({
                                            to: pushToken,
                                            title: `New ticket :${body.complaint_slno} / Location: ${body.locationName} `,
                                            subtitle: `New Ticket Registerd`,
                                            body: `Priority : ${body.priority} | ${body.complaint_desc}`,
                                            data: { withSome: body.complaint_desc },
                                            color: '#d5fc5c'
                                        })
                                    }

                                    let chunks = expo.chunkPushNotifications(messages);

                                    let tickets = [];
                                    (async () => {
                                        // Send the chunks to the Expo push notification service. There are
                                        // different strategies you could use. A simple one is to send one chunk at a
                                        // time, which nicely spreads the load out over time:
                                        for (let chunk of chunks) {
                                            try {
                                                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                                                //console.log(ticketChunk);
                                                tickets.push(...ticketChunk);
                                                // NOTE: If a ticket contains an error code in ticket.details.error, you
                                                // must handle it appropriately. The error codes are listed in the Expo
                                                // documentation:
                                                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        }
                                    })()
                                }

                            }
                        })

                        // let pushTicket = expo.sendPushNotificationsAsync()

                        updateserialnum((err, results) => {
                            if (err) {
                                //logger.errorLogger(err)
                                return res.status(400).json({
                                    success: 0,
                                    message: res.err
                                });
                            }
                            if (!results) {
                                return res.status(400).json({
                                    success: 2,
                                    message: "Record Not Found"
                                });
                            }
                            req.io.emit("message", `New Complaint Registed ! Please Check`)
                            return res.status(200).json({
                                success: 1,
                                insertId: slno,
                                message: "Complaint Registered Successfully"
                            });
                        });
                    }
                });
            }
            else if (slno < results[0].serial_current) {
                const newSlno = results[0].serial_current
                body.complaint_slno = newSlno;
                complaintRegistInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    if (results) {

                        getapptokenbydept(body.complaint_deptslno, (err, result) => {
                            if (err) {
                                logger.logwindow(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                })
                            }
                            const data = JSON.parse(JSON.stringify(result));
                            if (data.length > 0) {

                                let emppushTokens = data?.map(val => val.app_token)

                                // let somePushTokens = ['ExponentPushToken[9JbCJvDTrQ1DggVszGG6zk]'];

                                if (Object.keys(emppushTokens).length > 0) {

                                    let messages = [];
                                    for (let pushToken of emppushTokens) {

                                        if (!Expo.isExpoPushToken(pushToken)) {
                                            console.error(`Push token ${pushToken} is not a valid Expo push token`);
                                            continue;
                                        }

                                        messages.push({
                                            to: pushToken,
                                            title: `New ticket :${body.complaint_slno} / Location: ${body.locationName} `,
                                            subtitle: `New Ticket Registerd`,
                                            body: `Priority : ${body.priority} | ${body.complaint_desc}`,
                                            data: { withSome: body.complaint_desc },
                                            color: '#d5fc5c'
                                        })
                                    }

                                    let chunks = expo.chunkPushNotifications(messages);

                                    let tickets = [];
                                    (async () => {
                                        // Send the chunks to the Expo push notification service. There are
                                        // different strategies you could use. A simple one is to send one chunk at a
                                        // time, which nicely spreads the load out over time:
                                        for (let chunk of chunks) {
                                            try {
                                                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                                                console.log(ticketChunk);
                                                tickets.push(...ticketChunk);
                                                // NOTE: If a ticket contains an error code in ticket.details.error, you
                                                // must handle it appropriately. The error codes are listed in the Expo
                                                // documentation:
                                                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        }
                                    })()
                                }

                            }
                        })

                        // let pushTicket = expo.sendPushNotificationsAsync()

                        updateserialnum((err, results) => {
                            if (err) {
                                //logger.errorLogger(err)
                                return res.status(400).json({
                                    success: 0,
                                    message: res.err
                                });
                            }
                            if (!results) {
                                return res.status(400).json({
                                    success: 2,
                                    message: "Record Not Found"
                                });
                            }
                            req.io.emit("message", `New Complaint Registed ! Please Check`)
                            return res.status(200).json({
                                success: 1,
                                insertId: body.complaint_slno,
                                message: "Complaint Registered Successfully"
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
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        complaintRegistUpdate(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                Complt_id: body.complaint_slno,
                message: "Complaint Department Updated Successfully"
            });
        });
    },

    getcomplaintRegistByID: (req, res) => {
        const body = req.body
        getcomplaintRegistByID(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getcomplaintListbylogin: (req, res) => {
        const id = req.params.id;
        getcomplaintListbylogin(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
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
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 2,
                    message: "their is no complaint under this department"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getcomplaintAll: (req, res) => {
        getcomplaintAll((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
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
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 2,
                    message: "their is no complaint under this department"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAssetinComplaint: (req, res) => {
        const id = req.params.id;
        getAssetinComplaint(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    UpdateAssetinComplaint: (req, res) => {
        const body = req.body;
        UpdateAssetinComplaint(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
            })
        })
    },



    getRoomsNameNdTypeList: (req, res) => {
        const id = req.params.id;
        getRoomsNameNdTypeList(id, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },

    getAssetsInRoom: (req, res) => {
        const id = req.params.id
        getAssetsInRoom(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

}

