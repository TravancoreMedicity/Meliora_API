const { pool } = require('../../config/database')

module.exports = {
    escmappingInsert: (data, callback) => {
        pool.query(
            `INSERT INTO co_time_esc_mapping
            (    esc_mapping_slno,
                escalaion_slno,
                complaint_dept,
                create_user
               )
                VALUES(?,?,?,?)`,
            [
                data.esc_mapping_slno,
                data.escalaion_slno,
                data.complaint_dept,
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
    escMappingSelect: (callBack) => {
        pool.query(
            `select esc_activity,complaint_dept_name,esc_slno,esc_mapping_slno from co_time_esc_mapping
            left join co_time_escalation on co_time_escalation.esc_slno=co_time_esc_mapping.escalaion_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=co_time_esc_mapping.complaint_dept`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkInservalue: (data, callBack) => {
        pool.query(
            ` select esc_mapping_slno FROM co_time_esc_mapping where esc_mapping_slno=? `,
            [
                data.esc_mapping_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateEscalation: (data, callBack) => {
        pool.query(
            ` UPDATE co_time_esc_mapping 
            SET escalaion_slno=?,
            complaint_dept=? 
            where esc_mapping_slno=? `,
            [
                data.escalaion_slno,
                data.complaint_dept,
                data.esc_mapping_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },



}