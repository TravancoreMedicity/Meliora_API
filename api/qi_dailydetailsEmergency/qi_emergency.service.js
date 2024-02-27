const { pool } = require('../../config/database')
module.exports = {
    EmergencyQiInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_details_emergency
          ( 
            qi_emergency_date,total_patients,total_time_taken,total_patients_return,create_user
          )
          VALUES(?,?,?,?,?)`,
            [
                data.qi_emergency_date,
                data.total_patients,
                data.total_time_taken,
                data.total_patients_return,
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
    EmergencyAlreadyExist: (body, callBack) => {
        pool.query(
            `SELECT * from qi_details_emergency where qi_emergency_date=?`,
            [body.dailyDate],
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
                 qi_details_emergency 
             SET 
                 total_patients=?,
                 total_time_taken=?,
                 total_patients_return=?,
                 edit_user=?
            WHERE 
              qi_emergency_slno=?`,
            [
                data.total_patients,
                data.total_time_taken,
                data.total_patients_return,
                data.edit_user,
                data.qi_emergency_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getQIReportEmergency: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT
                    * from qi_details_emergency
             WHERE
              qi_emergency_date between ('${fromDate}') and ('${toDate}') order by qi_emergency_date`,
            {},
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    getMonthlyReportEmergency: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT
                    sum(total_patients) as totpatients, sum(total_time_taken) as totaltime,sum(total_patients_return) as totreturn from qi_details_emergency
             WHERE
              qi_emergency_date between ('${fromDate}') and ('${toDate}') order by qi_emergency_date`,
            {},
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
}