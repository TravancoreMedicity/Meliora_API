const { pool } = require('../../config/database')

module.exports = {
    backupDetailsInsert: (data, callBack) => {

        pool.query(
            `INSERT INTO it_backup_details_mast
               ( 
                backup_type,
                backup_name,
                backup_location,
                backup_device_ip,
                backup_device_name, 
                backup_device_location,
                transferred_device_ip, 
                transferred_device_name, 
                transferred_device_location, 
                backup_schedule_type, 
                backup_schedule_time,
                selected_days,
                create_user,
                backup_active_status
               )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.backup_type,
                data.backup_name,
                data.backup_location,
                data.backup_device_ip,
                data.backup_device_name,
                data.backup_device_location,
                data.transferred_device_ip,
                data.transferred_device_name,
                data.transferred_device_location,
                data.backup_schedule_type,
                JSON.stringify(data.backup_schedule_time),
                data.selected_days,
                data.create_user,
                data.backup_active_status
            ],

            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getBackupDetails: (callBack) => {
        pool.query(
            `SELECT 
            it_backup_details_mast.backup_slno,
            backup_active_status,
            co_department_mast.dept_name as backup_dept,
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
            backup_schedule_type,
            it_backup_schedule_type.schedule_type_name,
            backup_schedule_time,
            GROUP_CONCAT(schedule_time_name) as timedata,
            it_backup_details_mast.selected_days,
            it_backup_selecteddays_details.backup_selected_date
        FROM
            it_backup_details_mast
            LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
            LEFT JOIN it_backup_schedule_time ON JSON_CONTAINS(it_backup_details_mast.backup_schedule_time,cast(it_backup_schedule_time.schedule_time_id as json),'$') 
            LEFT JOIN it_backup_selecteddays_details ON it_backup_selecteddays_details.backup_slno=it_backup_details_mast.backup_slno
            LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
            left join co_department_mast on co_department_mast.dept_id=it_backup_details_mast.backup_location
        GROUP BY backup_slno            
            `, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);

            }
        );
    },

    backupTypeUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_backup_details_mast 
             SET 
                backup_type=?,
                backup_name=?,
                backup_location=?,
                backup_device_ip=?,
                backup_device_name=?,
                backup_device_location=?,
                transferred_device_ip=?,
                transferred_device_name=?, 
                transferred_device_location=?, 
                backup_schedule_type=?, 
                backup_schedule_time=?,
                selected_days=?,
                edit_user=?,
                backup_active_status=?
            WHERE 
               backup_slno=?`,
            [
                data.backup_type,
                data.backup_name,
                data.backup_location,
                data.backup_device_ip,
                data.backup_device_name,
                data.backup_device_location,
                data.transferred_device_ip,
                data.transferred_device_name,
                data.transferred_device_location,
                data.backup_schedule_type,
                JSON.stringify(data.backup_schedule_time),
                data.selected_days,
                data.edit_user,
                data.backup_active_status,
                data.backup_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    scheduleTimeInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO it_backup_time_details
               ( 
                backup_slno, 
                backup_name,
                backup_schedule_type,
                backup_schedule_time, 
                status,
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

    ScheduleTimeInactive: (data, callback) => {
        pool.query(
            `UPDATE it_backup_time_details
            SET 
            status = ?,
            edit_user=?                                                        
            WHERE backup_slno = ? `,
            [
                data.status,
                data.edit_user,
                data.backup_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
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
            VALUES (?,?,?,?,?,?)`,
            [
                data.backup_slno,
                data.selected_days,
                data.backup_selected_date,
                data.due_date,
                data.verify_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    SelectedDaysUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                it_backup_selecteddays_details 
             SET 
                 selected_days=?,
                 due_date=?,
                 edit_user=?
            WHERE 
                backup_slno=? and verify_status=0`,
            [
                data.selected_days,
                data.due_date,
                data.edit_user,
                data.backup_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
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

    DailyDetailsDelete: (data, callBack) => {
        pool.query(

            `DELETE FROM it_backup_daily_details WHERE backup_daily_date=current_date() and backup_slno=?`,
            [
                data.backup_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    MonthlyDetailsDelete: (data, callBack) => {
        pool.query(

            `DELETE FROM it_backup_monthly_details WHERE backup_slno=? and 
            EXTRACT(YEAR_MONTH FROM backup_monthly_date) = EXTRACT(YEAR_MONTH FROM CURDATE())`,
            [
                data.backup_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    WeekDetailsDelete: (data, callBack) => {
        pool.query(

            `DELETE FROM it_backup_weekly_details WHERE backup_slno=? and WEEK(backup_weekly_date) = WEEK(CURDATE())
            AND YEAR(backup_weekly_date) = YEAR(CURDATE())`,
            [
                data.backup_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    YearDetailsDelete: (data, callBack) => {
        pool.query(

            `DELETE FROM it_backup_yearly_details WHERE backup_slno=? and 
            EXTRACT(YEAR FROM backup_yearly_date) = EXTRACT(YEAR FROM CURDATE())`,
            [
                data.backup_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    SelectedDaysDelete: (data, callBack) => {
        pool.query(

            `DELETE FROM it_backup_selecteddays_details WHERE backup_slno=? and verify_status=0`,
            [
                data.backup_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getDeptwiseBackup: (id, callback) => {
        pool.query(
            `SELECT 
            it_backup_details_mast.backup_slno,            
            backup_active_status,
            dept1.dept_name as backup_dept,
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
            backup_schedule_type,
            it_backup_schedule_type.schedule_type_name,
            backup_schedule_time,
            GROUP_CONCAT(schedule_time_name) as timedata,
            it_backup_details_mast.selected_days,
            it_backup_selecteddays_details.backup_selected_date
        FROM
            it_backup_details_mast
            LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
            LEFT JOIN it_backup_schedule_time ON JSON_CONTAINS(it_backup_details_mast.backup_schedule_time,cast(it_backup_schedule_time.schedule_time_id as json),'$') 
            LEFT JOIN it_backup_selecteddays_details ON it_backup_selecteddays_details.backup_slno=it_backup_details_mast.backup_slno
            LEFT JOIN it_backup_type_mast ON it_backup_type_mast.backup_type_id=it_backup_details_mast.backup_type
            left join co_department_mast dept1 on dept1.dept_id=it_backup_details_mast.backup_location
            LEFT JOIN co_employee_master emp2 ON emp2.em_id = it_backup_details_mast.create_user
            left join co_department_mast dept2 on dept2.dept_id=emp2.em_department
            where  dept2.dept_id=?
            GROUP BY backup_slno
            order by backup_active_status desc
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

}

