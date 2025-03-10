const { pool } = require('../../config/database')

module.exports = {
    getRectifycomplt: (id, callBack) => {
        pool.query(
            //     `select cm_complaint_mast.complaint_slno,complaint_desc,assigned_date,complaint_dept_name,req_type_name,complaint_type_name,
            //     assigned_emp,em_name,compalint_status,cm_rectify_status,rectify_pending_hold_remarks,verify_remarks,
            //     S.sec_name as sec_name,  IFNULL( L.sec_name,"Nill" ) location,complaint_remark,cm_location,
            //                 (case when verify_remarks is null then " User Verified" else verify_remarks end ) as verify_remarks1,
            //                 (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            //                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" else "Rectified" end ) as compalint_status1,
            //                  (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "On Progress" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            //                          (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
            //                               date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time, 
            //                         if(cm_complaint_mast.complaint_hicslno is null,'no',hic_policy_name) as hic_policy_name 
            //                from cm_complaint_detail
            //               left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
            //                left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            //                 left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //     left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //                              left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
            //                      left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            //                left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            //               left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            //   where assigned_emp=? and assign_status=1 ORDER BY compalint_date DESC `,
            `
            select 
            cm_complaint_mast.complaint_slno,
  				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
            complaint_desc,assigned_date,complaint_dept_name,req_type_name,complaint_type_name,
            assigned_emp,em_name,compalint_status,cm_rectify_status,rectify_pending_hold_remarks,verify_remarks,
            S.sec_name as sec_name,  IFNULL( L.sec_name,"Nill" ) location,complaint_remark,cm_location,
                        (case when verify_remarks is null then " User Verified" else verify_remarks end ) as verify_remarks1,
                        (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
                        (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" else "Rectified" end ) as compalint_status1,
                         (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "On Progress" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
                                 (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                      date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time, 
                                if(cm_complaint_mast.complaint_hicslno is null,'no',hic_policy_name) as hic_policy_name 
                       from cm_complaint_detail
                      left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
                       left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                        left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                                     left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
                             left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                       left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                      left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
                              left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
          where assigned_emp=? and assign_status=1 ORDER BY compalint_date DESC 
        `,
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
    Updatecomplit: (data, callBack) => {
        pool.query(
            `update cm_complaint_mast 
            set
            compalint_status = ?,
            cm_rectify_time=?,
            cm_rectify_status=?,
            rectify_pending_hold_remarks=?,
            pending_onhold_time=?,
            pending_onhold_user=?,
            verify_spervsr=?,
            cm_hold_reason_slno=?
            where complaint_slno = ?`,
            [
                data.compalint_status,
                data.cm_rectify_time,
                data.cm_rectify_status,
                data.rectify_pending_hold_remarks,
                data.pending_onhold_time,
                data.pending_onhold_user,
                data.verify_spervsr,
                data.cm_hold_reason_slno,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    UpdateVerify: (data, callBack) => {
        pool.query(
            `update cm_complaint_mast 
            set
            compalint_status=?,
            cm_verfy_time=?,
            cm_rectify_status=?,
            verify_remarks=?,
            cm_not_verify_time=?,
            verified_user=?
            where complaint_slno = ?`,
            [
                data.compalint_status,
                data.cm_verfy_time,
                data.cm_rectify_status,
                data.verify_remarks,
                data.cm_not_verify_time,
                data.verified_user,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAssignEmps: (id, callBack) => {
        pool.query(
            `select 
                assigned_emp,
                em_name 
            from cm_complaint_detail
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            where complaint_slno=? and assign_status=1`,
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
    updateassignDetail: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    `update cm_complaint_detail
                   set assign_rect_status=1
                   where assigned_emp=? and complaint_slno=?`,
                    [val.assigned_emp, val.complaint_slno],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results);
                    }
                )
            })
        })
    },

    ReopenComplaintInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO cm_reopen_complaint_log
            (
                reopen_complaint_slno,
                create_user              
            ) 
            VALUES(?,?)`,
            [
                data.complaint_slno,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getlocationbsedAsset: (id, callBack) => {
        pool.query(
            // `select am_asset_item_map_master.am_item_map_slno,item_name,am_asset_no
            // from am_asset_item_map_master
            // left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            // left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
            // where item_deptsec_slno=?`,
            `select 
                am_asset_item_map_master.am_item_map_slno,
                item_name,
                am_asset_no,
                item_asset_no,
                item_asset_no_only
                from am_asset_item_map_master
                left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
                left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
                where item_deptsec_slno=? and asset_item_service =0 and asset_item_condmnation =0`,
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

    AssetMappComplaint: (data, callback) => {
        pool.query(
            `INSERT INTO cm_comasset_mapping
            (
                cm_complait_slno,
                cm_am_assetmap_slno,
                create_user
                ) 
                VALUES(?,?,?)`,
            [
                data.cm_complait_slno,
                data.cm_am_assetmap_slno,
                data.create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    AssetDetailsGet: (id, callBack) => {
        pool.query(
            `select comasset_mapping_slno, cm_complait_slno, cm_am_assetmap_slno,
            item_name,am_asset_no
            from cm_comasset_mapping
            left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=cm_comasset_mapping.cm_am_assetmap_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
            where cm_complait_slno=?`,
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

    updateHoldProgress: (data, callBack) => {

        pool.query(
            `UPDATE            
            cm_complaint_mast
            SET
            compalint_status=?,
            cm_rectify_status=?,
            rectify_pending_hold_remarks=?,
            pending_onhold_time=?,
            pending_onhold_user=?,
            cm_hold_reason_slno=?
            WHERE complaint_slno=? `,
            [
                data.compalint_status,
                data.cm_rectify_status,
                data.rectify_pending_hold_remarks,
                data.pending_onhold_time,
                data.pending_onhold_user,
                data.cm_hold_reason_slno,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getEmplHoldList: (data, callback) => {
        pool.query(
            // `select 
            // cm_complaint_mast.complaint_slno,
            // cm_asset_status,
            // S.sec_name as sec_name,
            // aprrox_date,
            // complaint_remark,
            // cm_file_status,         
            //           IFNULL( L.sec_name,"Nil" ) location,
            //             complaint_desc,
            //             assigned_date,
            //             req_type_name,
            //             cm_hold_reason_slno,
            //             cm_hold_reason,
            //             pending_onhold_time,
            //             pending_onhold_user,
            //             compalint_status,
            //             cm_query_status,                          
            //             complaint_dept_secslno,
            //             complaint_request_slno,
            //             complaint_hicslno,
            //             compalint_priority,
            //             complaint_dept_name,
            //             complaint_deptslno,
            //             complaint_typeslno,
            //             complaint_type_name,
            //             cm_complaint_mast.rm_room_slno,
            //             rm_room_name,
            //             rm_newroom_creation.rm_roomtype_slno,
            //             rm_room_floor_slno,
            //             rm_insidebuilldblock_slno,
            //             rm_insidebuildblock_name,
            //             rm_floor_name,
            //             rm_roomtype_name,
            //             cm_complaint_mast.create_user,                       
            //             cm_location,priority_check,
            //             compalint_status,priority_reason,
            //             hic_policy_status,
            //             cm_rectify_status,compdept_message,compdept_message_flag,
            //             rectify_pending_hold_remarks,message_reply_emp,
            //             (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            //             (case when priority_check='1' then "Yes"  else "No" end ) as priority ,
            //             (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            //             (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
            //                          (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            //                          verify_spervsr,compalint_date,compalint_status,cm_rectify_status,
            //             M.em_name as send_user,
            //             R.em_name as read_user,
            //             O.em_name as holduser,
            //             CR.em_name as comp_reg_emp,
            //             verify_spervsr_remarks                                               
            //             from 
            //             cm_complaint_mast
            //             left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //             left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            //             left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            //             left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            //             left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
            //             left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            //             left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            //             left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            //             left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //             left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //              left join co_employee_master CR on CR.em_id=cm_complaint_mast.create_user
            //             left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //             left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //             LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
            // 			LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            // 			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            //             LEFT JOIN cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id =cm_complaint_mast.cm_hold_reason_slno    
            //     where cm_complaint_detail.assigned_emp=?            
            //     AND cm_rectify_status ='O'
            //     AND assign_status=1
            //     ORDER BY complaint_slno DESC`,
            `           SELECT            
            cm_complaint_mast.complaint_slno,
            cm_asset_status,
            S.sec_name AS sec_name,
            aprrox_date,
            complaint_remark,
            cm_file_status,         
            IFNULL(L.sec_name, "Nil") AS location,
            complaint_desc,
            assigned_date,
            req_type_name,
            cm_hold_reason_slno,
            cm_hold_reason,
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
            cm_location, priority_check,
            compalint_status, priority_reason,
            hic_policy_status,
            cm_rectify_status, compdept_message, compdept_message_flag,
            rectify_pending_hold_remarks, message_reply_emp,
            (CASE WHEN rectify_pending_hold_remarks IS NULL THEN "not updated" ELSE rectify_pending_hold_remarks END) AS rectify_pending_hold_remarks1,
            (CASE WHEN priority_check = '1' THEN "Yes" ELSE "No" END) AS priority,
            (CASE WHEN hic_policy_name IS NOT NULL THEN hic_policy_name ELSE 'Not Suggested' END) AS hic_policy_name,
            (CASE WHEN compalint_status = '0' THEN "not assigned"
            WHEN compalint_status = '1' THEN "assigned"
            WHEN compalint_status = '2' THEN "Rectified"
            WHEN compalint_status = '3' THEN "Verified"
            ELSE "Not" END) AS compalint_status1,
            (CASE WHEN cm_rectify_status = 'R' THEN "Rectified"
            WHEN cm_rectify_status = 'P' THEN "Pending"
            WHEN cm_rectify_status = 'O' THEN "On Hold"
            ELSE "Not" END) AS cm_rectify_status1,
            verify_spervsr, compalint_date, compalint_status, cm_rectify_status,
            M.em_name AS send_user,
            R.em_name AS read_user,
            O.em_name AS holduser,
            A.em_name AS assinged_user,
            CR.em_name AS comp_reg_emp,
            verify_spervsr_remarks,         
            (SELECT GROUP_CONCAT(assigned_emp.em_name SEPARATOR ', ') 
            FROM cm_complaint_detail 
            LEFT JOIN co_employee_master AS assigned_emp ON assigned_emp.em_id = cm_complaint_detail.assigned_emp
            WHERE cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno 
            AND cm_complaint_detail.assign_status = 1) AS assigned_employees,
                        details.rejected,
            details.accepted,
            details.pending
            FROM 
            cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            LEFT JOIN co_employee_master C ON cm_complaint_mast.create_user = C.em_id
            LEFT JOIN co_employee_master M ON cm_complaint_mast.message_send_emp = M.em_id
            LEFT JOIN co_employee_master R ON cm_complaint_mast.message_read_emp = R.em_id
            LEFT JOIN co_employee_master O ON cm_complaint_mast.pending_onhold_user = O.em_id
            LEFT JOIN co_request_type ON cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            LEFT JOIN cm_complaint_dept ON cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            LEFT JOIN cm_complaint_type ON cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            LEFT JOIN co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
            LEFT JOIN co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
            LEFT JOIN co_employee_master CR ON CR.em_id = cm_complaint_mast.create_user
            LEFT JOIN cm_hic_policy ON cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            LEFT JOIN cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id = cm_complaint_mast.cm_hold_reason_slno
             LEFT JOIN co_employee_master A ON A.em_id = cm_complaint_detail.assigned_user
            LEFT JOIN 
            (SELECT 
            complaint_slno,
            COUNT(CASE WHEN assist_flag = 2 THEN 1 END) AS rejected,
            COUNT(CASE WHEN assist_flag = 1 AND assist_receive = 1 THEN 1 END) AS accepted,
            COUNT(CASE WHEN assist_flag = 1 AND assist_receive = 0 THEN 1 END) AS pending
            FROM 
            cm_complaint_detail
            GROUP BY 
            complaint_slno
            ) AS details ON details.complaint_slno = cm_complaint_mast.complaint_slno
            WHERE 
            cm_complaint_detail.assigned_emp = ?
            AND cm_rectify_status = 'O'
            AND assign_status = 1
            ORDER BY 
            complaint_slno DESC   `,
            //     `SELECT            
            //     cm_complaint_mast.complaint_slno,
            //     cm_asset_status,
            //     S.sec_name AS sec_name,
            //     aprrox_date,
            //     complaint_remark,
            //     cm_file_status,         
            //     IFNULL(L.sec_name, "Nil") AS location,
            //     complaint_desc,
            //     assigned_date,
            //     req_type_name,
            //     cm_hold_reason_slno,
            //     cm_hold_reason,
            //     pending_onhold_time,
            //     pending_onhold_user,
            //     compalint_status,
            //     cm_query_status,                          
            //     complaint_dept_secslno,
            //     complaint_request_slno,
            //     complaint_hicslno,
            //     compalint_priority,
            //     complaint_dept_name,
            //     complaint_deptslno,
            //     complaint_typeslno,
            //     complaint_type_name,
            //     cm_complaint_mast.rm_room_slno,
            //     rm_room_name,
            //     rm_newroom_creation.rm_roomtype_slno,
            //     rm_room_floor_slno,
            //     rm_insidebuilldblock_slno,
            //     rm_insidebuildblock_name,
            //     rm_floor_name,
            //     rm_roomtype_name,
            //     cm_complaint_mast.create_user,             
            //     cm_location, priority_check,
            //     compalint_status, priority_reason,
            //     hic_policy_status,
            //     cm_rectify_status, compdept_message, compdept_message_flag,
            //     rectify_pending_hold_remarks, message_reply_emp,
            //     (CASE WHEN rectify_pending_hold_remarks IS NULL THEN "not updated" ELSE rectify_pending_hold_remarks END) AS rectify_pending_hold_remarks1,
            //     (CASE WHEN priority_check = '1' THEN "Yes" ELSE "No" END) AS priority,
            //     (CASE WHEN hic_policy_name IS NOT NULL THEN hic_policy_name ELSE 'Not Suggested' END) AS hic_policy_name,
            //     (CASE WHEN compalint_status = '0' THEN "not assigned"
            //     WHEN compalint_status = '1' THEN "assigned"
            //     WHEN compalint_status = '2' THEN "Rectified"
            //     WHEN compalint_status = '3' THEN "Verified"
            //     ELSE "Not" END) AS compalint_status1,
            //     (CASE WHEN cm_rectify_status = 'R' THEN "Rectified"
            //     WHEN cm_rectify_status = 'P' THEN "Pending"
            //     WHEN cm_rectify_status = 'O' THEN "On Hold"
            //     ELSE "Not" END) AS cm_rectify_status1,
            //     verify_spervsr, compalint_date, compalint_status, cm_rectify_status,
            //     M.em_name AS send_user,
            //     R.em_name AS read_user,
            //     O.em_name AS holduser,
            //     CR.em_name AS comp_reg_emp,
            //     verify_spervsr_remarks,
            //     -- Subquery to fetch assigned employees
            //     (SELECT GROUP_CONCAT(assigned_emp.em_name SEPARATOR ', ') 
            //     FROM cm_complaint_detail 
            //     LEFT JOIN co_employee_master AS assigned_emp ON assigned_emp.em_id = cm_complaint_detail.assigned_emp
            //     WHERE cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno 
            //     AND cm_complaint_detail.assign_status = 1) AS assigned_employees
            //     FROM 
            //     cm_complaint_mast
            //     LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //     LEFT JOIN co_employee_master C ON cm_complaint_mast.create_user = C.em_id
            //     LEFT JOIN co_employee_master M ON cm_complaint_mast.message_send_emp = M.em_id
            //     LEFT JOIN co_employee_master R ON cm_complaint_mast.message_read_emp = R.em_id
            //     LEFT JOIN co_employee_master O ON cm_complaint_mast.pending_onhold_user = O.em_id
            //     LEFT JOIN co_request_type ON cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            //     LEFT JOIN cm_complaint_dept ON cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            //     LEFT JOIN cm_complaint_type ON cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            //     LEFT JOIN co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
            //     LEFT JOIN co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
            //     LEFT JOIN co_employee_master CR ON CR.em_id = cm_complaint_mast.create_user
            //     LEFT JOIN cm_hic_policy ON cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //     LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //     LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            //     LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            //     LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            //     LEFT JOIN cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id = cm_complaint_mast.cm_hold_reason_slno
            //     WHERE 
            //     cm_complaint_detail.assigned_emp = ?
            //     AND cm_rectify_status = 'O'
            //     AND assign_status = 1
            //     ORDER BY 
            //     complaint_slno DESC            
            // `,
            [
                data.assigned_emp
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getEmplRectfiedList: (data, callBack) => {
        pool.query(
            // `select 
            // cm_complaint_mast.complaint_slno,
            // cm_asset_status,
            // S.sec_name as sec_name,
            // cm_rectify_time,
            // cm_file_status,
            // assigned_date,
            // suprvsr_verify_time,
            // IFNULL( L.sec_name,"Nil" ) location,
            //             complaint_desc,
            //             req_type_name,
            //             pending_onhold_time,
            //             pending_onhold_user,
            //             compalint_status,
            //             cm_query_status,                          
            //             complaint_dept_secslno,
            //             complaint_request_slno,
            //             complaint_hicslno,
            //             compalint_priority,
            //             complaint_dept_name,
            //             complaint_deptslno,
            //             complaint_typeslno,
            //             complaint_type_name,
            //             cm_complaint_mast.rm_room_slno,
            //             rm_room_name,
            //             rm_newroom_creation.rm_roomtype_slno,
            //             rm_room_floor_slno,
            //             rm_insidebuilldblock_slno,
            //             rm_insidebuildblock_name,
            //             rm_floor_name,
            //             rm_roomtype_name,
            //             cm_complaint_mast.create_user,
            //             cm_location,priority_check,
            //             compalint_status,priority_reason,
            //             hic_policy_status,
            //             cm_rectify_status,compdept_message,compdept_message_flag,
            //             rectify_pending_hold_remarks,message_reply_emp,
            //             (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            //             (case when priority_check='1' then "Yes"  else "No" end ) as priority ,
            //             (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            //             (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
            //                          (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            //                          verify_spervsr,compalint_date,compalint_status,cm_rectify_status,
            //             M.em_name as send_user,
            //             R.em_name as read_user,                       
            //             O.em_name as holduser,
            //             V.em_name AS verify_spervsr_name,
            //             CR.em_name as comp_reg_emp
            //             from 
            //             cm_complaint_mast
            //             left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //             left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            //             left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            //             left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            //             left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id                   
            //             left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id 
            //             left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            //             left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            //             left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            //             left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //             left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //             left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //             left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //             LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
            // 			LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            //             left join co_employee_master CR on CR.em_id=cm_complaint_mast.create_user
            // 			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            //              WHERE
            //             cm_complaint_detail.assigned_emp=?
            //             AND cm_rectify_status ='R'
            //             AND assign_status=1
            //             And cm_rectify_time between ? and ?
            //             ORDER BY complaint_slno DESC
            //        `,
            `select             
            cm_complaint_mast.complaint_slno,
            cm_asset_status,
            S.sec_name as sec_name,
            cm_rectify_time,
            cm_file_status,
            assigned_date,
            suprvsr_verify_time,
            IFNULL(L.sec_name,"Nil") as location,
            complaint_desc,
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
            cm_location,
            priority_check,
            compalint_status,
            priority_reason,
            hic_policy_status,
            cm_rectify_status,
            compdept_message,
            compdept_message_flag,
            rectify_pending_hold_remarks,
            message_reply_emp,
            (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end) as rectify_pending_hold_remarks1,
            (case when priority_check='1' then "Yes" else "No" end) as priority,
            (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end) as hic_policy_name,
            (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified" when compalint_status = '3' then "Verified" else "Not" end) as compalint_status1,
            (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end) as cm_rectify_status1,
            verify_spervsr,
            compalint_date,
            compalint_status,
            cm_rectify_status,
            M.em_name as send_user,
            R.em_name as read_user,
            O.em_name as holduser,
            V.em_name AS verify_spervsr_name,
            CR.em_name as comp_reg_emp,
            -- Subquery to fetch assigned employees
            (SELECT GROUP_CONCAT(em_name) 
            FROM cm_complaint_detail D
            LEFT JOIN co_employee_master E ON E.em_id = D.assigned_emp
            WHERE D.complaint_slno = cm_complaint_mast.complaint_slno AND D.assign_status = 1) AS assigned_employees
            from 
            cm_complaint_mast
            left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
            left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id
            left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            left join co_deptsec_mast S on S.sec_id = cm_complaint_mast.complaint_dept_secslno
            left join co_deptsec_mast L on L.sec_id = cm_complaint_mast.cm_location
            left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            left join co_employee_master CR on CR.em_id = cm_complaint_mast.create_user
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            WHERE
            cm_complaint_detail.assigned_emp = ?
            AND cm_rectify_status = 'R'
            AND assign_status = 1
            AND cm_rectify_time BETWEEN ? AND ?
            ORDER BY complaint_slno DESC            
`,
            [
                data.assigned_emp,
                data.from,
                data.to

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getEmplVerifiedList: (data, callBack) => {
        pool.query(
            // `select 
            // cm_complaint_mast.complaint_slno,
            // cm_asset_status,
            // S.sec_name as sec_name,
            // cm_file_status,
            // cm_rectify_time,
            // assigned_date,
            // suprvsr_verify_time,         
            // cm_verfy_time,  
            // IFNULL( L.sec_name,"Nil" ) location,
            //             complaint_desc,
            //             req_type_name,
            //             pending_onhold_time,
            //             pending_onhold_user,
            //             compalint_status,
            //             cm_query_status,                          
            //             complaint_dept_secslno,
            //             complaint_request_slno,
            //             complaint_hicslno,
            //             compalint_priority,
            //             complaint_dept_name,
            //             complaint_deptslno,
            //             complaint_typeslno,
            //             complaint_type_name,
            //             cm_complaint_mast.rm_room_slno,
            //             rm_room_name,
            //             rm_newroom_creation.rm_roomtype_slno,
            //             rm_room_floor_slno,
            //             rm_insidebuilldblock_slno,
            //             rm_insidebuildblock_name,
            //             rm_floor_name,
            //             rm_roomtype_name,
            //             cm_complaint_mast.create_user,
            //             cm_location,priority_check,
            //             compalint_status,priority_reason,
            //             hic_policy_status,
            //             cm_rectify_status,compdept_message,compdept_message_flag,
            //             rectify_pending_hold_remarks,message_reply_emp,
            //             (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            //             (case when priority_check='1' then "Yes"  else "No" end ) as priority ,
            //             (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            //             (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
            //                          (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            //                          verify_spervsr,compalint_date,compalint_status,cm_rectify_status,
            //             M.em_name as send_user,
            //             R.em_name as read_user,                       
            //             O.em_name as holduser,
            //             V.em_name AS verify_spervsr_name,
            //             U.em_name as verified_user_name,
            //             CR.em_name as comp_reg_emp
            //             from 
            //             cm_complaint_mast
            //             left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //             left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            //             left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            //             left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            //             left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
            //             left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id 
            //             left join co_employee_master U on cm_complaint_mast.verified_user = U.em_id                   
            //             left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            //             left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            //             left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            //             left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //             left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //             left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //             left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //             LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
            // 			LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            //             left join co_employee_master CR on CR.em_id=cm_complaint_mast.create_user
            // 			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            //              WHERE
            //             cm_complaint_detail.assigned_emp=?
            //             AND cm_rectify_status ='V'
            //             AND assign_status=1
            //             And cm_verfy_time between ? and ?
            //             ORDER BY complaint_slno DESC
            //        `,
            `SELECT            
            cm_complaint_mast.complaint_slno,
            cm_asset_status,
            cm_verfy_time,
            S.sec_name AS sec_name,
            cm_file_status,
            cm_rectify_time,
            assigned_date,
            suprvsr_verify_time,
            IFNULL(L.sec_name, 'Nil') AS location,
            complaint_desc,
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
            cm_location,
            priority_check,
            compalint_status,
            priority_reason,
            hic_policy_status,
            cm_rectify_status,
            compdept_message,
            compdept_message_flag,
            rectify_pending_hold_remarks,
            message_reply_emp,
            (CASE 
            WHEN rectify_pending_hold_remarks IS NULL THEN 'not updated' 
            ELSE rectify_pending_hold_remarks 
            END) AS rectify_pending_hold_remarks1,
            (CASE 
            WHEN priority_check = '1' THEN 'Yes' 
            ELSE 'No' 
            END) AS priority,
            (CASE 
            WHEN hic_policy_name IS NOT NULL THEN hic_policy_name 
            ELSE 'Not Suggested' 
            END) AS hic_policy_name,
            (CASE 
            WHEN compalint_status = '0' THEN 'not assigned' 
            WHEN compalint_status = '1' THEN 'assigned' 
            WHEN compalint_status = '2' THEN 'Rectified'  
            WHEN compalint_status = '3' THEN 'Verified'  
            ELSE 'Not' 
            END) AS compalint_status1,
            (CASE 
            WHEN cm_rectify_status = 'R' THEN 'Rectified' 
            WHEN cm_rectify_status = 'P' THEN 'Pending' 
            WHEN cm_rectify_status = 'O' THEN 'On Hold' 
            ELSE 'Not' 
            END) AS cm_rectify_status1,
            verify_spervsr,
            compalint_date,
            compalint_status,
            cm_rectify_status,
            M.em_name AS send_user,
            R.em_name AS read_user,
            O.em_name AS holduser,
            V.em_name AS verify_spervsr_name,
            U.em_name AS verified_user_name,
            CR.em_name AS comp_reg_emp,
            -- Subquery to fetch assigned employees
            (SELECT GROUP_CONCAT(em_name) 
            FROM cm_complaint_detail D
            LEFT JOIN co_employee_master E ON E.em_id = D.assigned_emp
            WHERE D.complaint_slno = cm_complaint_mast.complaint_slno 
            AND D.assign_status = 1) AS assigned_employees
            FROM 
            cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            LEFT JOIN co_employee_master C ON cm_complaint_mast.create_user = C.em_id
            LEFT JOIN co_employee_master M ON cm_complaint_mast.message_send_emp = M.em_id
            LEFT JOIN co_employee_master R ON cm_complaint_mast.message_read_emp = R.em_id
            LEFT JOIN co_employee_master O ON cm_complaint_mast.pending_onhold_user = O.em_id
            LEFT JOIN co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id 
            LEFT JOIN co_employee_master U ON cm_complaint_mast.verified_user = U.em_id
            LEFT JOIN co_request_type ON cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            LEFT JOIN cm_complaint_dept ON cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno   
            LEFT JOIN cm_complaint_type ON cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            LEFT JOIN co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
            LEFT JOIN co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
            LEFT JOIN cm_hic_policy ON cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            LEFT JOIN co_employee_master CR ON CR.em_id = cm_complaint_mast.create_user
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            WHERE
            cm_complaint_detail.assigned_emp = ?            
            AND cm_rectify_status = 'V'
            AND assign_status = 1
            AND cm_verfy_time BETWEEN ? AND ?
            ORDER BY complaint_slno DESC;`,

            [
                data.assigned_emp,
                data.from,
                data.to

            ],
            (error, results, feilds) => {


                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );

    },

    getUserEndRectfiedList: (data, callBack) => {

        pool.query(
            // `select 
            // cm_complaint_mast.complaint_slno,
            // cm_asset_status,
            // S.sec_name as sec_name,
            // cm_file_status,
            // cm_rectify_time,
            // suprvsr_verify_time,
            // assigned_date,           
            // IFNULL( L.sec_name,"Nil" ) location,
            //             complaint_desc,
            //             req_type_name,
            //             pending_onhold_time,
            //             pending_onhold_user,
            //             compalint_status,
            //             cm_query_status,                          
            //             complaint_dept_secslno,
            //             complaint_request_slno,
            //             complaint_hicslno,
            //             compalint_priority,
            //             complaint_dept_name,
            //             complaint_deptslno,
            //             complaint_typeslno,
            //             complaint_type_name,
            //             cm_complaint_mast.rm_room_slno,
            //             rm_room_name,
            //             rm_newroom_creation.rm_roomtype_slno,
            //             rm_room_floor_slno,
            //             rm_insidebuilldblock_slno,
            //             rm_insidebuildblock_name,
            //             rm_floor_name,
            //             rm_roomtype_name,
            //             cm_complaint_mast.create_user,
            //             cm_location,priority_check,
            //             compalint_status,priority_reason,
            //             hic_policy_status,
            //             cm_rectify_status,compdept_message,compdept_message_flag,
            //             rectify_pending_hold_remarks,message_reply_emp,
            //             (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            //             (case when priority_check='1' then "Yes"  else "No" end ) as priority ,
            //             (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            //             (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
            //                          (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            //                          verify_spervsr,compalint_date,compalint_status,cm_rectify_status,
            //             M.em_name as send_user,
            //             R.em_name as read_user,                       
            //             O.em_name as holduser,
            //             V.em_name AS verify_spervsr_name,
            //             CR.em_name as comp_reg_emp
            //             from 
            //             cm_complaint_mast
            //             left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //             left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            //             left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            //             left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            //             left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
            //             left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id
            //             left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            //             left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            //             left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            //             left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //             left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //             left join co_employee_master CR on CR.em_id=cm_complaint_mast.create_user
            //             left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //             left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //             LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
            // 			LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            // 			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            //              WHERE
            //             complaint_dept_secslno=?
            //             AND cm_rectify_status ='R' 
            //             And cm_rectify_time between ? and ?
            //             GROUP BY 
            //             cm_complaint_mast.complaint_slno
            //             ORDER BY 
            //             complaint_slno DESC `,
            `SELECT            
            cm_complaint_mast.complaint_slno,
            cm_asset_status,
            S.sec_name as sec_name,
            cm_file_status,
            cm_rectify_time,
            suprvsr_verify_time,
            assigned_date,           
            IFNULL(L.sec_name, "Nil") location,
            complaint_desc,
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
            cm_location, priority_check,
            compalint_status, priority_reason,
            hic_policy_status,
            cm_rectify_status, compdept_message, compdept_message_flag,
            rectify_pending_hold_remarks, message_reply_emp,
            (CASE WHEN rectify_pending_hold_remarks IS NULL THEN "not updated" ELSE rectify_pending_hold_remarks END) AS rectify_pending_hold_remarks1,
            (CASE WHEN priority_check = '1' THEN "Yes" ELSE "No" END) AS priority,
            (CASE WHEN hic_policy_name IS NOT NULL THEN hic_policy_name ELSE 'Not Suggested' END) AS hic_policy_name,
            (CASE WHEN compalint_status = '0' THEN "not assigned" 
            WHEN compalint_status = '1' THEN "assigned" 
            WHEN compalint_status = '2' THEN "Rectified"  
            WHEN compalint_status = '3' THEN "Verified"  
            ELSE "Not" END) AS compalint_status1,
            (CASE WHEN cm_rectify_status = 'R' THEN "Rectified" 
            WHEN cm_rectify_status = 'P' THEN "Pending" 
            WHEN cm_rectify_status = 'O' THEN "On Hold" 
            ELSE "Not" END) AS cm_rectify_status1,
            verify_spervsr, compalint_date, compalint_status, cm_rectify_status,
            M.em_name AS send_user,
            R.em_name AS read_user,                       
            O.em_name AS holduser,
            V.em_name AS verify_spervsr_name,
            CR.em_name AS comp_reg_emp,
            (SELECT GROUP_CONCAT(E.em_name SEPARATOR ', ') 
            FROM cm_complaint_detail D
            LEFT JOIN co_employee_master E ON D.assigned_emp = E.em_id
            WHERE D.complaint_slno = cm_complaint_mast.complaint_slno AND D.assign_status = 1) AS assinged_employees
            FROM 
            cm_complaint_mast
            LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            LEFT JOIN co_employee_master C ON cm_complaint_mast.create_user = C.em_id
            LEFT JOIN co_employee_master M ON cm_complaint_mast.message_send_emp = M.em_id
            LEFT JOIN co_employee_master R ON cm_complaint_mast.message_read_emp = R.em_id
            LEFT JOIN co_employee_master O ON cm_complaint_mast.pending_onhold_user = O.em_id
            LEFT JOIN co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id
            LEFT JOIN co_request_type ON cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            LEFT JOIN cm_complaint_dept ON cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            LEFT JOIN cm_complaint_type ON cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            LEFT JOIN co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
            LEFT JOIN co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
            LEFT JOIN co_employee_master CR ON CR.em_id = cm_complaint_mast.create_user
            LEFT JOIN cm_hic_policy ON cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            WHERE
            complaint_dept_secslno = ?
            AND cm_rectify_status = 'R' 
            AND cm_rectify_time BETWEEN ? AND ?
            GROUP BY 
            cm_complaint_mast.complaint_slno
            ORDER BY 
            complaint_slno DESC;
            
`,
            [
                data.complaint_dept_secslno,
                data.from,
                data.to

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserEndVerifiedList: (data, callBack) => {
        pool.query(
            `select 
            cm_complaint_mast.complaint_slno,
            cm_asset_status,
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
                         CR.em_name AS comp_reg_emp,
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
            (SELECT GROUP_CONCAT(E.em_name SEPARATOR ', ') 
            FROM cm_complaint_detail D
            LEFT JOIN co_employee_master E ON D.assigned_emp = E.em_id
            WHERE D.complaint_slno = cm_complaint_mast.complaint_slno AND D.assign_status = 1) AS assinged_employees,
                        U.em_name as verified_user_name
                        from 
                        cm_complaint_mast
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
                         LEFT JOIN co_employee_master CR ON CR.em_id = cm_complaint_mast.create_user
            			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
                         WHERE
                        complaint_dept_secslno=?
                        AND cm_rectify_status ='V' 
                        And cm_verfy_time between ? and ?
                         GROUP BY 
                        cm_complaint_mast.complaint_slno
                        ORDER BY 
                        complaint_slno DESC
                   `,
            //             `SELECT            
            //             cm_complaint_mast.complaint_slno,
            //             cm_asset_status,
            //             S.sec_name as sec_name,
            //             cm_file_status,
            //             cm_rectify_time,
            //             suprvsr_verify_time,
            //             assigned_date,           
            //             IFNULL(L.sec_name, "Nil") location,
            //             complaint_desc,
            //             req_type_name,
            //             pending_onhold_time,
            //             pending_onhold_user,
            //             compalint_status,
            //             cm_query_status,                          
            //             complaint_dept_secslno,
            //             complaint_request_slno,
            //             complaint_hicslno,
            //             compalint_priority,
            //             complaint_dept_name,
            //             complaint_deptslno,
            //             complaint_typeslno,
            //             complaint_type_name,
            //             cm_complaint_mast.rm_room_slno,
            //             rm_room_name,
            //             rm_newroom_creation.rm_roomtype_slno,
            //             rm_room_floor_slno,
            //             rm_insidebuilldblock_slno,
            //             rm_insidebuildblock_name,
            //             rm_floor_name,
            //             rm_roomtype_name,
            //             cm_complaint_mast.create_user,
            //             cm_location, priority_check,
            //             compalint_status, priority_reason,
            //             hic_policy_status,
            //             cm_rectify_status, compdept_message, compdept_message_flag,
            //             rectify_pending_hold_remarks, message_reply_emp,
            //             (CASE WHEN rectify_pending_hold_remarks IS NULL THEN "not updated" ELSE rectify_pending_hold_remarks END) AS rectify_pending_hold_remarks1,
            //             (CASE WHEN priority_check = '1' THEN "Yes" ELSE "No" END) AS priority,
            //             (CASE WHEN hic_policy_name IS NOT NULL THEN hic_policy_name ELSE 'Not Suggested' END) AS hic_policy_name,
            //             (CASE WHEN compalint_status = '0' THEN "not assigned" 
            //             WHEN compalint_status = '1' THEN "assigned" 
            //             WHEN compalint_status = '2' THEN "Rectified"  
            //             WHEN compalint_status = '3' THEN "Verified"  
            //             ELSE "Not" END) AS compalint_status1,
            //             (CASE WHEN cm_rectify_status = 'R' THEN "Rectified" 
            //             WHEN cm_rectify_status = 'P' THEN "Pending" 
            //             WHEN cm_rectify_status = 'O' THEN "On Hold" 
            //             ELSE "Not" END) AS cm_rectify_status1,
            //             verify_spervsr, compalint_date, compalint_status, cm_rectify_status,
            //             M.em_name AS send_user,
            //             R.em_name AS read_user,                       
            //             O.em_name AS holduser,
            //             V.em_name AS verify_spervsr_name,
            //             CR.em_name AS comp_reg_emp,
            //             (SELECT GROUP_CONCAT(E.em_name SEPARATOR ', ') 
            //             FROM cm_complaint_detail D
            //             LEFT JOIN co_employee_master E ON D.assigned_emp = E.em_id
            //             WHERE D.complaint_slno = cm_complaint_mast.complaint_slno AND D.assign_status = 1) AS assinged_employees
            //             FROM 
            //             cm_complaint_mast
            //             LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //             LEFT JOIN co_employee_master C ON cm_complaint_mast.create_user = C.em_id
            //             LEFT JOIN co_employee_master M ON cm_complaint_mast.message_send_emp = M.em_id
            //             LEFT JOIN co_employee_master R ON cm_complaint_mast.message_read_emp = R.em_id
            //             LEFT JOIN co_employee_master O ON cm_complaint_mast.pending_onhold_user = O.em_id
            //             LEFT JOIN co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id
            //             LEFT JOIN co_request_type ON cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            //             LEFT JOIN cm_complaint_dept ON cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            //             LEFT JOIN cm_complaint_type ON cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            //             LEFT JOIN co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
            //             LEFT JOIN co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
            //             LEFT JOIN co_employee_master CR ON CR.em_id = cm_complaint_mast.create_user
            //             LEFT JOIN cm_hic_policy ON cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //             LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //             LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            //             LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            //             LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            //             WHERE
            //             complaint_dept_secslno = ?
            //             AND cm_rectify_status = 'V' 
            //             AND cm_verfy_time BETWEEN ? AND ?
            //             GROUP BY 
            //             cm_complaint_mast.complaint_slno
            //             ORDER BY 
            //             complaint_slno DESC;

            // `,
            [
                data.complaint_dept_secslno,
                data.from,
                data.to

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getDepartmentPendingList: (data, callBack) => {
        pool.query(
            // `select           
            //     verify_spervsr_remarks,
            //     cm_complaint_mast.complaint_slno,
            //     cm_asset_status,
            //     rectify_pending_hold_remarks,
            //     complaint_desc,
            //     cm_hold_reason,
            //     cm_file_status,
            //     complaint_dept_name,
            //     req_type_name,
            //     aprrox_date,
            //     complaint_remark,
            //     compalint_priority,
            //     cm_complaint_mast.rm_room_slno,
            // 	rm_room_name,
            // 	rm_newroom_creation.rm_roomtype_slno,
            // 	rm_room_floor_slno,
            // 	rm_insidebuilldblock_slno,
            // 	rm_insidebuildblock_name,
            // 	rm_floor_name,
            //     priority_check,
            // 	rm_roomtype_name,
            //     pending_onhold_time,
            //     cm_query_status,
            //     assigned_date,                
            //     complaint_type_name,compalint_date,cm_rectify_status,cm_not_verify_time,verify_remarks,
            //     S.sec_name as sec_name, priority_reason,complaint_hicslno,
            //     IFNULL( L.sec_name,"Nil" ) location,C.em_name as comp_reg_emp,
            //     cm_complaint_mast.create_user,C.em_department,
            //     co_department_mast.dept_name as empdept,compalint_priority,
            //     (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
            //     when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
            //     else  "Not Updated" end ) as priority,     
            //     cm_priority_mast.cm_priority_desc as priority_remark,verify_spervsr,
            //     compdept_message,compdept_message_flag,message_reply_emp,
            //     M.em_name as msg_send_emp,
            //     R.em_name as msg_read_emp,
            //     O.em_name as holduser
            //     from cm_complaint_mast
            //     left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //     left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            //     left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            //     left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            //     left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //     left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
            //     left join co_employee_master M on M.em_id=cm_complaint_mast.message_send_emp
            //     left join co_employee_master R on R.em_id=cm_complaint_mast.message_read_emp
            //     left join co_department_mast on co_department_mast.dept_id=C.em_department
            //     left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            //     left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //     left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //     LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
            //     LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            //     LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            //     left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
            //     left join cm_hold_reason_mast on cm_hold_reason_mast.cm_hold_id=cm_complaint_mast.cm_hold_reason_slno
            //     where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //     where department_slno= ?)
            //     AND compalint_status!=0
            //     And (cm_rectify_status is null or cm_rectify_status ='O' or cm_rectify_status ='Z')
            //     GROUP BY 
            //     cm_complaint_mast.complaint_slno
            //     ORDER BY 
            //     complaint_slno DESC`,
            `SELECT             
            verify_spervsr_remarks,
            cm_complaint_mast.complaint_slno,
            cm_asset_status,
            rectify_pending_hold_remarks,
            complaint_desc,
            cm_hold_reason,            
            cm_file_status,
            complaint_dept_name,
            req_type_name,
            aprrox_date,
            complaint_remark,
            compalint_priority,
            cm_complaint_mast.rm_room_slno,            
            rm_room_name,
            rm_newroom_creation.rm_roomtype_slno,            
            rm_room_floor_slno,
            rm_insidebuilldblock_slno,
            rm_insidebuildblock_name,
            rm_floor_name,
            priority_check,
            rm_roomtype_name,
            pending_onhold_time,
            cm_query_status,
            assigned_date,
            complaint_type_name,
            compalint_date,
            cm_rectify_status,
            cm_not_verify_time,
            verify_remarks,            
            S.sec_name AS sec_name,
            priority_reason,
            complaint_hicslno,
            IFNULL(L.sec_name, "Nil") AS location,
            C.em_name AS comp_reg_emp,           
            cm_complaint_mast.create_user,
            C.em_department,
            co_department_mast.dept_name AS empdept,
            compalint_priority,
    (CASE 
    WHEN compalint_priority = '1' THEN "Level 1" 
    WHEN compalint_priority = '2' THEN "Level 2"
    WHEN compalint_priority = '3' THEN "Level 3" 
    WHEN compalint_priority = '4' THEN "Level 4"
    ELSE "Not Updated" 
    END) AS priority,
    cm_priority_mast.cm_priority_desc AS priority_remark,    
    verify_spervsr,
    compdept_message,
    compdept_message_flag,
    message_reply_emp,
    M.em_name AS msg_send_emp,
    R.em_name AS msg_read_emp,
    A.em_name AS assinged_user,
    O.em_name AS holduser,    
    -- Subquery to fetch assigned employees without their IDs
    (SELECT GROUP_CONCAT(em_name SEPARATOR ', ') 
     FROM cm_complaint_detail 
     LEFT JOIN co_employee_master 
     ON co_employee_master.em_id = cm_complaint_detail.assigned_emp 
     WHERE cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno 
     AND cm_complaint_detail.assign_status = 1) AS assigned_employees    
     FROM 
     cm_complaint_mast
     LEFT JOIN cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
     LEFT JOIN co_request_type ON co_request_type.req_type_slno = cm_complaint_mast.complaint_request_slno
     LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno = cm_complaint_mast.complaint_deptslno
     LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno = cm_complaint_mast.complaint_typeslno
     LEFT JOIN co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
     LEFT JOIN co_employee_master C ON C.em_id = cm_complaint_mast.create_user
     
     LEFT JOIN co_employee_master M ON M.em_id = cm_complaint_mast.message_send_emp
     LEFT JOIN co_employee_master R ON R.em_id = cm_complaint_mast.message_read_emp
     LEFT JOIN co_department_mast ON co_department_mast.dept_id = C.em_department
     LEFT JOIN cm_priority_mast ON cm_priority_mast.cm_priority_slno = cm_complaint_mast.compalint_priority
     LEFT JOIN co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
     LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
     LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
     LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
     LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
     LEFT JOIN co_employee_master O ON cm_complaint_mast.pending_onhold_user = O.em_id
     LEFT JOIN cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id = cm_complaint_mast.cm_hold_reason_slno
     LEFT JOIN co_employee_master A ON A.em_id = cm_complaint_detail.assigned_user
     WHERE 
     complaint_deptslno = (
        SELECT complaint_dept_slno 
        FROM cm_complaint_dept 
        WHERE department_slno = ?
        )
        AND compalint_status != 0
        AND (cm_rectify_status IS NULL OR cm_rectify_status = 'O' OR cm_rectify_status = 'Z')
        GROUP BY 
        cm_complaint_mast.complaint_slno
        ORDER BY 
        complaint_slno DESC`,
            [
                data.complaint_deptslno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getDepartmentRectfiedList: (data, callBack) => {
        pool.query(
            // `select 
            //             cm_complaint_mast.complaint_slno,
            //             cm_asset_status,
            //             S.sec_name as sec_name,
            //             cm_file_status,
            //             cm_rectify_time,
            //             assigned_date,
            //              suprvsr_verify_time,    
            //             IFNULL( L.sec_name,"Nil" ) location,
            //             complaint_desc,
            //             req_type_name,
            //             pending_onhold_time,
            //             pending_onhold_user,
            //             compalint_status,
            //             cm_query_status,                          
            //             complaint_dept_secslno,
            //             complaint_request_slno,
            //             complaint_hicslno,
            //             compalint_priority,
            //             complaint_dept_name,
            //             complaint_deptslno,
            //             complaint_typeslno,
            //             complaint_type_name,
            //             cm_complaint_mast.rm_room_slno,
            //             rm_room_name,
            //             rm_newroom_creation.rm_roomtype_slno,
            //             rm_room_floor_slno,
            //             rm_insidebuilldblock_slno,
            //             rm_insidebuildblock_name,
            //             rm_floor_name,
            //             rm_roomtype_name,
            //             cm_complaint_mast.create_user,
            //             cm_location,priority_check,
            //             compalint_status,priority_reason,
            //             hic_policy_status,
            //             cm_rectify_status,compdept_message,compdept_message_flag,
            //             rectify_pending_hold_remarks,message_reply_emp,
            //             (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            //             (case when priority_check='1' then "Yes"  else "No" end ) as priority ,
            //             (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            //             (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
            //                          (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            //                          verify_spervsr,compalint_date,compalint_status,cm_rectify_status,
            //             M.em_name as send_user,
            //             R.em_name as read_user,                       
            //             O.em_name as holduser,                        
            //             V.em_name AS verify_spervsr_name,
            //             CR.em_name as comp_reg_emp
            //             from 
            //             cm_complaint_mast
            //             left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //             left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            //             left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            //             left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            //             left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
            //             left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id                   
            //             left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            //             left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            //             left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            //             left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //             left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //              left join co_employee_master CR on CR.em_id=cm_complaint_mast.create_user
            //             left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //             left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //             LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
            // 			LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            // 			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            //             where
            //             complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //            where department_slno= ?)
            //             AND cm_rectify_status ='R' 
            //             And cm_rectify_time between ? and ?
            //             GROUP BY 
            //             cm_complaint_mast.complaint_slno
            //             ORDER BY 
            //             complaint_slno DESC
            //        `,
            `select 
    cm_complaint_mast.complaint_slno,
    cm_asset_status,
    S.sec_name as sec_name,
    cm_file_status,
    cm_rectify_time,
    assigned_date,
    suprvsr_verify_time,
    IFNULL(L.sec_name, "Nil") location,
    complaint_desc,
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
    cm_location,
    priority_check,
    compalint_status,
    priority_reason,
    hic_policy_status,
    cm_rectify_status,
    compdept_message,
    compdept_message_flag,
    rectify_pending_hold_remarks,
    message_reply_emp,
    (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end) as rectify_pending_hold_remarks1,
    (case when priority_check = '1' then "Yes" else "No" end) as priority,
    (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end) as hic_policy_name,
    (case when compalint_status = '0' then "not assigned"
          when compalint_status = '1' then "assigned"
          when compalint_status = '2' then "Rectified"
          when compalint_status = '3' then "Verified"
          else "Not" end) as compalint_status1,
    (case when cm_rectify_status = 'R' then "Rectified"
          when cm_rectify_status = 'P' then "Pending"
          when cm_rectify_status = 'O' then "On Hold"
          else "Not" end) as cm_rectify_status1,
    verify_spervsr,
    compalint_date,
    compalint_status,
    cm_rectify_status,
    M.em_name as send_user,
    R.em_name as read_user,
    O.em_name as holduser,
    V.em_name AS verify_spervsr_name,
    CR.em_name as comp_reg_emp,
    
    -- Subquery for all assigned employees (concatenated names)
    (select GROUP_CONCAT(em_name) 
     from co_employee_master 
     where em_id in (select assigned_emp from cm_complaint_detail 
                      where cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno and assign_status = 1)) as assigned_employees,
    
    -- Subquery for all employees who have worked on this complaint
    (select GROUP_CONCAT(em_name) 
     from co_employee_master 
     where em_id in (select distinct assigned_emp from cm_complaint_detail 
                      where cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno)) as all_employees_worked

from 
    cm_complaint_mast
    left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
    left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
    left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
    left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
    left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id
    left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id
    left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
    left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
    left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
    left join co_deptsec_mast S on S.sec_id = cm_complaint_mast.complaint_dept_secslno
    left join co_deptsec_mast L on L.sec_id = cm_complaint_mast.cm_location
    left join co_employee_master CR on CR.em_id = cm_complaint_mast.create_user
    left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
    left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
    LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
    LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
    LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
where
    complaint_deptslno = (select complaint_dept_slno from cm_complaint_dept
                          where department_slno = ?)
    AND cm_rectify_status = 'R'
    And cm_rectify_time between ? and ?
GROUP BY 
    cm_complaint_mast.complaint_slno
ORDER BY 
    complaint_slno DESC;`,
            [
                data.complaint_deptslno,
                data.from,
                data.to

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDepartmentVerifiedList: (data, callBack) => {
        pool.query(
            // `select 
            // cm_complaint_mast.complaint_slno,
            // cm_asset_status,
            // S.sec_name as sec_name,
            // cm_rectify_time,
            // cm_file_status,
            // assigned_date,
            // suprvsr_verify_time,
            // cm_verfy_time,  
            // IFNULL( L.sec_name,"Nil" ) location,
            //             complaint_desc,
            //             req_type_name,
            //             pending_onhold_time,
            //             pending_onhold_user,
            //             compalint_status,
            //             cm_query_status,                          
            //             complaint_dept_secslno,
            //             complaint_request_slno,
            //             complaint_hicslno,
            //             compalint_priority,
            //             complaint_dept_name,
            //             complaint_deptslno,
            //             complaint_typeslno,
            //             complaint_type_name,
            //             cm_complaint_mast.rm_room_slno,
            //             rm_room_name,
            //             rm_newroom_creation.rm_roomtype_slno,
            //             rm_room_floor_slno,
            //             rm_insidebuilldblock_slno,
            //             rm_insidebuildblock_name,
            //             rm_floor_name,
            //             rm_roomtype_name,
            //             cm_complaint_mast.create_user,
            //             cm_location,priority_check,
            //             compalint_status,priority_reason,
            //             hic_policy_status,
            //             cm_rectify_status,compdept_message,compdept_message_flag,
            //             rectify_pending_hold_remarks,message_reply_emp,
            //             (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
            //             (case when priority_check='1' then "Yes"  else "No" end ) as priority ,
            //             (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            //             (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
            //                          (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
            //                          verify_spervsr,compalint_date,compalint_status,cm_rectify_status,
            //             M.em_name as send_user,
            //             R.em_name as read_user,                       
            //             O.em_name as holduser,
            //             V.em_name AS verify_spervsr_name,
            //             U.em_name as verified_user_name,
            //              CR.em_name as comp_reg_emp
            //             from 
            //             cm_complaint_mast
            //             left join cm_complaint_detail ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno
            //             left join co_employee_master C on cm_complaint_mast.create_user = C.em_id
            //             left join co_employee_master M on cm_complaint_mast.message_send_emp = M.em_id
            //             left join co_employee_master R on cm_complaint_mast.message_read_emp = R.em_id
            //             left join co_employee_master O on cm_complaint_mast.pending_onhold_user = O.em_id                   
            //             left join co_employee_master V ON cm_complaint_mast.verify_spervsr_user = V.em_id 
            //             left join co_employee_master U on cm_complaint_mast.verified_user = U.em_id 
            //             left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
            //             left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
            //             left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
            //             left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //             left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //             left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //             left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //             LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno						
            //             LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            //              left join co_employee_master CR on CR.em_id=cm_complaint_mast.create_user
            // 			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            //              WHERE                        
            //             complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //            where department_slno= ?)
            //             AND cm_rectify_status ='V' 
            //             And cm_verfy_time between ? and ?
            //              GROUP BY 
            //             cm_complaint_mast.complaint_slno
            //             ORDER BY 
            //             complaint_slno DESC
            //        `,
            `select 
    cm_complaint_mast.complaint_slno,
    cm_asset_status,
    S.sec_name as sec_name,
    cm_rectify_time,
    cm_file_status,
    assigned_date,
    suprvsr_verify_time,
    cm_verfy_time,  
    IFNULL(L.sec_name, "Nil") location,
    complaint_desc,
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
    cm_location,
    priority_check,
    compalint_status,
    priority_reason,
    hic_policy_status,
    cm_rectify_status,
    compdept_message,
    compdept_message_flag,
    rectify_pending_hold_remarks,
    message_reply_emp,
    (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end) as rectify_pending_hold_remarks1,
    (case when priority_check = '1' then "Yes" else "No" end) as priority,
    (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end) as hic_policy_name,
    (case when compalint_status = '0' then "not assigned"
          when compalint_status = '1' then "assigned"
          when compalint_status = '2' then "Rectified"
          when compalint_status = '3' then "Verified" else "Not" end) as compalint_status1,
    (case when cm_rectify_status = 'R' then "Rectified"
          when cm_rectify_status = 'P' then "Pending"
          when cm_rectify_status = 'O' then "On Hold" else "Not" end) as cm_rectify_status1,
    verify_spervsr,
    compalint_date,
    compalint_status,
    cm_rectify_status,
    M.em_name as send_user,
    R.em_name as read_user,
    O.em_name as holduser,
    V.em_name AS verify_spervsr_name,
    U.em_name as verified_user_name,
    CR.em_name as comp_reg_emp,
    -- Subquery to find all employees worked under the complaint
    (SELECT GROUP_CONCAT(E.em_name)
     FROM cm_complaint_detail CD
     LEFT JOIN co_employee_master E ON E.em_id = CD.assigned_emp
     WHERE CD.complaint_slno = cm_complaint_mast.complaint_slno AND CD.assign_status = 1) AS worked_employees
from 
    cm_complaint_mast
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
left join co_deptsec_mast S on S.sec_id = cm_complaint_mast.complaint_dept_secslno
left join co_deptsec_mast L on L.sec_id = cm_complaint_mast.cm_location
left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno						
LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
left join co_employee_master CR on CR.em_id = cm_complaint_mast.create_user
LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
WHERE                        
    complaint_deptslno = (select complaint_dept_slno from cm_complaint_dept where department_slno = ?)
    AND cm_rectify_status = 'V' 
    AND cm_verfy_time between ? and ?
GROUP BY 
    cm_complaint_mast.complaint_slno
ORDER BY 
    complaint_slno DESC;
`,
            [
                data.complaint_deptslno,
                data.from,
                data.to

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAuthorization: (id, callBack) => {
        pool.query(`select
                    auth_post
                    from 
                    co_authorization
                    where emp_id=?
                    and
                    auth_status=1
                    `,
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
    getAssetUnderSelectedCompltDept: (data, callback) => {
        pool.query(
            `select     
                am_asset_item_map_master.am_item_map_slno,
                item_name,
                am_asset_no,
                item_asset_no,
                item_asset_no_only
                from am_asset_item_map_master
                left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
                left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
                left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
                where
                item_deptsec_slno=? 
                and 
                asset_item_service =0
                and 
                asset_item_condmnation =0
                and
                am_custodian_dept_slno=(select department_slno from cm_complaint_dept
                where complaint_dept_slno=?)`,

            [
                data.complaintLocation,
                data.codept
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