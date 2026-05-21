const { pool } = require('../../config/database')
module.exports = {
    InsertStoremasterRights: (data, callback) => {

        pool.query(
            `INSERT INTO store_report_view_rights (store_report_view, department, dp_section, emid, status, create_user)
                VALUES(?,?,?,?,?,?)`,
            [
                JSON.stringify(data.selectedValues),
                data.dept,
                data.deptsec,
                data.empId,
                data.status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getStoreReportViewRights: (data, callback) => {
        pool.query(
            ` SELECT
              slno,store_report_view, department, dp_section, emid, store_report_view_rights.status, dept_name,sec_name,em_name,
              IF(store_report_view_rights.status = 1 , 'Active','Inactive') rights_status
              FROM store_report_view_rights
              LEFT JOIN co_department_mast ON co_department_mast.dept_id = store_report_view_rights.department
              LEFT JOIN co_deptsec_mast ON co_deptsec_mast.sec_id = store_report_view_rights.dp_section       
              LEFT JOIN co_employee_master OM ON OM.em_id = store_report_view_rights.emid`,
            [

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateReportRightsView: (data, callback) => {
        pool.query(
            `UPDATE store_report_view_rights
            SET
            store_report_view=?,
            department=?,
            dp_section=?,
            emid=?,
            status=?,
            edit_user=?
            WHERE slno = ?`,
            [
                JSON.stringify(data.selectedValues),
                data.dept,
                data.deptsec,
                data.empId,
                data.status,
                data.create_user,
                data.slno
            ],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    StoreReportRights: (data, callback) => {
        pool.query(
            `SELECT store_report_view FROM store_report_view_rights where status=1 and emid =?`,
            [
                data.loginId
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },



}