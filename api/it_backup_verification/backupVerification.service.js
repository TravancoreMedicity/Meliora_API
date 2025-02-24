const { pool } = require('../../config/database')
module.exports = {
    getVerificationDetails: (callBack) => {
        pool.query(
            ` 
        SELECT 
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
            it_backup_schedule_type.schedule_type_name,
            it_backup_daily_details.backup_schedule_time,
            it_backup_schedule_time.schedule_time_name,
            backup_date_time,
            backup_size_before,
            backup_size_after,
            co_employee_master.em_name,
            verify_status,
            remarks
      FROM   
            it_backup_daily_details
         LEFT JOIN it_backup_details_mast ON it_backup_details_mast.backup_slno=it_backup_daily_details.backup_slno
         LEFT JOIN it_backup_schedule_type ON it_backup_schedule_type.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_backup_schedule_time ON it_backup_schedule_time.schedule_time_id=it_backup_daily_details.backup_schedule_time
         LEFT JOIN co_employee_master ON co_employee_master.em_id=it_backup_daily_details.em_id
    WHERE 
          verify_status=1
            `, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    // getBackupEmployee: (callBack) => {
    //     pool.query(
    //         ` SELECT em_id,em_name FROM co_employee_master WHERE em_department=1 and em_status=1`, [],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },

    getBackupEmployee: (id, callback) => {
        pool.query(
            ` SELECT em_id,em_name FROM co_employee_master WHERE em_department=? and em_status=1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    verificationUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 it_backup_daily_details
             SET  
                  backup_date_time=?,
                  backup_size_before=?,
                  backup_size_after=?, 
                  em_id=?,
                  verify_status=?, 
                  remarks=?, 
                  edit_user=?                
            WHERE 
                 daily_slno=?`,
            [
                data.backup_date_time,
                data.backup_size_before,
                data.backup_size_after,
                data.em_id,
                data.verify_status,
                data.remarks,
                data.edit_user,
                data.daily_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    monthlyVerificationUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 it_backup_monthly_details
             SET  
                  backup_date_time=?,
                  backup_size_before=?,
                  backup_size_after=?, 
                  em_id=?,
                  verify_status=?, 
                  remarks=?, 
                  edit_user=?                
            WHERE 
                  monthly_slno=?`,
            [
                data.backup_date_time,
                data.backup_size_before,
                data.backup_size_after,
                data.em_id,
                data.verify_status,
                data.remarks,
                data.edit_user,
                data.monthly_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    yearlyVerificationUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 it_backup_yearly_details
             SET  
                  backup_date_time=?,
                  backup_size_before=?,
                  backup_size_after=?, 
                  em_id=?,
                  verify_status=?, 
                  remarks=?, 
                  edit_user=?                
            WHERE 
                  yearly_slno=?`,
            [
                data.backup_date_time,
                data.backup_size_before,
                data.backup_size_after,
                data.em_id,
                data.verify_status,
                data.remarks,
                data.edit_user,
                data.yearly_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    WeeklyVerificationUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                 it_backup_weekly_details
             SET  
                  backup_date_time=?,
                  backup_size_before=?,
                  backup_size_after=?, 
                  em_id=?,
                  verify_status=?, 
                  remarks=?, 
                  edit_user=?                
            WHERE 
                weekly_slno=?`,
            [
                data.backup_date_time,
                data.backup_size_before,
                data.backup_size_after,
                data.em_id,
                data.verify_status,
                data.remarks,
                data.edit_user,
                data.weekly_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    DaysVerificationUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                  it_backup_selecteddays_details
             SET  
                  backup_date_time=?,
                  backup_size_before=?,
                  backup_size_after=?, 
                  em_id=?,
                  remarks=?, 
                  verify_status=?, 
                  edit_user=?                
            WHERE 
                days_slno=?`,
            [
                data.backup_date_time,
                data.backup_size_before,
                data.backup_size_after,
                data.em_id,
                data.remarks,
                data.verify_status,
                data.edit_user,
                data.days_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
}