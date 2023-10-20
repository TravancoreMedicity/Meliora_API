const { pool } = require('../../config/database')
module.exports = {
    WifiInsert: (data, callback) => {

        pool.query(
            `INSERT INTO it_wifi_management
          ( 
            in_patient_no,
            patient,
            bystander,
            extra
         
          )
          VALUES(?,?,?,?)`,
            [
                data.in_patient_no,
                data.patient,
                data.bystander,
                data.extra

            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    WifiUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_wifi_management SET
            patient=?,
            bystander=?,
            extra=?                        
            WHERE 
            in_patient_no=?`,
            [
                data.patient,
                data.bystander,
                data.extra,
                data.in_patient_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )

    },

    wifiViewById: (id, callback) => {
        pool.query(
            `SELECT
            in_patient_no,
            patient,
            bystander,
            extra            
            FROM it_wifi_management WHERE in_patient_no=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    checkCodeNdGet: (data, callback) => {
        pool.query(
            `SELECT code FROM
            it_wifi_qr_code_link                               
            WHERE 
            it_wifi_ipno=? and it_wifi_flg=?`,
            [
                data.it_wifi_ipno,
                data.it_wifi_flg
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )

    },
    updateQrCode: (data, callback) => {
        pool.query(
            `UPDATE it_wifi_qr_code_link SET                       
            it_wifi_ipno=?,
            it_wifi_flg=?,
            updated_date=current_date()                                  
            WHERE 
            it_wifi_qrslno=?`,
            [
                data.it_wifi_ipno,
                data.it_wifi_flg,
                data.it_wifi_qrslno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getfreeCodes: (callBack) => {
        pool.query(
            `select it_wifi_qrslno      
        from it_wifi_qr_code_link where it_wifi_ipno is null and it_wifi_flg is null`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
}