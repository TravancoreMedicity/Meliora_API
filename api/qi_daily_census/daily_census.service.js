const { pool } = require('../../config/database')
module.exports = {
    DailyCensusInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_daily_census
          ( 
            census_ns_slno,census_date,yesterday_census,total_admission,total_discharge,transfer_in,
            transfer_out,total_death,census_total,create_user,ora_admission,ora_discharge,ora_death,ora_census_total
          )
          VALUES ?`,
            [
                data
            ],

            //   VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            //     [
            //         data.census_ns_slno,
            //         data.census_date,
            //         data.yesterday_census,
            //         data.total_admission,
            //         data.total_discharge,
            //         data.transfer_in,
            //         data.transfer_out,
            //         data.total_death,
            //         data.census_total,
            //         data.create_user,
            //         data.ora_admission,
            //         data.ora_discharge,
            //         data.ora_death
            //     ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    CensusAlreadyInsert: (data, callBack) => {
        pool.query(
            `select census_ns_slno from qi_daily_census where census_date=?`,
            [
                data
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    DailyCensusAlreadyExist: (body, callBack) => {
        pool.query(
            `SELECT
                   census_slno, qi_daily_census.census_ns_slno,qi_census_nursing_mast.census_ns_name, census_date, 
                   yesterday_census, total_admission, total_discharge, transfer_in, transfer_out, total_death,
                    census_total,ora_admission,ora_discharge,ora_death
            FROM qi_daily_census 
                   left join qi_census_nursing_mast on qi_census_nursing_mast.census_ns_slno=qi_daily_census.census_ns_slno
             WHERE
                   qi_daily_census.census_ns_slno in (?) and census_date=?`,
            [
                body.census_ns_slno,
                body.census_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    DailyCensusYesterdayCount: (body, callBack) => {
        pool.query(
            `SELECT census_total,census_ns_slno from qi_daily_census where census_ns_slno in (?) and census_date=?`,
            [
                body.census_ns_slno,
                body.census_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    GetDailyCensusReport: (body, callBack) => {
        pool.query(
            `SELECT
            census_slno, qi_daily_census.census_ns_slno,qi_census_nursing_mast.census_ns_name, census_date, 
            yesterday_census, total_admission, total_discharge, transfer_in, transfer_out, total_death, census_total,
            ora_admission,ora_discharge,ora_death,ora_census_total
          FROM qi_daily_census 
            left join qi_census_nursing_mast on qi_census_nursing_mast.census_ns_slno=qi_daily_census.census_ns_slno
         WHERE
            census_date=?`,
            [
                body.census_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    DailyCensusUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                qi_daily_census 
             SET 
                yesterday_census=?,
                total_admission=?,
                total_discharge=?,
                transfer_in=?,
                transfer_out=?,
                total_death=?,
                census_total=?,
                edit_user=?
            WHERE 
                 census_slno=? and census_ns_slno=? and census_date=?`,
            [
                data.yesterday_census,
                data.total_admission,
                data.total_discharge,
                data.transfer_in,
                data.transfer_out,
                data.total_death,
                data.census_total,
                data.edit_user,
                data.census_slno,
                data.census_ns_slno,
                data.census_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    GetCensusBargraphReport: (body, callBack) => {
        const fromDate = body.from;
        const toDate = body.to;
        pool.query(
            `SELECT
                  census_slno,census_date,total_admission,total_discharge,census_total
             FROM 
                  qi_daily_census 
             WHERE
                  census_date between ('${fromDate}') and ('${toDate}') order by census_date`,
            {},
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


}



