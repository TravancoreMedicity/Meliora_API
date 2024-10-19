const { pool } = require('../../config/database')
module.exports = {

    getAssetDetails: (data, callback) => {
        pool.query(
            `select 
            am_spare_item_map_slno,
            item_name,
            spare_status,
            am_asset_spare_details.am_item_map_slno,
            item_asset_no
            from
            am_asset_spare_details
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_asset_spare_details.am_item_map_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            where
            am_spare_item_map_slno=?`,

            [
                data.am_spare_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAssetListUnderCustodian: (data, callback) => {

        pool.query(
            `SELECT
            
        am_item_map_slno,
          item_name,
        am_asset_item_map_master.item_creation_slno,
        item_dept_slno,
        item_deptsec_slno,
        item_room_slno, 
        item_subroom_slno, 
        item_rack_slno, item_custodian_dept, 
        item_custodian_dept_sec,
        item_asset_no,
        item_asset_no_only,
        item_create_status, 
        asset_item_service
        from 
        am_asset_item_map_master
        left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
        where
        item_create_status=1
        and
        item_custodian_dept=?
        and
        item_dept_slno=?
        and
        asset_item_service=0`,



            [
                data.item_custodian_dept,
                data.item_dept_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getcomplaintDetails: (data, callback) => {
        pool.query(
            `select 
			cm_complait_slno,
			am_spare_item_map_slno,
			item_name,
			spare_status,
			am_asset_spare_details.am_item_map_slno,
			item_asset_no,
			cm_complaint_mast.complaint_slno,
            S.sec_name as sec_name,
            cm_rectify_time,
            cm_file_status,
            assigned_date,
            cm_file_status,    
            IFNULL( L.sec_name,"Nil" ) location,
            complaint_desc,
            cm_verfy_time,
            suprvsr_verify_time,
            req_type_name,
            pending_onhold_time,
            pending_onhold_user,
            compalint_status,
            cm_query_status,                          
            complaint_dept_secslno,
            complaint_request_slno,
            complaint_hicslno,
            compalint_priority,
            complaint_dept_name,
            complaint_deptslno,
            complaint_typeslno,
            complaint_type_name,
            cm_complaint_mast.rm_room_slno,
            rm_room_name,
            rm_newroom_creation.rm_roomtype_slno,
            rm_room_floor_slno,
			rm_insidebuilldblock_slno,
            rm_insidebuildblock_name,
            rm_floor_name,
            rm_roomtype_name,
            cm_complaint_mast.create_user,
            cm_location,priority_check,
            compalint_status,priority_reason,
            hic_policy_status,
            cm_rectify_status,compdept_message,compdept_message_flag,
            rectify_pending_hold_remarks,message_reply_emp,
            (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            (case when priority_check='1' then "Yes"  else "No" end ) as priority ,
            (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
            (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            verify_spervsr,compalint_date,compalint_status,cm_rectify_status,
            M.em_name as send_user,
            R.em_name as read_user,                       
            O.em_name as holduser,
            V.em_name AS verify_spervsr_name,
            U.em_name as verified_user_name
            from
            am_asset_spare_details
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=am_asset_spare_details.am_item_map_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join cm_comasset_mapping on cm_comasset_mapping.cm_am_assetmap_slno=am_asset_item_map_master.am_item_map_slno
            left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_comasset_mapping.cm_complait_slno
            left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
            left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id 
            left join co_employee_master U on cm_complaint_mast.verified_user = U.em_id                   
            left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
			LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            where
            am_spare_item_map_slno=?
            AND
            spare_status=2
            order by cm_complait_slno desc`,

            [
                data.am_spare_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAssetcomplaintDetails: (data, callback) => {

        pool.query(
            `select 
			cm_complait_slno,	
            item_asset_no_only,
			item_name,	
			am_asset_item_map_master.am_item_map_slno,
			item_asset_no,
			cm_complaint_mast.complaint_slno,
            S.sec_name as sec_name,
            cm_rectify_time,
            cm_file_status,
            assigned_date,
            cm_file_status,    
            IFNULL( L.sec_name,"Nil" ) location,
            complaint_desc,
            cm_verfy_time,
            suprvsr_verify_time,
            req_type_name,
            pending_onhold_time,
            pending_onhold_user,
            compalint_status,
            cm_query_status,                          
            complaint_dept_secslno,
            complaint_request_slno,
            complaint_hicslno,
            compalint_priority,
            complaint_dept_name,
            complaint_deptslno,
            complaint_typeslno,
            complaint_type_name,
            cm_complaint_mast.rm_room_slno,
            rm_room_name,
            rm_newroom_creation.rm_roomtype_slno,
            rm_room_floor_slno,
			rm_insidebuilldblock_slno,
            rm_insidebuildblock_name,
            rm_floor_name,
            rm_roomtype_name,
            cm_complaint_mast.create_user,
            cm_location,priority_check,
            compalint_status,priority_reason,
            hic_policy_status,
            cm_rectify_status,compdept_message,compdept_message_flag,
            rectify_pending_hold_remarks,message_reply_emp,
            (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            (case when priority_check='1' then "Yes"  else "No" end ) as priority ,
            (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
            (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            verify_spervsr,compalint_date,compalint_status,cm_rectify_status,
            M.em_name as send_user,
            R.em_name as read_user,                       
            O.em_name as holduser,
            V.em_name AS verify_spervsr_name,
            U.em_name as verified_user_name
            from
            am_asset_item_map_master    
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join cm_comasset_mapping on cm_comasset_mapping.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
            left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_comasset_mapping.cm_complait_slno
            left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
            left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id 
            left join co_employee_master U on cm_complaint_mast.verified_user = U.em_id                   
            left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
			LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            where 
            item_asset_no=?
            and
            item_asset_no_only=?
            order by cm_complait_slno desc`,

            [
                data.item_asset_no,
                data.item_asset_no_only
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    serviceDetailsInsert: (data, callback) => {
        pool.query(
            `INSERT INTO am_service_details
            (
                service_item_slno,
                service_asset_spare,
                complaint_slno,           
                serviced_emp_details_slno,
                supplier_slno,                      
                expcted_service_date,
                expcted_service_remarks,
                service_hold,
                service_on_hold_reason,
                service_done_status,
                condm_transfr_status,
                condm_transfr_emp,
                condm_transf_remarks,
                add_to_store_user,
                 add_to_store_date,
                service_close_status,
                suppl_serviced_date,
                suppl_serviced_remarks,
                suppl_concted_emp,
                create_user
            )
            VALUES (?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
            [
                data.service_item_slno || null,
                data.service_asset_spare || null,
                data.complaint_slno || null,
                data.serviced_emp_details_slno || null,
                data.supplier_slno || null,
                data.expcted_service_date || null,
                data.expcted_service_remarks || null,
                data.service_hold || null,
                data.service_on_hold_reason || null,
                data.service_done_status || 0,
                data.condm_transfr_status || 0,
                data.condm_transfr_emp || null,
                data.condm_transf_remarks || null,
                data.add_to_store_user || null,
                data.add_to_store_date || null,
                data.service_close_status || 0,
                data.suppl_serviced_date || null,
                data.suppl_serviced_remarks || null,
                data.suppl_concted_emp || null,
                data.create_user || null
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },

    getserviceDetails: (data, callback) => {
        pool.query(
            `SELECT 
                am_service_details_slno,
                service_item_slno,
                service_asset_spare,
                complaint_slno,            
                serviced_emp_details_slno,
                supplier_slno, 
                expcted_service_date,
                expcted_service_remarks,
                service_on_hold_reason,
                service_hold,
                service_done_status,
                condm_transfr_status, 
                condm_transfr_emp,
                condm_transf_remarks,
                add_to_store_user,
                add_to_store_date,
                service_close_status, 
                suppl_serviced_date,
                suppl_serviced_remarks,
                suppl_concted_emp             
             FROM
                am_service_details
             WHERE
                service_item_slno = ? 
                AND service_asset_spare = ?
                AND service_close_status != 1`,
            [
                data.service_item_slno,
                data.service_asset_spare
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },

    serviceDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE
            am_service_details
            SET           
            service_item_slno=?,
            service_asset_spare=?,
            complaint_slno=?,
            serviced_emp_details_slno=?,                   
            supplier_slno=?,
            expcted_service_date=?,
            expcted_service_remarks=?,
            service_hold=?,
            service_on_hold_reason=?,
            service_done_status=?,
            condm_transfr_status=?,
            condm_transfr_emp=?,
            condm_transf_remarks=?,
            add_to_store_user=?,
            add_to_store_date=?,
            service_close_status=?,
            suppl_serviced_date=?,
            suppl_serviced_remarks=?,
            suppl_concted_emp=?,
            edit_user=?
 			WHERE 
             am_service_details_slno=?`,
            [

                data.service_item_slno,
                data.service_asset_spare,
                data.complaint_slno,
                // JSON.stringify(data.serviced_emp_details_slno),
                data.serviced_emp_details_slno,
                data.supplier_slno,
                data.expcted_service_date,
                data.expcted_service_remarks,
                data.service_hold,
                data.service_on_hold_reason,
                data.service_done_status,
                data.condm_transfr_status,
                data.condm_transfr_emp,
                data.condm_transf_remarks,
                data.add_to_store_user,
                data.add_to_store_date,
                data.service_close_status,
                data.suppl_serviced_date,
                data.suppl_serviced_remarks,
                data.suppl_concted_emp,
                data.edit_user,
                data.am_service_details_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getAllserviceDetails: (data, callback) => {
        pool.query(
            //             `
            //  SELECT
            // serviced_emp_details_slno,
            //  service_item_slno,
            //  service_asset_spare,
            //  complaint_slno,
            //  serviced_emp_details_slno,
            //  supplier_slno,
            //  expcted_service_date,
            //  expcted_service_remarks,
            //  condm_transfr_status,
            //  condm_transfr_emp,
            //  service_done_status,
            //  add_to_store_user,
            //  add_to_store_date,
            //  suppl_concted_emp,
            //  suppl_serviced_date,
            //  suppl_serviced_remarks,
            //  service_hold,
            //  service_on_hold_reason,
            //  service_close_status,
            //  service_file_status
            //  FROM
            //     am_service_details
            // LEFT JOIN it_bill_supplier_details_mast ON it_bill_supplier_details_mast.it_supplier_slno = am_service_details.supplier_slno
            // WHERE
            // service_item_slno =?
            // AND service_asset_spare = ?
            // GROUP BY
            //  am_service_details.am_service_details_slno,
            //  service_item_slno,
            //  service_asset_spare,
            //  complaint_slno,
            //  serviced_emp_details_slno,
            //  supplier_slno,
            //  expcted_service_date,
            //  expcted_service_remarks,
            //  condm_transfr_status,
            //  condm_transfr_emp,
            //condm_transf_remarks,
            //  service_done_status,
            //  add_to_store_user,
            //  add_to_store_date,
            //  suppl_concted_emp,
            //  suppl_serviced_date,
            //  suppl_serviced_remarks,
            //  service_hold,
            //  service_on_hold_reason,
            //  service_close_status,
            //  service_file_status
            // ORDER BY am_service_details_slno desc
            //                          `,
            `SELECT
serviced_emp_details_slno,
 service_item_slno,
 service_asset_spare,
 am_service_details.complaint_slno,
 cm_complaint_mast.complaint_slno,
 serviced_emp_details_slno,
 supplier_slno,
 expcted_service_date,
 expcted_service_remarks,
 condm_transfr_status,
 condm_transfr_emp,
 condm_transf_remarks,
 service_done_status,
 add_to_store_user,
 add_to_store_date,
 add_to_store_user,
 em_name,
 suppl_concted_emp,
 suppl_serviced_date,
 suppl_serviced_remarks,
 service_hold,
 service_on_hold_reason,
 service_close_status,
 service_file_status,
  complaint_desc,
 complaint_request_slno,
 complaint_deptslno,
 complaint_typeslno,
 compalint_priority,
 complaint_dept_secslno,
 compalint_status,
 compalint_date,
 S.sec_name as sec_name,
complaint_dept_secslno,
complaint_dept_name,
complaint_deptslno,
complaint_typeslno,
            complaint_type_name,
            cm_complaint_mast.rm_room_slno,
            rm_room_name,
            rm_newroom_creation.rm_roomtype_slno,
            rm_room_floor_slno,
			rm_insidebuilldblock_slno,
            rm_insidebuildblock_name,
            rm_floor_name,
            rm_roomtype_name,
            cm_complaint_mast.create_user,
            cm_location
FROM
    am_service_details
LEFT JOIN it_bill_supplier_details_mast ON it_bill_supplier_details_mast.it_supplier_slno = am_service_details.supplier_slno
LEFT JOIN cm_complaint_mast ON cm_complaint_mast.complaint_slno = am_service_details.complaint_slno
left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
LEFT JOIN co_employee_master ON co_employee_master.em_id =am_service_details.add_to_store_user
LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
WHERE
service_item_slno = ?
AND service_asset_spare = ?
ORDER BY am_service_details_slno desc`,
            [
                data.service_item_slno,
                data.service_asset_spare

            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                if (results.length > 0) {
                    return callback(null, results);
                } else {
                    return callback(null, []);
                }
            }
        );
    },

    AssetDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE
            am_asset_item_map_master
            SET           
            item_dept_slno=?,
            item_deptsec_slno=?,
            item_room_slno=?,
            item_subroom_slno=?,
            item_rack_slno=?,
            asset_item_service=?,
            asset_item_condmnation=?,
            asset_item_condm_user=?,
            asset_item_service_hold=?
 			WHERE 
             am_item_map_slno=?`,

            [
                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_room_slno,
                data.item_subroom_slno,
                data.item_rack_slno,
                data.asset_item_service,
                data.asset_item_condmnation,
                data.asset_item_condm_user,
                data.asset_item_service_hold,
                data.am_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    SpareDetailsUpdate: (data, callback) => {

        pool.query(
            `UPDATE
            am_spare_item_map_master
            SET           
            spare_dept_slno=?,
            spare_deptsec_slno=?,
            spare_room_slno=?,
            spare_subroom_slno=?,
            spare_rack_slno=?,
            spare_service=?,
            spare_service_hold=?
 			WHERE 
             am_spare_item_map_slno=?`,

            [
                data.spare_dept_slno,
                data.spare_deptsec_slno,
                data.spare_room_slno,
                data.spare_subroom_slno,
                data.spare_rack_slno,
                data.spare_service,
                data.spare_service_hold,
                data.am_spare_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    spareServiceUpdate: (data, callback) => {

        pool.query(
            `UPDATE
            am_asset_spare_details
            SET           
            spare_status=?
 			WHERE 
             asset_spare_slno=?`,

            [
                data.spare_status,
                data.asset_spare_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    servicedEmpDetailsInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_serviced_emp_details
            (          
            serviced_emp,
            serviced_date,
            service_issues_identified,
            serviced_issue_remarks,                    
            serviced_create_user
            )
            VALUES (?, ?, ?, ?, ?)`,
            [
                data.serviced_emp || null,
                data.serviced_date || null,
                data.service_issues_identified || null,
                data.serviced_issue_remarks || null,
                data.serviced_create_user || null

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },


    getDeptServiceDetailsData: (data, callBack) => {

        // Parse the stringified array if necessary
        const servicedEmpDetailSlno = typeof data.serviced_emp_detail_slno === 'string'
            ? JSON.parse(data.serviced_emp_detail_slno)
            : data.serviced_emp_detail_slno;

        pool.query(
            `SELECT
                serviced_emp_detail_slno,
                serviced_emp,
                co_employee_master.em_name,
                serviced_date,
                service_issues_identified,
                serviced_issue_remarks,
                serviced_create_user,
                serviced_edit_user
            FROM 
                am_serviced_emp_details
                 left join co_employee_master on co_employee_master.em_id=am_serviced_emp_details.serviced_emp
            WHERE 
                serviced_emp_detail_slno IN (?)`,
            [servicedEmpDetailSlno], // Pass the parsed array
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    servicedEmpDetailsUpdate: (data, callback) => {
        pool.query(
            `UPDATE
            am_serviced_emp_details
            SET           
            serviced_emp=?,
            serviced_date=?,
            service_issues_identified=?,
            serviced_issue_remarks=?,
            serviced_edit_user=?
 			WHERE 
             serviced_emp_detail_slno=?`,
            [

                data.serviced_emp,
                data.serviced_date,
                data.service_issues_identified,
                data.serviced_issue_remarks,
                data.serviced_edit_user,
                data.serviced_emp_detail_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    AssetServiceHoldUpdate: (data, callback) => {

        pool.query(
            `update 
            am_asset_item_map_master
            set
            asset_item_service_hold=?
            where
            am_item_map_slno=?`,

            [
                data.asset_item_service_hold,
                data.am_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    SpareServiceHoldUpdate: (data, callback) => {
        pool.query(
            `update 
            am_spare_item_map_master
            set
            spare_service_hold=?
            where
            am_spare_item_map_slno=?`,

            [
                data.spare_service_hold,
                data.am_spare_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    getAssetAlllDetails: (data, callback) => {
        pool.query(
            `SELECT
            am_item_name_creation.item_creation_slno,  
            am_item_wargar_slno,
            warrenty_status,
            am_bill_date,
            am_bill_no,
            guarenty_status,
            am_item_map_wargrarnt_detail.from_date as wargar_from_date,
			am_item_map_wargrarnt_detail.to_date as wargar_to_date,            
            troll_free,
            ph_one,
            ph_two,
            address,          
            am_amc_cmc_master.from_date as amcm_from_date,
			am_amc_cmc_master.to_date as amcm_to_date,  
            am_lease_mastslno,
            lease_suppler_slno, 
            lease_fromdate,
            lease_todate, 
            lease_amount,
            lease_status,
            amccmc_slno,
            am_amc_cmc_master.amc_status,
            am_amc_cmc_master.cmc_status,
            am_grn_no,
            am_grn_date,      
             am_bill_supplier,
             am_item_map_details.am_asset_old_no,
             am_item_map_details.am_bill_amount,
             lease_amount,
             B.it_supplier_name as bill_supplier_name,
             am_lease_mast_slno,
             L.it_supplier_name as lease_suppliername,
             A.it_supplier_name as amc_cmc_suppliername,
             am_item_name_creation.item_name,category_name,
             am_lease_mastslno,
            lease_suppler_slno,
            am_item_map_details.am_item_map_slno,
            am_item_map_details.am_manufacture_no,
            P.sec_name as prim_cus,
            S.sec_name as second_cus,           
            am_item_name_creation.item_asset_type_slno,
            am_asset_type.asset_type_name,
            am_item_name_creation.item_type_slno,
            am_item_type.item_type_name,
            am_item_name_creation.item_category_slno,
            am_category.category_name, 
			am_item_name_creation.item_subcategory_slno,
            am_subcategory.subcategory_name, 
            am_item_name_creation.item_group_slno,
            am_group.group_name, 
            am_item_name_creation.item_subgroup_slno,
            am_sub_group.sub_group_name,
            am_item_name_creation.item_model_slno,
            am_model.model_name,
            am_item_name_creation.item_submodel_slno,
            am_submodel.submodel_name,
            am_item_name_creation.item_uom_slno,
            am_uom.uom_name,
            am_item_name_creation.item_manufactures_slno,
            am_manufacture.manufacture_name, 
            item_name,
            item_base_name,
            item_model_num,
            item_specific_one,
            item_specific_two,asset_spare,
            item_creation_status
            from am_item_name_creation
            left join am_asset_type on am_asset_type.asset_type_slno=am_item_name_creation.item_asset_type_slno
            left join am_item_type on am_item_type.item_type_slno=am_item_name_creation.item_type_slno
			left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
            left join am_subcategory on am_subcategory.subcategory_slno=am_item_name_creation.item_subcategory_slno
			left join am_group on am_group.group_slno=am_item_name_creation.item_group_slno
            left join am_sub_group on am_sub_group.subgroup_slno=am_item_name_creation.item_subgroup_slno
			left join am_model on am_model.model_slno=am_item_name_creation.item_model_slno
            left join am_submodel on am_submodel.submodel_slno=am_item_name_creation.item_submodel_slno
			left join am_uom on am_uom.uom_slno=am_item_name_creation.item_uom_slno
			left join am_manufacture on am_manufacture.manufacture_slno=am_item_name_creation.item_manufactures_slno
            left join am_asset_item_map_master on am_asset_item_map_master.item_creation_slno=am_item_name_creation.item_creation_slno	
           left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno	
           left join co_deptsec_mast P on P.sec_id=am_item_map_details.am_primary_custodian
           left join  co_deptsec_mast S on S.sec_id=am_item_map_details.am_secondary_custodian		 
           left join am_bill_master on am_bill_master.am_bill_mastslno =am_item_map_details.am_bill_mast_slno
		   left join am_lease_detail_mast on am_lease_detail_mast.am_lease_mastslno=am_item_map_details.am_lease_mast_slno
		   left join it_bill_supplier_details_mast B  on B.it_supplier_slno=am_bill_master.am_bill_supplier
		   left join it_bill_supplier_details_mast L on L.it_supplier_slno=am_lease_detail_mast.lease_suppler_slno		  
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
           left join am_amc_cmc_master on am_amc_cmc_master.amccmc_slno=am_item_map_amcpm_detail.amc_slno
           left join it_bill_supplier_details_mast A on A.it_supplier_slno=am_amc_cmc_master.suplier_slno 
           left join am_item_map_wargrarnt_detail on am_item_map_wargrarnt_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno           
            where
            am_item_name_creation.item_creation_status = 1
            and 
            am_item_map_details.am_item_map_slno=?
            GROUP BY item_creation_slno
            ORDER BY item_creation_slno DESC `,



            [
                data.am_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

}