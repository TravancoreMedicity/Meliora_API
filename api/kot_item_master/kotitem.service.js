const { pool } = require('../../config/database');

module.exports = {
    kotItemInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO meliora.kot_item_master 
            (
            item_name,
            grp_slno,
            rate,
            rate_hosp,
            qty,
            unit,
            diet_item,
            status,
            em_id )
            values(?,?,?,?,?,?,?,?,?)`,
            [

                data.item_name,
                data.grp_slno,
                data.rate,
                data.rate_hosp,
                data.qty,
                data.unit,
                data.diet_item,
                data.status,
                data.em_id
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
            `SELECT 
            item_name           
            FROM kot_item_master 
            WHERE item_name=? and diet_item=?`,
            [
                data.item_name,
                data.diet_item
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getKotitem: (callBack) => {
        pool.query(
            `SELECT
            item_slno,
            item_name,
           kot_item_master. grp_slno,
           item_group.group_name,
            rate,
            rate_hosp,
            qty,
            unit,
            if(diet_item = 1,'Yes','No') is_dietItem,
            diet_item,
            if(kot_item_master.status = 1 ,'Yes','No') kotstatus,
            kot_item_master.status,
            kot_item_master.em_id 
            from  meliora.kot_item_master
            left join meliora.item_group on kot_item_master.grp_slno = item_group.grp_slno
            order by item_slno desc`,
            [],
            function (err, results) {

                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },
    updatekotitem: (data, callBack) => {
        pool.query(
            `update meliora.kot_item_master
            set item_name = ? ,
            grp_slno=?,
            rate=?,
            rate_hosp=?,
            qty=?,
            unit=?,
            diet_item=?,
            status=?,
            em_id=? 
            where item_slno =? `,
            [

                data.item_name,
                data.grp_slno,
                data.rate,
                data.rate_hosp,
                data.qty,
                data.unit,
                data.diet_item,
                data.status,
                data.em_id,
                data.item_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT item_slno,
            item_name,
            grp_slno,
            rate,
            rate_hosp,
            qty,
            unit,
            diet_item,
            status,
            em_id
            FROM kot_item_master 
            WHERE item_name=? AND item_slno != ?`,
            [
                data.item_name,
                data.item_slno
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