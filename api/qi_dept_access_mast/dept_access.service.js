const { pool } = require('../../config/database')
module.exports = {
    getEmployeeName: (id, callBack) => {
        pool.query(
            `SELECT
                    em_id,em_no,em_name
             FROM
                    co_employee_master
             WHERE
                    em_no=? and em_status=1`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    qiDeptAccessInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_dept_access_mast
            ( 
             em_id,dpt_access_list,access_status,create_user
            )
            VALUES(?,?,?,?)`,
            [
                data.em_id,
                JSON.stringify(data.dpt_access_list),
                data.access_status,
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
    dptAccessView: (callBack) => {
        pool.query(
            `SELECT 
                   access_slno,qi_dept_access_mast.em_id,co_employee_master.em_no,co_employee_master.em_name,
                   dpt_access_list,GROUP_CONCAT(qi_dept_desc) as dpt_access_name, if(access_status=1,'Yes','No') status
             FROM 
                   qi_dept_access_mast
             LEFT JOIN co_employee_master ON co_employee_master.em_id=qi_dept_access_mast.em_id
             LEFT JOIN qi_dept_mast ON JSON_CONTAINS(qi_dept_access_mast.dpt_access_list,cast(qi_dept_mast.qi_dept_no as json),'$') 
             GROUP BY access_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    DepartmentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                  qi_dept_access_mast 
             SET 
                  em_id=?,
                  dpt_access_list=?,
                  access_status=?,
                  edit_user=?
            WHERE 
                  access_slno=?`,
            [
                data.em_id,
                JSON.stringify(data.dpt_access_list),
                data.access_status,
                data.edit_user,
                data.access_slno
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