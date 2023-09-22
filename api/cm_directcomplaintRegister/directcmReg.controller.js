
const { directcomplaintRegistInsert, getdirectcomplaintList, directcomplaintUpdate } = require('../cm_directcomplaintRegister/directcmReg.service');
const { getapptokenbydept, updateserialnum } = require('../complaint_master/complaintRegist.service');
const { validateComplaintRegist } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');
const { default: Expo } = require('expo-server-sdk');
const { getCompSerialno } = require('../commoncode/common.service');
const expo = new Expo()



module.exports = {
    directcomplaintRegistInsert: (req, res) => {
        const body = req.body;
        const body_result = validateComplaintRegist.validate(body);
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
                directcomplaintRegistInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    if (results) {
                        // req.io.emit("message", `New Complaint Registed ! Please Check`)
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
                                            // console.error(`Push token ${pushToken} is not a valid Expo push token`);
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

                                                tickets.push(...ticketChunk);
                                                // NOTE: If a ticket contains an error code in ticket.details.error, you
                                                // must handle it appropriately. The error codes are listed in the Expo
                                                // documentation:
                                                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                                            } catch (error) {
                                                // console.error(error);
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

                            return res.status(200).json({
                                success: 1,
                                message: "Complaint Registered Successfully"
                            });
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 3,
                            message: "Complaint  Not Insert",
                        });
                    }
                });
            }
            else if (slno < results[0].serial_current) {

                const newSlno = results[0].serial_current
                body.complaint_slno = newSlno;


                directcomplaintRegistInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    if (results) {
                        // req.io.emit("message", `New Complaint Registed ! Please Check`)
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
                                            // console.error(`Push token ${pushToken} is not a valid Expo push token`);
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

                                                tickets.push(...ticketChunk);
                                                // NOTE: If a ticket contains an error code in ticket.details.error, you
                                                // must handle it appropriately. The error codes are listed in the Expo
                                                // documentation:
                                                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                                            } catch (error) {
                                                // console.error(error);
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

                            return res.status(200).json({
                                success: 1,
                                message: "Complaint Registered Successfully"
                            });
                        });
                    }
                    else {
                        return res.status(200).json({
                            success: 3,
                            message: "Complaint  Not Insert",
                        });
                    }
                });
            }
        })
    },
    getdirectcomplaintList: (req, res) => {
        const id = req.params.id;
        getdirectcomplaintList(id, (err, results) => {
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
    directcomplaintUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateComplaintRegist.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        directcomplaintUpdate(body, (err, results) => {
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
                message: "Complaint Updated Successfully"
            });
        });
    },
}