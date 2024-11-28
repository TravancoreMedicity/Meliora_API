const { da } = require('date-fns/locale');
const { pool } = require('../../config/database');
const { error } = require('winston');
module.exports = {
    createZonemaster: (data, callBack) => {
        pool.query(
            `INSERT INTO  mv_zone_master
            ( zone_name,
            zone_status,
            create_user)
            VALUES(?,?,?)`,
            [
                data.zone_name,
                data.zone_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAllZoneMaster: (callBack) => {
        pool.query(
            `SELECT * FROM mv_zone_master`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updatezonemaster: (data, callBack) => {
        pool.query(
            `
            UPDATE mv_zone_master
            SET  zone_name=?,
            zone_status=?,
            edit_user=?   
            where zone_slno= ?  
            `,
            [
                data.zone_name,
                data.zone_status,
                data.edit_user,
                data.zone_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteZoneMaster: (data, callBack) => {
        pool.query(
            `
            UPDATE  mv_zone_master
            SET zone_status = 0  
            WHERE zone_slno = ?
            `,
            [
                data.zone_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    createUserMaster: (data, callBack) => {
        pool.query(
            `
            INSERT INTO mv_user_master
            (user_name,
            user_status,
            create_user)
            VALUES(?,?,?)
            `,
            [
                data.user_name,
                data.user_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAlluserMaster: (callBack) => {
        pool.query(
            `SELECT * FROM mv_user_master`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updataUserMaster: (data, callBack) => {
        pool.query(
            `UPDATE mv_user_master
            SET user_name=?,
            user_status=?,
            edit_user=?   
            where user_slno= ?  
        `,
            [
                data.user_name,
                data.user_status,
                data.edit_user,
                data.user_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    createslotmaster: (data, callBack) => {
        pool.query(
            `INSERT INTO mv_slot_master
            (slot_name,
            zone_slno,
            slot_status,
            create_user)
            VALUES(?,?,?,?)
            `,
            [
                data.slot_name,
                data.zone_slno,
                data.slot_status,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getAllSlotMaster: (callBack) => {
        pool.query(
            `SELECT 
    sm.slot_slno,
    sm.slot_name,
    zm.zone_name AS zone_name,
    sm.slot_status,
     sm.zone_slno
FROM 
  mv_slot_master sm
INNER JOIN 
    mv_zone_master zm
ON 
    sm.zone_slno = zm.zone_slno;
`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateslotmaster:(data,callBack) =>{
        pool.query(
            `UPDATE mv_slot_master
            SET  slot_name = ?,
            zone_slno = ?,
            slot_status = ? 
            WHERE  slot_slno =?
            `,
            [
                data.slot_name,
                data.zone_slno,
                data.slot_status,
                data.slot_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }

        )
    }
}