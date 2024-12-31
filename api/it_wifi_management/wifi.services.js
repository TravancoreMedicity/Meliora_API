const { pool } = require('../../config/database')
module.exports = {
    WifiInsert: (data, callback) => {

        pool.query(
            `INSERT INTO it_wifi_management
          ( 
            in_patient_no,
            patient,
            bystander,
            extra,
            create_user
          )
          VALUES(?,?,?,?,?)`,
            [
                data.in_patient_no,
                data.patient,
                data.bystander,
                data.extra,
                data.create_user
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
            extra=?,
            edit_user=?                        
            WHERE 
            in_patient_no=?`,
            [
                data.patient,
                data.bystander,
                data.extra,
                data.edit_user,
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
                   in_patient_no,patient,bystander,extra            
             FROM
                   it_wifi_management
             WHERE
                   in_patient_no=?`,
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
            `SELECT
                   code,username
             FROM
                   it_wifi_qr_code_link                               
            WHERE 
                   it_wifi_ipno=? AND it_wifi_flg=?  AND wifi_status=1`,
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
            `UPDATE
                    it_wifi_qr_code_link
             SET
                  it_wifi_ipno=?,it_wifi_flg=?,updated_date=current_date()                                  
            WHERE 
                  it_wifi_qrslno=? AND wifi_status=1`,
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
            `SELECT
                   it_wifi_qrslno
             FROM
                   it_wifi_qr_code_link
             WHERE it_wifi_ipno is null and it_wifi_flg is null
                 AND wifi_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    getAllowttedWiFi: (callBack) => {
        pool.query(
            ` SELECt
                    code from it_wifi_qr_code_link
              WHERE
                   updated_date BETWEEN date_sub(current_date(),INTERVAL 5 DAY) AND current_date()`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getCreatedDate: (id, callback) => {
        pool.query(
            `SELECT
                   updated_date        
    	     FROM 
                  it_wifi_qr_code_link     
            WHERE
                 it_wifi_ipno=?
                 AND wifi_status=1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteQrCode: (data, callback) => {
        pool.query(
            `UPDATE
                   it_wifi_qr_code_link 
             SET         
                  wifi_status=0          
             WHERE
                   it_wifi_ipno = ?`,
            [
                data.it_wifi_ipno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getExpiredWiFiDetails: (id, callback) => {
        pool.query(
            `SELECT 
                   patient,bystander,extra,it_wifi_qr_code_link.updated_date,in_patient_no
             FROM    
                   it_wifi_management
             LEFT JOIN it_wifi_qr_code_link ON it_wifi_qr_code_link.it_wifi_ipno=it_wifi_management.in_patient_no  
             WHERE
                   in_patient_no=? AND wifi_status=0;`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getQrCodeLink: (callBack) => {
        pool.query(
            `SELECT
                   qr_code_link
             FROM
                   it_wifi_common_settings`,
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