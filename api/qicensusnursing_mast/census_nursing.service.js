const { pool } = require('../../config/database')
module.exports = {
    censusNursingStatInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_census_nursing_mast
          ( 
            census_ns_name,
            census_ns_code,
            census_ou_code,
            nursing_status,
            create_user
          )
          VALUES(?,?,?,?,?)`,
            [
                data.census_ns_name,
                data.census_ns_code,
                data.census_ou_code,
                data.nursing_status,
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
    censusNursingStationView: (callBack) => {
        pool.query(
            `SELECT 
                  census_ns_slno, 
                  census_ns_name,
                  census_ns_code,
                  census_ou_code,
                  if(nursing_status=1,'Yes','No') status
              FROM
               qi_census_nursing_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    NursingStationUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                  qi_census_nursing_mast 
             SET census_ns_name=?,
                  census_ns_code=?,
                  census_ou_code=?,
                  nursing_status=?,
                  edit_user=?
            WHERE 
                  census_ns_slno=?`,
            [
                data.census_ns_name,
                data.census_ns_code,
                data.census_ou_code,
                data.nursing_status,
                data.edit_user,
                data.census_ns_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getNursingStationActive: (callBack) => {
        pool.query(
            `SELECT 
                  census_ns_slno, 
                  census_ns_name,
                  census_ns_code
             FROM
               qi_census_nursing_mast where nursing_status=1 order by census_ns_name`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}