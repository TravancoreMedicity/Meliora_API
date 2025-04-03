const { pool } = require('../../config/database');

module.exports = {
    dietOrderInsert: (data, callBack) => {
        pool.query(
            `INSERT into  diet_order_list 
            (
      
            order_date,
            proc_slno,
            process_date,
            dmenu_slno,
            cancel,
            cancel_time,
            em_id
            ) values(?,?,?,?,?,?,?)`,
            [
                data.order_date,
                data.proc_slno,
                data.process_date,
                data.dmenu_slno,
                data.cancel,
                data.cancel_time,
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

    getDietOrder: (callBack) => {
        pool.query(
            ` SELECT 
            oder_slno,
            order_date,
            proc_slno,
            process_date,
            dmenu_slno,
            cancel,
            cancel_time,
            em_id FROM diet_order_list;
            `, [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    updateDietOrder: (data, callBack) => {
        pool.query(
            `update diet_order_list 
            set order_date = ?,
            proc_slno = ?,
            process_date = ?,
            dmenu_slno = ?,
            cancel = ?,
            cancel_time = ?,
            em_id = ?
            where oder_slno = ?`,
            [
                data.oder_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getRoom: (data, callBack) => {
        pool.query(
            // `SELECT room_master.rm_code,rmc_name,rmc_slno
            // FROM meliora.room_master
            // left join ora_roommaster on room_master.rm_code = ora_roommaster.rm_code
            // where ns_code = ?`,
            `  SELECT rm_code,rmc_desc FROM ora_roommaster WHERE ns_code=?`,
            [
                data.ns_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getdietpatientname: (data, callBack) => {
        pool.query(
            `select rmc_slno ,
                   ptc_ptname,
                   diet_master.diet_slno,
                   diet_master.diet_name,
                   diet_patient.pt_no,
                   diet_process_mast.dmenu_slno,
                   kot_item_master.item_slno,
                   item_name,
                   diet_type.type_slno,
                   type_desc from ora_roommaster
                   left join room_master on ora_roommaster.rm_code = room_master.rm_code
                   left join ora_bed on ora_roommaster.rm_code = ora_bed.rm_code
                   left join diet_patient on ora_bed.bd_code = diet_patient.bd_code
                   left join diet_plan on diet_patient.dietpt_slno = diet_plan.dietpt_slno
                   left join diet_process_mast on diet_plan.plan_slno = diet_process_mast.plan_slno
                   left join diet_process_detl on diet_process_mast.proc_slno = diet_process_detl.proc_slno
                   left join diet_type on  diet_process_detl.type_slno = diet_type.type_slno
                   left join diet_master on diet_plan.diet_slno = diet_master.diet_slno
                   left join diet_menu_setting_detl on diet_process_mast.dmenu_slno = diet_menu_setting_detl.dmenu_slno
                   left join kot_item_master on diet_menu_setting_detl.item_slno = kot_item_master.item_slno
                   where rmc_slno = ? and DATE(process_date) =?`,
            [
                data.rmc_slno,
                data.process_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getdiettypebyrmcslno: (data, callBack) => {
        pool.query(
            `select diet_type.type_slno,
           type_desc,
           diet_process_mast.dmenu_slno
           from ora_roommaster 
           left join room_master on ora_roommaster.rm_code = room_master.rm_code
           left join ora_bed on ora_roommaster.rm_code = ora_bed.rm_code
           left join diet_patient on ora_bed.bd_code = diet_patient.bd_code
           left join diet_plan on diet_patient.dietpt_slno = diet_plan.dietpt_slno
           left join diet_process_mast on diet_plan.plan_slno = diet_process_mast.plan_slno
           left join diet_process_detl on diet_process_mast.proc_slno = diet_process_detl.proc_slno
           left join diet_type on diet_process_detl.type_slno = diet_type.type_slno
           where rmc_slno = ? and DATE(process_date) =?
            group by type_slno;`,
            [
                data.rmc_slno,
                data.process_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getitembytypeslno: (data, callBack) => {
        pool.query(
            `select item_name,
            kot_item_master.item_slno,
            type_slno
            from diet_menu_setting_detl
            left join kot_item_master on diet_menu_setting_detl.item_slno = kot_item_master.item_slno
            where dmenu_slno IN (?) and type_slno IN  (?)`,
            [
                data.dmenu_slno,
                data.type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getprocesstypeslno: (data, callBack) => {
        pool.query(
            `select diet_process_detl.type_slno,diet_type.type_desc,
            dmenu_slno,prod_slno,diet_process_detl.proc_slno,rate_hos,rate_cant
            from diet_process_detl
            left join diet_type on diet_type.type_slno=diet_process_detl.type_slno
            left join diet_process_mast on diet_process_mast.proc_slno=diet_process_detl.proc_slno
            where diet_process_detl.proc_slno=(select proc_slno from diet_process_mast
            left join ora_bed on ora_bed.bd_code=diet_process_mast.bd_code
            left join ora_roommaster on ora_roommaster.rm_code=ora_bed.rm_code
            where  date(process_date)=? and  ora_roommaster.rm_code=?)`,
            [
                data.process_date,
                data.rm_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getItemSlno: (data, callBack) => {
        pool.query(
            `select kot_item_master.item_slno,item_group.grp_slno,rate_hos,rate_cant,
            kot_item_master.item_name, item_group.group_name,ddetl_slno
            from diet_menu_setting_detl
            left join item_group on item_group.grp_slno= diet_menu_setting_detl.grp_slno
            left join kot_item_master on kot_item_master.item_slno=diet_menu_setting_detl.item_slno
            where dmenu_slno=? and type_slno=? and days=?`,
            [
                data.dmenu_slno,
                data.type_slno,
                data.days
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
}