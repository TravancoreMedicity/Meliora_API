const { pool } = require('../../config/database');


module.exports = {
    inserEmpmap: (data, callback) => {
        pool.query(
            `insert into complaint_emp_map 
     (map_section_name,com_dept,
        co_emp_dept,
        co_emp_deptsec,
        co_emp_empid,   
         co_emp_status,create_user) values(?,?,?,?,?,?,?)`,
            [
                data.map_section_name,
                data.com_dept,
                data.co_emp_dept,
                data.co_emp_deptsec,
                JSON.stringify(data.co_emp_empid),
                data.co_emp_status,
                data.create_user

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getEmpMapping: (callback) => {
        pool.query(
            ` select emp_map_slno,
            map_section_name,com_dept, 
              sec_name,E.dept_name as dept_name ,P.dept_name as complaint_dept,
               GROUP_CONCAT(em_name) as   em_name,  
            co_emp_dept, co_emp_deptsec, co_emp_empid,
            co_emp_status,
            (case when co_emp_status = 1 then "yes" else 'no' end ) as status
           from complaint_emp_map
              left join co_department_mast E on E.dept_id=complaint_emp_map.co_emp_dept
              left join co_deptsec_mast on co_deptsec_mast.sec_id=complaint_emp_map.co_emp_deptsec
              left join co_department_mast P on P.dept_id=complaint_emp_map.com_dept
               left join co_employee_master on JSON_CONTAINS(complaint_emp_map.co_emp_empid,cast(co_employee_master.em_id as json),'$')
                   group by emp_map_slno`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updateEmpMap: (data, callback) => {
        pool.query(
            `update complaint_emp_map
            set map_section_name =?,
            com_dept=?,
            co_emp_dept =?,
            co_emp_deptsec =?,
            co_emp_empid =?,         
             co_emp_status =?,
            edit_user =?
                where emp_map_slno =? `,
            [
                data.map_section_name,
                data.com_dept,
                data.co_emp_dept,
                data.co_emp_deptsec,
                JSON.stringify(data.co_emp_empid),
                data.co_emp_status,
                data.edit_user,
                data.emp_map_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    CheckinsertVal: (data, callBack) => {
        pool.query(`select map_dept_slno from we_emp_map 
        where map_slno = ?`,
            [
                data.map_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    selectallEmpMapping: (id, callBack) => {
        pool.query(
            `select emp_map_slno,
            map_section_name,co_emp_empid
            from complaint_emp_map
            where com_dept=?`,

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