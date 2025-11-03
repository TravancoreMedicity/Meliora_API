const { pool } = require('../../config/database')
module.exports = {

    createDept: (data, callBack) => {
        pool.query(
            `INSERT INTO  meliora_department_master
            (  mel_DeptName,
            mel_DepAlias,
            mel_dept_type,
            status,
            create_user)
            VALUES(?,?,?,?,?)`,
            [
                data.dept_name,
                data.dept_alias,
                data.dept_status,
                data.dept_type,
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

    DeptMasterGet: (callBack) => {
        pool.query(
            `SELECT * FROM meliora_department_master `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    Updatedeptmaster: (data, callBack) => {
        pool.query(
            ` UPDATE meliora_department_master 
                SET mel_DeptName = ?,
                mel_DepAlias =?,
                mel_dept_type=?,
                status=?,
                edit_user=?
                WHERE mel_DepId = ?
            `,
            [
                data.dept_name,
                data.dept_alias,
                data.dept_type,
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

    createDeptSecMaster: (data, callBack) => {
        pool.query(
            `INSERT INTO  meliora_dep_sec_master
            (
             mel_dep_sec_name,
            mel_DepId,
            dept_sub_sect,
            level_one,
            level_two,
            status,
            ou_code,
            create_user)
            VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.deptSec_name,
                data.dept_id,
                data.dept_sub_sect,
                data.level_one,
                data.level_two,
                data.deptSec_status,
                data.ou_code,
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
    DeptSecMasterGet: (callBack) => {
        pool.query(
            `SELECT mel_sec_id,
             mel_dep_sec_name,
             meliora_dep_sec_master.mel_DepId,
             meliora_dep_sec_master.status ,
             mel_DeptName,
             dept_sub_sect,
             level_one,
             level_two,meliora_dep_sec_master.ou_code,ouc_desc
             FROM meliora_dep_sec_master 
            LEFT JOIN meliora_department_master on meliora_department_master.mel_DepId=meliora_dep_sec_master.mel_DepId
               LEFT JOIN ora_outlet ON meliora_dep_sec_master.ou_code = ora_outlet.ou_code`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    UpdatedeptSecmaster: (data, callBack) => {
        pool.query(
            ` UPDATE meliora_dep_sec_master 
                SET mel_dep_sec_name = ?,
                mel_DepId =?,
                dept_sub_sect=?,
                level_one =?,
                level_two =?,
                 status =?,
                ou_code =?,
                edit_user=?
                WHERE mel_sec_id = ?
            `,
            [
                data.deptSec_name,
                data.dept_id,
                data.dept_sub_sect,
                data.level_one,
                data.level_two,
                data.deptSec_status,
                data.ou_code,
                data.edit_user,
                data.SecId
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    UpdatedeptSecmasterID: (id, callBack) => {
        pool.query(
            `SELECT mel_sec_id,
             mel_dep_sec_name,
             meliora_dep_sec_master.mel_DepId,
             meliora_dep_sec_master.status ,
             mel_DeptName
             FROM meliora_dep_sec_master 
            LEFT JOIN meliora_department_master on meliora_department_master.mel_DepId=meliora_dep_sec_master.mel_DepId
            where   meliora_dep_sec_master.mel_DepId = ?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    GetdeptSecEmp: (id, callBack) => {
        pool.query(
            `SELECT em_id, em_name FROM co_employee_master where meliora_depSec=? 
            and em_status=1 and em_no!=1  order by em_name ASC`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}