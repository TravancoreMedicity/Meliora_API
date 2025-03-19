const { pool } = require('../../config/database');

module.exports = {

    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT ip_no,
            process_date
            FROM diet_process_mast
            WHERE date(process_date)= ? and ip_no=?`,
            [
                data.process_date,
                data.ip_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    dietProcessinsert: (data, callBack) => {
        pool.query(
            `insert into diet_process_mast 
            (
            plan_slno,
            dmenu_slno,
            ip_no,
            pt_no,
            diet_slno,
            bd_code,
            process_date,
            process_status,
            discharge_status,
            em_id
            ) values (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.plan_slno,
                data.dmenu_slno,
                data.ip_no,
                data.pt_no,
                data.diet_slno,
                data.bd_code,
                data.process_date,
                data.process_status,
                data.discharge_status,
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
    updateDietplan: (data, callBack) => {
        pool.query(
            `update diet_plan
            set 
            process=1
            where plan_slno = ?`,
            [
                data.plan_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getdietprocess: (callBack) => {
        pool.query(
            `SELECT proc_slno,
            plan_slno,
            dmenu_slno,
            ip_no,
            pt_no,
            diet_slno,
            bd_code,
            process_date,
            process_status,
            discharge_status,
            em_id
             FROM diet_process_mast;`, [],
            function (err, results) {

                if (err) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updatedietprocess: (data, callBack) => {
        pool.query(
            `UPDATE diet_process_mast 
        set 
        plan_slno = ?,
        dmenu_slno=?,
       ip_no = ?,
       pt_no = ?,
       diet_slno =?,
       bd_code = ?,
       process_date =?,
       process_status =?,
       discharge_status=?,
       em_id = ?
         where proc_slno = ?`,
            [
                data.proc_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getdietmenubyId: (data, callBack) => {
        pool.query(
            `SELECT diet_rate_list.type_slno , 
            diet_rate_list.hosp_rate,
            diet_rate_list.cant_rate 
            FROM diet_plan            
            left join ora_bed on ora_bed.bd_code =diet_plan.bd_code 
            left join ora_roomtype on  ora_roomtype.rt_code=ora_bed.rt_code 
            left join ora_roomcategory on  ora_roomcategory.rc_code=ora_roomtype.rc_code 
			left join diet_rate_list on  diet_rate_list.rc_code =ora_roomcategory.rc_code 
            where ora_bed.bd_code = ? and diet_rate_list.diet_slno=?`,
            [
                data.bd_code,
                data.diet_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    getNewlyInserted: (data, callBack) => {
        pool.query(
            `SELECT proc_slno,
            hosp_rate as rate_hos,
            cant_rate as rate_cant,
            diet_menu_setting_detl.type_slno,
            diet_process_mast.dmenu_slno
             FROM  diet_process_mast
             left join diet_master on diet_process_mast.diet_slno = diet_master.diet_slno
             left join diet_menu_setting_detl on diet_process_mast.dmenu_slno = diet_menu_setting_detl.dmenu_slno
             left join diet_rate_list on diet_menu_setting_detl.type_slno = diet_rate_list.type_slno
            where plan_slno = ? and DATE(process_date) = ?
            group by dmenu_slno`,
            [
                data.plan_slno,
                data.process_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    insertprocessdetl: (data, callBack) => {
        pool.query(
            `insert into diet_process_detl
            (
            proc_slno ,
            type_slno,
            rate_hos,
            rate_cant
            )
            values ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },
    getmenubyallprocess: (data, callBack) => {
        pool.query(
            `SELECT diet_menu_setting.dmenu_slno ,
            diet_rate_list.type_slno,
            diet_rate_list.hosp_rate,
            diet_rate_list.cant_rate
            FROM diet_menu_setting
            left join diet_master on diet_menu_setting.diet_slno = diet_master.diet_slno
            left join diet_menu_setting_detl on diet_menu_setting.dmenu_slno = diet_menu_setting_detl.dmenu_slno
            left join diet_rate_list on diet_master.diet_slno = diet_rate_list.diet_slno
            left join diet_plan on diet_master.diet_slno = diet_plan.diet_slno
            left join ora_bed on diet_plan.bd_code = ora_bed.bd_code
            where diet_master.diet_slno = ?  and days=?  and ora_bed.bd_code = ?
            GROUP BY type_slno`,
            [
                data.diet_slno,
                data.days,
                data.bd_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    processDetailInsert: (data, callBack) => {
        pool.query(
            `insert into diet_process_detl
            (
            proc_slno ,
            type_slno,
            rate_hos,
            rate_cant
            )
            values ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    getproceedcount: (data, callBack) => {
        pool.query(
            `select count(DISTINCT(ip_no)) ' processcount' from diet_process_mast 
            where process_status=1 and discharge_status=1 and  DATE(diet_process_mast.process_date)=?`,
            [
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
    getNewOrderCount: (data, callBack) => {
        pool.query(
            `select 
            count(*) "neworder"
            from diet_plan
            where plan_slno not in (select plan_slno
            from diet_process_mast
            where date(process_date)=? and diet_plan.diet_slno=diet_process_mast.diet_slno)
            and discharge='N'`,
            [
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

}
