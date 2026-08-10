const { pool } = require('../../config/database')
module.exports = {
    InsertToken: (data, callBack) => {
        pool.query(
            `insert into indent_token 
            (
          token_number,
          token_status,
          create_user
            ) values (?,?,?)`,
            [
                data.token_number,
                data.token_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },


    getToken: (callBack) => {
        const query = `
       SELECT token_slno,token_number,if(token_status = 1 ,'Yes','No') status
       FROM indent_token`;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    updatetoken: (data, callBack) => {
        pool.query(
            `UPDATE indent_token 
                SET token_number = ?,
                  token_status=?
                WHERE token_slno = ?`,
            [
                data.token_number,
                data.token_status,
                data.token_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    checkInsertDateVal: (data, callBack) => {
        pool.query(
            `SELECT schedule_date          
            FROM indent_date_schedule
            WHERE schedule_date = ?`,
            [
                data.appointment_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    Insertdate: (data, callBack) => {
        pool.query(
            `insert into indent_date_schedule 
            (
          schedule_date,
          schedule_status,
          create_user
            ) values (?,?,?)`,
            [
                data.appointment_date,
                data.appointment_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    Getdate: (callBack) => {
        const query = `
       SELECT date_slno,schedule_date,if(schedule_status = 1 ,'Yes','No') status
       FROM indent_date_schedule`;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    GetDateThisMonth: (callBack) => {
        const query = `
       SELECT date_slno, schedule_date, if(schedule_status = 1 ,'Yes','No') status,token_count,total_token_count
       FROM indent_date_schedule
       WHERE DATE(schedule_date) >= CURDATE()`;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    Insertdivision: (data, callBack) => {
        pool.query(
            `insert into indent_division_master 
            (
          division,
          division_status,
          create_user
            ) values (?,?,?)`,
            [
                data.Division_name,
                data.Division_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    Getdivision: (callBack) => {
        const query = `
       SELECT division_slno,division,if(division_status = 1 ,'Yes','No') status
       FROM indent_division_master`;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

    updatedivision: (data, callBack) => {

        pool.query(
            `UPDATE indent_division_master 
                SET division = ?,
                  division_status=?
                WHERE division_slno = ?`,
            [
                data.Division_name,
                data.Division_status,
                data.Division_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    InsertTax: (data, callBack) => {
        pool.query(
            `insert into indent_tax_master 
            (
           tax,
           tax_status,
           create_user
            ) values (?,?,?)`,
            [
                data.tax,
                data.tax_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    Gettax: (callBack) => {
        const query = `
       SELECT tax_id,tax,tax_status,if(tax_status = 1 ,'Yes','No') status
       FROM indent_tax_master`;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    updatetax: (data, callBack) => {
        pool.query(
            `UPDATE indent_tax_master 
                SET tax = ?,
                  tax_status=?
                WHERE tax_id = ?`,
            [
                data.tax,
                data.tax_status,
                data.tax_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    GetDashboardTokens: (callBack) => {
        const query = `
            SELECT 
                25 AS total_tokens, 
                ids.schedule_date AS latest_date,
                (SELECT COUNT(token_id) FROM indent_tokenregistration WHERE DATE(appointmentdate) = DATE(ids.schedule_date)) AS registered_tokens 
            FROM indent_date_schedule ids 
            ORDER BY ids.date_slno DESC 
            LIMIT 1;
        `;
        pool.query(query, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },

}