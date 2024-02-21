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


    EmergencyAlreadyExist: (id, callBack) => {
        pool.query(
            `SELECT * from qi_details_emergency where qi_emergency_date=?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}