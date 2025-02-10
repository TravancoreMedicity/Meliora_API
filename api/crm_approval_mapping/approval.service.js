const { pool } = require('../../config/database')

module.exports = {
    approvalInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_approval_mapping_master ( company_slno, medical_director_approve,medical_director_emid,
            executive_director_approve,executive_director_emid,managing_director_approve,managing_director_emid,
            create_user) VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.company_slno,
                data.medical_director_approve,
                data.medical_director_emid,
                data.executive_director_approve,
                data.executive_director_emid,
                data.managing_director_approve,
                data.managing_director_emid,
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
    checKCompany: (data, callback) => {
        pool.query(
            `SELECT 
                  *
             FROM
                crm_approval_mapping_master
             WHERE
                company_slno=?`,
            [
                data.company_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    viewApproval: (callback) => {
        pool.query(
            `SELECT 
                   approval_slno, crm_approval_mapping_master.company_slno,company_name,
                   medical_director_approve, medical_director_emid,MD.em_no as MD_em_no, MD.em_name as MD_em_name,
                   executive_director_approve, executive_director_emid,ED.em_no as ED_em_no, ED.em_name as ED_em_name,
                   managing_director_approve,managing_director_emid,MA.em_no as MA_em_no, MA.em_name as MA_em_name
            FROM
                  crm_approval_mapping_master
                LEFT JOIN crm_company_master ON crm_company_master.company_slno=crm_approval_mapping_master.company_slno
                LEFT JOIN co_employee_master MD ON MD.em_id=crm_approval_mapping_master.medical_director_emid    
                LEFT JOIN co_employee_master ED ON ED.em_id=crm_approval_mapping_master.executive_director_emid    
                LEFT JOIN co_employee_master MA ON MA.em_id=crm_approval_mapping_master.managing_director_emid`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    updateApproval: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_approval_mapping_master
            SET
                   company_slno=?,
                   medical_director_approve=?,
                   medical_director_emid=?,
                   executive_director_approve=?,
                   executive_director_emid=?,
                   managing_director_approve=?,
                   managing_director_emid=?,
                   edit_user=?
             WHERE 
                    approval_slno=?`,
            [
                data.company_slno,
                data.medical_director_approve,
                data.medical_director_emid,
                data.executive_director_approve,
                data.executive_director_emid,
                data.managing_director_approve,
                data.managing_director_emid,
                data.edit_user,
                data.approval_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

}