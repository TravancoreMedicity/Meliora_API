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
                is_consultation,
                remarks,
                diet_status,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.patient_id,
                data.admission_id,
                data.diet_id,
                data.start_date,
                data.end_date,
                data.doctor_id,
                data.is_consultation,
                data.remarks,
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
    dp.fb_ipd_disc,

    rc.fb_rcc_desc,
    fb.fb_bdc_no,
    dp.fb_bd_code          AS bd_code,
    fb.fb_bed_slno,
    rm.fb_rmc_desc,
    rt.fb_rtc_desc,

    pdp.plan_id,
    pdp.diet_status,
    pdp.diet_id,
    pdp.dietitian_id,
    pdp.is_consultation,
    pdp.remarks,

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
    pdp.remarks,

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
                pdp.remarks,

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
                diet_status = ?,
                remarks= ?,
                is_active = ?,
                is_consultation=?,
                updated_by = ?
            WHERE plan_id = ?`,
            [
                data.diet_id,
                data.start_date,
                data.end_date,
                data.doctor_id,
                data.diet_status,
                data.remarks,
                data.is_active,
                data.is_consultation,
                data.updated_by,
                data.plan_id
            ],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },

    getTemplateFoodStatus: (plan_id, callBack) => {

        pool.query(
            `SELECT 
                pdp.plan_id,
                pdp.patient_id,
                pdp.admission_id,
                pdp.remarks,

                do.order_id,
                do.order_date,
                do.order_status,

                dt.type_desc,
                dt.type_slno,

                im.item_name,
                dod.quantity,
                um.unit_name

            FROM patient_diet_plan pdp

            INNER JOIN diet_order do
                ON pdp.plan_id = do.plan_id

            INNER JOIN diet_order_detail dod
                ON do.order_id = dod.order_id

            LEFT JOIN diet_type dt
                ON dod.diet_type_id = dt.type_slno

            LEFT JOIN item_master im
                ON dod.item_id = im.item_id

            LEFT JOIN unit_master um
                ON dod.unit_id = um.unit_id

            WHERE pdp.plan_id = ?`,
            [
                plan_id
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
    getConsultationRequired: (callBack) => {
        pool.query(
            `SELECT
    pdp.plan_id,
    pdp.patient_id,
    pdp.admission_id,
    pdp.diet_id,
    pdp.dietitian_id,
    pdp.diet_status,
    pdp.start_date,
    pdp.end_date,
    pdp.is_consultation,
    pdp.remarks,

    pda.assignment_id,
    pda.assigned_to,
    pda.assigned_by,
    pda.status AS assignment_status,
    pda.is_current,

    dp.fb_ipad_slno AS dietpt_slno,
    dp.fb_ptc_name AS patient_name,
    dp.fb_ptc_sex AS patient_gender,
    dp.fb_ipd_date AS admission_date,
    dp.fb_doc_name AS doctor_name,
    dp.fb_do_code AS doctor_code,
    dp.fb_bd_code AS bed_code,
    bd.fb_bdc_no,
    pdm.diet_name,
    pdm.calories_per_day,
    pdm.protein_per_day,
    pdm.description,
    ns.fb_ns_name,

    cm.em_name AS dietitian_name,

    dt.template_id

FROM patient_diet_plan pdp

LEFT JOIN patient_diet_assignment pda
    ON pda.plan_id = pdp.plan_id
    AND pda.is_current = 1

LEFT JOIN fb_ipadmiss dp
    ON dp.fb_pt_no = pdp.patient_id
    AND dp.fb_ip_no = pdp.admission_id

LEFT JOIN patient_diet_master pdm
    ON pdm.diet_id = pdp.diet_id

LEFT JOIN fb_bed bd
    ON dp.fb_bd_code = bd.fb_bd_code

LEFT JOIN fb_nurse_station_master ns
    ON bd.fb_ns_code = ns.fb_ns_code
    

LEFT JOIN co_employee_master cm
    ON cm.em_id = COALESCE(
        pda.assigned_to,
        pdp.dietitian_id
    )

LEFT JOIN diet_template dt
    ON dt.diet_id = pdp.diet_id
    AND dt.is_active = 1
    AND DATE(NOW()) >= DATE(dt.effective_from)
    AND (
        dt.effective_to IS NULL
        OR DATE(NOW()) <= DATE(dt.effective_to)
    )

WHERE
    pdp.is_active = 1
    AND pdp.is_consultation = 1
    AND pdp.diet_status = 'ACTIVE'
    AND (
        dp.fb_ipc_curstatus IS NULL
        OR dp.fb_ipc_curstatus <> 'PCO'
    )

ORDER BY pdp.plan_id DESC`,
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
                TIME(dty.start_time);
            `,
            [date, date],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },
    getEmployeeNsStation: (empsecid, callBack) => {
        pool.query(
            `
            SELECT 
                fb_ns_code
            FROM
                fb_nurse_station_master
            WHERE
                dep_sec_id = ?
            `,
            [empsecid],
            (error, results) => {

                if (error) return callBack(error);

                return callBack(null, results);
            }
        );
    },

    AssingDieticain: (payload, callback) => {
        const {
            plan_id,
            assigned_to,
            assigned_by,
            status
        } = payload;

        // STEP 1: mark old as not current
        const updateOldQuery = `
        UPDATE patient_diet_assignment
        SET is_current = 0
        WHERE plan_id = ? AND is_current = 1
    `;

        pool.query(updateOldQuery, [plan_id], (err1) => {
            if (err1) return callback(err1);

            // STEP 2: insert new assignment
            const insertAssignmentQuery = `
            INSERT INTO patient_diet_assignment
            (plan_id, assigned_to, assigned_by, status, is_current)
            VALUES (?, ?, ?, ?, 1)
        `;

            pool.query(
                insertAssignmentQuery,
                [plan_id, assigned_to, assigned_by, status],
                (err2, result) => {
                    if (err2) return callback(err2);

                    const assignmentId = result.insertId;

                    // STEP 3: update main plan
                    const updatePlanQuery = `
                    UPDATE patient_diet_plan
                    SET dietitian_id = ?,
                        diet_status = 'ACTIVE'
                    WHERE plan_id = ?
                `;

                    pool.query(
                        updatePlanQuery,
                        [assigned_to, plan_id],
                        (err3) => {
                            if (err3) return callback(err3);

                            return callback(null, {
                                assignment_id: assignmentId,
                                plan_id,
                                assigned_to,
                                status: "ASSIGNED"
                            });
                        }
                    );
                }
            );
        });
    },


    DieticanStatus: (payload, callback) => {
        const {
            status,
            assignment_id
        } = payload;

        // STEP 1: mark old as not current
        const updateOldQuery = `
        UPDATE patient_diet_assignment
        SET status = ?
        WHERE assignment_id = ? 
    `;

        pool.query(
            updateOldQuery,
            [status, assignment_id],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    getAllActiveNursingStation: (selectedStations, callback) => {
        const sql = `
        
SELECT
    ipa.fb_ip_no,
    ipa.fb_pt_no,
    ipa.fb_ptc_name,
    bed.fb_bdc_no,
    bed.fb_rm_code,
    ns.fb_ns_name,
    ipa.fb_ipc_curstatus,
    ipa.fb_bd_code
FROM fb_ipadmiss ipa
INNER JOIN fb_bed bed
    ON bed.fb_bd_code = ipa.fb_bd_code
INNER JOIN fb_nurse_station_master ns
    ON ns.fb_ns_code = bed.fb_ns_code
WHERE bed.fb_ns_code IN (?)
  AND (
      ipa.fb_ipc_curstatus IS NULL
      OR ipa.fb_ipc_curstatus <> 'PCO'
  );
        `;
        pool.query(
            sql,
            [selectedStations],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },


    getPatientActiveDietHistory: (ptno, ipno, callback) => {
        const sql = `
            SELECT
                ipa.fb_ip_no,
                ipa.fb_pt_no,
                ipa.fb_ptc_name,
                ipa.fb_ipd_date AS admission_date,
                ipa.fb_ipd_disc AS discharge_date,
                ipa.fb_doc_name,

                pdp.plan_id,
                pdp.patient_id,
                pdp.admission_id,
                pdp.diet_id,
                pdm.diet_name,
                pdp.diet_status,
                pdp.is_active,
                pdp.is_consultation,
                pdp.start_date,
                pdp.end_date,
                pdp.created_at,

                dietitian.em_name AS dietitian_name

            FROM patient_diet_plan pdp

            INNER JOIN patient_diet_master pdm
                ON pdm.diet_id = pdp.diet_id

            INNER JOIN fb_ipadmiss ipa
                ON ipa.fb_pt_no = pdp.patient_id
                AND ipa.fb_ip_no = pdp.admission_id

            LEFT JOIN co_employee_master dietitian
                ON dietitian.em_id = pdp.dietitian_id

            WHERE
                pdp.patient_id = ?
                AND pdp.admission_id = ?

            ORDER BY
                pdp.start_date ASC,
                pdp.plan_id ASC
        `;
        pool.query(
            sql,
            [ptno, ipno],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },

    getPatientFullDetail: (ptno, ipno, callback) => {
        const sql = `
            SELECT
                ipa.fb_ip_no AS admission_id,
                ipa.fb_pt_no AS patient_id,
                ipa.fb_ptc_name AS patient_name,
                ipa.fb_ptc_sex AS gender,
                ipa.fb_ptd_dob AS dob,
                ipa.fb_ptn_yearage AS age_year,
                ipa.fb_ptn_monthage AS age_month,
                ipa.fb_ptn_dayage AS age_day,

                ipa.fb_ipd_date AS admission_date,
                ipa.fb_ipd_disc AS discharge_date,
                ipa.fb_ipc_status,
                ipa.fb_ipc_curstatus,

                ipa.fb_doc_name AS doctor_name,
                ipa.fb_do_code AS doctor_code,

                ipa.fb_ptc_mobile AS mobile,

                ipa.fb_ptc_loadd1,
                ipa.fb_ptc_loadd2,
                ipa.fb_ptc_loadd3,
                ipa.fb_ptc_loadd4,
                ipa.fb_ptc_lopin,

                ipa.fb_dep_desc AS department,

                bed.fb_bd_code,
                bed.fb_bdc_no AS bed_no,
                bed.fb_rm_code AS room_no,

                ns.fb_ns_code,
                ns.fb_ns_name AS nursing_station

            FROM fb_ipadmiss ipa

            LEFT JOIN fb_bed bed
                ON bed.fb_bd_code = ipa.fb_bd_code

            LEFT JOIN fb_nurse_station_master ns
                ON ns.fb_ns_code = bed.fb_ns_code

            WHERE
            ipa.fb_pt_no = ?
                AND ipa.fb_ip_no = ?`;
        pool.query(
            sql,
            [ptno, ipno],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },


    getPlanRemarksDetails: (plan_id, callback) => {
        const sql = `
                    SELECT 
                        remarks, patient_id, admission_id, plan_id, diet_status
                    FROM
                        patient_diet_plan
                    WHERE
                        plan_id = ? AND is_active = 1`;
        pool.query(
            sql,
            [plan_id],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },



};