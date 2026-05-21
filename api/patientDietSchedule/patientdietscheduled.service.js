const { pool } = require('../../config/database');

module.exports = {


    insertPatientSchedule: (values, callBack) => {
        const query = `
        INSERT INTO patient_diet_schedule (
            plan_id,
            process_date,
            type_id,
            status,
            created_by
        )
        VALUES ?
    `;
        pool.query(query, [values], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },


    getAllScheduledPatient: (date, callBack) => {

        //  Build date range
        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

        const query = `
        SELECT 
            pds.patient_diet_id,
            pds.process_date,
            pds.status AS schedule_status,

            -- PLAN
            pdp.plan_id,
            pdp.diet_id,

            -- DIET
            pdm.diet_name,

            -- TYPE (MEAL)
            dty.type_slno as type_id,
            dty.type_desc,
            dty.start_time,
            dty.end_time,

            -- PATIENT
            p.fb_ipad_slno AS patient_id,
            p.fb_ip_no,
            p.fb_pt_no,
            p.fb_ptc_name AS patient_name,
            p.fb_ptc_sex,
            p.fb_ptn_yearage AS age,
            p.fb_doc_name,
            p.fb_dep_desc,

            -- BED / ROOM
            b.fb_bdc_no AS bed_no,
            b.fb_rm_code AS room_no,

            -- NURSE STATION
            ns.fb_ns_name AS nurse_station_name

        FROM patient_diet_schedule pds

        LEFT JOIN patient_diet_plan pdp
            ON pds.plan_id = pdp.plan_id

        LEFT JOIN patient_diet_master pdm
            ON pdp.diet_id = pdm.diet_id

        LEFT JOIN diet_type dty
            ON pds.type_id = dty.type_slno

        LEFT JOIN fb_ipadmiss p
            ON pdp.patient_id = p.fb_pt_no
            AND pdp.admission_id = p.fb_ip_no

        LEFT JOIN fb_bed b
            ON p.fb_bd_code = b.fb_bd_code

        LEFT JOIN fb_nurse_station_master ns
            ON b.fb_ns_code = ns.fb_ns_code

        WHERE pds.process_date >= ?
            AND pds.process_date <= ?

        ORDER BY 
            pds.process_date,
            dty.start_time
    `;

        pool.query(query, [startDate, endDate], (error, results) => {
            if (error) return callBack(error);
            return callBack(null, results);
        });
    },


    getPatientProcesssedFood: (plan_id, callBack) => {
        const query = `
        SELECT 
            pds.patient_diet_id,
            pds.process_date,
            pds.status AS schedule_status,

            -- PLAN
            pdp.plan_id,
            pdp.diet_id,

            -- DIET
            pdm.diet_name,

            -- TYPE (MEAL)
            dty.type_slno as type_id,
            dty.type_desc,
            dty.start_time,
            dty.end_time,

            -- PATIENT
            p.fb_ipad_slno AS patient_id,
            p.fb_ip_no,
            p.fb_pt_no,
            p.fb_ptc_name AS patient_name,
            p.fb_ptc_sex,
            p.fb_ptn_yearage AS age,
            p.fb_doc_name,
            p.fb_dep_desc,

            -- BED / ROOM
            b.fb_bdc_no AS bed_no,
            b.fb_rm_code AS room_no,

            -- NURSE STATION
            ns.fb_ns_name AS nurse_station_name

        FROM patient_diet_schedule pds

        LEFT JOIN patient_diet_plan pdp
            ON pds.plan_id = pdp.plan_id

        LEFT JOIN patient_diet_master pdm
            ON pdp.diet_id = pdm.diet_id

        LEFT JOIN diet_type dty
            ON pds.type_id = dty.type_slno

        LEFT JOIN fb_ipadmiss p
            ON pdp.patient_id = p.fb_pt_no
            AND pdp.admission_id = p.fb_ip_no

        LEFT JOIN fb_bed b
            ON p.fb_bd_code = b.fb_bd_code

        LEFT JOIN fb_nurse_station_master ns
            ON b.fb_ns_code = ns.fb_ns_code

        WHERE 
            pds.is_active = 1
            AND pds.plan_id = ?
    `;

        pool.query(query, [plan_id], (error, results) => {
            if (error) return callBack(error);
            return callBack(null, results);
        });
    },




    updateScheduleStatusService: (patient_diet_id, status, updated_by, callBack) => {

        const query = `
        UPDATE patient_diet_schedule
        SET 
            status = ?,
            updated_by = ?
        WHERE patient_diet_id = ?
    `;

        pool.query(query, [status, updated_by, patient_diet_id], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },


    cancelScheduleService: (
        patient_diet_id,
        cancel_reason,
        cancelled_by,
        updated_by,
        status,
        callBack
    ) => {

        const query = `
        UPDATE patient_diet_schedule
        SET 
            status = 'CANCELLED',
            cancel_reason = ?,
            cancelled_by = ?,
            cancelled_at = NOW(),
            updated_by = ?,
            status=?,
            is_active = 0
        WHERE patient_diet_id = ?
    `;

        pool.query(
            query,
            [cancel_reason, cancelled_by, updated_by, status, patient_diet_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },


    ServedSchedule: (
        status,
        updated_by,
        patient_diet_id,
        callBack
    ) => {

        const query = `
        UPDATE patient_diet_schedule
        SET 
            status = ?,
            updated_by = ?
        WHERE patient_diet_id = ?
    `;

        pool.query(
            query,
            [status, updated_by, patient_diet_id],
            (err, results) => {
                if (err) return callBack(err);
                return callBack(null, results);
            }
        );
    },



    deactivateScheduleService: (patient_diet_id, updated_by, callBack) => {

        const query = `
        UPDATE patient_diet_schedule
        SET 
            is_active = 0,
            updated_by = ?
        WHERE patient_diet_id = ?
    `;

        pool.query(query, [updated_by, patient_diet_id], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, results);
        });
    },




};