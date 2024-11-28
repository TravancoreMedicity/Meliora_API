const { error } = require("winston")
const { pool } = require("../../config/database")

module.exports = {
    createnewRegistration: (data, callBack) => {
        pool.query(
            `
            INSERT INTO mv_vehicle_registration
            (
                vallet_type,
                zone_slno,
                owner_name,
                mobile_number,
                vehicle_number,
                token_number,
                driver_emid,
                attachment_name,
                payment_type,
                upi_payment_transactionid,
                create_user
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
            `,
            [
                data.vallet_type,
                data.zone_slno,
                data.owner_name,
                data.mobile_number,
                data.vehicle_number,
                data.token_number,
                data.driver_emid,
                data.attachment_name,
                data.payment_type,
                data.upi_payment_transactionid,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },vehicleImageUpload:(data,callBack) =>{
        pool.query(
            `UPDATE  mv_vehicle_registration
            SET 
            payment_attach_status = 1
            WHERE registration_slno = ?
            `,
            [
                data.registration_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
    
}