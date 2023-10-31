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
                create_user
               )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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

    getBackupDetails: (callBack) => {
        pool.query(
            ` 
      SELECT 
            it_backup_details_mast.backup_slno, 
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
            it_schedule_type_mast.schedule_type_name,
            backup_schedule_time,
            GROUP_CONCAT(schedule_time_name) as timedata,
            it_backup_details_mast.selected_days,
            it_backup_selecteddays_details.backup_selected_date
      FROM
            it_backup_details_mast
         LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
         LEFT JOIN it_schedule_time_mast ON JSON_CONTAINS(it_backup_details_mast.backup_schedule_time,cast(it_schedule_time_mast.schedule_time_id as json),'$') 
         LEFT JOIN it_backup_selecteddays_details ON it_backup_selecteddays_details.backup_slno=it_backup_details_mast.backup_slno
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
                edit_user=?
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

    // ScheduleAlreadyExist: (id, callback) => {
    //     pool.query(
    //         `SELECT 
    //                backup_slno, 
    //                backup_name, 
    //                backup_schedule_type, 
    //                backup_schedule_time, 
    //                status, 
    //                create_user
    //             FROM it_backup_time_details
    //          WHERE 
    //             backup_slno=?`,
    //         [id],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     )
    // },

    // ScheduleTimeDetailUpdate: (data, callback) => {
    //     pool.query(
    //         `UPDATE it_backup_time_details 
    //          SET 
    //             backup_name=?,
    //             backup_schedule_type=?
    //             backup_schedule_time=?,
    //             edit_user=?
    //         WHERE 
    //             backup_slno=?`,
    //         [
    //             data
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     )
    // },




    // ScheduleTimeDetailUpdate: (body) => {
    //     return Promise.all(body.map((val) => {
    //         return new Promise((resolve, reject) => {
    //           
    //             pool.query(
    //                 `UPDATE it_backup_time_details 
    //                 SET 
    //                    backup_name=?,
    //                    backup_name=?
    //                    backup_schedule_time=?,
    //                    status=1,
    //                    edit_user=?
    //                WHERE 
    //                    backup_slno=?`,
    //                 [
    //                     val.backup_name,
    //                     val.backup_name,
    //                     val.backup_schedule_time,
    //                     val.edit_user,
    //                     val.backup_slno
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         return reject(error)
    //                     }
    //                     return resolve(results)
    //                 }
    //             )


    //         })
    //     })
    //     )
    // },


    // getBackupDetails: (callBack) => {
    //     pool.query(
    //         ` SELECT 
    //                 backup_slno, 
    //                 backup_type, 
    //                 backup_name, 
    //                 backup_location, 
    //                 backup_device_ip, 
    //                 backup_device_name, 
    //                 backup_device_location, 
    //                 F.location_name as from_location,
    //                 T.location_name as to_location,
    //                 transferred_device_ip, 
    //                 transferred_device_name, 
    //                 transferred_device_location,
    //                 backup_schedule_type,
    //                 it_schedule_type_mast.schedule_type_name,
    //                 backup_schedule_time,
    //                 GROUP_CONCAT(schedule_time_name) as timedata
    //           FROM
    //                 it_backup_details_mast       
    //           LEFT JOIN it_schedule_type_mast ON it_schedule_type_mast.schedule_type_id=it_backup_details_mast.backup_schedule_type
    //           LEFT JOIN it_physical_loc_mast  F ON F.location_id=it_backup_details_mast.backup_device_location
    //           LEFT JOIN it_physical_loc_mast T ON T.location_id=it_backup_details_mast.transferred_device_location
    //           LEFT JOIN it_schedule_time_mast ON JSON_CONTAINS(it_backup_details_mast.backup_schedule_time,cast(it_schedule_time_mast.schedule_time_id as json),'$') 
    //           GROUP BY backup_slno
    //         `, [],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);

    //         }
    //     );
    // },

}
