const { pool } = require('../../config/database')
module.exports = {
    createDept: (data, callBack) => {
        pool.query(
            `INSERT INTO  co_department_mast
            (  dept_id,
                dept_name,
            dept_alias,
            dept_status,
            create_user)
            VALUES(?,?,?,?,?)`,
            [
                data.dept_id,
                data.dept_name,
                data.dept_alias,
                data.dept_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT dept_name,
            dept_status
            FROM co_department_mast
            WHERE dept_name = ?`,
            [
                data.dept_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkDeptalias: (data, callBack) => {
        pool.query(
            `SELECT dept_alias,
            dept_status
            FROM co_department_mast
            WHERE dept_alias = ?`,
            [
                data.dept_alias
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT dept_name,               
            dept_id
            FROM co_department_mast 
            WHERE dept_name = ?  AND dept_id != ?`,
            [
                data.dept_name,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateDept: (data, callBack) => {
        pool.query(
            `UPDATE co_department_mast 
                SET dept_name = ?,
                    dept_alias = ?,
                    dept_status = ?,
                    edit_user = ?
                WHERE dept_id = ?`,
            [
                data.dept_name,
                data.dept_alias,
                data.dept_status,
                data.edit_user,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteDept: (data, callBack) => {
        pool.query(
            `DELETE FROM co_department_mast WHERE dept_id = ?`,
            [
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDept: (callBack) => {
        pool.query(
            `SELECT dept_id,
                dept_name,
                dept_alias,
                if(dept_status = 1 ,'Yes','No') status
            FROM co_department_mast`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDeptById: (data, callBack) => {
        pool.query(
            `SELECT dept_id,
                dept_name,
                dept_alias,
                dept_status
            FROM co_department_mast
            WHERE dept_id IN (?)`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDeptStatus: (callBack) => {
        pool.query(
            `SELECT dept_id,
             dept_name 
             FROM co_department_mast WHERE dept_status=1 order by dept_name ASC`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkUpdateAlias: (data, callBack) => {
        pool.query(
            `   SELECT dept_alias,               
            dept_id
            FROM co_department_mast 
            WHERE dept_alias =?  AND dept_id != ?`,
            [
                data.dept_alias,
                data.dept_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDepartmentId: (callBack) => {
        pool.query(
            `SELECT * FROM serial_nos where serial_slno=2`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateserialnum: (callBack) => {
        pool.query(
            `update serial_nos set serial_current=serial_current+1 where serial_slno=2`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}