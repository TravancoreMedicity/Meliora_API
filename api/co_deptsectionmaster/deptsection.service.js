const { pool } = require('../../config/database');

module.exports = {
    createDept: (data, callBack) => {
        pool.query(
            `INSERT INTO co_deptsec_mast
            (
                 sec_id,
                sec_name,
                dept_id,
                dept_sub_sect,
                sec_status,
            create_user,
            ou_code)
            VALUES(?,?,?,?,?,?,?)`,
            [
                data.sec_id,
                data.sec_name,
                data.dept_id,
                data.dept_sub_sect,
                data.sec_status,
                data.create_user,
                data.ou_code
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
            `SELECT sec_name,
            sec_status
            FROM co_deptsec_mast
            WHERE sec_name = ?`,
            [
                data.sec_name,
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
            `SELECT sec_name,               
            sec_id
            FROM co_deptsec_mast 
            WHERE sec_name = ?  AND sec_id != ?`,
            [
                data.sec_name,
                data.sec_id
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
            `UPDATE co_deptsec_mast 
                SET sec_name = ?,
                dept_id = ?,
                dept_sub_sect=?,
                sec_status = ?,
                ou_code=?,
                    edit_user = ?
                WHERE sec_id = ?`,
            [
                data.sec_name,
                data.dept_id,
                data.dept_sub_sect,
                data.sec_status,
                data.ou_code,
                data.edit_user,
                data.sec_id
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
            `DELETE FROM co_deptsec_mast WHERE sec_id = ?`,
            [
                data.sec_id
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
            `SELECT sec_id,sec_name,dept_name,co_deptsec_mast.dept_id,dept_sub_sect,ouc_desc,ora_outlet.ou_code,
            if(sec_status = 1 ,'Yes','No')status , (case when dept_sub_sect='1' then "GENERAL" when dept_sub_sect='2' then "OT" when dept_sub_sect='3' then 'ICU'when dept_sub_sect='4' then 'ER'  else "Nil" end ) as dept_sub_sect1
             FROM co_deptsec_mast
            LEFT JOIN co_department_mast on co_department_mast.dept_id=co_deptsec_mast.dept_id
            LEFT JOIN ora_outlet on co_deptsec_mast.ou_code=ora_outlet.ou_code`,
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
            `SELECT sec_id,
            sec_name,
            dept_id,
            sec_status
            FROM co_deptsec_mast
            WHERE sec_id IN (?)`,
            [data],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDeptsectionStatus: (callBack) => {
        pool.query(
            `SELECT sec_id,sec_name
            FROM co_deptsec_mast
             WHERE sec_status=1 order by sec_name ASC
           `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSelectedSectionByDept: (id, callback) => {
        pool.query(
            `SELECT 
            sec_id,
            sec_name
        FROM co_deptsec_mast 
        WHERE dept_id = ? order by sec_name ASC`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    getOutlet: (callBack) => {
        pool.query(
            `SELECT ou_code,ouc_desc
            FROM ora_outlet
           `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getDepartmentsectionId: (callBack) => {
        pool.query(
            `SELECT * FROM serial_nos where serial_slno=3`,
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
            `update serial_nos set serial_current=serial_current+1 where serial_slno=3`,
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