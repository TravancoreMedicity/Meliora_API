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

    crfNotificationInsert: (data, callback) => {

        pool.query(
            `INSERT INTO crm_notification (
                dep_id,
                depsec_id,
                emp_id,
                mobile_no
            ) VALUES(?,?,?,?)`,
            [
                data.dept,
                data.deptsec,
                data.empId,
                data.mobile
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getCrfNotification: (callback) => {
        pool.query(
            `SELECT 
                notification_id,
                dep_id,
                depsec_id,
                emp_id,
                mobile_no,
                crm_notification.create_date,
                crm_notification.update_date,
                dept_name,
                sec_name,
                em_name
             FROM crm_notification
             LEFT JOIN co_department_mast ON co_department_mast.dept_id = crm_notification.dep_id
             LEFT JOIN co_deptsec_mast ON co_deptsec_mast.sec_id = crm_notification.depsec_id
             LEFT JOIN co_employee_master ON co_employee_master.em_id = crm_notification.emp_id`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    crfNotificationUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_notification 
             SET dep_id=?,
                 depsec_id=?,
                 emp_id=?,
                 mobile_no=?
             WHERE notification_id=?`,
            [
                data.dept,
                data.deptsec,
                data.empId,
                data.mobile,
                data.notification_id
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