const { pool } = require('../../config/database')
module.exports = {
    BackupTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_backup_type_mast
          ( 
            backup_type_name,
            backup_type_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.backup_type_name,
                data.backup_type_status,
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
    BackupTypeView: (callback) => {
        pool.query(
            `SELECT 
            backup_type_id,
            backup_type_name, 
            backup_type_status,
            if(backup_type_status=1,'Yes','No')status
            FROM
            it_backup_type_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    BackupTypeUpdate: (data, callback) => {

        pool.query(
            `UPDATE it_backup_type_mast SET 
            backup_type_name=?,
            backup_type_status=?,
            edit_user =?       
            WHERE 
            backup_type_id=?`,
            [
                data.backup_type_name,
                data.backup_type_status,
                data.edit_user,
                data.backup_type_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getBackupType: (callback) => {
        pool.query(
            `SELECT 
            backup_type_id,
            backup_type_name, 
            backup_type_status            
            FROM
            it_backup_type_mast
            where backup_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}