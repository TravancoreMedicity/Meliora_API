const { pool } = require('../../config/database')
module.exports = {
    dietmenudtlInsert: (data, callback) => {
        pool.query(
            `INSERT INTO diet_menu_setting_detl(
                dmenu_slno,
                grp_slno,
                item_slno,
                type_slno,
                days,
                qty,
                unit,
                rate_hos,
                rate_cant,
                em_id,
                status)
                VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    dietmenusettingInsert: (data, callback) => {
        pool.query(
            `INSERT INTO diet_menu_setting(
                diet_slno,
                order_req,
                em_id,
                status)
                VALUES(?,?,?,?)`,
            [
                data.diet_slno,
                data.order_req,
                data.em_id,
                data.status
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    dietmenudtlSelect: (callback) => {
        pool.query(
            `SELECT ddetl_slno,group_name,diet_menu_setting.dmenu_slno,item_name,type_desc,diet_menu_setting_detl.unit,rate_hos,rate_cant,diet_menu_setting_detl.em_id,item_group.grp_slno,kot_item_master.item_slno,diet_type.type_slno,diet_menu_setting_detl.status,
            if(diet_menu_setting_detl.status= 1,'Yes','No') status1,diet_menu_setting_detl.qty,days,
            diet_master.diet_name,if(diet_menu_setting.order_req=1,'Yes','No')order_req1,
            diet_menu_setting.order_req,
            diet_menu_setting.diet_slno,
            (case when days='1' then 'Sunday' when days='2'then 'Monday' when days='3' then 'Tuesday' when days='4' then 'Wednesday' when days='5' then 'Thursday' when days='6' then 'Friday' when days='7' then 'Saturday' else 'Nil'end) as days1
             from diet_menu_setting_detl
            LEFT JOIN item_group on item_group.grp_slno=diet_menu_setting_detl.grp_slno
            LEFT JOIN kot_item_master on  kot_item_master.item_slno=diet_menu_setting_detl.item_slno
            LEFT JOIN diet_type on diet_type.type_slno=diet_menu_setting_detl.type_slno
            LEFT JOIN diet_menu_setting on diet_menu_setting.dmenu_slno=diet_menu_setting_detl.dmenu_slno
            LEFT JOIN diet_master ON diet_master.diet_slno=diet_menu_setting.diet_slno`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getItemmaster: (id, callBack) => {
        pool.query(
            `SELECT item_slno,item_name                                
            FROM kot_item_master 
            WHERE status=1 and grp_slno=? and diet_item=1`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getItemRate: (id, callBack) => {
        pool.query(
            `select item_slno,rate_hosp as rate_hos, rate as rate_cant,qty,unit
             FROM kot_item_master
              where item_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getItemmasterExtra: (callback) => {
        pool.query(
            `SELECT item_slno,item_name from kot_item_master WHERE status=1 and diet_item=0`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updatedietmenusettingdtl: (data, callBack) => {

        pool.query(
            `update diet_menu_setting_detl 
            set  
                            grp_slno =?,
                            item_slno =?,
                            type_slno =?,
                            days =?,
                            qty =?,
                            unit=?,
                            rate_hos=?,
                            rate_cant =?,
                            em_id =?,
                            status=?
                            where dmenu_slno = ? `,
            [
                data.grp_slno,
                data.item_slno,
                data.type_slno,
                data.days,
                data.qty,
                data.unit,
                data.rate_hos,
                data.rate_cant,
                data.em_id,
                data.status,
                data.dmenu_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updatedietmenusetting: (data, callBack) => {
        pool.query(
            `UPDATE diet_menu_setting SET 
            diet_slno=?,
            order_req=?,
            status=?
            WHERE dmenu_slno=?`,
            [
                data.diet_slno,
                data.order_req,
                data.status,
                data.dmenu_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    dmenuInsert: (data, callback) => {
        pool.query(
            `INSERT INTO diet_menu_setting(
                diet_slno,
                order_req,
                em_id,
                status)
                VALUES(?,?,?,?)`,
            [
                data.diet_slno,
                data.order_req,
                data.em_id,
                data.status
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT dmenu_slno
            FROM diet_menu_setting
            WHERE diet_slno=? `,
            [
                data.diet_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}