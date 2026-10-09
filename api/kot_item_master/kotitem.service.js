const { pool } = require('../../config/database');

module.exports = {
    kotItemInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO kot_item_master 
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
            from  kot_item_master
            left join item_group on kot_item_master.grp_slno = item_group.grp_slno
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
            `update kot_item_master
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

    GetAllRoomTypeDetail: (callBack) => {
        pool.query(
            `select 
                fb_rc_slno,
                fb_rc_code,
                fb_rcc_desc
            from fb_room_category
            where fb_rcc_status = 'Y'
            GROUP BY fb_rc_code, fb_rcc_desc`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    GetAllDietDeliveryDetail: (callBack) => {
        pool.query(
            `SELECT
    ddt.diet_del_time_slno,
    ddt.diet_type_slno,
    dt.type_desc AS diet_type,
    DATE_FORMAT(ddt.diet_del_from_time, '%H:%i') AS from_time,
    DATE_FORMAT(ddt.diet_del_to_time, '%H:%i') AS to_time,
    ddt.diet_del_status
FROM diet_delivery_time_master ddt
INNER JOIN diet_type dt
    ON dt.type_slno = ddt.diet_type_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkDeliveryTimeAlreadyExist: (data, callBack) => {
        pool.query(
            `SELECT
                ddt.diet_del_time_slno
            FROM diet_delivery_time_master ddt
            WHERE diet_type_slno = ?`,
            [
                data.diet_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    GetAllNsBasedBeds: (data, callBack) => {
        pool.query(
            `SELECT
    fb_bed.fb_bdc_no,
    fb_bed.fb_bd_code,
    fb_bed.fb_rt_code, 
    fb_bed.fb_bdc_status,
    fb_bed.fb_hkd_cleaningreq,
    fb_bed.fb_rm_code,
    fb_bed.fb_bdc_mhcode,fb_bed.fb_ns_code
FROM 
    fb_bed
LEFT JOIN 
    fb_nurse_station_master 
        ON fb_bed.fb_ns_code = fb_nurse_station_master.fb_ns_code
WHERE 
    fb_nurse_station_master.fb_ns_status = 1
    AND fb_bed.fb_bdc_status = 'Y'
    AND fb_bed.fb_ns_code IN (?)
GROUP BY 
    fb_bed.fb_bdc_no,
    fb_bed.fb_bd_code,
    fb_bed.fb_bdc_occup,
    fb_bed.fb_bdc_vipbed,
    fb_bed.fb_rt_code,
    fb_bed.fb_bdc_status,
    fb_bed.fb_hkd_cleaningreq,
    fb_bed.fb_rm_code,
    fb_bed.fb_bdc_mhcode
ORDER BY 
    fb_bed.fb_bd_code`,
            [
                data.NS_CODE
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
    },
    InsertDietRoomMaster: (data, callBack) => {
        pool.query(
            `INSERT INTO diet_room_category_master
        (
            diet_rm_name,
            diet_rm_categories,
            diet_rm_status,
            create_user
        )
        VALUES (?,?,?,?)`,
            [
                data.diet_rm_name,
                JSON.stringify(data.diet_rm_categories),
                data.diet_rm_status,
                data.create_user
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    InsertDietDeliveryDetail: (data, callBack) => {
        pool.query(
            `INSERT INTO diet_delivery_time_master
        (
            diet_type_slno,
            diet_del_from_time,
            diet_del_to_time,
            diet_del_status,
            create_user
        )
        VALUES (?,?,?,?,?)`,
            [
                data.diet_type_slno,
                data.diet_del_from_time,
                data.diet_del_to_time,
                data.diet_del_status,
                data.create_user
            ],
            (error, results) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    UpdateDietRoomMaster: (data, callBack) => {
        pool.query(
            `UPDATE diet_room_category_master
        SET
            diet_rm_name = ?,
            diet_rm_categories = ?,
            diet_rm_status = ?,
            edit_user = ?
        WHERE diet_rm_category_slno = ?`,
            [
                data.diet_rm_name,
                JSON.stringify(data.diet_rm_categories),
                data.diet_rm_status,
                data.edit_user,
                data.diet_rm_category_slno
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    UpdateDietDeliveryDetail: (data, callBack) => {
        pool.query(
            `UPDATE diet_delivery_time_master
        SET
            diet_type_slno = ?,
            diet_del_from_time = ?,
            diet_del_to_time = ?,
            diet_del_status = ?,
            edit_user = ?
        WHERE diet_del_time_slno = ?`,
            [
                data.diet_type_slno,
                data.diet_del_from_time,
                data.diet_del_to_time,
                data.diet_del_status,
                data.edit_user,
                data.diet_del_time_slno
            ],
            (error, results) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    GetDietRoomMaster: (callBack) => {
        pool.query(
            `SELECT 
            diet_rm_category_slno,
            diet_rm_name,
            diet_rm_categories,
            diet_rm_status
        FROM diet_room_category_master
        ORDER BY diet_rm_category_slno`,
            (error, results) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
}