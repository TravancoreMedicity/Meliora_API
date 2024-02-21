const { pool } = require('../../config/database')
module.exports = {
    EmergncyTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_emergencytype_mast
          ( 
            emer_type_name,
            emer_type_escalation,
            emer_type_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.emer_type_name,
                data.emer_type_escalation,
                data.emer_type_status,
                data.create_user,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    EmergncyTypeView: (callback) => {
        pool.query(
            `SELECT 
            emergency_slno,
            emer_type_name,
            emer_type_escalation, 
            emer_type_status,
            if(emer_type_status=1,'Yes','No')status
            FROM
            crm_emergencytype_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    EmergncyTypeUpdate: (data, callback) => {
        pool.query(

            `UPDATE crm_emergencytype_mast SET 
            emer_type_name=?,
            emer_type_escalation=?,
            emer_type_status=?,
            edit_user=?
            WHERE 
            emergency_slno=?`,

            [

                data.emer_type_name,
                data.emer_type_escalation,
                data.emer_type_status,
                data.edit_user,
                data.emergency_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    CrmEmerListSelect: (callback) => {
        pool.query(
            `SELECT 
            emergency_slno,
            emer_type_name           
            FROM
            crm_emergencytype_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}