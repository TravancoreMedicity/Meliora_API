const { pool } = require('../../config/database')
module.exports = {
    AuthoriztnInsertData: (data, callback) => {
        pool.query(
            `INSERT INTO co_authorization
            (
                dept_section,
                auth_post,
                dept_section_post,
                emp_id,
                auth_status,
                create_user
               ) 
                VALUES(?,?,?,?,?,?)`,
            [
                data.dept_section,
                data.auth_post,
                data.dept_section_post,
                data.emp_id,
                1,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },

    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT 
            dept_section
            FROM co_authorization
            WHERE dept_section=? and auth_post=? and auth_status=1`,
            [
                data.dept_section,
                data.auth_post
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    AuthorizationGets: (callback) => {
        pool.query(
            `SELECT authorization_slno,
            dept_section,auth_post,dept_section_post,emp_id,
            AD.sec_name as auth_deptsec,
            co_employee_master.em_name as employee,
               ED.sec_name as emp_deptsec,
              if(auth_post = 1 ,'Incharge','HOD') postauth
            FROM co_authorization
                        left join co_employee_master on co_employee_master.em_id=co_authorization.emp_id
            left join co_deptsec_mast AD on AD.sec_id=co_authorization.dept_section
            left join co_deptsec_mast ED on ED.sec_id=co_authorization.dept_section_post
            where auth_status=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    AuthUpdateData: (data, callback) => {
        pool.query(
            `UPDATE co_authorization 
            SET auth_status=0,
            delete_user=?            
            WHERE authorization_slno=? `,
            [
                data.delete_user,
                data.authorization_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getDeptSeconId: (id, callBack) => {
        pool.query(
            `SELECT
                   dept_section,AD.sec_name as auth_deptsec
             FROM
                   co_authorization
                left join co_employee_master on co_employee_master.em_id=co_authorization.emp_id
                left join co_deptsec_mast AD on AD.sec_id=co_authorization.dept_section
            WHERE
                 auth_status=1 and emp_id=?
                GROUP BY dept_section`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getDeptSeconIncharge: (id, callBack) => {
        pool.query(
            `SELECT
                   dept_section,AD.sec_name as auth_deptsec
             FROM
                  co_authorization
              left join co_employee_master on co_employee_master.em_id=co_authorization.emp_id
              left join co_deptsec_mast AD on AD.sec_id=co_authorization.dept_section
            where
                  auth_status=1 and emp_id=? and auth_post=1
            group by dept_section`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },

    getDeptSeconHod: (id, callBack) => {
        pool.query(
            `SELECT
                   dept_section,AD.sec_name as auth_deptsec
             FROM
                  co_authorization
               left join co_employee_master on co_employee_master.em_id=co_authorization.emp_id
               left join co_deptsec_mast AD on AD.sec_id=co_authorization.dept_section
            where
                   auth_status=1 and emp_id=? and auth_post=2
            group by dept_section`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },


    getDeptSeconHodbyDep: (id, callBack) => {
        pool.query(
            `SELECT
                   dept_section,AD.sec_name as auth_deptsec,emp_id,auth_post,em_name
             FROM
                  co_authorization
               left join co_employee_master on co_employee_master.em_id=co_authorization.emp_id
               left join co_deptsec_mast AD on AD.sec_id=co_authorization.dept_section
            where
                   auth_status=1 and dept_section=? 
            `,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    AuthoriztnInsertMelData: (data, callBack) => {
        pool.query(
            `INSERT INTO meliora_authorization
            (
                mel_dept_section,
                mel_auth_post,
                mel_dept_section_post,
                emp_id,
                mel_auth_status,
                create_user
               ) 
                VALUES(?,?,?,?,?,?)`,
            [
                data.dept_section,
                data.auth_post,
                data.dept_section_post,
                data.emp_id,
                1,
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
    checkInsertValMel: (data, callBack) => {
        pool.query(
            `SELECT 
            mel_dept_section
            FROM meliora_authorization
            WHERE mel_dept_section=? and mel_auth_post=? and mel_auth_status=1`,
            [
                data.dept_section,
                data.auth_post
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    AuthorizationMelGets: (callback) => {
        pool.query(
            `SELECT mel_authorization_slno,
            mel_dept_section,mel_auth_post,mel_dept_section_post,emp_id,
            AD.sec_name as auth_deptsec,
            co_employee_master.em_name as employee,
               ED.sec_name as emp_deptsec,
              if(mel_auth_post = 1 ,'Incharge','HOD') postauth
            FROM meliora_authorization
                        left join co_employee_master on co_employee_master.em_id=meliora_authorization.emp_id
            left join co_deptsec_mast AD on AD.sec_id=meliora_authorization.mel_dept_section
            left join co_deptsec_mast ED on ED.sec_id=meliora_authorization.mel_dept_section_post
            where mel_auth_status=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    AuthUpdateMelData: (data, callback) => {
        pool.query(
            `UPDATE meliora_authorization 
            SET mel_auth_status=0,
            delete_user=?            
            WHERE mel_authorization_slno=? `,
            [
                data.delete_user,
                data.authorization_slno
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
