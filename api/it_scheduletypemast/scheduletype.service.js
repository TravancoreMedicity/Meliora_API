const { pool } = require('../../config/database')
module.exports = {
    scheduleTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_schedule_type_mast
          ( 
            schedule_type_name, 
            schedule_type_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.schedule_type_name,
                data.schedule_type_status,
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
    getScheduleType: (callBack) => {
        pool.query(
            `SELECT 
                   schedule_type_id, 
                   schedule_type_name,
                   if(schedule_type_status=1,'Yes','No') status
              FROM
                  it_schedule_type_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    ScheduleTypeUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_schedule_type_mast 
            SET 
               schedule_type_name=?,
               schedule_type_status=?,
               edit_user=?
            WHERE 
               schedule_type_id=?`,
            [
                data.schedule_type_name,
                data.schedule_type_status,
                data.edit_user,
                data.schedule_type_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    DropDownViewType: (callback) => {
        pool.query(
            `SELECT 
                 schedule_type_id,
                 schedule_type_name
            FROM
                 it_schedule_type_mast
            WHERE 
                 schedule_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}
