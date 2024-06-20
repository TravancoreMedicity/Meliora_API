const { format } = require('date-fns');
const { pool } = require('../../config/database')
module.exports = {
    InsertIPPatients: (data, callback) => {
        pool.query(
            `INSERT INTO qi_details_inpatients
          (
            ip_no,ipd_date,ptno,ptname,ptsex,ptage,ptaddrs1,ptaddrs2,ptaddrs3,ptaddrs4,ptmobile,ip_bed,
            doctor_name,discharge_date,qi_dept_no,create_user
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
}