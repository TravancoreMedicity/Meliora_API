
const { pool } = require('../../config/database')
module.exports = {
    InsertIPPatients: (data, callback) => {
        pool.query(
            `INSERT INTO qi_details_inpatients
          (
            ip_no,ipd_date,ptno,ptname,ptsex,ptage,ptaddrs1,ptaddrs2,ptmobile,ip_bed,
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

    getPatientList: (data, callBack) => {
        pool.query(
            `SELECT 
                   qi_slno, ip_no, ipd_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs2, ptmobile, ip_bed,
                   doctor_name, discharge_date, qi_dept_no, qi_save_status
             FROM  
                   qi_details_inpatients
             WHERE 
                   ipd_date between ? and ? and qi_dept_no=? and discharge_date is null order by ipd_date`,
            [
                data.from,
                data.to,
                data.qidept
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    searchPatientsbyName: (data, callBack) => {
        pool.query(
            `SELECT 
                   qi_slno, ip_no, ipd_date, ptno, ptname, ptsex, ptage, ptaddrs1, ptaddrs2, ptmobile, ip_bed,
                   doctor_name, discharge_date, qi_dept_no, qi_save_status
             FROM  
                   qi_details_inpatients
            WHERE 
                   ipd_date between ? and ? and qi_dept_no=? and discharge_date is null and ptname like ? order by ipd_date`,
            [
                data.from,
                data.to,
                data.qidept,
                '%' + data.ptname + '%'
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    UpdateDischargeDateOfPatients: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                            qi_details_inpatients
                     SET
                            discharge_date = ?
                     WHERE
                            ip_no = ?`,
                    [
                        val.discharge_date,
                        val.ip_no
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        }))
    },


}