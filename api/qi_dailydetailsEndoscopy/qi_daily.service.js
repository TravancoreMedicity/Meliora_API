const { pool } = require('../../config/database')
module.exports = {

    EndoscopyQiInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_details_endoscopy
          ( 
            qi_date,total_patients,total_error_report,total_redose,total_sumof_time,total_ident_error,total_falls,
            total_sentinels_analyse,total_sentinels_collect,total_near_misses,total_incidents,create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.qi_date,
                data.total_patients,
                data.total_error_report,
                data.total_redose,
                data.total_sumof_time,
                data.total_ident_error,
                data.total_falls,
                data.total_sentinels_analyse,
                data.total_sentinels_collect,
                data.total_near_misses,
                data.total_incidents,
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

    EndoscopyAlreadyExist: (body, callBack) => {
        pool.query(
            `SELECT * from qi_details_endoscopy where qi_date=?`,
            [body.dailyDate],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    EndoscopyQiUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 qi_details_endoscopy 
             SET 
                 total_patients=?,
                 total_error_report=?,
                 total_redose=?,
                 total_sumof_time=?,
                 total_ident_error=?,
                 total_falls=?,
                 total_sentinels_analyse=?,
                 total_sentinels_collect=?,
                 total_near_misses=?,
                 total_incidents=?,
                 edit_user=?
            WHERE 
                 qi_daily_endos_slno=?`,
            [
                data.total_patients,
                data.total_error_report,
                data.total_redose,
                data.total_sumof_time,
                data.total_ident_error,
                data.total_falls,
                data.total_sentinels_analyse,
                data.total_sentinels_collect,
                data.total_near_misses,
                data.total_incidents,
                data.edit_user,
                data.qi_daily_endos_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getQualityInicatorList: (id, callBack) => {
        pool.query(
            `SELECT 
                   qi_slno, 
                   qi_name
              FROM
                   qi_indicator_mast
              WHERE qi_status=1 AND qi_dept_slno=?
                `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getQIReportEndoscopy: (data, callBack) => {
        const fromDate = data.from;
        const toDate = data.to;
        pool.query(
            `SELECT
                    * from qi_details_endoscopy
             WHERE
                   qi_date between ('${fromDate}') and ('${toDate}') order by qi_date`,
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