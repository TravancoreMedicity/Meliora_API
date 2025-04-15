const { pool } = require('../../config/database')
module.exports = {

    getCRFNoBased: (id, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,req_date,
                   total_approx_cost,user_deptsec,req_status,req_approv_slno,           
                   incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                   I.em_name as incharge_user,
                   hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                   dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                   ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                   manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                   om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,senior_manage_req, senior_manage_approv,
                   smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,gm_approve_req, gm_approve,
                   gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,ed_approve_req, ed_approve,
                   ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,md_approve_req,md_approve,
                   md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                   managing_director_req, managing_director_approve, managing_director_remarks, managing_director_analysis,
                   managing_director_approve_date,MAD.em_name as managing_director_username, managing_director_image,
                   hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                   TD.dept_name,TD.dept_type,TD.dept_id,

                   ack_status, ack_remarks,PA.em_name as purchase_ackuser,crm_purchase_mast.create_date as ack_date,
                   quatation_calling_status,quatation_calling_remarks,quatation_calling_date,QC.em_name as quatation_user,
                   quatation_negotiation,quatation_negotiation_remarks,quatation_negotiation_date,QN.em_name as quatation_neguser,
                   quatation_fixing,quatation_fixing_remarks,quatation_fixing_date,QF.em_name as quatation_fixuser,
                   po_prepartion, po_complete,po_complete_date,PC.em_name as pocomplete_user,crm_purchase_po_details.po_to_supplier,po_to_supplier_date,
                   crm_request_master.sub_store_recieve,approval_level,crm_purchase_po_details.store_recieve,store_receive,
                   user_acknldge,user_acknldge_remarks,ackUser.em_name as acknowUser,user_ack_date,sub_store_name,
                   sub_store_slno, crm_purchase_mast.store_receive_date,CRS.em_name as crs_user,STR.em_name as store_user,substore_ack_date,
                   po_number
             FROM
                  crm_request_master
                LEFT JOIN crm_request_mast_detail on crm_request_mast_detail.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_req_item_collect_details on crm_req_item_collect_details.req_slno=crm_request_master.req_slno
                LEFT JOIN co_department_mast TD ON TD.dept_id=R.dept_id               
                LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
                LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
                LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
                LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
                LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
                LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
                LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
                LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
                LEFT JOIN co_employee_master ED on ED.em_id=crm_request_approval.ed_user
                LEFT JOIN co_employee_master MD on MD.em_id=crm_request_approval.md_user
                LEFT JOIN co_employee_master MAD on MAD.em_id=crm_request_approval.managing_director_user
                LEFT JOIN co_employee_master PA ON PA.em_id=crm_purchase_mast.create_user
                LEFT JOIN co_employee_master QC ON QC.em_id=crm_purchase_mast.quatation_calling_user
                LEFT JOIN co_employee_master QN On QN.em_id=crm_purchase_mast.quatation_negotiation_user
                LEFT JOIN co_employee_master QF ON QF.em_id=crm_purchase_mast.quatation_fixing_user
                LEFT JOIN co_employee_master ackUser on ackUser.em_id=crm_request_master.user_ack_user
                LEFT JOIN co_employee_master PC ON PC.em_id=crm_purchase_mast.po_complete_user
                LEFT JOIN co_employee_master CRS ON CRS.em_id=crm_purchase_mast.store_receive_user
                LEFT JOIN co_employee_master STR ON STR.em_id=crm_req_item_collect_details.substore_user
                LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
                LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno
            WHERE
                 crm_request_master.req_slno = ?
            GROUP BY crm_request_master.req_slno, crm_purchase_po_details.po_number
            ORDER BY crm_request_master.req_slno DESC`,
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
        pool.query(` 
            SELECT 
                   ROW_NUMBER() over (order by req_slno) as slno,crm_request_master.req_slno,req_date,
                   actual_requirement,needed,location,expected_date,emergency_flag,crm_emergencytype_mast.emer_type_name,
                   emergeny_remarks, TD.dept_name,R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as req_user,
                   user_acknldge, user_acknldge_remarks,user_ack_user, user_ack_date,ackUser.em_name as acknowUser,category,
                   GROUP_CONCAT(DISTINCT am_item_type.item_type_name SEPARATOR ', ') AS category_name
            FROM 
                   crm_request_master
   	            LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
	            LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec                 
                LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                LEFT JOIN co_employee_master ackUser on ackUser.em_id=crm_request_master.user_ack_user
                LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id
                LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, CAST(am_item_type.item_type_slno AS JSON), '$') 
            WHERE 
                 req_date  between ? and ? and user_acknldge=1 and req_status='A'
            GROUP BY crm_request_master.req_slno`,
            [
                data.startDate,
                data.endDate
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
            `SELECT 
                   ROW_NUMBER() over (order by req_slno) as slno,crm_request_master.req_slno,req_date,
                   actual_requirement,needed,location,expected_date,emergency_flag,crm_emergencytype_mast.emer_type_name,
                   emergeny_remarks, TD.dept_name,R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as req_user,
                   category,GROUP_CONCAT(DISTINCT am_item_type.item_type_name SEPARATOR ', ') AS category_name
            FROM 
                   crm_request_master
   	            LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
	            LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec                 
                LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id
                LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, CAST(am_item_type.item_type_slno AS JSON), '$') 
            WHERE
                 req_date  between ? and ? and user_acknldge is NULL and req_status='A'
            GROUP BY crm_request_master.req_slno`,
            [
                data.startDate,
                data.endDate
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
            ` SELECT 
                ROW_NUMBER() OVER (ORDER BY req_slno) AS slno,
                crm_request_master.req_slno,
                req_date,
                actual_requirement,
                needed,
                location,
                expected_date,
                emergency_flag,
                crm_emergencytype_mast.emer_type_name,
                emergeny_remarks,
                TD.dept_name,
                R.sec_name AS req_deptsec,
                U.sec_name AS user_deptsection,
                CR.em_name AS req_user,
                user_acknldge,
                user_acknldge_remarks,
                user_ack_user,
                user_ack_date,
                ackUser.em_name AS acknowUser,
                category,
                GROUP_CONCAT(DISTINCT am_item_type.item_type_name SEPARATOR ', ') AS category_name,
                req_status,
                CASE 
                    WHEN req_status IS NULL THEN 'Not Started'
                    WHEN req_status = 'A' THEN 'Approved'
                    WHEN req_status = 'C' AND internally_arranged_status = 1 THEN 'Internally Arranged'
                    WHEN req_status = 'C' THEN 'Closed'
                    WHEN req_status = 'P' THEN 'On Hold'
                    WHEN req_status = 'R' THEN 'Rejected'
                    ELSE 'Unknown'
                END AS approved_status
            FROM 
                crm_request_master
            LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno = crm_request_master.emer_slno
            LEFT JOIN co_deptsec_mast R ON R.sec_id = crm_request_master.request_deptsec_slno
            LEFT JOIN co_deptsec_mast U ON U.sec_id = crm_request_master.user_deptsec                 
            LEFT JOIN co_employee_master CR ON CR.em_id = crm_request_master.create_user
            LEFT JOIN co_employee_master ackUser ON ackUser.em_id = crm_request_master.user_ack_user
            LEFT JOIN co_department_mast TD ON TD.dept_id = R.dept_id
            LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, CAST(am_item_type.item_type_slno AS JSON), '$') 
            WHERE 
                 req_date  between ? and ?
             GROUP BY crm_request_master.req_slno  `,
            [
                data.startDate,
                data.endDate
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
            `SELECT
                   crm_purchase_mast.crm_purchase_slno,ack_status,quatation_calling_status,quatation_negotiation,
                   quatation_fixing,po_prepartion, po_complete,crm_purchase_po_details.po_to_supplier,approval_level            
            FROM
                  crm_purchase_mast
                LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
            WHERE
                  crm_purchase_mast.create_date between ? and ?
            GROUP BY crm_purchase_mast.crm_purchase_slno`,
            [
                data.startDate,
                data.endDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCRFPurchaseAckPending: (callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno, ack_status   
             FROM
                    crm_request_master
                LEFT JOIN crm_request_approval ON crm_request_approval.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno=crm_request_master.req_slno
             WHERE
                ed_approve = 1 AND md_approve = 1 AND user_acknldge is null AND crf_close is null AND ack_status is null
                GROUP BY crm_request_master.req_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getdataAllCRFWithPO: (data, callBack) => {
        pool.query(
            `SELECT 
                   ROW_NUMBER() over (order by req_slno) as slno,crm_request_master.req_slno,req_date,actual_requirement,
                   needed,location,expected_date,emergency_flag,crm_emergencytype_mast.emer_type_name,emergeny_remarks,
                   TD.dept_name,R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as req_user,
                   category,GROUP_CONCAT(DISTINCT am_item_type.item_type_name SEPARATOR ', ') AS category_name,
                   po_number,po_date,expected_delivery,supplier_name,CS.main_store,CS.sub_store_name
            FROM 
                   crm_request_master
   	            LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
	            LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec                 
                LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id
                LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, CAST(am_item_type.item_type_slno AS JSON), '$') 
                LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_store_master CS ON CS.crm_store_master_slno=crm_purchase_po_details.sub_store_slno
            WHERE
                 req_date  between ? and ? and user_acknldge is NULL and req_status='A'
            GROUP BY crm_request_master.req_slno`,
            [
                data.startDate,
                data.endDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getPurchaseDetails: (id, callBack) => {
        pool.query(
            `SELECT  req_slno, ack_status, ack_remarks,AC.em_name as ack_user,crm_purchase_mast.create_date as ack_date,
            quatation_calling_status, quatation_calling_remarks, QC.em_name as quat_call_user, quatation_calling_date, 
            quatation_negotiation, quatation_negotiation_remarks, QN.em_name as quat_nego_user, quatation_negotiation_date,
            quatation_fixing, quatation_fixing_remarks, QF.em_name as quat_final_user, quatation_fixing_date,
            po_prepartion, po_complete, PC.em_name as po_completeuser, po_complete_date, po_approva_level_one, po_approva_level_two, 
            po_to_supplier, store_receive, store_receive_user, store_receive_date, sub_store_recieve
 
                FROM crm_purchase_mast
 
            left join co_employee_master AC on AC.em_id=crm_purchase_mast.create_user
             left join co_employee_master QC on QC.em_id=crm_purchase_mast.quatation_calling_user
              left join co_employee_master QN on QN.em_id=crm_purchase_mast.quatation_negotiation_user
               left join co_employee_master QF on QF.em_id=crm_purchase_mast.quatation_fixing_user
              left join co_employee_master PC on PC.em_id=crm_purchase_mast.po_complete_user

            WHERE req_slno=?`,
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
    getPOdetailStores: (id, callBack) => {
        pool.query(
            `SELECT po_log_slno, po_slno, receive_date,CR.em_name as crs_receive_user, partialy, fully, 
            substore_receive, SR.em_name as sotre_receive_user, substore_receive_date

            FROM crm_po_log_detail 
            left join co_employee_master CR on CR.em_id=crm_po_log_detail.receive_user
            left join co_employee_master SR on SR.em_id=crm_po_log_detail.substore_receive_user
            where po_slno=?`,
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

}
