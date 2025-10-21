const { pool } = require("../../config/database");
const logger = require("../../logger/logger");

module.exports = {
  insertUser: (data, callBack) => {
    pool.query(
      `INSERT INTO user(
                name,
                mobile,
                email,
                login_type,
                password,
                password_validity,
                password_validity_expiry_date,
                user_status,
                sign_in_per_day_limit,
                is_limited_user,
                login_method_allowed,
                created_user,
                last_passwd_change_date
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.name,
        data.mobile,
        data.email,
        data.login_Type,
        data.password,
        data.password_Validity,
        data.password_validity_expiry_date,
        data.user_Status,
        data.signIn_Limit,
        data.setOndayLogin,
        data.loginMethod,
        data.created_by,
        data.lastPasswordChangeDate,
      ],
      (error, results, fields) => {
        logger.error(error);
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  editUser: (data, callBack) => {
    pool.query(
      `UPDATE user 
                SET name = ?,
                    mobile = ?,
                    email = ?,
                    login_type = ?,
                    password = ?,
                    password_validity = ?,
                    user_status = ?,
                    last_passwd_change_date = ?,
                    last_login_date = ?,
                    login_location = ?
                WHERE user_slno = ?`,
      [
        data.name,
        data.mobile,
        data.email,
        data.login_Type,
        data.password,
        data.password_Validity,
        data.user_Status,
        data.passDateChange,
        data.lastLoginDate,
        data.loginLocation,
        data.userSlno,
      ],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (id, callBack) => {
    pool.query(
      `UPDATE user SET user_status = 0 WHERE user_slno = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUser: (id, callBack) => {
    pool.query(
      "SELECT * FROM user WHERE user_slno = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllUser: (callBack) => {
    pool.query("SELECT * FROM user", (error, results, fields) => {
      if (error) {
        logger.error(error);
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  insertRefreshToken: (data, callBack) => {
    pool.query(
      `UPDATE user 
                SET token = ? ,
                sessionid = ? 
                WHERE user_slno = ? `,
      [data.refresh_token, data.user_slno, data.user_slno],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRefershToken: async (id, callBack) => {
    // `SELECT token,sessionid FROM co_employee  WHERE   empdtl_slno = 51846 `
    pool.query(
      `SELECT token, sessionid FROM co_employee  WHERE   empdtl_slno = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteRefreshToken: (id, callBack) => {
    // `UPDATE co_employee SET token = null, sessionid = null WHERE user_slno = ?`,
    pool.query(
      `UPDATE co_employee SET token = null, sessionid = null  WHERE   empdtl_slno = ? `,
      [id],
      (error, results, fields) => {
        if (error) {
          // logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  validateUserCredExcistOrNot: (data, callBack) => {
    pool.query(
      `SELECT 
                user_slno
            FROM user 
            WHERE mobile = ? || email = ? || name = ?`,
      [data.mobile, data.email, data.name],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  userBasedValidationCheck: (data, callBack) => {
    pool.query(
      `SELECT 
            emp.em_name,
            emp_username,
            emp_password,
            desg_name,
            emp.app_token,
            emp.em_department,
            emp.em_id,
            co_employee.emp_no,
            co_employee.empdtl_slno,
            emp.em_dept_section,
            sec_name,dept_name,
            current_timestamp() as login,
            emp.supervisor ,
            sec_incharge.em_name as section_incharge_name,
			      sec_incharge.em_id as section_incharge_id,
            sec_hod.em_name as section_hod_name,
             sec_hod.em_id as section_hod_id            
            FROM co_employee
            LEFT JOIN co_employee_master emp 
                ON emp.em_no = co_employee.emp_no
            LEFT JOIN co_department_mast dept 
                ON dept.dept_id = emp.em_department
            LEFT JOIN co_deptsec_mast sec 
                ON sec.sec_id = emp.em_dept_section
            LEFT JOIN co_designation desg 
                ON desg.desg_slno = emp.em_designation
            LEFT JOIN co_authorization dept_sec_incharge 
                ON dept_sec_incharge.dept_section = emp.em_dept_section 
                AND dept_sec_incharge.auth_status = 1 
                AND dept_sec_incharge.auth_post = 1
            LEFT JOIN co_authorization dept_sec_hod 
                ON dept_sec_hod.dept_section = emp.em_dept_section 
                AND dept_sec_hod.auth_status = 1 
                AND dept_sec_hod.auth_post = 2
            LEFT JOIN co_employee_master sec_incharge 
                ON sec_incharge.em_id = dept_sec_incharge.emp_id
            LEFT JOIN co_employee_master sec_hod 
                ON sec_hod.em_id = dept_sec_hod.emp_id
            WHERE emp_username = ?
            AND emp_status = '1'`,
      [data.userName],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  userBasedInsertRefreshToken: (data, callBack) => {
    // `UPDATE user
    // SET token = ? ,
    // sessionid = ? ,
    // WHERE user_slno = ? `,
    pool.query(
      ` UPDATE co_employee 
            SET token = ? ,
            sessionid = ? 
            WHERE  empdtl_slno = ?`,
      [data.refresh_token, data.empdtl_slno, data.empdtl_slno],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  // userBasedInsertEliderToken: (data, callBack) => {
  //   pool.query(
  //     `INSERT INTO co_token( Elider_token,Elider_Id)  VALUES(?,?)`,
  //     [data.Elider_token, data.Elider_Id],
  //     (error, results, fields) => {
  //       console.log(error);

  //       if (error) {

  //         return callBack(error);
  //       }
  //       return callBack(null, results);
  //     }
  //   );
  // },
  userBasedInsertEliderToken: (data, callBack) => {
    pool.query(
      `SELECT * FROM co_token WHERE token_slno = 1`,
      [],
      (err, results) => {
        if (err) {
          return callBack(err);
        }

        if (results.length > 0) {
          // Record exists, perform update
          pool.query(
            `UPDATE co_token SET Elider_token = ?,Elider_Id =? WHERE token_slno = 1`,
            [data.Elider_token, data.Elider_Id],
            (updateErr, updateResults) => {
              if (updateErr) {
                return callBack(updateErr);
              }
              return callBack(null, updateResults);
            }
          );
        } else {
          // Record doesn't exist, perform insert
          pool.query(
            `INSERT INTO co_token (Elider_token, Elider_Id) VALUES (?, ?)`,
            [data.Elider_token, data.Elider_Id],
            (insertErr, insertResults) => {
              if (insertErr) {
                return callBack(insertErr);
              }
              return callBack(null, insertResults);
            }
          );
        }
      }
    );
  },
  getelidertoken: (callBack) => {
    pool.query(
      "SELECT Elider_token FROM co_token ",
      [],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  userBasedInsertKMCToken: (data, callBack) => {
    pool.query(
      `SELECT * FROM co_token WHERE token_slno = 2`,
      [],
      (err, results) => {
        if (err) {
          return callBack(err);
        }

        if (results.length > 0) {
          // Record exists, perform update
          pool.query(
            `UPDATE co_token SET Kmc_token = ? WHERE token_slno = 2`,
            [data.KMC_token],
            (updateErr, updateResults) => {
              if (updateErr) {
                return callBack(updateErr);
              }
              return callBack(null, updateResults);
            }
          );
        } else {
          // Record doesn't exist, perform insert
          pool.query(
            `INSERT INTO co_token (Kmc_token) VALUES (?)`,
            [data.KMC_token],
            (insertErr, insertResults) => {
              if (insertErr) {
                return callBack(insertErr);
              }
              return callBack(null, insertResults);
            }
          );
        }
      }
    );
  },

  getKmctoken: (callBack) => {
    pool.query(
      "SELECT Kmc_token FROM co_token where token_slno =2",
      [],
      (error, results, fields) => {
        if (error) {
          // logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
