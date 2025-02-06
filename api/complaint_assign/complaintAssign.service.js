const { pool } = require('../../config/database')
module.exports = {
    getcomplaintAssign: (id, callBack) => {
        pool.query(
            //     `select complaint_slno,complaint_desc,complaint_dept_name,req_type_name,
            //     complaint_type_name,compalint_date,cm_rectify_status,cm_not_verify_time,verify_remarks,
            //     S.sec_name as sec_name, priority_reason,complaint_hicslno,
            //     IFNULL( L.sec_name,"Nil" ) location,C.em_name as comp_reg_emp,
            //     cm_complaint_mast.create_user,C.em_department,
            //     co_department_mast.dept_name as empdept,compalint_priority,
            //     (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
            //        when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
            //         else  "Not Updated" end ) as priority, 
            //     date(compalint_date) as date,TIME_FORMAT(compalint_date,"%r") AS Time,
            //     (case when verify_remarks is null then "Not Updated" else verify_remarks end ) as verify_remarks1,
            //     (case when cm_rectify_status='Z' then "Not Verified" when cm_rectify_status="R" then "Verified" end) as cm_rectify_status1,
            //     cm_priority_mast.cm_priority_desc as priority_remark,verify_spervsr,
            //     compdept_message,compdept_message_flag,message_reply_emp,
            //     M.em_name as msg_send_emp,R.em_name as msg_read_emp
            //   from cm_complaint_mast
            //   left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            //    left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            //     left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            //    left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //     left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
            //     left join co_employee_master M on M.em_id=cm_complaint_mast.message_send_emp
            //     left join co_employee_master R on R.em_id=cm_complaint_mast.message_read_emp
            //      left join co_department_mast on co_department_mast.dept_id=C.em_department
            //      left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            //  left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //    where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //                where department_slno=?) AND compalint_status=0 ORDER BY complaint_slno DESC`,
            `select
                complaint_slno,
                cm_asset_status,
                cm_file_status,
                complaint_desc,
                complaint_dept_name,
                req_type_name,
                cm_complaint_mast.rm_room_slno,
				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
                priority_check,
				rm_roomtype_name,
                cm_query_status,              
            complaint_type_name,compalint_date,cm_rectify_status,cm_not_verify_time,verify_remarks,
            S.sec_name as sec_name, priority_reason,complaint_hicslno,
            IFNULL( L.sec_name,"Nil" ) location,C.em_name as comp_reg_emp,
            cm_complaint_mast.create_user,C.em_department,
            co_department_mast.dept_name as empdept,compalint_priority,
            (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
               when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
                else  "Not Updated" end ) as priority, 
            date(compalint_date) as date,TIME_FORMAT(compalint_date,"%r") AS Time,
            (case when verify_remarks is null then "Not Updated" else verify_remarks end ) as verify_remarks1,
            (case when cm_rectify_status='Z' then "Not Verified" when cm_rectify_status="R" then "Verified" end) as cm_rectify_status1,
            cm_priority_mast.cm_priority_desc as priority_remark,verify_spervsr,
            compdept_message,compdept_message_flag,message_reply_emp,
            M.em_name as msg_send_emp,R.em_name as msg_read_emp
          from cm_complaint_mast
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
            left join co_employee_master M on M.em_id=cm_complaint_mast.message_send_emp
            left join co_employee_master R on R.em_id=cm_complaint_mast.message_read_emp            
            left join co_department_mast on co_department_mast.dept_id=C.em_department
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                          left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
           where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                       where department_slno=?) AND compalint_status=0 ORDER BY complaint_slno DESC
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

    checkInsertVal: (data, callBack) => {
        pool.query(
            `select detl_slno from cm_complaint_detail
            where complaint_slno=? and assigned_emp=? `,
            [
                data.complaint_slno,
                data.assigned_emp
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    quickAssign: (data, callBack) => {
        pool.query(
            `INSERT INTO cm_complaint_detail
            (
                complaint_slno,
                assigned_emp,
                assigned_date,
                assign_rect_status,
                assigned_user,
                assign_status
            ) 
            VALUES(?,?,?,?,?,?)`,
            [
                data.complaint_slno,
                data.assigned_emp,
                data.assigned_date,
                data.assign_rect_status,
                data.assigned_user,
                data.assign_status
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    quickAssigncompstatus: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET compalint_status=1
            WHERE complaint_slno=?`,
            [
                data.complaint_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEmployee: (id, callBack) => {
        pool.query(
            ` SELECT em_id, em_name ,em_no FROM co_employee_master where em_department=?
            and em_status=1 and em_no!=1 and em_id!=1606 order by em_name ASC `,
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
    detailedAssign: (data, callBack) => {
        pool.query(
            `INSERT INTO cm_complaint_detail
            (
                complaint_slno,
                assigned_emp,
                assigned_date,
                assign_rect_status,
                assigned_user,
                assign_status
            ) 
            VALUES ?`,
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
    getcomplaintAssignbyEmployee: (id, callBack) => {
        pool.query(
            // `select 
            //     cm_complaint_mast.complaint_slno,
            //     cm_asset_status,
            //     verify_spervsr_remarks,                                
            //     CD.dept_id as complaint_from_dept,
            //     cm_priority_slno,
            //     cm_priority_desc,
            //     aprrox_date, 
            //     cm_file_status,          
            //     complaint_desc,
            //     compalint_date,
            //     cm_query_status,
            //     priority_check,
            //     complaint_deptslno,
            //     priority_reason,
            //      cm_complaint_mast.rm_room_slno,
            // 	rm_room_name,
            // 	rm_newroom_creation.rm_roomtype_slno,
            // 	rm_room_floor_slno,
            // 	rm_insidebuilldblock_slno,
            // 	rm_insidebuildblock_name,
            // 	rm_floor_name,
            //     complaint_dept_secslno,
            // 	rm_roomtype_name,
            // 	compalint_priority,cm_complaint_mast.create_user,R.em_name as comp_reg_emp,verify_remarks,rectify_pending_hold_remarks,
            // 	R.em_department,  RD.dept_name as empdept,
            // 	complaint_dept_name, req_type_name,complaint_type_name,S.sec_name as sec_name, 
            // 	IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,assigned_date,
            // 	A.em_name as assign_emp,
            //     date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,
            //     if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,verify_spervsr,
            //     if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            //     compalint_status,cm_verfy_time,cm_not_verify_time,cm_rectify_time,pending_onhold_user,
            //     pending_onhold_time,verify_spervsr
            //     from cm_complaint_detail
            //     left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno                
            //     left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            //     left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //     left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //     left join co_department_mast CD on CD.dept_id = S.dept_id
            //     left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
            //     left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            //     left join co_employee_master A on A.em_id=cm_complaint_detail.assigned_emp
            //     left join co_employee_master R on R.em_id=cm_complaint_mast.create_user
            //     left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            //     left join co_department_mast RD on RD.dept_id=R.em_department    
            //     left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            // 	LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
            // 	LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            // 	LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            // 	left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            //      where assigned_emp=?
            //      AND compalint_status!=3
            //      and compalint_status!=2
            //      and assign_status=1
            //      AND (cm_rectify_status !='O' or cm_rectify_status is null)
            //      ORDER BY complaint_slno DESC`,
            `SELECT             
            cm_complaint_mast.complaint_slno,
            cm_asset_status,
            verify_spervsr_remarks,                                
            CD.dept_id AS complaint_from_dept,
            cm_priority_slno,
            cm_priority_desc,
            aprrox_date, 
            cm_file_status,          
            complaint_desc,
            compalint_date,
            cm_query_status,
            priority_check,
            complaint_deptslno,
            priority_reason,
            cm_complaint_mast.rm_room_slno,
            rm_room_name,
            rm_newroom_creation.rm_roomtype_slno,
            rm_room_floor_slno,
            rm_insidebuilldblock_slno,
            rm_insidebuildblock_name,
            rm_floor_name,
            complaint_dept_secslno,
            rm_roomtype_name,
            compalint_priority,
            cm_complaint_mast.create_user,
            R.em_name AS comp_reg_emp,
            verify_remarks,
            rectify_pending_hold_remarks,
            R.em_department,  
            RD.dept_name AS empdept,
            complaint_dept_name, 
            req_type_name,
            complaint_type_name,
            S.sec_name AS sec_name, 
            IFNULL(L.sec_name, "Nil") AS location,
            cm_rectify_status,
            assigned_date,
            A.em_name AS assign_emp,   
            X.em_name AS assinged_user,                    
            DATE(assigned_date) AS date,
            TIME_FORMAT(assigned_date, "%r") AS Time,
            IF(complaint_remark IS NULL, "No Remark", complaint_remark) AS complaint_remark,
            verify_spervsr,
            IF(cm_complaint_mast.complaint_hicslno IS NULL, 'Not Suggested', hic_policy_name) AS hic_policy_name,
            compalint_status,
            cm_verfy_time,
            cm_not_verify_time,
            cm_rectify_time,
            pending_onhold_user,
            pending_onhold_time,
            verify_spervsr,
            details.rejected,
            details.accepted,
            details.pending,    
            employee_names.employee_list AS assigned_employee_names
            FROM 
            cm_complaint_detail
            LEFT JOIN 
            cm_complaint_mast ON cm_complaint_mast.complaint_slno = cm_complaint_detail.complaint_slno        
            LEFT JOIN co_employee_master X ON X.em_id = cm_complaint_detail.assigned_user        
            LEFT JOIN             
            co_request_type ON co_request_type.req_type_slno = cm_complaint_mast.complaint_request_slno
            LEFT JOIN 
            co_deptsec_mast S ON S.sec_id = cm_complaint_mast.complaint_dept_secslno
            LEFT JOIN 
            co_deptsec_mast L ON L.sec_id = cm_complaint_mast.cm_location
            LEFT JOIN 
            co_department_mast CD ON CD.dept_id = S.dept_id
            LEFT JOIN 
            cm_hic_policy ON cm_hic_policy.hic_policy_slno = cm_complaint_mast.complaint_hicslno
            LEFT JOIN 
            cm_complaint_type ON cm_complaint_type.complaint_type_slno = cm_complaint_mast.complaint_typeslno
            LEFT JOIN 
            co_employee_master A ON A.em_id = cm_complaint_detail.assigned_emp
            LEFT JOIN 
            co_employee_master R ON R.em_id = cm_complaint_mast.create_user
            LEFT JOIN 
            cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno = cm_complaint_mast.complaint_deptslno
            LEFT JOIN 
            co_department_mast RD ON RD.dept_id = R.em_department    
            LEFT JOIN 
            rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN 
            rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN 
            rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            LEFT JOIN 
            rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno                     
            LEFT JOIN 
            cm_priority_mast ON cm_priority_mast.cm_priority_slno = cm_complaint_mast.compalint_priority
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
            LEFT JOIN 
            (SELECT 
            complaint_slno, 
            GROUP_CONCAT(em_name SEPARATOR ', ') AS employee_list
            FROM 
            cm_complaint_detail
            LEFT JOIN            
            co_employee_master ON co_employee_master.em_id = cm_complaint_detail.assigned_emp
            WHERE 
            assign_status = 1
            GROUP BY 
            complaint_slno
            ) AS employee_names ON employee_names.complaint_slno = cm_complaint_mast.complaint_slno
            WHERE 
            assigned_emp = ?
            AND compalint_status != 3
            AND compalint_status != 2
            AND assign_status = 1
            AND (cm_rectify_status != 'O' OR cm_rectify_status IS NULL)
            ORDER BY 
            complaint_slno DESC;`,

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
    detailedAssigncompstatus: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET compalint_status=1,
            complaint_remark=?,
            compalint_priority=?,
            aprrox_date=?
            WHERE complaint_slno=?`,
            [
                data.complaint_remark,
                data.compalint_priority,
                data.aprrox_date,
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
    getassistantEmployee: (data, callBack) => {
        pool.query(
            ` SELECT em_id, em_name FROM co_employee_master where em_department=? and em_id !=?
            and em_status=1 and em_no!=1 and em_id!=1606`,
            [
                data.em_department,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    insertAssistemp: (data, callBack) => {
        pool.query(
            `INSERT INTO cm_complaint_detail
            (
                complaint_slno,
                assigned_emp,
                assist_assign_date,
                assist_flag,
                assist_requested_emp,
                assign_rect_status,
                assigned_user
            ) 
            VALUES(?,?,?,?,?,?,?)`,
            [
                data.complaint_slno,
                data.assigned_emp,
                data.assist_assign_date,
                data.assist_flag,
                data.assist_requested_emp,
                data.assign_rect_status,
                data.assigned_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getALLcomplaintbyEmployee: (id, callBack) => {
        pool.query(
            //         `select cm_complaint_mast.complaint_slno,complaint_desc,assigned_date,complaint_dept_name,
            //         compalint_date,req_type_name,complaint_type_name,S.sec_name as sec_name, 
            //          IFNULL( L.sec_name,"Nil" ) location,
            //          priority_check,priority_reason,compalint_priority
            //          assigned_emp,compalint_priority,compalint_status,cm_rectify_status,
            //         if(em_name is null ,'Not Assigned',em_name) as em_name,
            //         if(cm_rectify_time is null ,'Not Update',cm_rectify_time) as cm_rectify_time,
            //         if(cm_verfy_time is null ,'Not Update',cm_verfy_time) as cm_verfy_time,            
            //         (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
            //                        when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
            //                         else  "Not Updated" end ) as priority,   verify_spervsr,
            //          if(assigned_date is null,'Not Assigned',assigned_date) as assigned_date,
            //        (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
            //   when compalint_status = '3' then "Verified" end ) as compalint_status1,
            //       (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold"  when cm_rectify_status='Z' then" Not Verified" when cm_rectify_status='V' then"Verified" else "Not Updated" end ) as cm_rectify_status1,
            //            date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,cm_rectify_status,
            //         if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            //         compdept_message,compdept_message_flag,message_reply_emp, 
            //         if(rectify_pending_hold_remarks is null ,'Not Needed',rectify_pending_hold_remarks) as rectify_pending_hold_remarks 
            //        from cm_complaint_mast   
            //        left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            //        left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            //        left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //        left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //        left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
            //        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            //        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            //         left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            //         left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            //         where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //                   where department_slno=?) and (assign_status=1 or compalint_status=0)
            //                   ORDER BY complaint_slno DESC`,
            `select 
            cm_complaint_mast.complaint_slno,complaint_desc,
            cm_asset_status,
            assigned_date,complaint_dept_name,
                 cm_complaint_mast.rm_room_slno,
				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
            compalint_date,req_type_name,complaint_type_name,S.sec_name as sec_name, 
             IFNULL( L.sec_name,"Nil" ) location,
             priority_check,priority_reason,compalint_priority
             assigned_emp,compalint_priority,compalint_status,cm_rectify_status,
            if(em_name is null ,'Not Assigned',em_name) as em_name,
            if(cm_rectify_time is null ,'Not Update',cm_rectify_time) as cm_rectify_time,
            if(cm_verfy_time is null ,'Not Update',cm_verfy_time) as cm_verfy_time,            
            (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
                           when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
                            else  "Not Updated" end ) as priority,   verify_spervsr,
             if(assigned_date is null,'Not Assigned',assigned_date) as assigned_date,
           (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
      when compalint_status = '3' then "Verified" end ) as compalint_status1,
          (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold"  when cm_rectify_status='Z' then" Not Verified" when cm_rectify_status='V' then"Verified" else "Not Updated" end ) as cm_rectify_status1,
               date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,cm_rectify_status,
            if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            compdept_message,compdept_message_flag,message_reply_emp, 
            if(rectify_pending_hold_remarks is null ,'Not Needed',rectify_pending_hold_remarks) as rectify_pending_hold_remarks 
           from cm_complaint_mast   
           left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
           left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
           left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
           left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
           left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
           left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
           left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
           left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
           left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
           left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                      where department_slno=?) and (assign_status=1 or compalint_status=0)
                      ORDER BY complaint_slno DESC`,
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
    getIndividualassitemployee: (id, callBack) => {
        pool.query(
            // `select cm_complaint_mast.complaint_slno,
            //         complaint_desc,
            //         assigned_date,
            //         complaint_dept_name,
            //         req_type_name,
            //         complaint_type_name,
            //         S.sec_name as sec_name, 
            //         IFNULL( L.sec_name,"Nil" ) location,
            //         assist_receive,
            //         detl_slno,
            //         assist_assign_date,em_name,
            //         (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
            //                when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
            //                 else  "Not Updated" end ) as priority, 
            //         date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,
            //         if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            //         co_employee_master.em_name as comp_reg_emp,
            //         RD.dept_name as empdept,verify_spervsr,
            //         compalint_date,
            //         compalint_priority
            // from cm_complaint_detail
            //         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
            //         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            //         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
            //         left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            //         left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            //         left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assist_requested_emp
            //         left join co_department_mast RD on RD.dept_id=co_employee_master.em_department 
            // where assigned_emp=? AND assist_flag=1 and compalint_status = 1 and compalint_status=1 group by complaint_slno`,
            `select cm_complaint_mast.complaint_slno,
            cm_asset_status,
                    complaint_desc,
                    assigned_date,
                    complaint_dept_name,
                    req_type_name,
                    complaint_type_name,
                 cm_complaint_mast.rm_room_slno,
				rm_room_name,
                priority_check,
                priority_reason,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
                    S.sec_name as sec_name, 
                    IFNULL( L.sec_name,"Nil" ) location,
                    assist_receive,
                    detl_slno,
                    assist_assign_date,em_name,
                    (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
                           when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
                            else  "Not Updated" end ) as priority, 
                    date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,
                    if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
                    co_employee_master.em_name as comp_reg_emp,
                    RD.dept_name as empdept,verify_spervsr,
                    compalint_date,
                    compalint_priority
            from cm_complaint_detail
                    left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
                    left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                    left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                    left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                    left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
                    left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                    left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                    left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assist_requested_emp
                    left join co_department_mast RD on RD.dept_id=co_employee_master.em_department 
                left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
                where assigned_emp=? AND assist_flag=1 And (assign_status !=1 OR assign_status is NULL) and compalint_status!=2 and compalint_status!=3
                  group by complaint_slno`,
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
    AssistantRecieved: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_detail
            SET assigned_date=?,
            assist_receive=?,
            assign_status=1
            WHERE complaint_slno=? AND assigned_emp=? `,
            [
                data.assigned_date,
                data.assist_receive,
                data.complaint_slno,
                data.assigned_emp
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    AssistanceReject: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_detail
            SET           
            assist_req_reject_reason=?,
            assist_flag=?
            WHERE complaint_slno=? AND assigned_emp=? `,
            [
                data.assist_req_reject_reason,
                data.assist_flag,
                data.complaint_slno,
                data.assigned_emp
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    TransferDept: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET complaint_deptslno=?,
            dept_transfer_remarks=?
            WHERE complaint_slno=? `,
            [
                data.complaint_deptslno,
                data.dept_transfer_remarks,
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
    assignedListNotRectifiedOnly: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,
            cm_asset_status,
                    compalint_priority,cm_complaint_mast.create_user,R.em_name as comp_reg_emp,verify_remarks,rectify_pending_hold_remarks,
                    R.em_department,  RD.dept_name as empdept,
                    complaint_dept_name, req_type_name,complaint_type_name,S.sec_name as sec_name, 
                    IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,assigned_date,
                    (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
                           when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
                            else  "Not Updated" end ) as priority,  A.em_name as assign_emp,
                    date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,
                    if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                    if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
                    compalint_status,verify_spervsr
                from cm_complaint_detail
                    left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
                    left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                    left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                    left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                    left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
                    left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                    left join co_employee_master A on A.em_id=cm_complaint_detail.assigned_emp
                    left join co_employee_master R on R.em_id=cm_complaint_mast.create_user
                    left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                    left join co_department_mast RD on RD.dept_id=R.em_department                  
                 where assigned_emp=? 
                    AND assist_flag =0 
                    AND compalint_status = 1
                 ORDER BY complaint_slno DESC`,
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
    rectifiedListForVErify: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,
            cm_asset_status,
                    compalint_priority,cm_complaint_mast.create_user,R.em_name as comp_reg_emp,verify_remarks,rectify_pending_hold_remarks,
                    R.em_department,  RD.dept_name as empdept,
                    complaint_dept_name, req_type_name,complaint_type_name,S.sec_name as sec_name, 
                    IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,assigned_date,
                    (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
                           when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
                            else  "Not Updated" end ) as priority,  A.em_name as assign_emp,
                    date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,
                    if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                    if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
                    compalint_status,verify_spervsr
                from cm_complaint_detail
                    left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
                    left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                    left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                    left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                    left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
                    left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                    left join co_employee_master A on A.em_id=cm_complaint_detail.assigned_emp
                    left join co_employee_master R on R.em_id=cm_complaint_mast.create_user
                    left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                    left join co_department_mast RD on RD.dept_id=R.em_department                  
                 where assigned_emp=? 
                    AND assist_flag =0 
                    AND compalint_status = 2
                 ORDER BY complaint_slno DESC`,
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


    AssistMultiple: (data, callBack) => {
        pool.query(
            `  INSERT INTO cm_complaint_detail
            (
                complaint_slno,
                assigned_emp,
                assist_assign_date,
                assist_flag,
                assist_requested_emp,
                assign_rect_status,
                assigned_user
            ) 
            VALUES ?`,
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

    getALLAssignedComList: (id, callBack) => {
        pool.query(
            //     `select complaint_slno,complaint_desc,complaint_dept_name,req_type_name,
            //     complaint_type_name,compalint_date,cm_rectify_status,cm_not_verify_time,verify_remarks,
            //     S.sec_name as sec_name, priority_reason,complaint_hicslno,
            //     IFNULL( L.sec_name,"Nil" ) location,C.em_name as comp_reg_emp,
            //     cm_complaint_mast.create_user,C.em_department,
            //     co_department_mast.dept_name as empdept,compalint_priority,
            //     (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
            //     when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
            //      else  "Not Updated" end ) as priority, verify_spervsr,
            //     date(compalint_date) as date,TIME_FORMAT(compalint_date,"%r") AS Time,
            //     if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            //     (case when verify_remarks is null then "Not Updated" else verify_remarks end ) as verify_remarks1,
            //     (case when cm_rectify_status='Z' then "Not Verified" when cm_rectify_status="R" then "Verified" end) as cm_rectify_status1,
            //     compdept_message,compdept_message_flag,message_reply_emp,
            //     M.em_name as msg_send_emp,R.em_name as msg_read_emp
            //      from cm_complaint_mast
            //               left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            //               left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            //               left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            //               left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
            //               left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //               left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
            //               left join co_employee_master M on M.em_id=cm_complaint_mast.message_send_emp
            //               left join co_employee_master R on R.em_id=cm_complaint_mast.message_read_emp
            //                  left join co_department_mast on co_department_mast.dept_id=C.em_department
            //                left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            //  left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            //    where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //    where department_slno=?) AND compalint_status=1 ORDER BY complaint_slno DESC`,
            `select
complaint_slno,
cm_asset_status,
complaint_desc,complaint_dept_name,req_type_name,
                 cm_complaint_mast.rm_room_slno,
				rm_room_name,
				rm_newroom_creation.rm_roomtype_slno,
				rm_room_floor_slno,
				rm_insidebuilldblock_slno,
				rm_insidebuildblock_name,
				rm_floor_name,
				rm_roomtype_name,
            complaint_type_name,compalint_date,cm_rectify_status,cm_not_verify_time,verify_remarks,
            S.sec_name as sec_name, priority_reason,complaint_hicslno,
            IFNULL( L.sec_name,"Nil" ) location,C.em_name as comp_reg_emp,
            cm_complaint_mast.create_user,C.em_department,
            co_department_mast.dept_name as empdept,compalint_priority,
            (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
            when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
             else  "Not Updated" end ) as priority, verify_spervsr,
            date(compalint_date) as date,TIME_FORMAT(compalint_date,"%r") AS Time,
            if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            (case when verify_remarks is null then "Not Updated" else verify_remarks end ) as verify_remarks1,
            (case when cm_rectify_status='Z' then "Not Verified" when cm_rectify_status="R" then "Verified" end) as cm_rectify_status1,
            compdept_message,compdept_message_flag,message_reply_emp,
            M.em_name as msg_send_emp,R.em_name as msg_read_emp
             from cm_complaint_mast
                      left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                      left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                      left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                      left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
                      left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                      left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
                      left join co_employee_master M on M.em_id=cm_complaint_mast.message_send_emp
                      left join co_employee_master R on R.em_id=cm_complaint_mast.message_read_emp
                         left join co_department_mast on co_department_mast.dept_id=C.em_department
                       left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
				LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
				LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
				LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
           where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
           where department_slno=?) AND compalint_status=1 ORDER BY complaint_slno DESC`,
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


    EmployeeInactive: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_detail
            SET  assign_status=0
            WHERE complaint_slno=? AND assigned_emp=? `,
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
    beforAssignHold: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET cm_rectify_status=?,
            rectify_pending_hold_remarks=?,
            pending_onhold_time=?,
            pending_onhold_user=?,
            compalint_status=1
            WHERE complaint_slno=?  `,
            [
                data.cm_rectify_status,
                data.rectify_pending_hold_remarks,
                data.pending_onhold_time,
                data.pending_onhold_user,
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
    empTransInactive: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE cm_complaint_detail
                                SET 
                                assign_status = 0                                                            
                                WHERE complaint_slno = ? and assigned_emp=?`,
                    [
                        data.complaint_slno,
                        data.assigned_emp
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )


            })
        })
        )
    },

    sendMeassageUser: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET compdept_message=?,
            compdept_message_flag=?,
            message_send_emp=?
            WHERE complaint_slno=? `,
            [
                data.compdept_message,
                data.compdept_message_flag,
                data.message_send_emp,
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

    ReadMeassageUser: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET 
            compdept_message_flag=?,
            message_read_emp=?,
            message_reply_emp=?
            WHERE complaint_slno=? `,
            [
                data.compdept_message_flag,
                data.message_read_emp,
                data.message_reply_emp,
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

    AssistReqListAll: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,complaint_dept_name,req_type_name,cm_asset_status,
            complaint_type_name,compalint_date,cm_rectify_status,cm_not_verify_time,verify_remarks,
            S.sec_name as sec_name, priority_reason,complaint_hicslno,
            IFNULL( L.sec_name,"Nil" ) location,C.em_name as comp_reg_emp,
            cm_complaint_mast.create_user,C.em_department,
            co_department_mast.dept_name as empdept,compalint_priority,
            (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
            when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
             else  "Not Updated" end ) as priority, 
            date(compalint_date) as date,TIME_FORMAT(compalint_date,"%r") AS Time,
            if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            (case when verify_remarks is null then "Not Updated" else verify_remarks end ) as verify_remarks1,
            (case when cm_rectify_status='Z' then "Not Verified" when cm_rectify_status="R" then "Verified" end) as cm_rectify_status1,
            A.em_name as assist_emp,verify_spervsr,
            R.em_name as assist_request_emp,assigned_date
             from cm_complaint_mast
                      left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                      left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                      left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                      left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
                      left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                      left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
                      left join co_department_mast on co_department_mast.dept_id=C.em_department
                       left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
                         left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
                         left join co_employee_master A on A.em_id=cm_complaint_detail.assigned_emp
                         left join co_employee_master R on R.em_id=cm_complaint_detail.assigned_user
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
           where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
           where department_slno=?) AND cm_complaint_detail.assist_flag=1 AND assist_receive=0 AND compalint_status=1 
           GROUP BY complaint_slno ORDER BY complaint_slno DESC`,
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

    getAssistRequestEmps: (id, callBack) => {
        pool.query(
            `select 
            assigned_emp,
            em_name 
        from cm_complaint_detail
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        where complaint_slno=? and assist_flag=1 and assist_receive=0`,
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

    assistTransInactive: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE cm_complaint_detail
                                SET 
                                assist_flag = 0                                                            
                                WHERE complaint_slno = ? and assigned_emp=?`,
                    [
                        data.complaint_slno,
                        data.assigned_emp
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    AssisttransferInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO cm_complaint_detail
            (
                complaint_slno,
                assigned_emp,
                assign_rect_status,
                assigned_date,
                assigned_user,
                assist_flag,
                assist_assign_date,
                assist_receive,
                assist_requested_emp,
                assign_status
            ) 
            VALUES ?`,
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

    SupervsrVerifyPending: (id, callBack) => {
        pool.query(
            //     `select cm_complaint_mast.complaint_slno,complaint_desc,complaint_dept_name,req_type_name,
            //     complaint_type_name,compalint_date,cm_rectify_status,cm_not_verify_time,verify_remarks,
            //     S.sec_name as sec_name, priority_reason,complaint_hicslno,
            //     IFNULL( L.sec_name,"Nil" ) location,C.em_name as comp_reg_emp,A.em_name as assigned_employee,
            //     cm_complaint_mast.create_user,C.em_department,cm_complaint_detail.assigned_date,
            //     cm_complaint_mast.cm_rectify_time,
            //     co_department_mast.dept_name as empdept,compalint_priority,
            //     (case when compalint_priority='1' then "Level 1" when compalint_priority='2' then "Level 2"
            //     when compalint_priority='3' then "Level 3" when compalint_priority='4' then "Level 4"
            //      else  "Not Updated" end ) as priority, rectify_pending_hold_remarks,
            //     date(compalint_date) as date,TIME_FORMAT(compalint_date,"%r") AS Time,verify_spervsr,
            //     if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
            //     (case when verify_remarks is null then "Not Updated" else verify_remarks end ) as verify_remarks1,
            //     (case when cm_rectify_status='Z' then "Not Verified" when cm_rectify_status="R" then "Verified" end) as cm_rectify_status1,
            //     compdept_message,compdept_message_flag,message_reply_emp,
            //     M.em_name as msg_send_emp,R.em_name as msg_read_emp
            //      from cm_complaint_mast
            //         left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            //               left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            //               left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            //               left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            //               left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
            //               left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            //               left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
            //               left join co_employee_master M on M.em_id=cm_complaint_mast.message_send_emp                   
            //                 left join co_employee_master A on A.em_id=cm_complaint_detail.assigned_emp
            //            left join co_employee_master R on R.em_id=cm_complaint_mast.message_read_emp                   
            //             left join co_department_mast on co_department_mast.dept_id=C.em_department
            //                left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
            //  left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location 
            //          where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
            //    where department_slno=?) AND compalint_status=2 AND verify_spervsr=0  GROUP BY complaint_slno ORDER BY complaint_slno DESC`,
            `SELECT               
            cm_complaint_mast.complaint_slno,
            cm_asset_status,
            S.sec_name AS sec_name,
            cm_rectify_time,
            cm_file_status,
            assigned_date,
            IFNULL(L.sec_name, "Nil") AS location,
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
            CR.em_name AS comp_reg_emp,
            -- Subquery to get assigned employees
            (SELECT GROUP_CONCAT(em_name SEPARATOR ', ') 
            FROM cm_complaint_detail 
            LEFT JOIN co_employee_master 
            ON co_employee_master.em_id = cm_complaint_detail.assigned_emp 
            WHERE cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno 
            AND cm_complaint_detail.assign_status = 1) AS assigned_employees
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
            LEFT JOIN cm_hic_policy ON cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            LEFT JOIN rm_newroom_creation ON rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno = rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno = rm_newroom_creation.rm_room_floor_slno
            LEFT JOIN co_employee_master CR ON CR.em_id = cm_complaint_mast.create_user
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno = rm_newroom_creation.rm_insidebuilldblock_slno
            WHERE 
            complaint_deptslno = (
                SELECT complaint_dept_slno 
                FROM cm_complaint_dept 
                WHERE department_slno = ?
                )                 
                AND compalint_status = 2 
                AND verify_spervsr = 0 
                GROUP BY 
                cm_complaint_mast.complaint_slno 
                ORDER BY 
                cm_complaint_mast.complaint_slno DESC;
                `,


            // ` select 
            //             cm_complaint_mast.complaint_slno,
            //             cm_asset_status,
            //             S.sec_name as sec_name,
            //             cm_rectify_time,
            //             cm_file_status,
            //             assigned_date,    
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
            //             CR.em_name as comp_reg_emp
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
            //             left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
            //             left join rm_newroom_creation on rm_newroom_creation.rm_room_slno = cm_complaint_mast.rm_room_slno
            //             LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno =rm_newroom_creation.rm_roomtype_slno
            // 			LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno =rm_newroom_creation.rm_room_floor_slno
            //              left join co_employee_master CR on CR.em_id=cm_complaint_mast.create_user
            // 			LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno =rm_newroom_creation.rm_insidebuilldblock_slno
            //             where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept                        
            //             where department_slno=?) AND compalint_status=2 AND verify_spervsr=0  GROUP BY complaint_slno ORDER BY complaint_slno DESC`,
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

    SupervsrVerify: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET verify_spervsr=?,
            verify_spervsr_remarks=?,
            verify_spervsr_user=?,
            suprvsr_verify_time=?,
            compalint_status=?
            WHERE complaint_slno=? `,
            [
                data.verify_spervsr,
                data.verify_spervsr_remarks,
                data.verify_spervsr_user,
                data.suprvsr_verify_time,
                data.compalint_status,
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
                data.verify_spervsr_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    AskQuery: (data, callback) => {
        pool.query(
            `INSERT INTO cm_complaint_query_details
            (            
                complaint_slno,           
                cm_query_remark,
                cm_query_remark_date,
                cm_query_remark_user           
            )
            VALUES (?,?,?,?)`,
            [
                data.complaint_slno,
                data.cm_query_remark,
                data.cm_query_remark_date,
                data.cm_query_remark_user
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    changeQueryStatus: (data, callback) => {
        pool.query(
            `UPDATE 
             cm_complaint_mast
             SET
             cm_query_status=?           
             WHERE 
            complaint_slno=?`,
            [
                data.cm_query_status,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getQuery: (data, callback) => {
        pool.query(
            `select 
            cm_query_details_slno,
            cm_complaint_query_details.complaint_slno,
            cm_query_remark, 
            cm_query_remark_date, 
            cm_query_remark_user, 
            cm_query_reply,
            cm_query_reply_date,
            cm_query_reply_user,
            Q.em_name as query_user,
            R.em_name as reply_user
            from cm_complaint_query_details
            left join co_employee_master Q on Q.em_id=cm_complaint_query_details.cm_query_remark_user
            left join co_employee_master R on R.em_id=cm_complaint_query_details.cm_query_reply_user
            left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_query_details.complaint_slno   
             where cm_complaint_query_details.complaint_slno=?
            `,
            [
                data.complaint_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    replyQuery: (data, callback) => {
        pool.query(
            `INSERT INTO cm_complaint_query_details
            (            
                complaint_slno,           
                cm_query_reply,
                cm_query_reply_date,       
                cm_query_reply_user           
            )
            VALUES (?,?,?,?)`,
            [
                data.complaint_slno,
                data.cm_query_reply,
                data.cm_query_reply_date,
                data.cm_query_reply_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    AssistReqEmployee: (data, callback) => {
        pool.query(
            `SELECT 
    cmcd.assigned_emp,
    cmcd.assist_flag,
    cmcd.assist_assign_date,
    cmcd.assign_status,
    cmcd.assist_receive,
    cmcd.assist_requested_emp,
    emp1.em_name AS assigned_emp_name,
    emp2.em_name AS assist_requested_emp_name,
    cmcd.assist_req_reject_reason
FROM
    cm_complaint_detail cmcd
LEFT JOIN 
    co_employee_master emp1 ON emp1.em_id = cmcd.assigned_emp
LEFT JOIN 
    co_employee_master emp2 ON emp2.em_id = cmcd.assist_requested_emp
WHERE 
    cmcd.complaint_slno = ? 
    AND cmcd.assist_flag != 0;`,
            [
                data.complaint_slno,

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },




    getAssistRequestDetails: (id, callBack) => {
        pool.query(
            `SELECT
            complaint_slno,
            COUNT(CASE WHEN assist_flag = 2 THEN 1 END) AS rejected,
            COUNT(CASE WHEN assist_flag = 1 AND assist_receive = 1 THEN 1 END) AS accepted,
            COUNT(CASE WHEN assist_flag = 1 AND assist_receive = 0 THEN 1 END) AS pending
            FROM
            cm_complaint_detail
            WHERE
            complaint_slno = ?`,
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