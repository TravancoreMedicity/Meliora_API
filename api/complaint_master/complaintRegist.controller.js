const { complaintRegistInsert, complaintRegistUpdate,
    getcomplaintRegistByID, getcomplaintListbylogin, getcomplaintListbydept,
    getcomplaintAll, getapptokenbydept } = require('../complaint_master/complaintRegist.service');
const { validateComplaintRegist } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { default: Expo } = require('expo-server-sdk');

const expo = new Expo()

module.exports = {
    complaintRegistInsert: (req, res) => {

        // console.log(req.io)
        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body;
        //validate complaintdept Insert function
        const body_result = validateComplaintRegist.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        complaintRegistInsert(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }

            // body.locationName,
            // body.priority

            if (results) {
                let messages = [];

                let somePushTokens = ['ExponentPushToken[NgerQTHl58UcvOhwGMLRxM]', 'ExponentPushToken[LXFpCTJXs6oEPMFg0S0m0Q]'];

                for (let pushToken of somePushTokens) {

                    if (!Expo.isExpoPushToken(pushToken)) {
                        console.error(`Push token ${pushToken} is not a valid Expo push token`);
                        continue;
                    }

                    messages.push({
                        to: pushToken,
                        title: `Ticket :${results.insertId} / Location: ${body.locationName} `,
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

                // let pushTicket = expo.sendPushNotificationsAsync()

                return res.status(200).json({
                    success: 1,
                    message: "Complaint  Inserted Successfully",
                    // insetid: results.insertId
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

}

