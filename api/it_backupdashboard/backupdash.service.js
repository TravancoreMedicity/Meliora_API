const { pool } = require('../../config/database')
module.exports = {

    getDailyBackup: (id, callback) => {
        pool.query(
            ` SELECT  
                it_backup_time_details.time_slno,   
                it_backup_time_details.backup_slno,
                it_backup_details_mast.backup_type,
                it_backup_time_details.backup_name,
                backup_type_name,
                dept1.dept_name,
                backup_location, 
                backup_device_ip, 
                backup_device_name, 
                backup_device_location,
                transferred_device_ip, 
                transferred_device_name, 
                transferred_device_location,
                it_backup_schedule_type.schedule_type_name,
                it_backup_time_details.backup_schedule_time,
                it_backup_schedule_time.schedule_time_name
           FROM 
            it_backup_time_details
            LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_time_details.backup_slno
            LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_time_details.backup_schedule_type
            LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_time_details.backup_schedule_time
            LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type 
            LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location
            LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
            left join co_department_mast dept2 on dept2.dept_id=emp2.em_department
            WHERE 
            it_backup_time_details.backup_schedule_type=1
            AND status=1
            AND it_backup_details_mast.backup_active_status=1
            AND dept2.dept_id=?`,

            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getLastDayOfBackup: (callBack) => {
        pool.query(
            ` 
            select MAX(backup_daily_date) AS last_backup_date from it_backup_daily_details
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

    DailyAlreadyExist: (data, callBack) => {
        pool.query(
            `select backup_slno,time_slno from it_backup_daily_details where backup_daily_date=current_date()
             group by backup_slno,time_slno`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    backupDailyInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_backup_daily_details
               ( 
                time_slno,
                backup_slno,
                backup_daily_date,
                backup_schedule_time,
                verify_status,
                create_user
                )
            VALUES ?`,
            [
                data
            ],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDailyDetailsForVerification: (id, callback) => {
        pool.query(
            ` SELECT 
                  daily_slno,
                  dept2.dept_id,
                  it_backup_time_details.status as stat,
                  it_backup_daily_details.time_slno,
                  it_backup_daily_details.backup_slno,
                  backup_daily_date,
                  backup_type_name,
                  dept1.dept_name,
                  it_backup_details_mast.backup_type,
                  it_backup_details_mast.backup_name, 
                  backup_location, 
                  backup_device_ip, 
                  backup_device_name, 
                  backup_device_location,
                  transferred_device_ip, 
                  transferred_device_name, 
                  transferred_device_location,
                  it_backup_schedule_type.schedule_type_name,
                  it_backup_daily_details.backup_schedule_time,
                  it_backup_schedule_time.schedule_time_name,
                  backup_date_time,
                  backup_size_before,
                  backup_size_after,
                  emp1.em_name,
                  verify_status,
                  remarks                  
            FROM   
			   it_backup_daily_details
               LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_daily_details.backup_slno
               LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
               LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_daily_details.backup_schedule_time
               LEFT JOIN co_employee_master emp1 ON emp1.em_id = it_backup_daily_details.em_id
               LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type         
               LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location 
               LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
               left join co_department_mast dept2  on dept2.dept_id=emp2.em_department
               left join it_backup_time_details on it_backup_time_details.time_slno=it_backup_daily_details.time_slno
               where  dept2.dept_id=?
               AND it_backup_details_mast.backup_active_status=1
               and it_backup_time_details.status=1
               order by backup_daily_date desc`,

            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getDailyVerifiedDetails: (data, callBack) => {
        pool.query(
            `SELECT 
                  daily_slno,
                  dept1.dept_name,
                  backup_path,
                  backup_type_name,
                  it_backup_daily_details.time_slno,
                  it_backup_daily_details.backup_slno,
                  backup_daily_date,
                  it_backup_details_mast.backup_type,
                  it_backup_details_mast.backup_name, 
                  backup_location,                  
                  backup_device_ip, 
                  backup_device_name, 
                  backup_device_location,
                  transferred_device_ip, 
                  transferred_device_name, 
                  transferred_device_location,
                  it_backup_schedule_type.schedule_type_name,
                  it_backup_daily_details.backup_schedule_time,
                  it_backup_schedule_time.schedule_time_name,
                  backup_date_time,
                  backup_size_before,
                  backup_size_after,
                  emp1.em_name,
                  verify_status,
                  remarks
            FROM   
                it_backup_daily_details               
                LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_daily_details.backup_slno
                LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
                LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_daily_details.backup_schedule_time
                LEFT JOIN co_employee_master emp1 ON emp1.em_id=it_backup_daily_details.em_id
                LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
                LEFT JOIN co_department_mast dept2 on dept2.dept_id=emp2.em_department
                 LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
                  LEFT JOIN co_department_mast dept1 on dept1.dept_id=it_backup_details_mast.backup_location
                WHERE 
                dept2.dept_id=?
                and
                verify_status=1 and backup_daily_date between ? and ?`,

            [
                data.empdept,
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getMonthlyBackup: (id, callback) => {
        pool.query(
            ` SELECT  
                    it_backup_time_details.time_slno,   
                    it_backup_time_details.backup_slno,
                    it_backup_details_mast.backup_type,
                    it_backup_time_details.backup_name, 
                    backup_location,
                    backup_type_name,
                    dept1.dept_name,
                    backup_device_ip, 
                    backup_device_name, 
                    backup_device_location,
                    transferred_device_ip, 
                    transferred_device_name, 
                    transferred_device_location,
                    it_backup_schedule_type.schedule_type_name,
                    it_backup_time_details.backup_schedule_time,
                    it_backup_schedule_time.schedule_time_name
               FROM 
                it_backup_time_details
                LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_time_details.backup_slno
                LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_time_details.backup_schedule_type
                LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_time_details.backup_schedule_time
                LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
                LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location 
                LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
          left join co_department_mast dept2 on dept2.dept_id=emp2.em_department
               WHERE 
                   it_backup_time_details.backup_schedule_type=2
                    AND status=1
                    AND it_backup_details_mast.backup_active_status=1
                    AND dept2.dept_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    MonthlyAlreadyExist: (data, callBack) => {
        pool.query(
            `SELECT backup_slno, time_slno 
             FROM it_backup_monthly_details
             WHERE EXTRACT(YEAR_MONTH FROM backup_monthly_date) = EXTRACT(YEAR_MONTH FROM CURDATE())
             GROUP BY backup_slno, time_slno`,
            [],
            (err, results) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },


    backupMonthlyInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_backup_monthly_details
               ( 
                time_slno,
                backup_slno,
                backup_monthly_date,
                backup_schedule_time,
                verify_status,
                create_user
                )
            VALUES ?`,
            [
                data
            ],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getMonthlyDetailsForVerification: (id, callback) => {
        pool.query(
            `SELECT 
            monthly_slno,
            dept2.dept_id,
            it_backup_monthly_details.time_slno,
            it_backup_monthly_details.backup_slno,
            backup_monthly_date,
            it_backup_details_mast.backup_type,
            it_backup_details_mast.backup_name, 
            backup_location,
            backup_type_name,
            dept1.dept_name,
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_details_mast.backup_schedule_type,
            it_backup_schedule_type.schedule_type_name,
            it_backup_monthly_details.backup_schedule_time,
            it_backup_schedule_time.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            emp1.em_name,
            verify_status,
            remarks
      FROM   
        it_backup_monthly_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_monthly_details.backup_slno
         LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_monthly_details.backup_schedule_time
         LEFT JOIN co_employee_master emp1 ON emp1.em_id=it_backup_monthly_details.em_id
         LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
		 LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location 
         LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
         left join co_department_mast dept2  on dept2.dept_id=emp2.em_department
         left join it_backup_time_details on it_backup_time_details.time_slno=it_backup_monthly_details.time_slno
          where  dept2.dept_id=?
        AND it_backup_details_mast.backup_active_status=1
          AND it_backup_time_details.status=1
        order by backup_monthly_date desc
        `,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getMonthVerified: (data, callBack) => {
        pool.query(
            `SELECT 
            monthly_slno,
            dept1.dept_name,
            backup_path,
            backup_type_name,
            it_backup_monthly_details.time_slno,
            it_backup_monthly_details.backup_slno,
            backup_monthly_date,
            it_backup_details_mast.backup_type,
            it_backup_details_mast.backup_name, 
            backup_location, 
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_details_mast.backup_schedule_type,
            it_backup_schedule_type.schedule_type_name,
            it_backup_monthly_details.backup_schedule_time,
            it_backup_schedule_time.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            emp1.em_name,
            verify_status,
            remarks
      FROM   
            it_backup_monthly_details           
            LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_monthly_details.backup_slno
            LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
            LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_monthly_details.backup_schedule_time
            LEFT JOIN co_employee_master emp1 ON emp1.em_id=it_backup_monthly_details.em_id
            LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
            LEFT JOIN co_department_mast dept2 on dept2.dept_id=emp2.em_department
            LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
            LEFT JOIN co_department_mast dept1 on dept1.dept_id=it_backup_details_mast.backup_location
            WHERE 
            dept2.dept_id=?
            and
            verify_status=1 and backup_monthly_date between ? and ?`,

            [
                data.empdept,
                data.start_date,
                data.end_date

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getYearlyBackup: (id, callback) => {
        pool.query(
            `SELECT  
                it_backup_time_details.time_slno,   
                it_backup_time_details.backup_slno,
                it_backup_details_mast.backup_type,
                it_backup_time_details.backup_name, 
                backup_location,
                backup_type_name,
                dept1.dept_name,
                backup_device_ip, 
                backup_device_name, 
                backup_device_location,
                transferred_device_ip, 
                transferred_device_name, 
                transferred_device_location,
                it_backup_time_details.backup_schedule_type,
                it_backup_schedule_type.schedule_type_name,
                it_backup_time_details.backup_schedule_time,
                it_backup_schedule_time.schedule_time_name
           FROM 
               it_backup_time_details
            LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_time_details.backup_slno
            LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_time_details.backup_schedule_type
            LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_time_details.backup_schedule_time
            LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
            LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location 
            LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
            left join co_department_mast dept2 on dept2.dept_id=emp2.em_department
           WHERE 
               it_backup_time_details.backup_schedule_type=4
               AND status=1
               AND it_backup_details_mast.backup_active_status=1
               AND dept2.dept_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    YearAlreadyExist: (data, callBack) => {
        pool.query(
            `select 
                  backup_slno,
                  time_slno 
             from 
                 it_backup_yearly_details
             where 
                 EXTRACT(YEAR FROM backup_yearly_date) = EXTRACT(YEAR FROM CURDATE())
             group by backup_slno,time_slno`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    backupYearlyInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_backup_yearly_details
               ( 
                time_slno,
                backup_slno,
                backup_yearly_date,
                backup_schedule_time,
                verify_status,
                create_user
                )
            VALUES ?`,
            [
                data
            ],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getYearlyDetailsForVerification: (id, callback) => {
        pool.query(
            `SELECT 
                    yearly_slno,
                    dept2.dept_id,
                    it_backup_yearly_details.time_slno,
                    it_backup_yearly_details.backup_slno,
                    backup_yearly_date,
                    it_backup_details_mast.backup_type,
                    it_backup_details_mast.backup_name, 
                    backup_location,
                    backup_type_name,
                    dept1.dept_name,
                    backup_device_ip, 
                    backup_device_name, 
                    backup_device_location,
                    transferred_device_ip, 
                    transferred_device_name, 
                    transferred_device_location,
                    it_backup_details_mast.backup_schedule_type,
                    it_backup_schedule_type.schedule_type_name,
                    it_backup_yearly_details.backup_schedule_time,
                    it_backup_schedule_time.schedule_time_name,
                    backup_date_time,
                    backup_size_before,
                    backup_size_after,
                    emp1.em_name,
                    verify_status,
                    remarks
              FROM   
                    it_backup_yearly_details
                    LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_yearly_details.backup_slno
              LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
        LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_yearly_details.backup_schedule_time           
                    LEFT JOIN co_employee_master emp1 ON emp1.em_id=it_backup_yearly_details.em_id
                    LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
                    LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location 
                    LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
                    left join co_department_mast dept2  on dept2.dept_id=emp2.em_department
                        left join it_backup_time_details on it_backup_time_details.time_slno=it_backup_yearly_details.time_slno
                    where  dept2.dept_id=?        
                    AND it_backup_details_mast.backup_active_status=1
                    AND it_backup_time_details.status=1
                    order by backup_yearly_date desc
                    `,

            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getYearVerified: (data, callBack) => {
        pool.query(
            `SELECT 
            yearly_slno,
            backup_path,
            dept1.dept_name,
            backup_type_name,
            it_backup_yearly_details.time_slno,
            it_backup_yearly_details.backup_slno,
            backup_yearly_date,
            it_backup_details_mast.backup_type,
            it_backup_details_mast.backup_name, 
            backup_location, 
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_details_mast.backup_schedule_type,
            it_backup_schedule_type.schedule_type_name,
            it_backup_yearly_details.backup_schedule_time,
            it_backup_schedule_time.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            emp1.em_name,
            verify_status,
            remarks
      FROM   
            it_backup_yearly_details            
            LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_yearly_details.backup_slno
            LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
            LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_yearly_details.backup_schedule_time
            LEFT JOIN co_employee_master emp1 ON emp1.em_id=it_backup_yearly_details.em_id
            LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
            LEFT JOIN co_department_mast dept2 on dept2.dept_id=emp2.em_department
             LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
              LEFT JOIN co_department_mast dept1 on dept1.dept_id=it_backup_details_mast.backup_location
            WHERE 
            dept2.dept_id=?
            and
            verify_status=1 and backup_yearly_date between ? and ?`,

            [
                data.empdept,
                data.start_date,
                data.end_date

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getWeeklyBackup: (id, callback) => {
        pool.query(
            ` SELECT  
            it_backup_time_details.time_slno,   
            it_backup_time_details.backup_slno,
            it_backup_details_mast.backup_type,
            it_backup_time_details.backup_name, 
            backup_location,
            backup_type_name,
            dept1.dept_name,
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_time_details.backup_schedule_type,
            it_backup_schedule_type.schedule_type_name,
            it_backup_time_details.backup_schedule_time,
            it_backup_schedule_time.schedule_time_name
       FROM 
           it_backup_time_details
        LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_time_details.backup_slno
        LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_time_details.backup_schedule_type
        LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_time_details.backup_schedule_time
        LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
        LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location 
        LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
        left join co_department_mast dept2 on dept2.dept_id=emp2.em_department
       WHERE 
           it_backup_time_details.backup_schedule_type=3
           AND status=1
           AND it_backup_details_mast.backup_active_status
           AND dept2.dept_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    WeekAlreadyExist: (data, callBack) => {
        pool.query(
            `
        SELECT 
            backup_slno,
            time_slno
        FROM 
            it_backup_weekly_details
        WHERE 
           WEEK(backup_weekly_date) = WEEK(CURDATE())
          AND YEAR(backup_weekly_date) = YEAR(CURDATE())`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    backupWeeklyInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_backup_weekly_details
               ( 
                time_slno,
                backup_slno,
                backup_weekly_date,
                backup_schedule_time,
                verify_status,
                create_user
                )
            VALUES ?`,
            [
                data
            ],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getWeeklyDetails: (id, callback) => {
        pool.query(
            `   SELECT 
            weekly_slno,
            dept2.dept_id,
            it_backup_weekly_details.time_slno,
            it_backup_weekly_details.backup_slno,
            backup_weekly_date,
            it_backup_details_mast.backup_type,
            it_backup_details_mast.backup_name, 
            backup_location,
            backup_type_name,
            dept1.dept_name,
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_schedule_type.schedule_type_name,
            it_backup_weekly_details.backup_schedule_time,
            it_backup_schedule_time.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            emp1.em_name,
            verify_status,
            remarks
      FROM   
        it_backup_weekly_details
        LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_weekly_details.backup_slno
        LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
        LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_weekly_details.backup_schedule_time
        LEFT JOIN co_employee_master emp1 ON emp1.em_id=it_backup_weekly_details.em_id
        LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
        LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location                 
        LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
        left join co_department_mast dept2  on dept2.dept_id=emp2.em_department
         left join it_backup_time_details on it_backup_time_details.time_slno=it_backup_weekly_details.time_slno
        where  dept2.dept_id=?
         and it_backup_time_details.status=1
        AND it_backup_details_mast.backup_active_status=1`,

            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getWeeklyVerifiedDetails: (data, callBack) => {
        pool.query(
            `SELECT 
             weekly_slno,
             backup_path,
             dept1.dept_name,
             backup_type_name,
             it_backup_weekly_details.time_slno,
             it_backup_weekly_details.backup_slno,
            backup_weekly_date,
            it_backup_details_mast.backup_type,
            it_backup_details_mast.backup_name, 
            backup_location, 
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_schedule_type.schedule_type_name,
            it_backup_weekly_details.backup_schedule_time,
            it_backup_schedule_time.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            emp1.em_name,
            verify_status,
            remarks
      FROM   
           it_backup_weekly_details           
           LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_weekly_details.backup_slno
           LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
           LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_weekly_details.backup_schedule_time
           LEFT JOIN co_employee_master emp1 ON emp1.em_id=it_backup_weekly_details.em_id     
           LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
           LEFT JOIN co_department_mast dept2 on dept2.dept_id=emp2.em_department
           LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
           LEFT JOIN co_department_mast dept1 on dept1.dept_id=it_backup_details_mast.backup_location
           WHERE  
           dept2.dept_id=?
           and
           verify_status=1 
           and  backup_weekly_date between ? and ?`,

            [
                data.empdept,
                data.start_date,
                data.end_date

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getSelectedDaysBackup: (id, callback) => {
        pool.query(
            `  SELECT 
            days_slno,
    		it_backup_selecteddays_details.backup_slno,
            backup_type,
            backup_name, 
            backup_location,
            backup_type_name,
            dept1.dept_name,
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_details_mast.backup_schedule_type,
            it_backup_schedule_type.schedule_type_name,
            it_backup_selecteddays_details.selected_days,
            backup_selected_date,
            due_date,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            co_employee_master.em_name,
            remarks,
            verify_status
      FROM   
        it_backup_selecteddays_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_selecteddays_details.backup_slno
         LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_selecteddays_details.em_id
         LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
         LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location
         LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
         left join co_department_mast dept2  on dept2.dept_id=emp2.em_department
         where  dept2.dept_id=?
         AND it_backup_details_mast.backup_active_status=1       
          `,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    DaysAlreadyExist: (callBack) => {
        pool.query(
            `
        SELECT 
           backup_slno   
        FROM 
           it_backup_selecteddays_details`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    SelectedDaysInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_backup_selecteddays_details
               ( 
                backup_slno,
                selected_days,
                backup_selected_date,
                due_date,
                verify_status,
                create_user
                )
            VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getSelectedDays: (id, callback) => {
        pool.query(
            `
            SELECT
            backup_slno,
    	    selected_days,
            backup_type_name,
            dept1.dept_name,
            it_backup_details_mast.create_user
      FROM  
            it_backup_details_mast
          LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
          LEFT JOIN co_department_mast dept1 ON dept1.dept_id=it_backup_details_mast.backup_location   
          LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
          left join co_department_mast dept2 on dept2.dept_id=emp2.em_department
      WHERE 
            backup_schedule_type=5
            AND
            it_backup_details_mast.backup_active_status=1
            AND
            dept2.dept_id=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getSelectedDaysVerified: (data, callBack) => {
        pool.query(
            ` SELECT 
            days_slno,
            backup_path,
            dept1.dept_name,
			it_backup_selecteddays_details.backup_slno,
            backup_type,
            backup_type_name,
            backup_name, 
            backup_location, 
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_details_mast.backup_schedule_type,
            it_backup_schedule_type.schedule_type_name,
            it_backup_selecteddays_details.selected_days,
            backup_selected_date,
            due_date,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            emp1.em_name,
            remarks,
            verify_status
      FROM  
      
      it_backup_selecteddays_details
      LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_selecteddays_details.backup_slno
      LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
      LEFT JOIN co_employee_master emp1 ON emp1.em_id=it_backup_selecteddays_details.em_id
      LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
      LEFT JOIN co_department_mast dept2 on dept2.dept_id=emp2.em_department
       LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
       LEFT JOIN co_department_mast dept1 on dept1.dept_id=it_backup_details_mast.backup_location
      WHERE 
      dept2.dept_id=?
      and
      verify_status=1 and backup_selected_date between ? and ?`,

            [
                data.empdept,
                data.start_date,
                data.end_date

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