const { pool } = require('../../config/database')
module.exports = {
    getDailyBackup: (callBack) => {
        pool.query(
            ` 
            SELECT  
                it_backup_time_details.time_slno,   
                it_backup_time_details.backup_slno,
                it_backup_details_mast.backup_type,
                it_backup_time_details.backup_name, 
                backup_location, 
                backup_device_ip, 
                backup_device_name, 
                backup_device_location,
                transferred_device_ip, 
                transferred_device_name, 
                transferred_device_location,
                it_schedule_type_mast.schedule_type_name,
                it_backup_time_details.backup_schedule_time,
                it_schedule_time_mast.schedule_time_name
           FROM 
               it_backup_time_details
            LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_time_details.backup_slno
            LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_time_details.backup_schedule_type
            LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_time_details.backup_schedule_time
           WHERE 
               it_backup_time_details.backup_schedule_type=1 AND status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
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

    getDailyDetailsForVerification: (callBack) => {
        pool.query(
            `SELECT 
                  daily_slno,
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
                  it_schedule_type_mast.schedule_type_name,
                  it_backup_daily_details.backup_schedule_time,
                  it_schedule_time_mast.schedule_time_name,
                  backup_date_time,
                  backup_size_before,
                  backup_size_after,
                  co_employee_master.em_name,
                  verify_status,
                  remarks
            FROM   
                  it_backup_daily_details
               LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_daily_details.backup_slno
               LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
               LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_daily_details.backup_schedule_time
               LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_daily_details.em_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDailyVerifiedDetails: (callBack) => {
        pool.query(
            `SELECT 
                  daily_slno,
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
                  it_schedule_type_mast.schedule_type_name,
                  it_backup_daily_details.backup_schedule_time,
                  it_schedule_time_mast.schedule_time_name,
                  backup_date_time,
                  backup_size_before,
                  backup_size_after,
                  co_employee_master.em_name,
                  verify_status,
                  remarks
            FROM   
                  it_backup_daily_details
               LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_daily_details.backup_slno
               LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
               LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_daily_details.backup_schedule_time
               LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_daily_details.em_id
            WHERE 
                  verify_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getMonthlyBackup: (callBack) => {
        pool.query(
            ` 
               SELECT  
                    it_backup_time_details.time_slno,   
                    it_backup_time_details.backup_slno,
                    it_backup_details_mast.backup_type,
                    it_backup_time_details.backup_name, 
                    backup_location, 
                    backup_device_ip, 
                    backup_device_name, 
                    backup_device_location,
                    transferred_device_ip, 
                    transferred_device_name, 
                    transferred_device_location,
                    it_schedule_type_mast.schedule_type_name,
                    it_backup_time_details.backup_schedule_time,
                    it_schedule_time_mast.schedule_time_name
               FROM 
                   it_backup_time_details
                LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_time_details.backup_slno
                LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_time_details.backup_schedule_type
                LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_time_details.backup_schedule_time
               WHERE 
                   it_backup_time_details.backup_schedule_type=2 AND status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    MonthlyAlreadyExist: (data, callBack) => {
        pool.query(
            `select 
                  backup_slno,
                  time_slno 
             from 
                 it_backup_monthly_details
             where 
                  EXTRACT(YEAR_MONTH FROM backup_monthly_date) = EXTRACT(YEAR_MONTH FROM CURDATE())
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

    getMonthlyDetailsForVerification: (callBack) => {
        pool.query(
            `
        SELECT 
            monthly_slno,
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
            it_schedule_type_mast.schedule_type_name,
            it_backup_monthly_details.backup_schedule_time,
            it_schedule_time_mast.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            co_employee_master.em_name,
            verify_status,
            remarks
      FROM   
            it_backup_monthly_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_monthly_details.backup_slno
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_monthly_details.backup_schedule_time
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_monthly_details.em_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getMonthVerified: (callBack) => {
        pool.query(
            `
        SELECT 
            monthly_slno,
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
            it_schedule_type_mast.schedule_type_name,
            it_backup_monthly_details.backup_schedule_time,
            it_schedule_time_mast.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            co_employee_master.em_name,
            verify_status,
            remarks
      FROM   
            it_backup_monthly_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_monthly_details.backup_slno
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_monthly_details.backup_schedule_time
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_monthly_details.em_id
      WHERE 
         verify_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // Year
    getYearlyBackup: (callBack) => {
        pool.query(
            ` 
            SELECT  
                it_backup_time_details.time_slno,   
                it_backup_time_details.backup_slno,
                it_backup_details_mast.backup_type,
                it_backup_time_details.backup_name, 
                backup_location, 
                backup_device_ip, 
                backup_device_name, 
                backup_device_location,
                transferred_device_ip, 
                transferred_device_name, 
                transferred_device_location,
                it_backup_time_details.backup_schedule_type,
                it_schedule_type_mast.schedule_type_name,
                it_backup_time_details.backup_schedule_time,
                it_schedule_time_mast.schedule_time_name
           FROM 
               it_backup_time_details
            LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_time_details.backup_slno
            LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_time_details.backup_schedule_type
            LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_time_details.backup_schedule_time
           WHERE 
               it_backup_time_details.backup_schedule_type=4 AND status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
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

    getYearlyDetailsForVerification: (callBack) => {
        pool.query(
            `
        SELECT 
            yearly_slno,
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
            it_schedule_type_mast.schedule_type_name,
            it_backup_yearly_details.backup_schedule_time,
            it_schedule_time_mast.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            co_employee_master.em_name,
            verify_status,
            remarks
      FROM   
            it_backup_yearly_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_yearly_details.backup_slno
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_yearly_details.backup_schedule_time
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_yearly_details.em_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getYearVerified: (callBack) => {
        pool.query(
            `
        SELECT 
            yearly_slno,
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
            it_schedule_type_mast.schedule_type_name,
            it_backup_yearly_details.backup_schedule_time,
            it_schedule_time_mast.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            co_employee_master.em_name,
            verify_status,
            remarks
      FROM   
            it_backup_yearly_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_yearly_details.backup_slno
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_yearly_details.backup_schedule_time
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_yearly_details.em_id
      WHERE 
           verify_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getWeeklyBackup: (callBack) => {
        pool.query(
            ` 
            SELECT  
            it_backup_time_details.time_slno,   
            it_backup_time_details.backup_slno,
            it_backup_details_mast.backup_type,
            it_backup_time_details.backup_name, 
            backup_location, 
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_time_details.backup_schedule_type,
            it_schedule_type_mast.schedule_type_name,
            it_backup_time_details.backup_schedule_time,
            it_schedule_time_mast.schedule_time_name
       FROM 
           it_backup_time_details
        LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_time_details.backup_slno
        LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_time_details.backup_schedule_type
        LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_time_details.backup_schedule_time
       WHERE 
           it_backup_time_details.backup_schedule_type=3 AND status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
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

    getWeeklyDetails: (callBack) => {
        pool.query(
            `
        SELECT 
             weekly_slno,
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
            it_schedule_type_mast.schedule_type_name,
            it_backup_weekly_details.backup_schedule_time,
            it_schedule_time_mast.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            co_employee_master.em_name,
            verify_status,
            remarks
      FROM   
           it_backup_weekly_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_weekly_details.backup_slno
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_weekly_details.backup_schedule_time
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_weekly_details.em_id`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getWeeklyVerifiedDetails: (callBack) => {
        pool.query(
            `
        SELECT 
             weekly_slno,
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
            it_schedule_type_mast.schedule_type_name,
            it_backup_weekly_details.backup_schedule_time,
            it_schedule_time_mast.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            co_employee_master.em_name,
            verify_status,
            remarks
      FROM   
           it_backup_weekly_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_weekly_details.backup_slno
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_schedule_time_mast ON it_schedule_time_mast.schedule_time_id=it_backup_weekly_details.backup_schedule_time
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_weekly_details.em_id
      WHERE  verify_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getSelectedDaysBackup: (callBack) => {
        pool.query(
            ` 
      SELECT 
            days_slno,
			it_backup_selecteddays_details.backup_slno,
            backup_type,
            backup_name, 
            backup_location, 
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_details_mast.backup_schedule_type,
            it_schedule_type_mast.schedule_type_name,
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
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_selecteddays_details.em_id `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
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

    getSelectedDays: (callBack) => {
        pool.query(
            ` 
      SELECT 
            backup_slno,
		    selected_days,
            create_user
      FROM  
            it_backup_details_mast
      WHERE 
            backup_schedule_type=5`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getSelectedDaysVerified: (callBack) => {
        pool.query(
            ` 
      SELECT 
            days_slno,
			it_backup_selecteddays_details.backup_slno,
            backup_type,
            backup_name, 
            backup_location, 
            backup_device_ip, 
            backup_device_name, 
            backup_device_location,
            transferred_device_ip, 
            transferred_device_name, 
            transferred_device_location,
            it_backup_details_mast.backup_schedule_type,
            it_schedule_type_mast.schedule_type_name,
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
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_selecteddays_details.em_id
      WHERE  
           verify_status=1 `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}