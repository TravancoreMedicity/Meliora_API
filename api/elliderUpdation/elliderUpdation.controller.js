const { default: axios } = require('axios');
const { insertOTP, VerifyOTP } = require('./elliderUpdation.service');
module.exports = {
    generateOTP: async (req, res) => {
        const { mobileNumber, mrdNo } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);
        insertOTP({ mobile: mobileNumber, mrdNo: mrdNo, otp: otp }, (error, results) => {

            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (results) {
                // return res.status(200).json({
                //     success: 2,
                //     message: "OTP sent successfully",
                //     otp: otp
                // });

                axios
                    .get(
                        `https://sapteleservices.com/SMS_API/sendsms.php?username=Tmc_medicity&password=c9e780&sendername=TMDCTY&mobile=${mobileNumber}&template_id=1407162012178109509&message=Your+Medicity+App+OTP+code:+${otp}+DuHTEah22dE.Travancore+Medicity+.&routetype=1`
                    )
                    .then((response) => {
                        return res.status(200).json({
                            success: 2,
                            message: "OTP sent successfully",
                        });
                    })
                    .catch((error) => {
                        logger.error(error);
                        return res.status(200).json({
                            success: 3,
                            message: "Error in sending OTP,Please try again",
                        });
                    });

            }
        });
    },
    VerifyOTP: async (req, res) => {
        const body = req.body;
        VerifyOTP(body, async (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Incorrect OTP",
                });
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Entered OTP Matched",
                });
            }
        });
    }
}


