const { pool } = require('../../config/database')

module.exports = {
    DialysisQiInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_details_dialysis
          (
             patient_arrived_date, ptno, ptname, ptsex, ptage, ptaddrs1,
             ptaddrs2, ptaddrs3, ptaddrs4, ptmobile, doctor_name, visit_token,
             qi_dept_no, create_user
          )
         VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getPatientList: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT 
                   qi_slno, patient_arrived_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs2, ptaddrs3, ptaddrs4,
                    ptmobile, doctor_name, visit_token, qi_dept_no, qi_status
             FROM  
                   qi_details_dialysis
             WHERE 
                   patient_arrived_date between ('${fromDate}') and ('${toDate}') order by patient_arrived_date`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    EmergencyQiUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 qi_details_dialysis 
             SET 
                 triage_time=?,
                 assess_time=?,
                 return_status=?,
                 edit_user=?,
                 sumof_service_time=?,
                 qi_save_status=?
            WHERE 
                 qi_slno=?`,
            [
                data.triage_time,
                data.assess_time,
                data.return_status,
                data.edit_user,
                data.sumof_service_time,
                data.qi_save_status,
                data.qi_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
}




