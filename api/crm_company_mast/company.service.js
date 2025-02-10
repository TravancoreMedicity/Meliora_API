const { pool } = require('../../config/database')

module.exports = {
    companyInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_company_master ( company_name, comp_status) VALUES(?,?)`,
            [
                data.company_name,
                data.comp_status,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    checKCompany: (data, callback) => {
        pool.query(
            `SELECT 
                  company_slno
             FROM
                crm_company_master
             WHERE
                company_name=?`,
            [
                data.company_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    viewCompany: (callback) => {
        pool.query(
            `SELECT 
                   company_slno, company_name,comp_status,if(comp_status=1,'Yes','No')status
             FROM
                  crm_company_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    updateCompany: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_company_master SET company_name=?, comp_status=?
             WHERE 
                  company_slno=?`,
            [
                data.company_name,
                data.comp_status,
                data.company_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getActiveCompany: (callback) => {
        pool.query(
            `SELECT 
                   company_slno, company_name
             FROM
                  crm_company_master
             WHERE
                  comp_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}