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

}