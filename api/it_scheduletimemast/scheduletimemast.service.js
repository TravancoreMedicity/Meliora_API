const { pool } = require('../../config/database')
module.exports = {
    scheduleTimeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_schedule_time_mast
          ( 
            schedule_time_name,
            schedule_time_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.schedule_time_name,
                data.schedule_time_status,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getScheduleTime: (callBack) => {
        pool.query(
            `SELECT 
                   schedule_time_id, 
                   schedule_time_name,
                   if(schedule_time_status=1,'Yes','No') status
              FROM
                  it_schedule_time_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    ScheduleTimeUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_schedule_time_mast 
             SET 
                schedule_time_name=?,
                schedule_time_status=?,
                edit_user=?
            WHERE 
                schedule_time_id=?`,
            [
                data.schedule_time_name,
                data.schedule_time_status,
                data.edit_user,
                data.schedule_time_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    DropDownViewTime: (callback) => {
        pool.query(
            `SELECT 
                 schedule_time_id,
                 schedule_time_name
            FROM
                 it_schedule_time_mast
            WHERE 
                 schedule_time_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}
