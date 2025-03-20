const { pool } = require('../../config/database')
module.exports = {
    complaintRegistInsert: (data, callback) => {
        pool.query(
            `INSERT INTO cm_complaint_mast (
                complaint_slno,
                complaint_desc,
                complaint_typeslno,
                complaint_request_slno,
                complaint_deptslno,
                priority_check,
                compalint_status,
                complaint_hicslno,
                complaint_dept_secslno,
                cm_location,
                create_user,
                priority_reason,
                rm_room_slno,
                cm_asset_status
               )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.complaint_slno,
                data.complaint_desc,
                data.complaint_typeslno,
                data.complaint_request_slno,
                data.complaint_deptslno,
                data.priority_check,
                data.compalint_status,
                data.complaint_hicslno,
                data.complaint_dept_secslno,
                data.cm_location,
                data.create_user,
                data.priority_reason,
                data.rm_room_slno,
                data.cm_asset_status
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    complaintRegistUpdate: (data, callback) => {
        pool.query(
            `UPDATE cm_complaint_mast 
                SET complaint_desc = ?,
                complaint_dept_secslno = ?,
                complaint_request_slno = ?,
                complaint_deptslno = ?,
                complaint_typeslno = ?,
                priority_check = ?,
                complaint_hicslno = ?, 
                cm_location=?,
                edit_user=?,
                rm_room_slno=?,    
                priority_reason=? ,
                cm_asset_status=?
                WHERE complaint_slno = ?`,
            [
                data.complaint_desc,
                data.complaint_dept_secslno,
                data.complaint_request_slno,
                data.complaint_deptslno,
                data.complaint_typeslno,
                data.priority_check,
                data.complaint_hicslno,
                data.cm_location,
                data.edit_user,
                data.rm_room_slno,
                data.priority_reason,
                data.cm_asset_status,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getcomplaintRegistByID: (data, callBack) => {
        pool.query(
            `SELECT 
            complaint_slno,
            complaint_desc,
            cm_dept_sec,
            cm_request_type,
            cm_complaint_dept,
            cm_complaint_type,
            cm_priority,
            cm_hic_policy,cm_location,
            FROM cm_complaint_master
             WHERE complaint_slno IN(?)`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getcomplaintListbylogin: (id, callBack) => {
        pool.query(
            `SELECT
            cm_complaint_dept.department_slno as compl_dept,      
            cm_complaint_mast.complaint_slno,
            aprrox_date,
            cm_asset_status,
            S.sec_name AS sec_name, 
            cm_hold_reason,
            IFNULL(L.sec_name, 'Nil') AS location,
            complaint_desc,
            cm_file_status,         
            cm_complaint_detail.assigned_date,
            cm_rectify_time,
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
            (CASE WHEN rectify_pending_hold_remarks IS NULL THEN 'not updated' ELSE rectify_pending_hold_remarks END) AS rectify_pending_hold_remarks1,            
            (CASE WHEN priority_check = '1' THEN 'Yes' ELSE 'No' END) AS priority,
            (CASE WHEN hic_policy_name IS NOT NULL THEN hic_policy_name ELSE 'Not Suggested' END) AS hic_policy_name,
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
            (
                SELECT GROUP_CONCAT(em_name SEPARATOR ', ')
                FROM cm_complaint_detail
                LEFT JOIN co_employee_master ON co_employee_master.em_id = cm_complaint_detail.assigned_emp
                WHERE cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
                AND cm_complaint_detail.assign_status = 1
                ) AS assigned_employees
                FROM 
                cm_complaint_mast
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
                LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
                LEFT JOIN cm_complaint_detail ON cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
                LEFT JOIN cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id = cm_complaint_mast.cm_hold_reason_slno
                WHERE 
                complaint_dept_secslno = ?
                AND compalint_status != 3
                GROUP BY 
                cm_complaint_mast.complaint_slno
                ORDER BY 
                compalint_date DESC;`,

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
    getcomplaintListbydept: (id, callBack) => {
        pool.query(
            `SELECT complaint_slno,complaint_desc,DATE_FORMAT(compalint_date,'%d-%m-%Y ')compalint_date,
            ROW_NUMBER() over (order by complaint_slno ) as complaint_slno,cm_asset_status,
            S.sec_name as sec_name, 
            IFNULL( L.sec_name,"Nil" ) location,
            complaint_dept_secslno,
            complaint_request_slno,
            complaint_deptslno,
            complaint_typeslno,
            compalint_priority,
            complaint_hicslno,priority_reason,compalint_priority,
            req_type_name,
            complaint_dept_name,
            complaint_type_name,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority,
            (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" else "Rectified" end ) as compalint_status
            FROM cm_complaint_mast
            LEFT JOIN co_request_type ON co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            LEFT JOIN cm_hic_policy ON cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno 
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            where complaint_deptslno = ? `,
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

    getcomplaintAll: (callBack) => {
        pool.query(
            `SELECT cm_complaint_mast.complaint_slno,complaint_desc,DATE_FORMAT(compalint_date,'%d-%m-%Y ')compalint_date1,cm_asset_status,
            compalint_date, 
            IFNULL(assigned_date,"Not Assign") as assigned_date,
            IFNULL(cm_rectify_time,"Not Updated") as cm_rectify_time,
               IFNULL(cm_verfy_time,"Not updated") as cm_verfy_time,   
              IFNULL(em_name,"Not assigned" ) em_name,
                       S.sec_name as sec_name, 
              IFNULL( L.sec_name,"Nil" ) location,
                complaint_dept_secslno,
                complaint_request_slno,
                compalint_priority,complaint_hicslno,
                req_type_name,
                complaint_dept_name,           
                cm_complaint_mast.rm_room_slno,
				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
                complaint_type_name,compalint_status,
                (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority,
                (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
                (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1
                FROM cm_complaint_mast
                LEFT JOIN co_request_type ON co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                LEFT JOIN cm_hic_policy ON cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno 
               left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                        left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                LEFT JOIN cm_complaint_detail ON cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
                LEFT JOIN co_employee_master ON co_employee_master.em_id=cm_complaint_detail.assigned_emp
                 left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
               group by cm_complaint_mast.complaint_slno ORDER BY compalint_date DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getapptokenbydept: (id, callBack) => {
        pool.query(
            `select 
                em_no,em_id,app_token
            from co_employee_master
            where em_department=(select department_slno from cm_complaint_dept
            where complaint_dept_slno=?) and co_employee_master.app_token is not null`,
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
    updateserialnum: (callBack) => {
        pool.query(
            `update serial_nos set serial_current=serial_current+1 where serial_slno=5`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAssetinComplaint: (id, callback) => {
        pool.query(
            // `SELECT 
            // comasset_mapping_slno,
            // item_custodian_dept,
            // am_spare_item_map_slno,
            // cm_complait_slno,
            // am_asset_item_map_master.am_item_map_slno,
            // am_asset_item_map_master.item_creation_slno,
            // item_asset_no,
            // item_asset_no_only,
            // cm_asset_dept,
            // asset_status,
            // asset_item_service,
            // item_name
            // FROM
            // am_asset_item_map_master
            // left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno 
            // left join cm_comasset_mapping on cm_comasset_mapping.cm_am_assetmap_slno=am_asset_item_map_master.am_item_map_slno 
            // left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno            
            // WHERE cm_complait_slno=? AND asset_status=1 `,
            `select
                comasset_mapping_slno,
                 am_custodian_dept_slno,
                am_custodian_deptsec_slno,
                cm_complait_slno,
                am_category_pm_days,
                category_name,
                cm_comasset_mapping.am_item_map_slno,
                cm_asset_dept,
                cm_am_assetmap_slno,
                asset_status,
                item_asset_no,
                item_asset_no_only,
                item_name,
                item_custodian_dept,
                item_custodian_dept_sec,
                asset_item_service
                from
                cm_comasset_mapping
                left join am_asset_item_map_master on am_asset_item_map_master.am_item_map_slno=cm_comasset_mapping.am_item_map_slno 
                left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno 
                left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
                left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
                WHERE cm_complait_slno=? AND asset_status=1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    UpdateAssetinComplaint: (data, callback) => {
        pool.query(
            `UPDATE
            cm_comasset_mapping
             SET
                cm_am_assetmap_slno=?,          
                edit_user=? 
                 WHERE 
                 cm_complait_slno=?`,
            [
                data.cm_am_assetmap_slno,
                data.edit_user,
                data.cm_complait_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getRoomsNameNdTypeList: (id, callback) => {
        pool.query(
            `select
                rm_room_slno,
                rm_room_name,
                rm_newroom_creation.rm_roomtype_slno,
                rm_room_floor_slno,
                rm_insidebuilldblock_slno,
                rm_insidebuildblock_name,
                rm_floor_name,
                rm_roomtype_name
                from
                rm_newroom_creation
                LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
                LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
                LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
                where
                rm_outlet_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getAssetsInRoom: (id, callBack) => {
        pool.query(
            `select am_asset_item_map_master.am_item_map_slno,item_name,am_asset_no
            from am_asset_item_map_master
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
            where item_room_slno=?`,
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

    insertAssetArray: (data, callback) => {
        pool.query(
            `INSERT INTO cm_comasset_mapping
          (            
            cm_complait_slno,
            am_item_map_slno,
            cm_am_assetmap_slno,
            cm_asset_dept,
            asset_status,
            create_user          
          )
          VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    assetinactive: (data, callBack) => {
        return new Promise((resolve, reject) => {
            data.map((val) => {
                pool.query(
                    ` UPDATE
                     cm_comasset_mapping
                     SET
                    asset_status=?,
                    edit_user=?       
                    WHERE 
                   comasset_mapping_slno=?`,
                    [val.asset_status,
                    val.edit_user,
                    val.comasset_mapping_slno],
                    (error, results, feilds) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })

        })
    },
    getDeptSecWiseTicket: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,
            S.sec_name as sec_name, 
              IFNULL( L.sec_name,"Nil" ) location,
                        complaint_desc,
                        req_type_name,
                        suprvsr_verify_time,
                        cm_rectify_time,
                        assigned_date,
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
                        cm_complaint_mast
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
                        LEFT JOIN cm_complaint_detail ON cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
						LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
                        where complaint_dept_secslno =? and compalint_status!=3 ORDER BY compalint_date DESC`,
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
    SpareDetailsUndercomplaint: (id, callBack) => {
        pool.query(
            `SELECT
            asset_spare_slno,
            am_item_map_slno,
            spare_status,
            spare_service,
            am_asset_spare_details.am_spare_item_map_slno,
            am_item_name_creation.item_name,
            spare_asset_no,spare_asset_no_only
            FROM am_asset_spare_details
            left join am_spare_item_map_master on am_spare_item_map_master.am_spare_item_map_slno=am_asset_spare_details.am_spare_item_map_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            WHERE am_item_map_slno=? and  spare_status = 1 `,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    viewAllPendingTicket: (callback) => {
        pool.query(
            `SELECT
            cm_complaint_dept.department_slno as compl_dept,
    cm_complaint_mast.complaint_slno,
    aprrox_date,
    cm_asset_status,
    S.sec_name AS sec_name,
    cm_file_status,
    cm_hold_reason,
    IFNULL(L.sec_name, "Nil") AS location,
    complaint_desc,
    req_type_name,
    suprvsr_verify_time,
    cm_rectify_time,
    assigned_date,
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
        WHEN rectify_pending_hold_remarks IS NULL THEN "not updated" 
        ELSE rectify_pending_hold_remarks 
    END) AS rectify_pending_hold_remarks1,
    (CASE 
        WHEN priority_check = '1' THEN "Yes"  
        ELSE "No" 
    END) AS priority,
    (CASE 
        WHEN hic_policy_name IS NOT NULL THEN hic_policy_name 
        ELSE 'Not Suggested' 
    END) AS hic_policy_name,
    (CASE 
        WHEN compalint_status = '0' THEN "not assigned" 
        WHEN compalint_status = '1' THEN "assigned" 
        WHEN compalint_status = '2' THEN "Rectified"  
        WHEN compalint_status = '3' THEN "Verified"  
        ELSE "Not" 
    END) AS compalint_status1,
    (CASE 
        WHEN cm_rectify_status = 'R' THEN "Rectified" 
        WHEN cm_rectify_status = 'P' THEN "Pending" 
        WHEN cm_rectify_status = 'O' THEN "On Hold" 
        ELSE "Not" 
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
    (SELECT GROUP_CONCAT(em_name SEPARATOR ', ') 
     FROM cm_complaint_detail
     LEFT JOIN co_employee_master ON co_employee_master.em_id = cm_complaint_detail.assigned_emp
     WHERE cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno 
     AND cm_complaint_detail.assign_status = 1) AS assigned_employees
FROM 
    cm_complaint_mast
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
LEFT JOIN cm_complaint_detail ON cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
LEFT JOIN cm_hold_reason_mast ON cm_hold_reason_mast.cm_hold_id = cm_complaint_mast.cm_hold_reason_slno
WHERE 
    compalint_status != 3
GROUP BY complaint_slno
ORDER BY compalint_date DESC;
`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    deleteTicket: (data, callBack) => {
        pool.query(
            `DELETE FROM cm_complaint_mast WHERE complaint_slno = ?`,
            [data.id],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                if (results.affectedRows === 0) {
                    return callBack(null, null);
                }
                return callBack(null, results);
            }
        );
    }



}

