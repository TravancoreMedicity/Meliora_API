const { pool } = require('../../config/database')

module.exports = {     

     getValidateAuthentication: (id, callback) => {
        pool.query(
            `SELECT 
            co_employee_master.em_name,
            emp_username,
            emp_password,
            desg_name,
            app_token,
            co_employee_master.em_department,
            co_employee_master.em_id,
            co_employee.emp_no,
            co_employee_master.em_dept_section,
            sec_name,dept_name,
            current_timestamp() as login,
            co_employee_master.supervisor
         FROM co_employee
            LEFT JOIN co_employee_master ON co_employee_master.em_no=co_employee.emp_no
            LEFT JOIN co_department_mast ON co_department_mast.dept_id=co_employee_master.em_department
            LEFT JOIN co_deptsec_mast ON co_deptsec_mast.sec_id=co_employee_master.em_dept_section
             LEFT JOIN co_designation ON co_designation.desg_slno=co_employee_master.em_designation
             WHERE co_employee_master.em_id =?  AND emp_status = 1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}