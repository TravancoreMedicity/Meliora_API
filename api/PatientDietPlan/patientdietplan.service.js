const { pool } = require('../../config/database');

module.exports = {

    insertPatientDietPlan: (data, callBack) => {

        pool.query(
            `INSERT INTO patient_diet_plan
            (
                patient_id,
                admission_id,
                diet_id,
                start_date,
                end_date,
                doctor_id,
                dietitian_id,
                diet_status,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.patient_id,
                data.admission_id,
                data.diet_id,
                data.start_date,
                data.end_date,
                data.doctor_id,
                data.dietitian_id,
                data.diet_status,
                data.created_by
            ],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },


    getAllPatientDietPlan: (ns_code, callBack) => {

        pool.query(
            `
SELECT 
    dp.fb_ipad_slno        AS dietpt_slno,
    dp.fb_ip_no            AS ip_no,
    dp.fb_pt_no            AS pt_no,
    dp.fb_ptc_name         AS ptc_ptname,
    dp.fb_ptc_sex          AS ptc_sex,
    dp.fb_ipd_date         AS ipd_date,
    dp.fb_ipc_status       AS ipd_status,
    dp.fb_do_code          AS do_code,
    dp.fb_doc_name         AS doc_name,

    rc.fb_rcc_desc,
    fb.fb_bdc_no,
    dp.fb_bd_code          AS bd_code,
    fb.fb_bed_slno,
    rm.fb_rmc_desc,
    rt.fb_rtc_desc,

    pdp.plan_id,
    pdp.diet_status,
    pdp.start_date,
    pdp.end_date,
    pdp.diet_id,
    pdp.dietitian_id,

    pdm.diet_name,
    pdm.calories_per_day,
    pdm.protein_per_day,
    pdm.description,

    ns.fb_ns_name,
    ns.fb_ns_code,
    ns.fb_nurse_stn_slno,

    cm.em_name AS Dietecian_name,

    dt.template_id,
    dt.template_name,
    dt.version_no,
    dt.effective_from,
    dt.effective_to

FROM fb_ipadmiss dp  

LEFT JOIN fb_bed fb 
    ON dp.fb_bd_code = fb.fb_bd_code

LEFT JOIN fb_nurse_station_master ns 
    ON fb.fb_ns_code = ns.fb_ns_code

LEFT JOIN fb_room_type rt 
    ON rt.fb_rt_code = fb.fb_rt_code

LEFT JOIN fb_room_master rm 
    ON fb.fb_rm_code = rm.fb_rm_code

LEFT JOIN fb_room_category rc 
    ON dp.fb_rc_code = rc.fb_rc_code

LEFT JOIN patient_diet_plan pdp 
    ON dp.fb_pt_no = pdp.patient_id
    AND dp.fb_ip_no = pdp.admission_id
    AND pdp.is_active = 1

LEFT JOIN patient_diet_master pdm 
    ON pdp.diet_id = pdm.diet_id

LEFT JOIN co_employee_master cm 
    ON cm.em_id = pdp.dietitian_id

LEFT JOIN diet_template dt
    ON dt.diet_id = pdp.diet_id
    AND dt.is_active = 1
    AND DATE(NOW()) BETWEEN DATE(dt.effective_from) AND DATE(dt.effective_to)

WHERE ns.fb_ns_code = 'W009'
AND (dp.fb_ipc_curstatus IS NULL OR dp.fb_ipc_curstatus <> 'PCO')  

ORDER BY dp.fb_ip_no DESC;
            `,
            [ns_code],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },
    getAllActiveDietPatient: (ns_code, callBack) => {

        pool.query(
            `
 SELECT 
    dp.fb_ipad_slno        AS dietpt_slno,
    dp.fb_ip_no            AS ip_no,
    dp.fb_pt_no            AS pt_no,
    dp.fb_ptc_name         AS ptc_ptname,
    dp.fb_ptc_sex          AS ptc_sex,
    dp.fb_ipd_date         AS ipd_date,
    dp.fb_ipc_status       AS ipd_status,
    dp.fb_do_code          AS do_code,
    dp.fb_doc_name         AS doc_name,

    rc.fb_rcc_desc,
    fb.fb_bdc_no,
    dp.fb_bd_code          AS bd_code,
    fb.fb_bed_slno,
    rm.fb_rmc_desc,
    rt.fb_rtc_desc,

    pdp.plan_id,
    pdp.diet_status,
    pdp.start_date,
    pdp.end_date,
    pdp.diet_id,
    pdp.dietitian_id,

    pdm.diet_name,
    pdm.calories_per_day,
    pdm.protein_per_day,
    pdm.description,

    ns.fb_ns_name,
    ns.fb_ns_code,
    ns.fb_nurse_stn_slno,

    cm.em_name AS Dietecian_name,

    dt.template_id,
    dt.template_name,
    dt.version_no,
    dt.effective_from,
    dt.effective_to

FROM fb_ipadmiss dp  

INNER JOIN patient_diet_plan pdp 
    ON dp.fb_pt_no = pdp.patient_id
    AND dp.fb_ip_no = pdp.admission_id
    AND pdp.is_active = 1

LEFT JOIN fb_bed fb 
    ON dp.fb_bd_code = fb.fb_bd_code

LEFT JOIN fb_nurse_station_master ns 
    ON fb.fb_ns_code = ns.fb_ns_code

LEFT JOIN fb_room_type rt 
    ON rt.fb_rt_code = fb.fb_rt_code

LEFT JOIN fb_room_master rm 
    ON fb.fb_rm_code = rm.fb_rm_code

LEFT JOIN fb_room_category rc 
    ON dp.fb_rc_code = rc.fb_rc_code

LEFT JOIN patient_diet_master pdm 
    ON pdp.diet_id = pdm.diet_id

LEFT JOIN co_employee_master cm 
    ON cm.em_id = pdp.dietitian_id

LEFT JOIN diet_template dt
    ON dt.diet_id = pdp.diet_id
    AND dt.is_active = 1
    AND DATE(NOW()) BETWEEN DATE(dt.effective_from) AND DATE(dt.effective_to)

WHERE ns.fb_ns_code = ?
AND (dp.fb_ipc_curstatus IS NULL OR dp.fb_ipc_curstatus <> 'PCO')  

ORDER BY dp.fb_ip_no DESC
            `,
            [ns_code],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },


    FetchAllActivePatient: (date, callBack) => {
        pool.query(
            `
            SELECT 
                pdp.plan_id,
                pdp.patient_id,
                pdp.admission_id,
                pdp.diet_id,
                pdp.start_date,
                pdp.end_date,

                dp.fb_ptc_name        AS ptc_ptname,   

                pdm.diet_name,

                dt.template_id,

                dtf.type_id,
                im.item_name,
                im.item_id,
                dtf.quantity,
                um.unit_code,   
                um.unit_id   

            FROM patient_diet_plan pdp

            LEFT JOIN fb_ipadmiss dp  
                ON pdp.patient_id = dp.fb_pt_no
                AND pdp.admission_id = dp.fb_ip_no

            LEFT JOIN patient_diet_master pdm 
                ON pdp.diet_id = pdm.diet_id

            LEFT JOIN diet_template dt
                ON dt.diet_id = pdp.diet_id
                AND dt.is_active = 1
                AND DATE(?) >= DATE(dt.effective_from)
                AND (dt.effective_to IS NULL OR DATE(?) <= DATE(dt.effective_to))

            LEFT JOIN diet_template_food dtf
                ON dt.template_id = dtf.template_id
                AND dtf.week_day =  WEEKDAY(?) + 1 

            LEFT JOIN item_master im 
                ON dtf.item_id = im.item_id

            LEFT JOIN unit_master um  
                ON dtf.unit_id = um.unit_id

            WHERE pdp.is_active = 1
            AND DATE(?) BETWEEN DATE(pdp.start_date) AND DATE(pdp.end_date)

            ORDER BY pdp.plan_id DESC
            `,
            [date, date, date, date],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },


    fetchAllPatientMealType: (date, callBack) => {
        pool.query(
            `
            SELECT DISTINCT
                pdp.plan_id,
                pdp.patient_id,
                pdp.admission_id,
                pdp.diet_id,
                pdm.diet_name,
                dtf.type_id,
                dp.fb_ptc_name

            FROM patient_diet_plan pdp

            LEFT JOIN patient_diet_master pdm 
                ON pdp.diet_id = pdm.diet_id

            LEFT JOIN fb_ipadmiss dp  
                ON pdp.patient_id = dp.fb_pt_no
                AND pdp.admission_id = dp.fb_ip_no

            LEFT JOIN diet_template dt
                ON dt.diet_id = pdp.diet_id
                AND dt.is_active = 1
                AND DATE(?) >= DATE(dt.effective_from)
                AND (dt.effective_to IS NULL OR DATE(?) <= DATE(dt.effective_to))

            LEFT JOIN diet_template_food dtf
                ON dt.template_id = dtf.template_id
                AND dtf.week_day = WEEKDAY(?) + 1

            WHERE pdp.is_active = 1
            AND DATE(?) BETWEEN DATE(pdp.start_date) AND DATE(pdp.end_date)

            ORDER BY pdp.plan_id DESC
            `,
            [date, date, date, date],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },




    updatePatientDietPlan: (data, callBack) => {

        pool.query(
            `UPDATE patient_diet_plan
            SET
                diet_id = ?,
                start_date = ?,
                end_date = ?,
                doctor_id = ?,
                dietitian_id = ?,
                diet_status = ?,
                is_active = ?,
                updated_by = ?
            WHERE plan_id = ?`,
            [
                data.diet_id,
                data.start_date,
                data.end_date,
                data.doctor_id,
                data.dietitian_id,
                data.diet_status,
                data.is_active,
                data.updated_by,
                data.plan_id
            ],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },


    getDieticians: (callBack) => {
        pool.query(
            `SELECT 
    em_id, em_no, em_name, desg_name,em_designation
FROM
    co_employee_master cm
        LEFT JOIN
    co_designation cd ON cd.desg_slno = cm.em_designation
WHERE
    em_status = 1 AND em_dept_section = 43`,
            [],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },
    StopCurrentPlan: (data, callBack) => {

        pool.query(
            `UPDATE patient_diet_plan
            SET
                diet_status = ?,
                is_active = ?,
                updated_by = ?
            WHERE plan_id = ?`,
            [
                data.diet_status,
                data.is_active,
                data.updated_by,
                data.plan_id
            ],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },
    getAllTemplatedtl: (template_id, callBack) => {
        pool.query(
            `
            SELECT 
                dtf.template_food_id,
                dtf.template_id,
                dtf.week_day,
                dtf.type_id,

                dty.type_desc,
                TIME(dty.start_time) AS start_time,
                TIME(dty.end_time) AS end_time,

                im.item_name,
                ia.alias_name,

                ig.group_name,
                ic.category_name,

                dtf.quantity,
                um.unit_name,
                um.unit_code,
                um.unit_id

            FROM diet_template_food dtf
            LEFT JOIN diet_type dty 
                ON dtf.type_id = dty.type_slno
                AND dty.status = 1

            LEFT JOIN item_master im 
                ON dtf.item_id = im.item_id

            LEFT JOIN item_alias ia 
                ON im.item_id = ia.item_id 
                AND ia.is_active = 1

            LEFT JOIN item_group_master ig 
                ON im.item_group_id = ig.item_group_id

            LEFT JOIN item_category_master ic 
                ON im.item_category_id = ic.item_category_id

            LEFT JOIN unit_master um 
                ON dtf.unit_id = um.unit_id

            WHERE dtf.template_id = ?
            AND dtf.is_active = 1


            ORDER BY 
                dtf.week_day,
                dty.start_time
            `,
            [template_id],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },


    getCurrentTemplateFood: (template_id, typeIds, callBack) => {
        pool.query(
            `
          SELECT 
    dtf.template_food_id,
    dtf.template_id,
    dtf.week_day,
    dtf.type_id,

    dty.type_desc,
    TIME(dty.start_time) AS start_time,
    TIME(dty.end_time) AS end_time,

    im.item_id,
    im.item_name,
    ia.alias_name,
    im.description,

    ig.group_name,
    ic.category_name,

    dtf.quantity,
    um.unit_name,
    um.unit_code,
    um.unit_id,

    cip.party_type_id,
    opt.party_name,   
    cip.price,
    cip.gst_rate,
    cip.discount,
    cip.discount_rate

FROM diet_template_food dtf

LEFT JOIN diet_type dty 
    ON dtf.type_id = dty.type_slno
    AND dty.status = 1

LEFT JOIN item_master im 
    ON dtf.item_id = im.item_id

LEFT JOIN item_alias ia 
    ON im.item_id = ia.item_id 
    AND ia.is_active = 1

LEFT JOIN item_group_master ig 
    ON im.item_group_id = ig.item_group_id

LEFT JOIN item_category_master ic 
    ON im.item_category_id = ic.item_category_id

LEFT JOIN unit_master um 
    ON dtf.unit_id = um.unit_id

LEFT JOIN canteen_item_price cip
    ON cip.item_id = dtf.item_id

LEFT JOIN order_party_type opt
    ON cip.party_type_id = opt.party_type_id

WHERE 
    dtf.template_id = ?
    AND dtf.is_active = 1
    AND dtf.week_day = WEEKDAY(CURDATE()) + 1
    AND dtf.type_id IN (?)   

ORDER BY dty.start_time;
            `,
            [template_id, typeIds],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },



    getAllDietProcessList: (date, callBack) => {
        pool.query(
            `
            SELECT DISTINCT
                pdm.diet_name,
                pdm.diet_id,

                dt.template_id,
                dt.template_name,

                dty.type_slno AS type_id,
                dty.type_desc,
                TIME(dty.start_time) AS start_time,
                TIME(dty.end_time) AS end_time

            FROM patient_diet_master pdm

            LEFT JOIN diet_template dt 
                ON dt.diet_id = pdm.diet_id
                AND dt.is_active = 1
                AND DATE(?) BETWEEN dt.effective_from AND dt.effective_to 

            LEFT JOIN diet_template_food dtf 
                ON dt.template_id = dtf.template_id
                AND dtf.is_active = 1
                AND dtf.week_day = WEEKDAY(?) + 1  

            INNER JOIN diet_type dty   
                ON dtf.type_id = dty.type_slno
                AND dty.status = 1
                AND TIME(dty.start_time) > CURTIME()

            ORDER BY 
                pdm.diet_id,
                dty.start_time
            `,
            [date, date],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },

};