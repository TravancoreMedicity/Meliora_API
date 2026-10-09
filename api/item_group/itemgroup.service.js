const { pool } = require('../../config/database');

module.exports = {
    itemgroupInsert: (data, callBack) => {
        pool.query(
            `INSERT into item_group
            (
          
           group_name,
           status ,
           em_id 
           ) values (?,?,?)`,
            [

                data.group_name,
                data.status,
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT group_name,
            FROM item_group
            WHERE group_name=? `,
            [
                data.group_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getItemgroup: (callBack) => {
        pool.query(
            `SELECT 
        grp_slno,
        group_name,
        if(status = 1 ,'Yes','No') as grpstatus,
        status,
        em_id
        from  item_group`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    updateItemgrp: (data, callBack) => {

        pool.query(
            `UPDATE item_group
            SET  
            group_name =?,
            status=?
            where grp_slno =? `,
            [
                data.group_name,
                data.status,
                data.grp_slno,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT group_name,
            FROM item_group
            WHERE group_name=? AND grp_slno != ?`,
            [
                data.group_name,
                data.grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getItemgrpname: (callBack) => {
        pool.query(
            `SELECT grp_slno,group_name  FROM item_group; `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertItemGroupMaster: (data, callBack) => {
        pool.query(
            `INSERT INTO item_group_master
        (
            group_name,
            group_code,
            display_order,
            is_active,
            created_by,
            updated_by
        ) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.group_name,
                data.group_code,
                data.display_order || 0,
                data.is_active,
                data.created_by,
                data.updated_by
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateItemGroupMaster: (data, callBack) => {
        pool.query(
            `UPDATE item_group_master
         SET 
            group_name = ?,
            group_code = ?,
            display_order = ?,
            is_active = ?,
            updated_by = ?
         WHERE item_group_id = ?`,
            [
                data.group_name,
                data.group_code,
                data.display_order,
                data.is_active,
                data.updated_by,
                data.item_group_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }, getAllItemGroupMaster: (callBack) => {
        pool.query(
            `SELECT 
            item_group_id,
            group_name,
            group_code,
            display_order,
            is_active,
            created_by,
            created_at,
            updated_by,
            updated_at
         FROM item_group_master`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


}