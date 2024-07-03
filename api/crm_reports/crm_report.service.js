const { pool } = require('../../config/database')
module.exports = {

    getCRFNoBased: (id, callBack) => {
        pool.query(
            `select req_slno, co_department_mast.dept_name,RDS.sec_name,  actual_requirement,
            needed, category, location, date(expected_date) as expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, co_employee_master.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date
              
              
            from crm_request_master
 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master on co_employee_master.em_id=crm_request_master.create_user
  
 
            where req_slno=?
            group by req_slno`,
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
    getdataUserAcknldged: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,req_slno, co_department_mast.dept_name,
            RDS.sec_name,  actual_requirement,
            needed, category, location, date(expected_date) as expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, RU.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date ,  AU.em_name as ack_user         
              
            from crm_request_master 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master RU on RU.em_id=crm_request_master.create_user
             left join co_employee_master AU on AU.em_id=crm_request_master.user_ack_user
            where date(crm_request_master.create_date) between ? and ?
            and user_acknldge=1
               group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getdataUserNotAcknldged: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,req_slno, co_department_mast.dept_name,
            RDS.sec_name,  actual_requirement,
           needed, category, location, date(expected_date) as expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, RU.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date ,  AU.em_name as ack_user         
              
            from crm_request_master 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master RU on RU.em_id=crm_request_master.create_user
             left join co_employee_master AU on AU.em_id=crm_request_master.user_ack_user
            where date(crm_request_master.create_date) between ? and ?
            and user_acknldge is NULL
               group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getdataAllCRF: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,req_slno, co_department_mast.dept_name,
            RDS.sec_name,  actual_requirement,
            needed, category, location, date(expected_date) as expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, RU.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date ,  AU.em_name as ack_user         
              
            from crm_request_master 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master RU on RU.em_id=crm_request_master.create_user
             left join co_employee_master AU on AU.em_id=crm_request_master.user_ack_user
            where date(crm_request_master.create_date) between ? and ?
                 group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPurchaseCRFData: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,crm_purchase_slno, crm_purchase_mast.req_slno, ack_status, ack_remarks, quatation_calling_status,
            quatation_calling_remarks, quatation_calling_user, quatation_calling_date, quatation_negotiation,
             quatation_negotiation_remarks, quatation_negotiation_user, quatation_negotiation_date, quatation_fixing,
             quatation_fixing_remarks, quatation_fixing_user, quatation_fixing_date, po_prepartion, po_complete,
             po_complete_user, po_complete_date, po_approva_level_one, po_approva_level_two, po_to_supplier, store_receive,
             store_receive_user, store_receive_date,  crm_purchase_mast.create_date,  sub_store_recieve,crm_purchase_mast.create_date,
               request_deptsec_slno, actual_requirement, needed, category, location,
                md_approve,ed_approve
                from crm_purchase_mast
                left join crm_request_master on crm_request_master.req_slno=crm_purchase_mast.req_slno
                 left join crm_request_approval on crm_request_approval.req_slno=crm_purchase_mast.req_slno
                 where date(crm_purchase_mast.create_date) between ? and ?
                group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}
