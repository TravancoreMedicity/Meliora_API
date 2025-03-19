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
            //                from meliora.cm_complaint_detail
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
            verify_spervsr=?
            where complaint_slno = ?`,
            [
                data.compalint_status,
                data.cm_rectify_time,
                data.cm_rectify_status,
                data.rectify_pending_hold_remarks,
                data.pending_onhold_time,
                data.pending_onhold_user,
                data.verify_spervsr,
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
            cm_not_verify_time=?
            where complaint_slno = ?`,
            [
                data.compalint_status,
                data.cm_verfy_time,
                data.cm_rectify_status,
                data.verify_remarks,
                data.cm_not_verify_time,
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
            `select am_asset_item_map_master.am_item_map_slno,item_name,am_asset_no
            from am_asset_item_map_master
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
            where item_deptsec_slno=?`,
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
}