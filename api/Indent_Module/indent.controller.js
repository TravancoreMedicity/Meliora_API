const { getRepData, statusUpdate, insertMedicalDocs, getloginRepData, getTotalTokenCount, getBookedTokenCount,
    getDeptTokenCount, getAppointmentsByRepId, getMedicineByToken, getCertificatesByMedicine, getOtherDetailsByMedicine,
    getContentsByMedicine, updateMedicalDocs, getIndentMedicines, updateCertificateStatus, updateMedicineRejectionStatus, updateMedicineApprovalStatus, updateCommercialDetails,
    getAppointmentsByDate, getCompanies, getDivisions, insertCompany, registerMedicalRep, getApproveAppointmentsByRepId,
    checkMobileExist, checkEmailExist, checkMobileAndEmailExist, updateOTP, verifyOTP, updatePasswordNew, insertIndentForm, getIndentFormByToken, getApprovedMedicines, sendIncidentRequestWhatsapp,
    sendIndentUpdateWhatsapp, getRepDetailsByMedicineId, getCertificateMessageSentStatus, getMedicineCertificatesMessageSentStatus, updateCertificateMessageSentStatus, updateMedicineCertificatesMessageSentStatus } = require('../Indent_Module/indent.service')
const { genSaltSync, hashSync } = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail', // Change service/host according to your mail server (e.g. host: 'smtp.gmail.com', port: 587)
    auth: {
        user: process.env.EMAIL_USER, // Sender email address
        pass: process.env.EMAIL_PASS  // App password or email password
    }
});

module.exports = {

    getRepData: (req, res) => {
        getRepData((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    statusUpdate: (req, res) => {
        const body = req.body;
        if (body.userId === undefined || body.status === undefined) {
            return res.status(400).json({
                success: 0,
                message: "userId and status are required",
            });
        }
        statusUpdate(body, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Status updated successfully",
            });
        });
    },

    insertMedicalDocs: (req, res) => {
        const body = req.body;
        insertMedicalDocs(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message || err
                })
            }

            const whatsappData = req.body;
            // const currentYear = new Date().getFullYear();
            // const slno = results.insertid;

            sendIncidentRequestWhatsapp({
                mobile: whatsappData.mobile,
                appointmentdate: whatsappData.selectedDate,
                tokenno: whatsappData.prefix && whatsappData.total_token_count ? `${whatsappData.prefix}/${whatsappData.total_token_count}` : results.insertid,
                generatedBy: whatsappData.rep_name,
                company: whatsappData.company_name,
                divisionName: whatsappData.selectedDivisionName,
                bookingDate: whatsappData.selectedDate
            })
                .then((response) => {
                    // console.log('WhatsApp sent successfully');
                    // console.log(response.data);
                })
                .catch((error) => {
                    console.error(
                        'WhatsApp send failed',
                        error?.response?.data || error.message
                    );
                });

            return res.status(200).json({
                success: 1,
                insertid: results.insertid,
                message: "Medical Documentation saved successfully"
            })
        })
    },

    getIndentMedicines: (req, res) => {
        getIndentMedicines((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    updateCommercialDetails: (req, res) => {
        const body = req.body;
        updateCommercialDetails(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Commercial details updated successfully"
            });
        });
    },

    getloginRepData: (req, res) => {
        const userId = req.query.userId || req.body.userId;

        if (userId === undefined) {
            return res.status(400).json({
                success: 0,
                message: "userId is required",
            });
        }
        getloginRepData({ userId }, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No records found",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getTotalTokenCount: (req, res) => {
        getTotalTokenCount((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getBookedTokenCount: (req, res) => {
        const appointmentdate = req.query.appointmentdate;
        if (!appointmentdate) {
            return res.status(400).json({
                success: 0,
                message: "appointmentdate is required"
            });
        }
        getBookedTokenCount({ appointmentdate }, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getDeptTokenCount: (req, res) => {
        const appointmentdate = req.query.appointmentdate;
        const departmentId = req.query.departmentId;
        if (!appointmentdate || !departmentId) {
            return res.status(400).json({
                success: 0,
                message: "appointmentdate and departmentId are required"
            });
        }
        getDeptTokenCount({ appointmentdate, departmentId }, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getAppointmentsByRepId: (req, res) => {
        const medicalrepid = req.query.medicalrepid || req.body.medicalrepid;
        if (!medicalrepid) {
            return res.status(400).json({
                success: 0,
                message: "medicalrepid is required"
            });
        }
        getAppointmentsByRepId(medicalrepid, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No records found",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAppointmentsByDate: (req, res) => {
        const appointmentdate = req.query.appointmentdate || req.body.appointmentdate;
        if (!appointmentdate) {
            return res.status(400).json({
                success: 0,
                message: "appointmentdate is required"
            });
        }
        getAppointmentsByDate(appointmentdate, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No records found",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    // getCertificateDetailsByToken: (req, res) => {
    //     const tokenId = req.query.token_id || req.body.token_id;
    //     console.log(tokenId);

    //     if (!tokenId) {
    //         return res.status(400).json({
    //             success: 0,
    //             message: "token_id is required"
    //         });
    //     }
    //     getCertificateDetailsByToken(tokenId, (error, results) => {
    //         if (error) {
    //             return res.status(500).json({
    //                 success: 0,
    //                 message: "Database connection error",
    //             });
    //         }
    //         if (results?.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No records found",
    //                 data: []
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // }

    getCertificateDetailsByToken: (req, res) => {
        const tokenId = req.query.token_id || req.body.token_id;

        if (!tokenId) {
            return res.status(400).json({
                success: 0,
                message: "token_id is required"
            });
        }

        getMedicineByToken(tokenId, (error, medicineResult) => {

            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (medicineResult.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No records found",
                    data: []
                });
            }

            const medicine = medicineResult[0];

            getCertificatesByMedicine(medicine.medicine_id, (error, certificates) => {

                if (error) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error",
                    });
                }

                getOtherDetailsByMedicine(medicine.medicine_id, (error, otherDetails) => {

                    if (error) {
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error",
                        });
                    }

                    getContentsByMedicine(medicine.medicine_id, (error, contents) => {

                        if (error) {
                            return res.status(500).json({
                                success: 0,
                                message: "Database connection error",
                            });
                        }

                        return res.status(200).json({
                            success: 1,
                            data: {
                                medicine,
                                certificates,
                                otherDetails,
                                contents
                            }
                        });

                    });

                });

            });

        });
    },

    updateMedicalDocs: (req, res) => {
        const data = req.body;
        if (!data.medicine_id) {
            return res.status(400).json({
                success: 0,
                message: "medicine_id is required"
            });
        }
        updateMedicalDocs(data, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Record updated successfully",
                updateid: results.updateid
            });
        });
    },

    updateCertificateStatus: (req, res) => {
        const body = req.body;
        if (!body.certificates_details_slno || body.filestatus === undefined) {
            return res.status(400).json({
                success: 0,
                message: "certificates_details_slno and filestatus are required"
            });
        }
        updateCertificateStatus(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            // Check if frontend already passed message_sent_status: 1 or check DB
            const isAlreadySentFrontend = body.message_sent_status === 1;

            if (isAlreadySentFrontend) {
                return res.status(200).json({
                    success: 1,
                    message: "Certificate status updated successfully"
                });
            }

            getCertificateMessageSentStatus(body.certificates_details_slno, (statusErr, sentStatus) => {
                if (!statusErr && sentStatus !== 1) {
                    const mobile = body.mobile || body.contactno;
                    const generatedBy = body.generatedBy || body.rep_name;

                    const sendWhatsappMsg = (mob, genBy) => {
                        if (mob && genBy) {
                            sendIndentUpdateWhatsapp({ mobile: mob, generatedBy: genBy })
                                .then(() => {
                                    updateCertificateMessageSentStatus(body.certificates_details_slno, () => { });
                                    if (body.medicine_id) {
                                        updateMedicineCertificatesMessageSentStatus(body.medicine_id, () => { });
                                    }
                                })
                                .catch((error) => console.error('WhatsApp notification failed:', error?.response?.data || error.message));
                        }
                    };

                    if (mobile && generatedBy) {
                        sendWhatsappMsg(mobile, generatedBy);
                    } else if (body.medicine_id) {
                        getRepDetailsByMedicineId(body.medicine_id, (repErr, repData) => {
                            if (!repErr && repData && repData.mobile) {
                                sendWhatsappMsg(repData.mobile, repData.generatedBy);
                            }
                        });
                    }
                }
            });

            return res.status(200).json({
                success: 1,
                message: "Certificate status updated successfully"
            });
        });
    },

    updateMedicineRejectionStatus: (req, res) => {
        const body = req.body;
        if (!body.medicine_id || body.rejectionstatus === undefined) {
            return res.status(400).json({
                success: 0,
                message: "medicine_id and rejectionstatus are required"
            });
        }
        if (body.rejectionstatus === 2 && !body.rejectionReason) {
            return res.status(400).json({
                success: 0,
                message: "rejectionReason is required when rejecting"
            });
        }

        const data = {
            medicine_id: body.medicine_id,
            rejectionstatus: body.rejectionstatus,
            rejectionReason: body.rejectionReason || ''
        };

        updateMedicineRejectionStatus(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            const isAlreadySentFrontend = body.message_sent_status === 1 || body.rejectionstatus === 0;

            if (isAlreadySentFrontend) {
                return res.status(200).json({
                    success: 1,
                    message: "Rejection status updated successfully"
                });
            }

            getMedicineCertificatesMessageSentStatus(body.medicine_id, (statusErr, sentStatus) => {
                if (!statusErr && sentStatus !== 1) {
                    const mobile = body.mobile || body.contactno;
                    const generatedBy = body.generatedBy || body.rep_name;

                    const sendWhatsappMsg = (mob, genBy) => {
                        if (mob && genBy) {
                            sendIndentUpdateWhatsapp({ mobile: mob, generatedBy: genBy })
                                .then(() => {
                                    updateMedicineCertificatesMessageSentStatus(body.medicine_id, () => { });
                                })
                                .catch((error) => console.error('WhatsApp rejection notification failed:', error?.response?.data || error.message));
                        }
                    };

                    if (mobile && generatedBy) {
                        sendWhatsappMsg(mobile, generatedBy);
                    } else {
                        getRepDetailsByMedicineId(body.medicine_id, (repErr, repData) => {
                            if (!repErr && repData && repData.mobile) {
                                sendWhatsappMsg(repData.mobile, repData.generatedBy);
                            }
                        });
                    }
                }
            });

            return res.status(200).json({
                success: 1,
                message: "Rejection status updated successfully"
            });
        });
    },

    updateMedicineApprovalStatus: (req, res) => {
        const body = req.body;
        if (!body.medicine_id || body.finalstatus === undefined) {
            return res.status(400).json({
                success: 0,
                message: "medicine_id and finalstatus are required"
            });
        }
        updateMedicineApprovalStatus(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            const isAlreadySentFrontend = body.message_sent_status === 1;

            if (isAlreadySentFrontend) {
                return res.status(200).json({
                    success: 1,
                    message: "Approval status updated successfully"
                });
            }

            getMedicineCertificatesMessageSentStatus(body.medicine_id, (statusErr, sentStatus) => {
                if (!statusErr && sentStatus !== 1) {
                    const mobile = body.mobile || body.contactno;
                    const generatedBy = body.generatedBy || body.rep_name;

                    const sendWhatsappMsg = (mob, genBy) => {
                        if (mob && genBy) {
                            sendIndentUpdateWhatsapp({ mobile: mob, generatedBy: genBy })
                                .then(() => {
                                    updateMedicineCertificatesMessageSentStatus(body.medicine_id, () => { });
                                })
                                .catch((error) => console.error('WhatsApp approval notification failed:', error?.response?.data || error.message));
                        }
                    };

                    if (mobile && generatedBy) {
                        sendWhatsappMsg(mobile, generatedBy);
                    } else {
                        getRepDetailsByMedicineId(body.medicine_id, (repErr, repData) => {
                            if (!repErr && repData && repData.mobile) {
                                sendWhatsappMsg(repData.mobile, repData.generatedBy);
                            }
                        });
                    }
                }
            });

            return res.status(200).json({
                success: 1,
                message: "Approval status updated successfully"
            });
        });
    },

    getCompanies: (req, res) => {
        getCompanies((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getDivisions: (req, res) => {
        getDivisions((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    insertCompany: (req, res) => {
        const body = req.body;
        insertCompany(body, (err, results) => {
            if (err) {
                console.error("Error inserting company:", err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    registerMedicalRep: (req, res) => {
        const body = req.body;
        if (!body.password) {
            return res.status(400).json({ success: 0, message: "Password is required" });
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        registerMedicalRep(body, (err, results) => {
            if (err) {
                console.error("Registration error:", err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error or duplicate entry"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    generateOTPNew: (req, res) => {
        const { mobileNumber, email } = req.body;
        if (!email && !mobileNumber) {
            return res.status(400).json({ success: 0, message: "Email or mobile number is required" });
        }

        const processOTP = (error, results, targetEmail) => {
            if (error) {
                console.error("User query error:", error);
                return res.status(500).json({ success: 0, message: "Database connection error: " + (error.sqlMessage || error.message || error) });
            }
            if (results.length === 0) {
                return res.status(200).json({ success: 1, message: "Email or mobile number not registered" });
            }

            const medicalrep = results[0];
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            updateOTP({ medicalrep_id: medicalrep.medicalrep_id, otp: otp }, (error, updateRes) => {
                if (error) {
                    console.error("updateOTP error:", error);
                    return res.status(500).json({ success: 0, message: "Database connection error: " + (error.sqlMessage || error.message || error) });
                }

                if (targetEmail) {
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: targetEmail,
                        subject: 'Password Reset OTP',
                        html: `
                            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                                <h2 style="color: #333;">Password Reset Request</h2>
                                <p>Hello,</p>
                                <p>Your OTP for resetting your password is:</p>
                                <h1 style="color: #007bff; letter-spacing: 4px; font-size: 32px;">${otp}</h1>
                                <p>This OTP is valid for a limited time. Please do not share this code with anyone.</p>
                                <br/>
                                <p>Regards,<br/>Support Team</p>
                            </div>
                        `
                    };

                    transporter.sendMail(mailOptions, (mailErr, info) => {
                        if (mailErr) {
                            console.error("Nodemailer error sending OTP:", mailErr);
                            return res.status(500).json({ success: 0, message: "Failed to send OTP email: " + (mailErr.message || mailErr) });
                        }
                        console.log("OTP email sent successfully:", info.response);
                        return res.status(200).json({
                            success: 2,
                            message: "OTP sent successfully to registered email",
                            otp: otp,
                            medicalrep_id: medicalrep.medicalrep_id,
                            userId: medicalrep.userId
                        });
                    });
                } else {
                    return res.status(200).json({
                        success: 2,
                        message: "OTP sent successfully",
                        otp: otp,
                        medicalrep_id: medicalrep.medicalrep_id,
                        userId: medicalrep.userId
                    });
                }
            });
        };

        if (email) {
            checkEmailExist(email, (error, results) => processOTP(error, results, email));
        } else {
            const trimmedNumber = mobileNumber.startsWith('+91') ? mobileNumber.slice(3) : mobileNumber.length > 10 ? mobileNumber.slice(-10) : mobileNumber;
            checkMobileExist(trimmedNumber, (error, results) => processOTP(error, results, null));
        }
    },

    generateOTPForgotPassword: (req, res) => {
        const { mobileNumber, email } = req.body;
        if (!mobileNumber || !email) {
            return res.status(400).json({ success: 0, message: "Mobile number and email are required" });
        }
        const trimmedNumber = mobileNumber.startsWith('+91') ? mobileNumber.slice(3) : mobileNumber.length > 10 ? mobileNumber.slice(-10) : mobileNumber;

        checkMobileAndEmailExist({ mobileNumber: trimmedNumber, email: email }, (error, results) => {
            if (error) {
                console.error("checkMobileAndEmailExist error:", error);
                return res.status(500).json({ success: 0, message: "Database connection error: " + (error.sqlMessage || error.message || error) });
            }
            if (results.length === 0) {
                return res.status(200).json({ success: 1, message: "Email and Mobile number do not match or are not registered" });
            }

            const medicalrep = results[0];
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            updateOTP({ medicalrep_id: medicalrep.medicalrep_id, otp: otp }, (error, updateRes) => {
                if (error) {
                    console.error("updateOTP error:", error);
                    return res.status(500).json({ success: 0, message: "Database connection error: " + (error.sqlMessage || error.message || error) });
                }

                // Setup email configuration
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Password Reset OTP',
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                            <h2 style="color: #333;">Password Reset Request</h2>
                            <p>Hello,</p>
                            <p>Your OTP for resetting your password is:</p>
                            <h1 style="color: #007bff; letter-spacing: 4px; font-size: 32px;">${otp}</h1>
                            <p>This OTP is valid for a limited time. Please do not share this code with anyone.</p>
                            <br/>
                            <p>Regards,<br/>Support Team</p>
                        </div>
                    `
                };

                // Send email using Nodemailer
                transporter.sendMail(mailOptions, (mailErr, info) => {
                    if (mailErr) {
                        console.error("Nodemailer error sending OTP:", mailErr);
                        return res.status(500).json({ 
                            success: 0, 
                            message: "Failed to send OTP email: " + (mailErr.message || mailErr) 
                        });
                    }

                    console.log("OTP email sent successfully:", info.response);
                    return res.status(200).json({
                        success: 2,
                        message: "OTP sent successfully to your registered email",
                        otp: otp,
                        medicalrep_id: medicalrep.medicalrep_id,
                        userId: medicalrep.userId
                    });
                });
            });
        });
    },

    verifyOTPNew: (req, res) => {
        const { medicalrep_id, otp } = req.body;
        if (!medicalrep_id || !otp) {
            return res.status(400).json({ success: 0, message: "medicalrep_id and otp are required" });
        }

        verifyOTP({ medicalrep_id, otp }, (error, results) => {
            if (error) {
                return res.status(500).json({ success: 0, message: "Database connection error" });
            }
            if (results.length === 0) {
                return res.status(200).json({ success: 1, message: "Invalid OTP" });
            }
            return res.status(200).json({
                success: 2,
                message: "OTP verified successfully",
                userId: results[0].userId
            });
        });
    },

    changePasswordNew: (req, res) => {
        const { userId, newPassword } = req.body;
        if (!userId || !newPassword) {
            return res.status(400).json({ success: 0, message: "userId and newPassword are required" });
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(newPassword, salt);

        updatePasswordNew({ userId: userId, password: hashedPassword }, (error, results) => {
            if (error) {
                return res.status(500).json({ success: 0, message: "Database connection error" });
            }
            return res.status(200).json({
                success: 1,
                message: "Password changed successfully"
            });
        });
    },

    insertIndentForm: (req, res) => {
        const body = req.body;
        insertIndentForm(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err.message || "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: results.insertid,
                message: "Indent Details saved successfully"
            });
        });
    },

    getIndentFormByToken: (req, res) => {
        const tokenId = req.params.tokenId || req.query.tokenId;
        if (!tokenId) {
            return res.status(400).json({ success: 0, message: "Token ID is required" });
        }

        getIndentFormByToken(tokenId, (err, results) => {
            if (err) {
                return res.status(500).json({ success: 0, message: "Database connection error" });
            }
            if (!results) {
                return res.status(200).json({ success: 2, message: "No data found" });
            }
            return res.status(200).json({ success: 1, data: results });
        });
    },
    getApproveAppointmentsByRepId: (req, res) => {
        const medicalrepid = req.query.medicalrepid || req.body.medicalrepid;
        if (!medicalrepid) {
            return res.status(400).json({
                success: 0,
                message: "medicalrepid is required"
            });
        }
        getApproveAppointmentsByRepId(medicalrepid, (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No records found",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getApprovedMedicines: (req, res) => {
        getApprovedMedicines((error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (!results || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                    data: []
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
}